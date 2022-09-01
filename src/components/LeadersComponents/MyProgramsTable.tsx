import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import {
  Grid,
  Fab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  TableContainer,
  Box,
  Collapse,
  IconButton,
  Typography,
  Paper,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';
import * as Types from '../../constants/Types';
import TransitionTimeIconImage from "../../assets/images/TransitionTimeIconImage.svg";
import EngagementIconImage from "../../assets/images/EngagementIconImage.svg";
import SequentialIconImage from "../../assets/images/SequentialIconImage.svg";
import ListeningIconImage from "../../assets/images/ListeningIconImage.svg";
import MathIconImage from "../../assets/images/MathIconImage.svg";
import InstructionIconImage from "../../assets/images/InstructionIconImage.svg";
import ClassroomClimateIconImage from "../../assets/images/ClassroomClimateIconImage.svg";
import LiteracyIconImage from "../../assets/images/LiteracyIconImage.svg";
import AssocCoopIconImage from "../../assets/images/AssocCoopIconImage.svg";
import AddIcon from "@material-ui/icons/Add";
import ReactRouterPropTypes from 'react-router-prop-types';
import * as H from 'history';
import DateRange from '@material-ui/icons/DateRange';
import id from 'date-fns/esm/locale/id/index.js';
import coachState from '../../state/reducers/coach-state';
import { resultsAriaMessage } from 'react-select/src/accessibility';
import LeadersDashboard from '../../views/protected/LeadersViews/LeadersDashboard';



interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string,
  unlocked: Array<number>
};

interface Props {
  onChangeText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void,
  selectTeacher(teacherInfo: Teacher): void,
  addingTeacher(): void,
  push(stuff: {pathname: string, state: object}): void,
}

const ToolIcons = {
  'TT': TransitionTimeIconImage,
  'CC': ClassroomClimateIconImage,
  'LC': ListeningIconImage,
  'IN': InstructionIconImage,
  'MI': MathIconImage,
  'SE': EngagementIconImage,
  'SA': SequentialIconImage,
  'LI': LiteracyIconImage,
  'AC': AssocCoopIconImage
};

// search, actionButton, nameCellHeader, row, nameField

const useStyles = makeStyles({
  row: {
    transitionDuration: "0.2s",
    "&:nth-of-type(odd)": {
      backgroundColor: '#D9EAFB'
    },
    "&:hover": {
      backgroundColor: "#555555",
      color: "#FFFFFF"
    },
    cursor: "pointer"
  },
  actionButton: {
    marginLeft: "2em",
    backgroundColor: "#2196F3"
  },
  search: {
    lineHeight: "1em",
    fontSize: "1.5em",
    maxWidth: "30%"
  },
  nameCellHeader: {
    color: "#000000",
    fontSize: "1em",
    padding: "0.5em",
    maxWidth: "12em",
    position: "sticky",
    top: 0,
    backgroundColor: "#FFFFFF",
    fontFamily: 'Arimo',
    fontWeight: 'bold'
  },
  nameField: {
    // border: '1px solid #4C00FF'
    textAlign: "left",
    padding: "0.5em",
    overflow: "hidden",
    maxWidth: "7em",
    color: "inherit",
    fontFamily: 'Arimo'
  },

  tableWrapper: {
    maxHeight: '55.5vh',
    overflowY: "scroll",
  },


  "@media only screen and (orientation: portrait)": {
    tableWrapper: {
      maxHeight: '57vh'
    }
  },

  // iPad Pro 12.9" Portrait
  "@media only screen and (max-width:1024px) and (orientation:portrait)": {
    tableContainer: {
      maxHeight: "38em"
    }
  },

  // iPad Pro 10.5" Portrait
  "@media only screen and (max-width:834px) and (orientation: portrait)": {
    magicEightCell: {
      display: "none"
    },
    tableContainer: {
      maxHeight: "30em"
    }
  },

  // iPad-Mini Portrait
  "@media only screen and (max-width:768px) and (orientation:portrait)": {
    actionButton: {
      marginRight: "3em"
    },
    tableContainer: {
      maxHeight: "25em"
    }
  },

  // iPad-Mini Landscape
  "@media only screen and (max-width:1024px) and (orientation:landscape)": {
    nameField: {
      maxWidth: "7.5em"
    }
  }
});

