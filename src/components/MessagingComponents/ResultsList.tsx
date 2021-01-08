import * as React from 'react';
import * as PropTypes from 'prop-types';
import FirebaseContext from '../Firebase/FirebaseContext';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableSortLabel,
  Checkbox,
  ListItem,
  ListItemIcon
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment';
import TransitionTimeIconImage from '../../assets/images/TransitionTimeIconImage.svg';
import ClassroomClimateIconImage from '../../assets/images/ClassroomClimateIconImage.svg';
import MathIconImage from '../../assets/images/MathIconImage.svg';
import EngagementIconImage from '../../assets/images/EngagementIconImage.svg';
import InstructionIconImage from '../../assets/images/InstructionIconImage.svg';
import ListeningIconImage from '../../assets/images/ListeningIconImage.svg';
import SequentialIconImage from '../../assets/images/SequentialIconImage.svg';
import AssocCoopIconImage from '../../assets/images/AssocCoopIconImage.svg';
import * as Constants from '../../constants/Constants';

interface Props {
  results?: ResultsInfo[],
  teacherId?: string,
  onClick(actionPlanId: string, teacherId: string): void,
  checkedResults: {[id: string]: {summary: boolean, details: boolean, trends: boolean}} | undefined,
  addResult(id: string, type: ResultTypeKey): void,
  removeResult(id: string, type: ResultTypeKey): void
}

interface State {
  result: Array<TeacherListInfo> | Array<ResultsInfo>,
  order: 'desc' | 'asc',
  orderBy: TeacherListInfoKey,
  // rows: number,
  rowsPerPage: number,
  page: number,
  selected: Array<string>,
  checked: {[id: string]: {summary: boolean, details: boolean, trends: boolean}} | null
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

interface ResultsInfo {
  id: string,
  date: firebase.firestore.Timestamp,
  practice: string
}

type ResultsInfoKey = keyof ResultsInfo;

interface ResultType {
  summary: boolean,
  details: boolean,
  trends: boolean
}

type ResultTypeKey = keyof ResultType;

const headCells = [
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'practice', numeric: false, disablePadding: false, label: 'CHALK Practice' },
  { id: 'summary', numeric: false, disablePadding: false, label: 'Summary' },
  { id: 'details', numeric: false, disablePadding: false, label: 'Details' },
  { id: 'trends', numeric: false, disablePadding: false, label: 'Trends' },
  { id: 'preview', numeric: false, disablePadding: false, label: ''}
];

/**
 *
 * @param {TeacherListInfo | ResultsInfo} a
 * @param {TeacherListInfo | ResultsInfo} b
 * @param {TeacherListInfoKey | ResultsInfoKey} orderBy
 * @return {number}
 */
