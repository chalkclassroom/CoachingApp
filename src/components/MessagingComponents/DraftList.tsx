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
  TableSortLabel
} from '@material-ui/core';
import moment from 'moment';
import { Email } from './MessagingTypes';

interface Props {
  drafts?: Array<Email>,
  // onClick(actionPlanId: string, teacherId: string): void
}

interface State {
  result: Array<Email>,
  order: 'desc' | 'asc',
  orderBy: EmailKey,
  // rows: number,
  rowsPerPage: number,
  page: number,
  selected: Array<string>
}

type EmailKey = keyof Email;

const headCells = [
  { id: 'recipientName', numeric: false, disablePadding: false, label: 'To:' },
  { id: 'subject', numeric: false, disablePadding: false, label: 'Subject:' },
  { id: 'dateModified', numeric: false, disablePadding: false, label: 'Edited:' },
];

/**
 *
 * @param {Email} a
 * @param {Email} b
 * @param {EmailKey} orderBy
 * @return {number}
 */
function descendingComparator(a: Email, b: Email, orderBy: EmailKey): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * @param {'desc' | 'asc' | Email} order
 * @param {EmailKey} orderBy
 * @return {any}
 */
function getComparator(order: 'desc' | 'asc' | Email, orderBy: EmailKey): any {
  return order === 'desc'
    ? (a: Email, b: Email): number => descendingComparator(a, b, orderBy)
    : (a: Email, b: Email): number => -descendingComparator(a, b, orderBy);
}

/**
 *
 * @param {Array<Email>} array
 * @param {any} comparator
 * @return {any}
 */
function stableSort(array: Array<Email>, comparator: typeof getComparator): any {
  const stabilizedThis: Array<Array<Email, number>> = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface TableHeadProps {
  order: 'desc' | 'asc',
  orderBy: EmailKey,
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
        ))}
      </TableRow>
    </TableHead>
  );
}

/**
 * @class DraftList
 */
class DraftList extends React.Component<Props, State>{
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state={
      result: [],
      order: 'desc',
      orderBy: 'dateModified',
      rowsPerPage: 5,
      page: 0,
      selected: []
    }
  }

  /**
   * @param {SyntheticEvent} event
   * @param {EmailKey} property
   */
  handleRequestSort = (event: React.SyntheticEvent, property: EmailKey): void => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    isAsc ? this.setState({ order: 'desc' }) : this.setState({ order: 'asc' });
    this.setState({ orderBy: property });
  };

  static propTypes = {
    drafts: PropTypes.array
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
        />
        <TableBody>
          {this.props.drafts ? (
            stableSort(this.props.drafts, getComparator(this.state.order, this.state.orderBy))
            // to limit number on each page
            // .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
            .map((row: Email, index: number) => {
              const modified = row.dateModified.toDate();
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  key={index}
                  selected={isItemSelected}
                >
                  <TableCell style={{padding: '0.5em'}}>
                    <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                      {row.recipientName}
                    </Typography>
                  </TableCell>
                  <TableCell style={{padding: '0.5em'}}>
                    <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                      <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                          <Typography variant="h6" style={{fontFamily: 'Arimo', color: row.subject ? 'black' : 'gray', paddingRight: '0.2em'}}>
                            {row.subject ? row.subject : '(no subject)'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Typography>
                  </TableCell>
                  <TableCell style={{padding: '0.5em'}}>
                    <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                      {moment(modified).format('MM/DD/YYYY')}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })
          ): (null)}
        </TableBody>
      </Table>
    );
  }
}

DraftList.contextType = FirebaseContext;
export default DraftList;