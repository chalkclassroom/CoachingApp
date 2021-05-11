import * as React from 'react';
import { useState } from 'react';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import * as Constants from '../../../constants/Constants';

interface Props {
  teacherData: Array<{
    startDate: string,
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
    total: number,
    activitySetting: string
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
  const [activityFilter, setActivityFilter] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (index: number) => {
    console.log('handle close', index)
    setActivityFilter(index);
    setAnchorEl(null);
  };

  const handleView = (event: React.MouseEvent<HTMLElement, MouseEvent>, newView: string) => {
    setView(newView);
  };

  const activitySettings = [
    'None',
    'Morning Meeting',
    'Teacher-Directed Lesson',
    'Shared Reading',
    'Shared Writing',
    'Individual Child Activity',
    'Center Time Activity'
  ];

  return (
    <Grid container direction="column">
      <Grid item style={{paddingBottom: '0.5em'}}>
        <Grid container direction="row" justify="space-between" alignItems="center" style={{paddingTop: '1em'}}>
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
            <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
              Teacher Behaviors
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              // aria-controls="activity-setting"
              // aria-haspopup="true"
              // variant="contained"
              // color="primary"
              onClick={handleClick}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', padding: 10 }}
            >
              <Tooltip title={"Close"} placement={"right"}>
                <MuiThemeProvider theme={Constants.LiteracyTheme}>
                  <Badge color='primary' variant='dot' invisible={activityFilter === 0}>
                    <FilterListIcon />
                  </Badge>
                </MuiThemeProvider>
              </Tooltip>
            </IconButton>
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
              onClose={(): void => setAnchorEl(null)}
            >
              {activitySettings.map((value, index) => {
                return (
                  <MenuItem key={index} disabled={index>0 && !teacherData.some(e => e.activitySetting === value)} onClick={(): void => {handleClose(index)}}>
                    <ListItemText primary={value} />
                  </MenuItem>
                )
              })}
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
                {teacherData.filter(obj => {
                  return (activityFilter ? obj.activitySetting === activitySettings[activityFilter] : obj)
                }).map(a => [a.startDate, a.activitySetting]).map((description: Array<string>, index: number) => {
                  return(
                    <TableCell
                      key={index}
                      align='right'
                      padding='none'
                      style={{ minWidth: '2em', paddingLeft: '0.2em', paddingRight: '0.2em', height: '100%'}}
                    >
                      <Grid container direction="column" alignItems="flex-end" justify="center" style={{height: '100%'}}>
                        <Grid item>
                          {description[1]}
                        </Grid>
                        <Grid item>
                          <strong>
                          {description[0]}
                          </strong>
                        </Grid>
                      </Grid>
                    </TableCell>
                  )
                })}
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
                  {teacherData.filter(obj => {
                    return (activityFilter ? obj.activitySetting === activitySettings[activityFilter] : obj)
                  }).map(a => a[checklistItem as sampleDataKey]).map((literacy: (number), index2: number) => {
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
                {teacherData.filter(obj => {
                  return (activityFilter ? obj.activitySetting === activitySettings[activityFilter] : obj)
                }).map(a => a.total).map((total: number, index: number) => (
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