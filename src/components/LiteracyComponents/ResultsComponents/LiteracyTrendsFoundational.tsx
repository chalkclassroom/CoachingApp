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

interface Props {
  teacherData: Array<{
    startDate: {value: string},
    literacy1: number,
    literacy2: number,
    literacy3: number,
    literacy4: number,
    literacy5: number,
    literacy6: number,
    literacy7: number,
    literacy8: number,
    literacy9: number,
    literacy10: number,
    total: number
  }>
}

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

type sampleDataKey = 'literacy1' | 'literacy2' | 'literacy3' | 'literacy4' | 'literacy5' | 'literacy6' | 'literacy7' | 'literacy8' | 'literacy9' | 'literacy10' | 'total';

const sampleData = [
  {
    title: <div>8/21/20 <br /> Morning Meeting</div>,
    item1: 0,
    item2: 2,
    item3: 2,
    item4: 2,
    item5: 0,
    item6: 0,
    item7: 1,
    item8: 0,
    item9: 2,
    item10: 0,
    total: 14
  },
  {
    title: <div>9/24/20 <br/> Morning Meeting</div>,
    item1: 0,
    item2: 0,
    item3: 3,
    item4: 0,
    item5: 0,
    item6: 0,
    item7: 0,
    item8: 2,
    item9: 3,
    item10: 0,
    total: 10
  },
  {
    title: <div>10/5/20  <br/>Shared Reading</div>,
    item1: 0,
    item2: 0,
    item3: 4,
    item4: 3,
    item5: 0,
    item6: 7,
    item7: 2,
    item8: 0,
    item9: 7,
    item10: 2,
    total: 7
  },
];

function createData(name: string, backgroundColor: string) {
  return { name, backgroundColor };
}

const numberRows = [
  createData('Rhyming, alliteration, and/or syllables', '#cfe2f3'),
  createData('Individual sounds', '#cfe2f3'),
  createData('Alphabet knowledge and/or word identification skills', '#d9ead3'),
  createData('Letter-sound correspondence', '#d9ead3'),
  createData('Supporting inventive spelling', '#d9ead3'),
  createData('Print concepts', '#d9ead3'),
  createData('Matching spoken words to print', '#d9ead3'),
  createData('Asking open-ended questions', '#fff2cc'),
  createData('Using foundational skills for realistic reading and/or writing', '#f4cccc'),
  createData('Using multimodal instruction', '#d9d2e9')
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    // maxHeight: 440,
  },
});

export default function LiteracyTrendsFoundational(props: Props) {
  const classes = useStyles();
  const { teacherData } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [view, setView] = useState('number');
  const [activitySetting, setActivitySetting] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = () => {
    return;
  };

  const handleView = (event: React.MouseEvent<HTMLElement, MouseEvent>, newView: string) => {
    setView(newView);
  };

  /* const handleActivitySetting = (event, newSetting) => {
    setActivitySetting(newSetting);
  }; */

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
                <TableCell />
                {teacherData.map(a => a.startDate).map((startDate: {value: string}, index: number) => (
                  <TableCell
                    key={index}
                    align='right'
                    style={{ minWidth: '2em' }}
                  >
                    {startDate.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {numberRows.map((row, index) => {
                const checklistItem = 'literacy' + (index+1).toString();
                return(
                <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                  <TableCell align='left' style={{backgroundColor: row.backgroundColor, fontWeight: 'bold'}}>
                    {row.name}
                  </TableCell>
                  {teacherData.map(a => a[checklistItem as sampleDataKey]).map((literacy: (number), index2: number) => {
                    return (
                      <TableCell key={index2} align='right' style={{backgroundColor: row.backgroundColor}}>
                        {view === 'number' ? literacy : (Math.round((literacy/teacherData[index2].total)*100))+'%'}
                      </TableCell>
                    );
                  })}
                </TableRow>
                );
              })}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell>
                  Total number of 1-minute intervals
                </TableCell>
                {teacherData.map(a => a.total).map((total: number, index: number) => (
                  <TableCell
                    key={index}
                    align={'right'}
                    style={{ minWidth: '2em', fontWeight: 'bold'}}
                  >
                    {total}
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