function descendingComparator(a: TeacherListInfo, b: TeacherListInfo, orderBy: TeacherListInfoKey | ResultsInfoKey): number {
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
function stableSort(array: Array<TeacherListInfo> | Array<ResultsInfo>, comparator: typeof getComparator): any {
  const stabilizedThis: Array<Array<TeacherListInfo | ResultsInfo, number>> = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface TableHeadProps {
  order: 'desc' | 'asc',
  orderBy: TeacherListInfoKey | ResultsInfoKey,
  onRequestSort(event: React.SyntheticEvent, property: string): void,
  results: boolean
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
            // align={headCell.numeric ? 'right' : 'left'}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{backgroundColor: '#d8ecff'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Grid container direction='row' justify='center' alignItems='center' style={{width: '100%'}}>
              <Typography variant="h5" align="center" style={{fontFamily: 'Arimo'}}>
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
              </Grid>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

/**
 * @class ResultsList
 */
class ResultsList extends React.Component<Props, State>{
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
      checked: null
    }
  }

  /**
   * @param {SyntheticEvent} event
   * @param {TeacherListInfoKey | ResultsInfoKey} property
   */
  handleRequestSort = (event: React.SyntheticEvent, property: TeacherListInfoKey | ResultsInfoKey): void => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    isAsc ? this.setState({ order: 'desc' }) : this.setState({ order: 'asc' });
    this.setState({ orderBy: property });
  };

  /**
   *
   */
  componentDidMount(): void {
    if (!this.state.checked && this.props.checkedResults) {
      this.setState({checked: this.props.checkedResults})
    } else {
      const unchecked: {[id: string]: {summary: boolean, details: boolean, trends: boolean}} = {};
      if (this.props.results) {
        this.props.results.forEach(result => {
          unchecked[result.id] = {'summary': false, 'details': false, 'trends': false}
        })
      }
      this.setState({checked: unchecked})
    }
  }

  /**
   * @param {string} id
   * @param {ResultTypeKey} resultType
   */
  handleCheck = (id: string, resultType: ResultTypeKey ): void => {
    const newChecked = this.state.checked;
    if (newChecked) {
      if (newChecked[id][resultType]) {
        newChecked[id][resultType] = false;
        this.props.removeResult(id, resultType);
      } else {
        newChecked[id][resultType] = true;
        this.props.addResult(id, resultType);
      }
    }
    this.setState({checked: newChecked});
  }

  static propTypes = {
    results: PropTypes.array,
    onClick: PropTypes.func.isRequired
  }

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isSelected = (id: string): boolean => this.state.selected.includes(id);
    return (
      <Table style={{width: '100%', border: '1px solid #a9a9a9', padding: '1em', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
        <TableHeadSort
          order={this.state.order}
          orderBy={this.state.orderBy}
          onRequestSort={this.handleRequestSort}
          results={this.props.results ? true : false}
        />
        <TableBody>
          {this.props.results ? (
            stableSort(this.props.results, getComparator(this.state.order, this.state.orderBy))
            // to limit number on each page
            // .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
            .map((row: {
              id: string,
              date: firebase.firestore.Timestamp,
              practice: string
            }, index: number) => {
              const isItemSelected = isSelected(row.id);
              const observationDate = row.date.toDate();
              const practice = 
                row.practice === 'transition' ? 'Transition Time'
                : row.practice === 'climate' ? 'Classroom Climate'
                : row.practice === 'math' ? 'Math Instruction'
                : row.practice === 'level' ? 'Level of Instruction'
                : row.practice === 'engagement' ? 'Student Engagement'
                : row.practice === 'listening' ? 'Listening to Children'
                : row.practice === 'sequential' ? 'Sequential Activities'
                : 'Associative and Cooperative'
              ;
              return (
                <TableRow
                  key={index}
                  selected={isItemSelected}
                >
                  <TableCell style={{padding: '0.5em', width: '15%'}}>
                    <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                      {moment(observationDate).format('MM/DD/YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell style={{paddingTop: '0.5em', paddingBottom: '0.5em', paddingRight: '0.5em', paddingLeft: 0, width: '30%'}}>
                    <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                      <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                          <Typography variant="h6" style={{fontFamily: 'Arimo', paddingRight: '0.2em'}}>
                            {practice}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} style={{height: '100%'}}>
                          {practice === 'Transition Time' ? (
                            <img
                              src={TransitionTimeIconImage}
                              alt="Magic 8 Icon"
                            />
                          ) : practice === 'Classroom Climate' ? (
                            <img
                              src={ClassroomClimateIconImage}
                              alt="Magic 8 Icon"
                            />
                          ) : practice === 'Math Instruction' ? (
                            <img
                              src={MathIconImage}
                              alt="Magic 8 Icon"
                            />
                          ) : practice === 'Student Engagement' ? (
                            <img
                              src={EngagementIconImage}
                              alt="Magic 8 Icon"
                            />
                          ) : practice === 'Level of Instruction' ? (
                            <img
                              src={InstructionIconImage}
                              alt="Magic 8 Icon"
                            />
                          ) : practice === 'Listening to Children' ? (
                            <img
                              src={ListeningIconImage}
                              alt="Magic 8 Icon"
                            />
                          ) : practice === 'Sequential Activities' ? (
                            <img
                              src={SequentialIconImage}
                              alt="Magic 8 Icon"
                            />
                          ) : practice === 'Associative and Cooperative' ? (
                            <img
                              src={AssocCoopIconImage}
                              alt="Magic 8 Icon"
                            />
                          ) : <div />}
                        </Grid>
                      </Grid>
                    </Typography>
                  </TableCell>
                  <TableCell style={{width: '15%'}}>
                    <ListItem onClick={(): void => {this.handleCheck(row.id, 'summary')}} alignItems="center">
                      <Grid container direction="row" justify="center" alignItems="center">
                        <ListItemIcon>
                          <Checkbox checked={(this.state.checked && this.state.checked[row.id]) ? this.state.checked[row.id]['summary' as ResultTypeKey] : false} />
                        </ListItemIcon>
                      </Grid>
                    </ListItem>
                  </TableCell>
                  <TableCell style={{width: '15%'}}>
                    <ListItem onClick={(): void => {this.handleCheck(row.id, 'details')}}>
                      <Grid container direction="row" justify="center" alignItems="center">
                        <ListItemIcon>
                          <Checkbox checked={(this.state.checked && this.state.checked[row.id]) ? this.state.checked[row.id]['details' as ResultTypeKey] : false} />
                        </ListItemIcon>
                      </Grid>
                    </ListItem>
                  </TableCell>
                  <TableCell style={{width: '15%'}}>
                    <ListItem onClick={(): void => {this.handleCheck(row.id, 'trends')}}>
                      <Grid container direction="row" justify="center" alignItems="center">
                        <ListItemIcon>
                          <Checkbox checked={(this.state.checked && this.state.checked[row.id]) ? this.state.checked[row.id]['trends' as ResultTypeKey] : false} />
                        </ListItemIcon>
                      </Grid>
                    </ListItem>
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
          ) : (null)}
        </TableBody>
      </Table>
    );
  }
}

ResultsList.contextType = FirebaseContext;
export default ResultsList;