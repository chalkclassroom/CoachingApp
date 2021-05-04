import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const columns = [
  { id: 'name', label: '', minWidth: '12em', align: 'left' },
  { id: 'first', label: <div>8/21/20 <br /> Morning Meeting</div>, minWidth: '2em', align: 'right' },
  {
    id: 'second',
    label: <div>9/24/20 <br/> Morning Meeting</div>,
    minWidth: '2em',
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'third',
    label: <div>10/5/20  <br/>Shared Reading</div>,
    minWidth: '2em',
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'fourth',
    label: <div>12/4/20 <br/> Morning Meeting</div>,
    minWidth: '2em',
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
];

const totals = [
  { id: 'total', label: 'Total number of 1-minute intervals', minWidth: '10em', align: 'left' },
  { id: 'first', label: '14', minWidth: '2em', align: 'right' },
  {
    id: 'second',
    label: 10,
    minWidth: '2em',
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'third',
    label: 7,
    minWidth: '2em',
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'fourth',
    label: 15,
    minWidth: '2em',
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
];

function createData(name: string, first: number, second: number, third: number, fourth: number, backgroundColor: string) {
  // const density = population / size;
  return { name, first, second, third, fourth, backgroundColor };
}

const numberRows = [
  createData('Rhyming, alliteration, and/or syllables', 0, 0, 0, 1, '#cfe2f3'),
  createData('Individual sounds', 2, 0, 0, 7, '#cfe2f3'),
  createData('Alphabet knowledge and/or word identification skills', 2, 3, 4, 2, '#d9ead3'),
  createData('Letter-sound correspondence', 2, 0, 3, 9, '#d9ead3'),
  createData('Supporting inventive spelling', 0, 0, 0, 2, '#d9ead3'),
  createData('Print concepts', 0, 0, 7, 4, '#d9ead3'),
  createData('Matching spoken words to print', 1, 0, 2, 1, '#d9ead3'),
  createData('Asking open-ended questions', 0, 2, 0, 6, '#fff2cc'),
  createData('Using foundational skills for realistic reading and/or writing', 2, 3, 7, 4, '#f4cccc'),
  createData('Using multimodal instruction', 0, 0, 2, 1, '#d9d2e9')
];

const percentageRows = [
  createData('Rhyming, alliteration, and/or syllables', 7, 0, 0, 0, '#cfe2f3'),
  createData('Individual sounds', 47, 0, 0, 14, '#cfe2f3'),
  createData('Alphabet knowledge and/or word identification skills', 13, 30, 57, 14, '#d9ead3'),
  createData('Letter-sound correspondence', 60, 0, 43, 14, '#d9ead3'),
  createData('Supporting inventive spelling', 13, 0, 0, 0, '#d9ead3'),
  createData('Print concepts', 27, 0, 100, 0, '#d9ead3'),
  createData('Matching spoken words to print', 7, 0, 29, 7, '#d9ead3'),
  createData('Asking open-ended questions', 40, 20, 0, 0, '#fff2cc'),
  createData('Using foundational skills for realistic reading and/or writing', 27, 30, 100, 14, '#f4cccc'),
  createData('Using multimodal instruction', 7, 0, 43, 0, '#d9d2e9')
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    // maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [view, setView] = useState('number');
  const [activitySetting, setActivitySetting] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = () => {
    return;
  };

  const handleView = (event, newView) => {
    setView(newView);
  };

  /* const handleClick = (event) => {
    setMenuOpen(event.currentTarget);
  }; */

  /* const handleClose = () => {
    setMenuOpen(false);
  }; */

  const handleActivitySetting = (event, newSetting) => {
    setActivitySetting(newSetting);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container direction="column">
      <Grid item style={{paddingBottom: '0.5em'}}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleView}
              aria-label="text alignment"
            >
              <ToggleButton value="number" aria-label="left aligned">
                #
              </ToggleButton>
              <ToggleButton value="percentage" aria-label="centered">
                %
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <Button
              aria-controls="activity-setting"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              {activitySetting}
            </Button>
            <Menu
              id='activity-setting'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              elevation={6}
              getContentAnchorEl={null}
              keepMounted
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                style: {
                  maxHeight: '10em',
                  // width: '20ch',
                },
              }}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose1}>
                <ListItemText primary="All" />
              </MenuItem>
              <MenuItem onClick={handleClose1}>
                <ListItemText primary="Morning Meeting" />
              </MenuItem>
              <MenuItem onClick={handleClose1}>
                <ListItemText primary="Shared Reading" />
              </MenuItem>
              <MenuItem onClick={handleClose1}>
                <ListItemText primary="Something else" />
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(view === 'number' ? numberRows : percentageRows).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = (view === 'percentage' && column.id !== 'name') ? row[column.id]+'%' : row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{backgroundColor: row.backgroundColor, fontWeight: column.id === 'name' ? 'bold' : undefined}}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
            <TableHead>
              <TableRow>
                {totals.map((total) => (
                  <TableCell
                    key={total.id}
                    align={total.align}
                    style={{ minWidth: total.minWidth, fontWeight: total.id !== 'total' ? 'bold' : undefined}}
                  >
                    {total.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
}