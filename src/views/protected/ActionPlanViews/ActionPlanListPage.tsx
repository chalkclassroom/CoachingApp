import * as React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableSortLabel
} from '@material-ui/core';
import * as moment from 'moment';
import TransitionTimeIconImage from '../../../assets/images/TransitionTimeIconImage.svg';
import ClassroomClimateIconImage from '../../../assets/images/ClassroomClimateIconImage.svg';
import MathIconImage from '../../../assets/images/MathIconImage.svg';
import EngagementIconImage from '../../../assets/images/EngagementIconImage.svg';
import InstructionIconImage from '../../../assets/images/InstructionIconImage.svg';
import ListeningIconImage from '../../../assets/images/ListeningIconImage.svg';
import SequentialIconImage from '../../../assets/images/SequentialIconImage.svg';
import AssocCoopIconImage from '../../../assets/images/AssocCoopIconImage.svg';
import * as H from 'history';
import * as Types from '../../../constants/Types';

interface Props {
  history: H.History
}

interface State {
  result: Array<TeacherListInfo>,
  order: 'desc' | 'asc',
  orderBy: TeacherListInfoKey,
  // rows: number,
  rowsPerPage: number,
  page: number,
  selected: Array<string>
}

interface TeacherListInfo {
  name: string,
  teacherId: string,
  teacherFirstName: string,
  teacherLastName: string,
  practice: string,
  id: string,
  date: {
    seconds: number,
    nanoseconds: number
  },
  modified: Date
}

type TeacherListInfoKey = keyof TeacherListInfo;

const headCells = [
  { id: 'modified', numeric: false, disablePadding: false, label: 'Last Modified' },
  { id: 'teacherLastName', numeric: false, disablePadding: false, label: 'Teacher' },
  { id: 'practice', numeric: false, disablePadding: false, label: 'CHALK Practice' },
  { id: 'achieveBy', numeric: false, disablePadding: false, label: 'Achieve By:' },
];

/**
 *
 * @param {TeacherListInfo} a
 * @param {TeacherListInfo} b
 * @param {TeacherListInfoKey} orderBy
 * @return {number}
 */
function descendingComparator(a: TeacherListInfo, b: TeacherListInfo, orderBy: TeacherListInfoKey): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * @param {'desc' | 'asc' | TeacherListInfo} order
 * @param {TeacherListInfoKey} orderBy
 * @return {any}
 */
function getComparator(order: 'desc' | 'asc' | TeacherListInfo, orderBy: TeacherListInfoKey): any {
  return order === 'desc'
    ? (a: TeacherListInfo, b: TeacherListInfo): number => descendingComparator(a, b, orderBy)
    : (a: TeacherListInfo, b: TeacherListInfo): number => -descendingComparator(a, b, orderBy);
}

/**
 *
 * @param {Array<TeacherListInfo>} array
 * @param {any} comparator
 * @return {any}
 */
