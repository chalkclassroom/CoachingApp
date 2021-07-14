import * as React from 'react';
import { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Zoom
} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from 'moment';
import * as Types from '../../constants/Types';
import LabeledInfo from "./LabeledInfo";
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
  /* firstName: string,
  lastName: string,
  school: string,
  email: string,
  phone: string,
  notes: string, */
  teacher: Teacher | undefined,
  recentEvents: Array<Types.CalendarEvent>,
  handleDeleteConfirm(): void,
  handleCloseModal(): void,
  setEditing(): void,
  closeTeacherDetails(): void,
  open: boolean
}

const sortedSvg = [
  {
    type: 'TT',
    image: TransitionTimeIconImage
  },
  {
    type: 'CC',
    image: ClassroomClimateIconImage
  },
  {
    type: 'MI',
    image: MathIconImage
  },
  {
    type: 'IN',
    image: InstructionIconImage
  },
  {
    type: 'SE',
    image: EngagementIconImage
  },
  {
    type: 'LC',
    image: ListeningIconImage
  },
  {
    type: 'SA',
    image: SequentialIconImage
  },
  {
    type: 'LI',
    image: LiteracyIconImage
  },
  {
    type: 'AC',
    image: AssocCoopIconImage
  }
];

// search, actionButton, nameCellHeader, row, nameField

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    maxHeight: "100%"
  },
  container: {
    // border: '2px solid #000000',
    // margin: "2% 10% 0 10%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "flex-start",
    // boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)'
    // maxHeight: "50%"
  },
  button: {
    color: "#333333",
    borderRadius: 3,
    textTransform: "none"
  },
  teacherHeader: {
    // border: '2px solid #DC143C',
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    fontSize: "2em",
    // marginTop: "1em",
    minWidth: "40%",
    maxWidth: "50%"
  },
  contentContainer: {
    // border: '2px solid #F700FF',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  teacherCard: {
    // border: '2px solid #7FFF00',
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexGrow: 1,
    marginTop: "1em",
    // width: "50%",
    fontSize: "1.5em",
    // paddingLeft: '0.5em'
  },
  magicEightCard: {
    // border: '2px solid #00FFFF',
    padding: "0px",
    // width: "50%",
    margin: "0",
    flexGrow: 1,
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    gridTemplateRows: "30% 30% 30%",
  },
  actionButton: {
    marginLeft: "1em",
    "&:hover": {
      boxShadow: "0 2px 5px 5px rgba(0, 0, 0, 0.2)"
    }
  },
  magicEightItem: {
    margin: "3% 3% 15% 3%",
    flexBasis: "22%",
    listStyleType: "none",
    textAlign: "center"
  },
  magicEightButton: {
    // marginBottom: "15%",
    backgroundColor: "#FFFFFF",
    border: "0 none #FFFFFF",
    borderRadius: "10%",
    padding: 0,
    width: "80%",
    boxShadow: "none",
    opacity: 0.95,
    "&:hover": {
      backgroundColor: "#8B8B8B",
      opacity: 1
    }
  },
  img: {
    maxHeight: "80px",
    margin: "5%"
  },
  deleteModalButtonContainer: {
    display: "flex",
    justifyContent: "space-around"
  },
  deleteModalButton: {
    border: "2px solid #000000",
    textTransform: "none",
    fontSize: "1em"
  },

  // Minor Breakpoint -> Shrinking desktop window
  "@media only screen and (max-width:1270px)": {
    container: {
      // margin: "2% 7% 0 7%"
    }
  },

  // Minor Breakpoint -> Shrinking desktop window
  "@media only screen and (max-width:1145px)": {
    container: {
      // margin: "2% 5% 0 5%"
    },
    teacherHeader: {
      minWidth: "50%"
    }
  },

  // iPad Pro 12.9" Portrait
  "@media only screen and (max-width:1024px) and (orientation:portrait)": {
    container: {
      // margin: "2% 5% 0 5%",
      fontSize: "1.5em"
    },
    teacherHeader: {
      minWidth: "60%",
      borderBottom: "1px solid #B3D8E6"
    },
    contentContainer: {
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    teacherCard: {
      flexFlow: "row wrap",
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: "100%",
      fontSize: "1.3em",
      borderBottom: "1px solid #B3D8E6"
    },
    magicEightCard: {
      width: "100%",
      // margin: "1em 0 0 0"
    }
  },

  // iPad Pro 10.5" Portrait
  "@media only screen and (max-width:834px) and (orientation: portrait)": {
    container: {
      // margin: "2% 5% 0 5%",
      fontSize: "1em"
    },
    teacherHeader: {
      minWidth: "60%",
      borderBottom: "1px solid #B3D8E6"
    },
    contentContainer: {
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    teacherCard: {
      flexFlow: "row wrap",
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: "100%",
      fontSize: "1.3em",
      borderBottom: "1px solid #B3D8E6"
    },
    magicEightCard: {
      width: "100%",
      // margin: "2em 0 0 0"
    }
  },

  // iPad-Mini Portrait
  "@media only screen and (max-width:768px) and (orientation:portrait)": {
    container: {
      // margin: "2% 5% 0 5%"
    },
    teacherHeader: {
      minWidth: "60%",
      borderBottom: "1px solid #B3D8E6"
    },
    contentContainer: {
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    teacherCard: {
      flexFlow: "row wrap",
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: "100%",
      borderBottom: "1px solid #B3D8E6"
    },
    magicEightCard: {
      width: "100%",
      margin: 0
    }
  },

  // iPad-Mini Landscape
  "@media only screen and (max-width:1024px) and (orientation:landscape)": {
    container: {
      // margin: "2% 7% 0 7%"
    },
    teacherHeader: {
      minWidth: "50%",
      maxWidth: "60%"
    },
    teacherCard: {
      // width: "40%",
      fontSize: "1.3em"
    },
    magicEightCard: {
      // width: "60%"
    }
  }
});

type RecentActivityTermsKey = 'Observation' | 'Action Plan' | 'Conference Plan';

export default function MyTeachersTable(props: Props): React.ReactElement {
  const classes = useStyles();
  const [deleting, setDeleting] = useState(false);
  const { 
    /* firstName,
    lastName,
    school,
    email,
    phone,
    notes, */
    recentEvents,
    teacher,
    handleDeleteConfirm,
    handleCloseModal,
    setEditing,
    closeTeacherDetails,
    open
  } = props;

  return (
    <Zoom in={open}>
    <Paper elevation={3} className={classes.container} style={{padding: '1em'}}>
      {teacher ? (
        <div style={{width: '100%'}}>
          <Grid container direction="row" justify="space-between" >
            <Grid item xs={10}>
              <Grid container direction="row">
                <Grid item>
              <b>
                <Typography variant="h4" style={{fontFamily: 'Arimo', fontWeight: 'bold'}}>
                {teacher.firstName} {teacher.lastName}
                </Typography>
              </b>
              </Grid>
              <Grid item>
              {teacher.id === "rJxNhJmzjRZP7xg29Ko6" ? null : ( // Prevent deleting and editing the Practice Teacher!
              <div>
                <Fab
                  aria-label="Edit"
                  name="Edit"
                  size="small"
                  onClick={(): void => setEditing()}
                  className={classes.actionButton}
                  style={{ backgroundColor: "#F9FE49" }}
                >
                  <EditOutlinedIcon style={{ color: "#555555" }} />
                </Fab>
                <Fab
                  aria-label="Delete"
                  onClick={(): void => setDeleting(true)}
                  className={classes.actionButton}
                  size="small"
                  style={{ backgroundColor: "#FF3836" }}
                >
                  <DeleteForeverIcon style={{ color: "#C9C9C9" }} />
                </Fab>
              </div>
            )}
              </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
            <Grid
            container
            alignItems="center"
            direction="row"
            justify="flex-end"
          >
            <IconButton onClick={closeTeacherDetails} style={{ padding: 10, boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)' }}>
              <Tooltip title={"Close"} placement={"right"}>
                <CloseIcon  />
              </Tooltip>
            </IconButton>
          </Grid>
            </Grid>
            
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
            className={classes.contentContainer}
            // style={{width: '100%'}}
          >
            <Grid item xs={6}>
            <div className={classes.teacherCard}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  minWidth: "45%"
                }}
              >
                <LabeledInfo label="First Name" field={teacher.firstName} />
                <LabeledInfo label="Last Name" field={teacher.lastName} />
              </div>
              <LabeledInfo label="School" field={teacher.school} />
              <LabeledInfo label="Email" field={teacher.email} />
              <LabeledInfo label="Phone" field={teacher.phone} />
              <LabeledInfo label="Notes" field={teacher.notes} />
            </div>
            </Grid>
            <Grid item xs={6} style={{paddingBottom: '1em', overflowY: 'auto'}}>
              <Grid container direction="row" justify="center" alignItems="center">
            <ol className={classes.magicEightCard}>
              {sortedSvg.map((item, key) => {
                const recentObs = recentEvents.filter(obj => {
                  return( obj.resource === teacher.id && obj.type === item.type )
                });
                const maxDate = recentObs.length > 0 ? (recentObs.reduce(function(prev, current) {
                  return (new Date(prev.start) > new Date(current.start)) ? prev : current
                })) : (undefined)
                return(
                maxDate !== undefined ? (
                  <li key={key} className={classes.magicEightItem}>
                    <Grid container direction="column" justify="center" alignItems="center">
                      <Button
                        variant="contained"
                        className={classes.magicEightButton}
                        style={{
                          // border: "1px solid #000000",
                          // backgroundColor: "#000000"
                        }}
                      >
                        <img
                          src={item.image}
                          alt="Magic Eight"
                          className={classes.img}
                        />
                      </Button>
                      
                      <Typography>
                        {maxDate.title}:
                        <br />
                        {moment(new Date(maxDate.start)).format('MM/DD/YYYY')}
                      </Typography>
                    </Grid>
                  </li>
                ) : (
                  <li key={key} className={classes.magicEightItem}>
                    <Button
                      disabled
                      variant="contained"
                      className={classes.magicEightButton}
                      style={{ backgroundColor: "#FFFFFF", opacity: 0.5 }}
                    >
                      <img
                        src={item.image}
                        alt="Magic Eight"
                        className={classes.img}
                      />
                    </Button>
                    <Typography>
                      No Activity
                    </Typography>
                  </li>
                ))
              })}
            </ol>
            </Grid>
            </Grid>
          </Grid>
          <Dialog
            open={deleting}
            onClose={handleCloseModal}
            aria-labelledby="delete-teacher-modal"
            aria-describedby="prompts a coach to confirm deleting a teacher from My Teachers"
          >
            <DialogTitle
              id="delete-teacher-title"
              style={{ textAlign: "center" }}
            >
              Are you sure you want to remove
              <b style={{ textDecoration: "underline", color: "#2196F3" }}>
                {teacher.firstName} {teacher.lastName}
              </b>{" "}
              from My Teachers?
            </DialogTitle>
            <DialogActions className={classes.deleteModalButtonContainer}>
              <Button
                onClick={(): void => setDeleting(false)}
                className={classes.deleteModalButton}
                autoFocus
                style={{ borderColor: "#2196F3" }}
              >
                No,
                <b style={{ color: "#2196F3", padding: "0 0.3em 0 0.3em" }}>
                  KEEP
                </b>
                {teacher.firstName} {teacher.lastName}
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className={classes.deleteModalButton}
                style={{ borderColor: "#F1231C" }}
              >
                Yes,
                <b style={{ color: "#F1231C", padding: "0 0.3em 0 0.3em" }}>
                  DELETE
                </b>
                {teacher.firstName} {teacher.lastName}
              </Button>
            </DialogActions>
          </Dialog>
          </div>
      ) : (null)}
          {/* <Dialog
            open={isEditing}
            onClose={this.handleCloseModal}
            aria-labelledby="edit-teacher-title"
          >
            <DialogTitle id="edit-teacher-title">
              Edit {firstName} {lastName}&apos;s Info
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Make edits to the form below and confirm to update this
                teacher&apos;s information.
              </DialogContentText>
              <TextField
                autoFocus
                defaultValue={firstName}
                onChange={this.handleEditText}
                margin="dense"
                id="first-name"
                name="inputFirstName"
                label="First Name"
                type="text"
                helperText={fnErrorText}
                error={!!fnErrorText} // false when empty "", true o/w
                fullWidth
              />
              <TextField
                defaultValue={lastName}
                onChange={this.handleEditText}
                margin="dense"
                id="last-name"
                name="inputLastName"
                label="Last Name"
                type="text"
                helperText={lnErrorText}
                error={!!lnErrorText}
                fullWidth
              />
              <TextField
                defaultValue={school}
                onChange={this.handleEditText}
                margin="dense"
                id="school"
                name="inputSchool"
                label="School"
                type="text"
                helperText={schoolErrorText}
                error={!!schoolErrorText}
                fullWidth
              />
              <TextField
                defaultValue={email}
                onChange={this.handleEditText}
                margin="dense"
                id="email"
                name="inputEmail"
                label="Email"
                type="email"
                helperText={emailErrorText}
                error={!!emailErrorText}
                fullWidth
              />
              <TextField
                autoFocus
                defaultValue={phone}
                onChange={this.handleEditText}
                margin="dense"
                id="phone"
                name="inputPhone"
                label="Phone"
                type="text"
                helperText={phoneErrorText}
                error={!!phoneErrorText} // false when empty "", true o/w
                fullWidth
              />
              <TextField
                defaultValue={notes}
                onChange={this.handleEditText}
                margin="dense"
                id="notes"
                name="inputNotes"
                label="Notes"
                helperText={notesErrorText}
                error={!!notesErrorText}
                multiline
                rows={10}
                rowsMax={10}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCloseModal}
                style={{ color: "#F1231C" }}
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleEditConfirm}
                style={{ color: "#2196F3" }}
              >
                Confirm Edits
              </Button>
            </DialogActions>
          </Dialog> */}
          {/* <Dialog
            open={editAlert}
            onClose={(): void => this.setState({ editAlert: false, alertText: "" })}
            aria-labelledby="edit-alert-label"
            aria-describedby="edit-alert-description"
          >
            <DialogTitle id="edit-alert-title">{alertText}</DialogTitle>
          </Dialog> */}
        </Paper>
        </Zoom>
  )
}