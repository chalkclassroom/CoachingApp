import * as React from 'react';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import * as moment from 'moment';
import TransitionTimeIconImage from '../../../assets/images/TransitionTimeIconImage.svg';
import ClassroomClimateIconImage from '../../../assets/images/ClassroomClimateIconImage.svg';
import MathIconImage from '../../../assets/images/MathIconImage.svg';
import EngagementIconImage from '../../../assets/images/EngagementIconImage.svg';
import InstructionIconImage from '../../../assets/images/InstructionIconImage.svg';
import ListeningIconImage from '../../../assets/images/ListeningIconImage.svg';
import SequentialIconImage from '../../../assets/images/SequentialIconImage.svg';
import AssocCoopIconImage from '../../../assets/images/AssocCoopIconImage.svg';

interface Props {
  history: {
    push(
      param: {
        pathname: string,
        state: {
          conferencePlanId: string,
          teacherId: string,
          sessionId: string
        }
      }
    ): void,
    replace(
      param: {
        pathname: string,
        state: {
          actionPlanId: string,
          teacherId: string
        }
      }
    ): void
  }
}

interface State {
  result: Array<{
    id: string,
    teacherId: string,
    teacherLastName: string,
    teacherFirstName: string,
    date: {seconds: number, nanoseconds: number},
    practice: string
  }>,
  order: 'desc' | 'asc',
  orderBy: string,
  // rows: number,
  rowsPerPage: number,
  page: number,
  selected: Array<any>
}

const headCells = [
  { id: 'modified', numeric: false, disablePadding: false, label: 'Last Modified' },
  { id: 'teacherLastName', numeric: false, disablePadding: false, label: 'Teacher' },
  { id: 'practice', numeric: false, disablePadding: false, label: 'CHALK Practice' },
  { id: 'observationDate', numeric: false, disablePadding: false, label: 'Observation Date:' },
];

/**
 * 
 * @param {any} a 
 * @param {any} b 
 * @param {string} orderBy 
 * @return {number}
 */
function descendingComparator(a, b, orderBy: string): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * @param {'desc' | 'asc'} order 
 * @param {string} orderBy
 * @return {any} 
 */
function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * 
 * @param {Array<any>} array 
 * @param {any} comparator 
 * @return {any}
 */
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface TableHeadProps {
  order: 'desc' | 'asc',
  orderBy: string,
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
            padding={headCell.disablePadding ? 'none' : 'checkbox'}
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
 * @class ConferencePlanListPage
 */
class ConferencePlanListPage extends React.Component<Props, State>{
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    
    this.state={
      result: null,
      order: 'desc',
      orderBy: 'modified',
      rowsPerPage: 5,
      page: 0,
      selected: []
    }
  }

  /**
   * @param {SyntheticEvent} event
   * @param {string} property
   */
  handleRequestSort = (event: React.SyntheticEvent, property: string): void => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    isAsc ? this.setState({ order: 'desc' }) : this.setState({ order: 'asc' });
    this.setState({ orderBy: property });
  };

  /**
   * 
   */
  componentDidMount(): void {
    const firebase = this.context;
    firebase.getCoachConferencePlans().then(
      (answer: Array<{
        id: string,
        teacherId: string,
        date: {seconds: number, nanoseconds: number},
        sessionId: string,
        practice: string,
        teacherFirstName: string,
        teacherLastName: string
      }>) => {
      answer.forEach((
        conferencePlan: {
          id: string,
          teacherId: string,
          date: {seconds: number, nanoseconds: number},
          sessionId: string,
          practice: string,
          teacherFirstName: string,
          teacherLastName: string,
          observationDate: {seconds: number, nanoseconds: number}
        }
      ) => 
        firebase.getTeacherFirstName(conferencePlan.teacherId).then((firstName: string) => {
          conferencePlan.teacherFirstName = firstName;
        }).then(() => {
          firebase.getTeacherLastName(conferencePlan.teacherId).then((lastName: string) => {
            conferencePlan.teacherLastName = lastName;
          }).then(() => {
            firebase.getObservationDate(conferencePlan.sessionId).then((date: {seconds: number, nanoseconds: number}) => {
              conferencePlan.observationDate = date;
            }).then(() => {
              this.setState({
                result: answer
              })
            })
          })
        })
      )
    });
  }

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isSelected = (id: string): boolean => this.state.selected.includes(id);
    return (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid direction="column" justify="center" alignItems="center">
          <Grid item style={{width: '100%', paddingTop: '2em'}}>
            <Typography variant="h3" align="center" style={{fontFamily: 'Arimo'}}>
              Conference Plans
            </Typography>
          </Grid>
          <Grid item style={{width: '100%', paddingTop: '2em'}}>
            <Grid container justify="center" alignItems="center">
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
                        observationDate: {
                          seconds: number,
                          nanoseconds: number
                        },
                        teacherId: string,
                        sessionId: string,
                        practice: string,
                        teacherFirstName: string,
                        teacherLastName: string,
                        modified: Date,
                        observed: Date,
                        name: string
                      }, index: number) => {
                      const isItemSelected = isSelected(row.id);
                      const modifiedDate = new Date(0);
                      const observationDate = new Date(0);
                      modifiedDate.setUTCSeconds(row.date.seconds);
                      row.modified = modifiedDate;
                      observationDate.setUTCSeconds(row.observationDate.seconds);
                      row.observed = observationDate;
                      row.name = row.teacherLastName + ', ' + row.teacherFirstName;
                      return (
                        <TableRow
                          key={index}
                          selected={isItemSelected}
                          onClick={() => {
                            this.props.history.push({
                              pathname: "/ConferencePlan",
                              state: {
                                conferencePlanId: row.id,
                                teacherId: row.teacherId,
                                sessionId: row.sessionId
                              }
                            });
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                              {moment(row.modified).format('MM/DD/YYYY')}
                            </Typography>
                          </TableCell>
                          <TableCell padding="checkbox">
                            <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                              {row.name}
                            </Typography>
                          </TableCell>
                          <TableCell padding="checkbox">
                            <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                              <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={9}>
                                  <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
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
                                  ) : row.practice === 'Student Engagement' ? (
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
                          <TableCell padding="checkbox">
                            <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                              {moment(row.observed).format('MM/DD/YYYY')}
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

ConferencePlanListPage.contextType = FirebaseContext;
export default ConferencePlanListPage;