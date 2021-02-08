import * as React from 'react';
import * as PropTypes from 'prop-types';
import FirebaseContext from './Firebase/FirebaseContext';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableSortLabel,
  TableContainer,
  TablePagination,
  Checkbox,
  ListItem,
  ListItemIcon
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment';
import TransitionTimeIconImage from '../assets/images/TransitionTimeIconImage.svg';
import ClassroomClimateIconImage from '../assets/images/ClassroomClimateIconImage.svg';
import MathIconImage from '../assets/images/MathIconImage.svg';
import EngagementIconImage from '../assets/images/EngagementIconImage.svg';
import InstructionIconImage from '../assets/images/InstructionIconImage.svg';
import ListeningIconImage from '../assets/images/ListeningIconImage.svg';
import SequentialIconImage from '../assets/images/SequentialIconImage.svg';
import AssocCoopIconImage from '../assets/images/AssocCoopIconImage.svg';
import * as Constants from '../constants/Constants';

interface Props {
  actionPlans?: Array<ActionPlanInfo>,
  teacherId?: string,
  onClick(actionPlanId: string, teacherId: string): void,
  handleChooseActionPlan(actionPlanId: string, teacherId: string, practice: string): void,
  checkedActionPlans: Array<string>,
  addActionPlan(id: string): void,
  removeActionPlan(id: string): void,
  addActionPlanAttachment?(actionPlanId: string, teacherId: string): void
}

interface State {
  result: Array<TeacherListInfo> | Array<ActionPlanInfo>,
  order: 'desc' | 'asc',
  orderBy: TeacherListInfoKey,
  // rows: number,
  rowsPerPage: number,
  page: number,
  selected: Array<string>,
  checked: Array<string>
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
  modified: Date,
  achieveBy: firebase.firestore.Timestamp
}

type TeacherListInfoKey = keyof TeacherListInfo;

interface ActionPlanInfo {
  id: string,
  date: {
    seconds: number,
    nanoseconds: number
  },
  practice: string,
  achieveBy: firebase.firestore.Timestamp
}

type ActionPlanInfoKey = keyof ActionPlanInfo;

const headCells = [
  { id: 'modified', numeric: false, disablePadding: false, label: 'Last Modified' },
  { id: 'teacherLastName', numeric: false, disablePadding: false, label: 'Teacher' },
  { id: 'practice', numeric: false, disablePadding: false, label: 'CHALK Practice' },
  { id: 'achieveBy', numeric: false, disablePadding: false, label: 'Achieve By:' },
];

const teacherHeadCells = [
  { id: 'checked', numeric: false, disablePadding: false, label: ''},
  { id: 'modified', numeric: false, disablePadding: false, label: 'Last Modified' },
  { id: 'practice', numeric: false, disablePadding: false, label: 'CHALK Practice' },
  { id: 'achieveBy', numeric: false, disablePadding: false, label: 'Achieve By:' },
  { id: 'preview', numeric: false, disablePadding: false, label: ''}
];

/**
 *
 * @param {TeacherListInfo | ActionPlanInfo} a
 * @param {TeacherListInfo | ActionPlanInfo} b
 * @param {TeacherListInfoKey | ActionPlanInfoKey} orderBy
 * @return {number}
 */
function descendingComparator(a: TeacherListInfo, b: TeacherListInfo, orderBy: TeacherListInfoKey | ActionPlanInfoKey): number {
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
function stableSort(array: Array<TeacherListInfo> | Array<ActionPlanInfo>, comparator: typeof getComparator): any {
  const stabilizedThis: Array<Array<TeacherListInfo | ActionPlanInfo, number>> = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface TableHeadProps {
  order: 'desc' | 'asc',
  orderBy: TeacherListInfoKey | ActionPlanInfoKey,
  onRequestSort(event: React.SyntheticEvent, property: string): void,
  actionPlans: boolean
}

/**
 *
 * @param {TableHeadProps} props
 * @return {ReactElement}
 */
function TableHeadSort(props: TableHeadProps): React.ReactElement {
  const { order, orderBy, onRequestSort, actionPlans } = props;
  const createSortHandler = (property: string) => (event: React.SyntheticEvent): void => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {actionPlans ? (teacherHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{backgroundColor: '#d8ecff', paddingLeft: 0}}
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
        ))) : (
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
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
          ))
        )}
      </TableRow>
    </TableHead>
  );
}

/**
 * @class ActionPlanList
 */