function getSiteLeaders(site, leader) {
  let result = ""

  leader.map((leader) => {
    if (leader.sites) {
      if (leader.sites.includes(site)) {
        result += (leader.firstName + " " + leader.lastName + ", ");
      }
    }
  })

  result = result.replace(/,\s*$/, "");
  return result;
}

function Row(props: { row, sites, siteLeaders, programLeaders, selectProgram }) {
  const { row, sites, siteLeaders, programLeaders, selectProgram } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{programLeaders}</TableCell>
        <TableCell align="right" onClick={() => selectProgram(row)}>Edit/Delete</TableCell>
        {/* <TableCell align="right">Hold</TableCell>
        <TableCell align="right">Hold</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sites
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Leaders</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sites.map((sitesRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {sitesRow.name}
                      </TableCell>
                        <TableCell>{getSiteLeaders(sitesRow.id, siteLeaders)}</TableCell>
                      <TableCell align="right">Edit/Delete</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function filterSites(programs, sites) {
  let result = [];

  console.log("PROGRAMS : " + programs);


  for (let i = 0; i < programs.length; i++) {
    let temp = [];
    for (let j = 0; j < sites.length; j++) {
      for (let k = 0; k < programs[i].sites.length; k++) {
        if ( sites[j].id == programs[i].sites[k]) {
          temp.push(sites[j]);
        }
      }
    }
    result.push(temp);
  }
  return result;
}

function filterSiteLeaders(programs, leaders) {
  let result  = [];

  for (let m = 0; m < programs.length; m++) { //2
    let temp = []
    for (let i = 0; i < leaders.length; i++) {
      if (leaders[i].role === "siteLeader") {
        if(leaders[i].sites) {
          for (let j = 0; j < programs[m].length; j++) { //9
            if (leaders[i].sites.includes(programs[m][j].id)) {
              temp.push(leaders[i]);
              j = programs[m].length;
            }
          }
        }
      }
    }
    result.push(temp)
  }
  return result;
}

function filterProgramLeaders(program, leaders) {
  let result  = [];

  for (let j = 0; j < program.length; j++) { //2
    let temp = [];
    for (let i = 0; i < leaders.length; i++) { //24
      if (leaders[i].role === "programLeader") {
        if (leaders[i].programs) {
          if (leaders[i].programs.includes(program[j].id)) {
            temp.push(leaders[i]);
          }
        }
      }
    }
    result.push(temp)
  }
  let returnResult = []
  for (let i = 0; i < result.length; i++) {
    let returnString = "";
    result[i].map((res) => {
          returnString += (res.firstName + " " + res.lastName + ", ")
        })
    returnString = returnString.replace(/,\s*$/, "");
    returnResult.push(returnString);
  }
  return returnResult;
}


export default function MyProgramsTable(props: Props): React.ReactElement {
  const classes = useStyles();
  const { push, onChangeText, selectProgram, addingTeacher, programDetails, allSites, allLeaders } = props;
  console.log("PROGRAM DETAILS " + programDetails);

  const sites = filterSites(programDetails, allSites);
  const siteLeaders = filterSiteLeaders(sites, allLeaders);

  const programLeaders = filterProgramLeaders(programDetails, allLeaders);


  return (
    <Grid container direction="column" justify="center" alignItems="stretch">
      <Grid item>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <TextField
            id="teacher-search"
            label="Search"
            type="search"
            className={classes.search}
            variant="outlined"
            onChange={onChangeText}
          />
          <Fab
            aria-label="Add Program"
            onClick={(): void => {
              push({
                pathname: `/NewProgram`,
              });
            }}
            className={classes.actionButton}
            size="small"
          >
            <AddIcon style={{ color: "#FFFFFF" }} />
          </Fab>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Program Name</TableCell>
                  <TableCell align="left">Program Leaders</TableCell>
                  <TableCell align="right">Action</TableCell>
                  {/* <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Latest Observation</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {programDetails.map((row, index) => {
                  return <Row key={index} row={row} siteLeaders={siteLeaders[index]} sites={sites[index]} selectProgram={(row) => selectProgram(row)} programLeaders={programLeaders[index]} />
              })}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
  )
}
