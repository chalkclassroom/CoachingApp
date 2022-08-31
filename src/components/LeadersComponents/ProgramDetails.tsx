import * as React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import {
  Grid,
  Fab,
  Dialog,
  DialogTitle,
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

interface program {
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
  program: program | undefined,
  recentEvents: Array<Types.CalendarEvent>,
  handleDeleteConfirm(): Promise<void>,
  handleCloseModal(): void,
  setEditing(): void,
  closeProgramDetails(): void,
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

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    maxHeight: "100%"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "flex-start",
  },
  button: {
    color: "#333333",
    borderRadius: 3,
    textTransform: "none"
  },
  programHeader: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    fontSize: "2em",
    minWidth: "40%",
    maxWidth: "50%"
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  programCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexGrow: 1,
    marginTop: "1em",
    fontSize: "1.5em",
  },
  magicEightCard: {
    padding: "0px",
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
    programHeader: {
      minWidth: "50%"
    }
  },

  // iPad Pro 12.9" Portrait
  "@media only screen and (max-width:1024px) and (orientation:portrait)": {
    container: {
      // margin: "2% 5% 0 5%",
      fontSize: "1.5em"
    },
    programHeader: {
      minWidth: "60%",
      borderBottom: "1px solid #B3D8E6"
    },
    contentContainer: {
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    programCard: {
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
    programHeader: {
      minWidth: "60%",
      borderBottom: "1px solid #B3D8E6"
    },
    contentContainer: {
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    programCard: {
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
    programHeader: {
      minWidth: "60%",
      borderBottom: "1px solid #B3D8E6"
    },
    contentContainer: {
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    programCard: {
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
    programHeader: {
      minWidth: "50%",
      maxWidth: "60%"
    },
    programCard: {
      // width: "40%",
      fontSize: "1.3em"
    },
    magicEightCard: {
      // width: "60%"
    }
  }
});

export default function ProgramDetails(props: Props): React.ReactElement {
  const classes = useStyles();
  const [deleting, setDeleting] = useState(false);

  const {
    recentEvents,
    program,
    handleDeleteConfirm,
    handleCloseModal,
    setEditing,
    closeProgramDetails,
    open,
    programLeaders,
    programSites
  } = props;




  return (
    <Zoom in={open}>
      <Paper elevation={3} className={classes.container} style={{padding: '1em'}}>
        {program ? (
          <div style={{width: '100%'}}>
            <Grid container direction="row" justify="space-between" >
              <Grid item xs={10}>
                <Grid container direction="row">
                  <Grid item>
                    <b>
                      <Typography variant="h4" style={{fontFamily: 'Arimo', fontWeight: 'bold'}}>
                      {program.firstName} {program.lastName}
                      </Typography>
                    </b>
                  </Grid>
                  <Grid item>
                    {program.id === "rJxNhJmzjRZP7xg29Ko6" ? null : ( // Prevent deleting and editing the Practice program!
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
                  <IconButton onClick={closeProgramDetails} style={{ padding: 10, boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)' }}>
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
            >
              <Grid item xs={6}>
                <div className={classes.programCard}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      minWidth: "45%"
                    }}
                  >
                    <LabeledInfo label="Program Name" field={program.name} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      minWidth: "45%"
                    }}
                  >
                  </div>

                  <LabeledInfo label="Sites" sitesList={programSites} />

                  <LabeledInfo label="Notes" />
                </div>
              </Grid>
              <Grid item xs={6} style={{paddingBottom: '1em', overflowY: 'auto'}}>
                <Grid container direction="row" justify="center" alignItems="center">
                  <div className={classes.programCard}>
                    <LabeledInfo label="Program Leaders" usersList={programLeaders} />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Dialog
              open={deleting}
              onClose={handleCloseModal}
              aria-labelledby="delete-program-modal"
              aria-describedby="prompts a coach to confirm deleting a program from My programs"
            >
              <DialogTitle
                id="delete-program-title"
                style={{ textAlign: "center" }}
              >
                Are you sure you want to remove {' '}
                <b style={{ textDecoration: "underline", color: "#2196F3" }}>
                  {program.firstName} {program.lastName}
                </b>{" "}
                from My programs?
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
                  {program.firstName} {program.lastName}
                </Button>
                <Button
                  onClick={(): void => {
                    handleDeleteConfirm().then(()=> {
                      setDeleting(false);
                      handleCloseModal();
                      closeProgramDetails();
                    })
                  }}
                  className={classes.deleteModalButton}
                  style={{ borderColor: "#F1231C" }}
                >
                  Yes,
                  <b style={{ color: "#F1231C", padding: "0 0.3em 0 0.3em" }}>
                    DELETE
                  </b>
                  {program.firstName} {program.lastName}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (null)}
      </Paper>
    </Zoom>
  )
}
