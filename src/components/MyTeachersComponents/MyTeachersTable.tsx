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
  TextField
} from '@material-ui/core';
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
  teacherDetails: Array<Teacher & {type: Types.ToolNamesKey, title: string, start: Date}>,
  selectTeacher(teacherInfo: Teacher): void,
  addingTeacher(): void
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

export default function MyTeachersTable(props: Props): React.ReactElement {
  const classes = useStyles();
  const { onChangeText, teacherDetails, selectTeacher, addingTeacher } = props;

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
            aria-label="Add Teacher"
            onClick={addingTeacher}
            className={classes.actionButton}
            size="small"
          >
            <AddIcon style={{ color: "#FFFFFF" }} />
          </Fab>
        </Grid>
      </Grid>
      <Grid item style={{paddingTop: '1em'}}>
        <Grid className={classes.tableWrapper}>
          <Table style={{overflowY: 'auto'}} stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.nameCellHeader}>
                Last Name
              </TableCell>
              <TableCell className={classes.nameCellHeader}>
                First Name
              </TableCell>
              <TableCell className={classes.nameCellHeader}>
                Recent Activity
              </TableCell>
              <TableCell className={classes.nameCellHeader}>
                Date
              </TableCell>
              <TableCell className={classes.nameCellHeader}>
                Latest Observation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teacherDetails.sort(((a, b) => new Date(b.start).valueOf() - new Date(a.start).valueOf())).map((teacher, index) => {
              return (
                <TableRow
                  className={classes.row}
                  key={index}
                  onClick={(): void => selectTeacher(teacher)}
                >
                  <TableCell className={classes.nameField} style={{width: '22%'}}>
                    {teacher.lastName}
                  </TableCell>
                  <TableCell className={classes.nameField} style={{width: '22%'}}>
                    {teacher.firstName}
                  </TableCell>
                  <TableCell className={classes.nameField} style={{width: '22%'}}>
                    {teacher.title ? teacher.title : 'N/A'}
                  </TableCell>
                  <TableCell className={classes.nameField} style={{width: '22%'}}>
                    {teacher.start ? (moment(new Date(teacher.start)).format('MM/DD/YYYY')) : ('N/A')
                    }
                  </TableCell>
                  <TableCell className={classes.nameField}>
                    <Grid container direction="row" justify="center" alignItems="center">
                      {teacher.type ? (<img
                        src={ToolIcons[teacher.type]}
                        alt="Icon"
                        style={{maxWidth: '4em'}}
                      />) : null}
                    </Grid>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        </Grid>
      </Grid>
    </Grid>
  )
}