function stableSort(array: Array<TeacherListInfo>, comparator: typeof getComparator): any {
  const stabilizedThis: Array<Array<TeacherListInfo, number>> = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface TableHeadProps {
  order: 'desc' | 'asc',
  orderBy: TeacherListInfoKey,
  onRequestSort(event: React.SyntheticEvent, property: string): void
}

/**
 *
 * @param {TableHeadProps} props
 * @return {ReactElement}
 */
function TableHeadSort(props: TableHeadProps): React.ReactElement {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: React.SyntheticEvent): void => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : '0.5em'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{backgroundColor: '#d8ecff'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span
                  style={{
                    border: 0,
                    clip: 'rect(0 0 0 0)',
                    height: 1,
                    margin: -1,
                    overflow: 'hidden',
                    padding: 0,
                    position: 'absolute',
                    top: 20,
                    width: 1
                  }}
                >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

/**
 * @class ActionPlanListPage
 */
class ActionPlanListPage extends React.Component<Props, State>{
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state={
      result: [],
      order: 'desc',
      orderBy: 'modified',
      rowsPerPage: 5,
      page: 0,
      selected: []
    }
  }

  /**
   * @param {SyntheticEvent} event
   * @param {TeacherListInfoKey} property
   */
  handleRequestSort = (event: React.SyntheticEvent, property: TeacherListInfoKey): void => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    isAsc ? this.setState({ order: 'desc' }) : this.setState({ order: 'asc' });
    this.setState({ orderBy: property });
  };

  /**
   *
   */
  componentDidMount(): void {
    const firebase = this.context;
    firebase.getCoachActionPlans().then(
      (answer: Array<TeacherListInfo>) => {
      answer.forEach((
        actionPlan: TeacherListInfo
      ) => {
        firebase.getTeacherFirstName(actionPlan.teacherId).then((firstName: string) => {
          actionPlan.teacherFirstName = firstName;
        }).then(() => {
          firebase.getTeacherLastName(actionPlan.teacherId).then((lastName: string) => {
            actionPlan.teacherLastName = lastName;
          }).then(() => {
            this.setState({
              result: answer
            })
          })
        })
      })
    });
  }

  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired
  }

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isSelected = (id: string): boolean => this.state.selected.includes(id);
    return (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid direction="column" justify="center" alignItems="center">
          <Grid item style={{width: '100%', paddingTop: '2em'}}>
            <Typography variant="h3" align="center" style={{fontFamily: 'Arimo'}}>
              Action Plans
            </Typography>
          </Grid>
          <Grid item style={{width: '100%', paddingTop: '2em'}}>
            <Grid container justify="center" alignItems="center" style={{maxHeight: '60vh', overflow: 'auto'}}>
              <Table style={{width: '85%', border: '1px solid #a9a9a9', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                <TableHeadSort
                  order={this.state.order}
                  orderBy={this.state.orderBy}
                  onRequestSort={this.handleRequestSort}
                />
                <TableBody>
                  {this.state.result ? (stableSort(this.state.result, getComparator(this.state.order, this.state.orderBy))
                    // to limit number on each page
                    // .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                    .map((row: {
                        id: string,
                        date: {
                          seconds: number,
                          nanoseconds: number
                        },
                        achieveBy: firebase.firestore.Timestamp,
                        // deadline: string,
                        teacherId: string,
                        practice: string,
                        teacherFirstName: string,
                        teacherLastName: string,
                        modified: Date,
                        name: string
                      }, index: number) => {
                      // today if achieveBy date does not exist OR if it is a string (from old version)
                      const achieveBy = (!row.achieveBy || typeof row.achieveBy === 'string')
                        ? new Date()
                        : row.achieveBy.toDate();
                      const isItemSelected = isSelected(row.id);
                      const newDate = new Date(0);
                      newDate.setUTCSeconds(row.date.seconds);
                      row.modified = newDate;
                      row.name = row.teacherLastName + ', ' + row.teacherFirstName;
                      return (
                        <TableRow
                          key={index}
                          selected={isItemSelected}
                          onClick={(): void => {
                            this.props.history.push({
                              pathname: "/ActionPlan",
                              state: {
                                actionPlanId: row.id,
                                teacherId: row.teacherId
                              }
                            });
                          }}
                        >
                          <TableCell style={{padding: '0.5em'}}>
                            <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                              {moment(row.modified).format('MM/DD/YYYY')}
                            </Typography>
                          </TableCell>
                          <TableCell style={{padding: '0.5em'}}>
                            <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                              {row.name}
                            </Typography>
                          </TableCell>
                          <TableCell style={{padding: '0.5em'}}>
                            <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                              <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={9}>
                                  <Typography variant="h6" style={{fontFamily: 'Arimo', paddingRight: '0.2em'}}>
                                    {row.practice}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  {row.practice === 'Transition Time' ? (
                                    <img
                                      src={TransitionTimeIconImage}
                                      alt="Magic 8 Icon"
                                    />
                                  ) : row.practice === 'Classroom Climate' ? (
                                    <img
                                      src={ClassroomClimateIconImage}
                                      alt="Magic 8 Icon"
                                    />
                                  ) : row.practice === 'Math Instruction' ? (
                                    <img
                                      src={MathIconImage}
                                      alt="Magic 8 Icon"
                                    />
                                  ) : row.practice === 'Level of Engagement' ? (
                                    <img
                                      src={EngagementIconImage}
                                      alt="Magic 8 Icon"
                                    />
                                  ) : row.practice === 'Level of Instruction' ? (
                                    <img
                                      src={InstructionIconImage}
                                      alt="Magic 8 Icon"
                                    />
                                  ) : row.practice === 'Listening to Children' ? (
                                    <img
                                      src={ListeningIconImage}
                                      alt="Magic 8 Icon"
                                    />
                                  ) : row.practice === 'Sequential Activities' ? (
                                    <img
                                      src={SequentialIconImage}
                                      alt="Magic 8 Icon"
                                    />
                                  ) : row.practice === 'AC' ? (
                                    <img
                                      src={AssocCoopIconImage}
                                      alt="Magic 8 Icon"
                                    />
                                  ) : <div />}
                                </Grid>
                              </Grid>
                            </Typography>
                          </TableCell>
                          <TableCell style={{padding: '0.5em'}}>
                            <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                              {moment(achieveBy).format('MM/DD/YYYY')}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (null)}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ActionPlanListPage.contextType = FirebaseContext;
export default ActionPlanListPage;