class ActionPlanList extends React.Component<Props, State>{
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
      selected: [],
      checked: ['']
    }
  }

  /**
   * @param {SyntheticEvent} event
   * @param {TeacherListInfoKey | ActionPlanInfoKey} property
   */
  handleRequestSort = (event: React.SyntheticEvent, property: TeacherListInfoKey | ActionPlanInfoKey): void => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    isAsc ? this.setState({ order: 'desc' }) : this.setState({ order: 'asc' });
    this.setState({ orderBy: property });
  };

  /**
   *
   */
  componentDidMount(): void {
    if (!this.state.checked[0]) {
      this.setState({checked: this.props.checkedActionPlans})
    }
    const firebase = this.context;
    if (!this.props.actionPlans) {
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
      })
    }
  }

  /**
   * @param {string} id
   */
  handleCheck = (id: string): void => {
    const newChecked = this.state.checked;
    const index = newChecked.indexOf(id);
    if (index === -1) {
      newChecked.push(id);
      this.props.addActionPlan(id);
    } else {
      newChecked.splice(index, 1);
      this.props.removeActionPlan(id)
    }
    this.setState({checked: newChecked});
  }

  /**
   * @param {MouseEvent<HTMLButtonElement, MouseEvent> | null} event
   * @param {number} newPage
   */
  handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number): void => {
    this.setState({page: newPage});
  };

  /**
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({rowsPerPage: (parseInt(event.target.value, 10))});
    this.setState({page: 0 });
  };

  static propTypes = {
    actionPlans: PropTypes.array,
    onClick: PropTypes.func.isRequired
  }

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isSelected = (id: string): boolean => this.state.selected.includes(id);
    return (
      <TableContainer>
        <Table style={{width: '100%', border: '1px solid #a9a9a9', padding: '1em', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
          <TableHeadSort
            order={this.state.order}
            orderBy={this.state.orderBy}
            onRequestSort={this.handleRequestSort}
            actionPlans={this.props.actionPlans ? true : false}
          />
          <TableBody>
            {this.state.result ? (this.props.actionPlans ? (
              stableSort(this.props.actionPlans, getComparator(this.state.order, this.state.orderBy))
              // to limit number on each page
              .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((row: {
                id: string,
                date: {seconds: number, nanoseconds: number},
                practice: string,
                achieveBy: firebase.firestore.Timestamp,
                modified: Date
              }, index: number) => {
                // today if achieveBy date does not exist OR if it is a string (from old version)
                const achieveBy = (!row.achieveBy || typeof row.achieveBy === 'string')
                  ? new Date()
                  : row.achieveBy.toDate();
                const isItemSelected = isSelected(row.id);
                const newDate = new Date(0);
                newDate.setUTCSeconds(row.date.seconds);
                row.modified = newDate;
                return (
                  <TableRow
                    key={index}
                    selected={isItemSelected}
                  >
                    <TableCell
                      style={{
                        paddingTop: '0.5em',
                        paddingBottom: '0.5em',
                        paddingRight: '0.5em',
                        paddingLeft: 0
                      }}
                    >
                      <ListItem onClick={(): void => {this.handleCheck(row.id)}}>
                        <ListItemIcon>
                          <Checkbox checked = {this.state.checked.includes(row.id)} onClick={(): void => {
                            // this.props.handleChooseActionPlan(row.id, this.props.teacherId, row.practice);
                            this.props.addActionPlanAttachment(row.id, this.props.teacherId);
                          }} />
                        </ListItemIcon>
                      </ListItem>
                    </TableCell>
                    <TableCell style={{padding: '0.5em'}}>
                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                        {moment(row.modified).format('MM/DD/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell style={{paddingTop: '0.5em', paddingBottom: '0.5em', paddingRight: '0.5em', paddingLeft: 0}}>
                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                        <Grid container direction="row" justify="flex-start" alignItems="center">
                          <Grid item xs={9}>
                            <Typography variant="h6" style={{fontFamily: 'Arimo', paddingRight: '0.2em'}}>
                              {row.practice === 'AC' ? 'Associative and Cooperative' : row.practice}
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
                    <TableCell style={{paddingTop: '0.5em', paddingBottom: '0.5em', paddingRight: '0.5em', paddingLeft: 0}}>
                      <VisibilityIcon
                        style={{fill: Constants.Colors.MI}}
                        onClick={(): void => {this.props.onClick(row.id, this.props.teacherId ? this.props.teacherId : '')}}
                      />
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              stableSort(this.state.result, getComparator(this.state.order, this.state.orderBy))
              // to limit number on each page
              .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((row: {
                  id: string,
                  date: {
                    seconds: number,
                    nanoseconds: number
                  },
                  achieveBy: firebase.firestore.Timestamp,
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
                    onClick={(): void => {this.props.onClick(row.id, row.teacherId)}}
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
                              {row.practice === 'AC' ? 'Associative and Cooperative' : row.practice}
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
            )) : (null)}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.props.actionPlans ? this.props.actionPlans.length : this.state.result.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </TableContainer>
    );
  }
}

ActionPlanList.contextType = FirebaseContext;
export default ActionPlanList;