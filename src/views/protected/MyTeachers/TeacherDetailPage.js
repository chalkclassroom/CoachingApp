import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FirebaseContext } from "../../../components/Firebase/index";
import AppBar from "../../../components/AppBar";
import LabeledInfo from "../../../components/MyTeachersComponents/LabeledInfo";
import TransitionTimeIconImage from "../../../assets/images/TransitionTimeIconImage.svg";
import EngagementIconImage from "../../../assets/images/EngagementIconImage.svg";
import SequentialIconImage from "../../../assets/images/SequentialIconImage.svg";
import ListeningIconImage from "../../../assets/images/ListeningIconImage.svg";
import MathIconImage from "../../../assets/images/MathIconImage.svg";
import InstructionIconImage from "../../../assets/images/InstructionIconImage.svg";
import ClassroomClimateIconImage from "../../../assets/images/ClassroomClimateIconImage.svg";
import AssocCoopIconImage from "../../../assets/images/AssocCoopIconImage.svg";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    maxHeight: "100%"
  },
  container: {
    // border: '2px solid #000000',
    margin: "2% 10% 0 10%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "flex-start",
    maxHeight: "50%"
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
    marginTop: "1em",
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
    width: "50%",
    fontSize: "1.5em"
  },
  magicEightCard: {
    // border: '2px solid #00FFFF',
    padding: "0px",
    width: "50%",
    margin: "0",
    flexGrow: 1,
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    gridTemplateRows: "50% 50%"
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
    marginBottom: "15%",
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
    maxHeight: "100px",
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
      margin: "2% 7% 0 7%"
    }
  },

  // Minor Breakpoint -> Shrinking desktop window
  "@media only screen and (max-width:1145px)": {
    container: {
      margin: "2% 5% 0 5%"
    },
    teacherHeader: {
      minWidth: "50%"
    }
  },

  // iPad Pro 12.9" Portrait
  "@media only screen and (max-width:1024px) and (orientation:portrait)": {
    container: {
      margin: "2% 5% 0 5%",
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
      margin: "1em 0 0 0"
    }
  },

  // iPad Pro 10.5" Portrait
  "@media only screen and (max-width:834px) and (orientation: portrait)": {
    container: {
      margin: "2% 5% 0 5%",
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
      margin: "2em 0 0 0"
    }
  },

  // iPad-Mini Portrait
  "@media only screen and (max-width:768px) and (orientation:portrait)": {
    container: {
      margin: "2% 5% 0 5%"
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
      margin: "2% 7% 0 7%"
    },
    teacherHeader: {
      minWidth: "50%",
      maxWidth: "60%"
    },
    teacherCard: {
      width: "40%",
      fontSize: "1.3em"
    },
    magicEightCard: {
      width: "60%"
    }
  }
};

const sortedSvg = [
  TransitionTimeIconImage,
  ClassroomClimateIconImage,
  ListeningIconImage,
  InstructionIconImage,
  MathIconImage,
  EngagementIconImage,
  SequentialIconImage,
  AssocCoopIconImage
];

/**
 * page with details about a teacher
 * @class TeacherDetailPage
 */
class TeacherDetailPage extends Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
    const id = this.props.match.params.teacherid;
    this.initialState = {
      teacherUID: id,
      firstName: "...",
      lastName: "...",
      school: "...",
      email: "...",
      phone: "...",
      notes: "...",
      inputFirstName: "",
      inputLastName: "",
      inputSchool: "",
      inputEmail: "",
      inputPhone: "",
      inputNotes: "",
      fnErrorText: "",
      lnErrorText: "",
      schoolErrorText: "",
      emailErrorText: "",
      notesErrorText: "",
      isEditing: false,
      isDeleting: false,
      editAlert: false,
      alertText: "",
      recentObs: [
        null, // transition
        null, // climate
        null, // listening
        null, // level
        null, // math
        null, // engagement
        null, // sequential
        null // AC
      ]
    };

    if (this.props.location.state === undefined) {
      // Entered URL w/o navigating from 'My Teachers'
      this.state = this.initialState;
    } else {
      // Came from 'My Teachers'
      const {
        id,
        firstName,
        lastName,
        school,
        email,
        phone,
        notes
      } = this.props.location.state.teacher;
      this.state = {
        teacherUID: id,
        firstName: firstName,
        lastName: lastName,
        school: school,
        email: email,
        phone: phone,
        notes: notes,
        inputFirstName: firstName,
        inputLastName: lastName,
        inputSchool: school,
        inputEmail: email,
        inputPhone: phone,
        inputNotes: notes,
        fnErrorText: "",
        lnErrorText: "",
        schoolErrorText: "",
        emailErrorText: "",
        notesErrorText: "",
        isEditing: false,
        isDeleting: false,
        editAlert: false,
        alertText: "",
        recentObs: [
          null, // transition
          null, // climate
          null, // listening
          null, // level
          null, // math
          null, // engagement
          null, // sequential
          null // AC
        ]
      };
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    const firebase = this.context;
    firebase
      .getTeacherInfo(this.state.teacherUID)
      .then(teacherInfo => {
        this.setState({
          firstName: teacherInfo.firstName,
          lastName: teacherInfo.lastName,
          school: teacherInfo.school,
          email: teacherInfo.email,
          phone: teacherInfo.phone,
          notes: teacherInfo.notes,
          inputFirstName: teacherInfo.firstName,
          inputLastName: teacherInfo.lastName,
          inputSchool: teacherInfo.school,
          inputEmail: teacherInfo.email,
          inputPhone: teacherInfo.phone,
          inputNotes: teacherInfo.notes
        }); // Automatically forces a re-render
        firebase
          .getRecentObservations(this.state.teacherUID)
          .then(recentObs =>
            this.setState({
              recentObs: recentObs
            })
          )
          .catch(error =>
            console.error("Error occurred getting recent observations: ", error)
          );
      })
      .catch(error => {
        console.error("Error fetching Teacher's Info: ", error);
      });
  }

  handleCloseModal = () => {
    const { firstName, lastName, school, email, phone, notes } = this.state;
    this.setState({
      inputFirstName: firstName,
      inputLastName: lastName,
      inputSchool: school,
      inputEmail: email,
      inputPhone: phone,
      inputNotes: notes,
      fnErrorText: "",
      lnErrorText: "",
      schoolErrorText: "",
      emailErrorText: "",
      phoneErrorText: "",
      notesErrorText: "",
      isEditing: false,
      isDeleting: false,
      alertText: ""
    });
  };

  /**
   * @param {event} e
   */
  handleEditText = e => {
    const type = e.target.name;
    const val = e.target.value;
    this.setState(
      {
        [type]: val
      },
      () => this.validateInputText(type, val)
    );
  };

  /**
   * validates user-entered text
   * @param {type} type
   * @param {value} val
   */
  validateInputText = (type, val) => {
    switch (type) {
      case "inputFirstName":
        if (!/^[a-zA-Z ]{2,30}$/.test(val)) {
          this.setState({ fnErrorText: "Invalid first name." });
        } else {
          this.setState({ fnErrorText: "" });
        }
        break;
      case "inputLastName":
        if (!/^[a-zA-Z ]{2,30}$/.test(val)) {
          this.setState({ lnErrorText: "Invalid last name." });
        } else {
          this.setState({ lnErrorText: "" });
        }
        break;
      case "inputEmail":
        if (!/^\S+@\S+$/.test(val)) {
          this.setState({ emailErrorText: "Invalid email address." });
        } else {
          this.setState({ emailErrorText: "" });
        }
        break;
      case "inputPhone":
        if (val === "") {
          this.setState({ phoneErrorText: "" });
        } else if (!/^\d{3}?-\d{3}-\d{4}$/.test(val)) {
          this.setState({
            phoneErrorText: "Invalid number or format (use ###-###-####)."
          });
        } else {
          this.setState({ phoneErrorText: "" });
        }
        break;
      case "inputSchool":
        if (!/^[a-zA-Z ]{2,50}$/.test(val)) {
          this.setState({
            schoolErrorText: "Invalid school (max 50 characters)."
          });
        } else {
          this.setState({ schoolErrorText: "" });
        }
        break;
      case "inputNotes":
        if (val.length > 250) {
          this.setState({ notesErrorText: "Max 250 characters." });
        } else {
          this.setState({ notesErrorText: "" });
        }
        break;
      default:
        break;
    }
  };

  handleEditConfirm = () => {
    const {
      teacherUID,
      inputFirstName,
      inputLastName,
      inputSchool,
      inputEmail,
      inputNotes,
      inputPhone,
      fnErrorText,
      lnErrorText,
      emailErrorText,
      schoolErrorText,
      notesErrorText,
      phoneErrorText
    } = this.state;
    this.validateInputText("inputFirstName", inputFirstName);
    this.validateInputText("inputLastName", inputLastName);
    this.validateInputText("inputEmail", inputEmail);
    this.validateInputText("inputSchool", inputSchool);
    if (
      // any inputs cause an error or required are missing
      !!fnErrorText ||
      !!lnErrorText ||
      !!emailErrorText ||
      !!schoolErrorText ||
      !!notesErrorText ||
      !!phoneErrorText ||
      !inputFirstName ||
      !inputLastName ||
      !inputEmail ||
      !inputSchool
    ) {
      return null;
    } else {
      // fields are validated
      const firebase = this.context;
      if (
        firebase.setTeacherInfo(teacherUID, {
          firstName: inputFirstName,
          lastName: inputLastName,
          school: inputSchool,
          email: inputEmail,
          phone: inputPhone,
          notes: inputNotes
        })
      ) {
        // Edit successfully written
        this.setState(
          {
            firstName: inputFirstName,
            lastName: inputLastName,
            school: inputSchool,
            email: inputEmail,
            phone: inputPhone,
            notes: inputNotes,
            isEditing: false,
            fnErrorText: "",
            lnErrorText: "",
            schoolErrorText: "",
            emailErrorText: "",
            notesErrorText: ""
          },
          () => this.handleEditAlert(true)
        );
      } else {
        this.handleCloseModal();
        this.handleEditAlert(false);
      }
    }
  };

  /**
   * @param {boolean} successful
   */
  handleEditAlert = successful => {
    if (successful) {
      this.setState(
        {
          editAlert: true,
          alertText: "Edit Successfully Written!"
        },
        () => setTimeout(() => this.setState({ editAlert: false }), 1500)
      );
    } else {
      this.setState(
        {
          editAlert: true,
          alertText:
            "Something went wrong... try refreshing your page or logging out and back in."
        },
        () => setTimeout(() => this.setState({ editAlert: false }), 3000)
      );
    }
  };

  handleDeleteConfirm = () => {
    const firebase = this.context;
    firebase
      .removePartner(this.state.teacherUID)
      .then(() => {
        this.setState(this.initialState, () => {
          if (this.props.location.state !== undefined) {
            // came from MyTeachers
            this.props.history.goBack();
          } else {
            this.props.history.replace("/MyTeachers");
          }
        });
      })
      .catch(() =>
        this.setState(
          {
            editAlert: true,
            alertText:
              "Something went wrong removing this teacher... " +
              "try refreshing your page or logging out and back in."
          },
          () => setTimeout(() => this.setState({ editAlert: false }), 3000)
        )
      );
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      school,
      email,
      phone,
      notes,
      isEditing,
      isDeleting,
      editAlert,
      alertText,
      fnErrorText,
      lnErrorText,
      schoolErrorText,
      emailErrorText,
      phoneErrorText,
      notesErrorText,
      recentObs
    } = this.state;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <div className={classes.container}>
          <Button
            variant="contained"
            size="medium"
            className={classes.button}
            onClick={() => {
              if (this.props.location.state !== undefined) {
                // came from MyTeachers
                this.props.history.goBack();
              } else {
                this.props.history.replace("/MyTeachers");
              }
            }}
          >
            <ChevronLeftRoundedIcon />
            <b>My Teachers</b>
          </Button>
          <div className={classes.teacherHeader}>
            <span>
              <b>
                {firstName} {lastName}
              </b>
              <br />
              Teacher
            </span>
            {this.state.teacherUID === "rJxNhJmzjRZP7xg29Ko6" ? null : ( // Prevent deleting and editing the Practice Teacher!
              <div>
                <Fab
                  aria-label="Edit"
                  name="Edit"
                  size="small"
                  onClick={() => this.setState({ isEditing: true })}
                  className={classes.actionButton}
                  style={{ backgroundColor: "#F9FE49" }}
                >
                  <EditOutlinedIcon style={{ color: "#555555" }} />
                </Fab>
                <Fab
                  aria-label="Delete"
                  onClick={() => this.setState({ isDeleting: true })}
                  className={classes.actionButton}
                  size="small"
                  style={{ backgroundColor: "#FF3836" }}
                >
                  <DeleteForeverIcon style={{ color: "#C9C9C9" }} />
                </Fab>
              </div>
            )}
          </div>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
            className={classes.contentContainer}
          >
            <div className={classes.teacherCard}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  minWidth: "45%"
                }}
              >
                <LabeledInfo label="First Name" field={firstName} />
                <LabeledInfo label="Last Name" field={lastName} />
              </div>
              <LabeledInfo label="School" field={school} />
              <LabeledInfo label="Email" field={email} />
              <LabeledInfo label="Phone" field={phone} />
              <LabeledInfo label="Notes" field={notes} />
            </div>
            <ol className={classes.magicEightCard}>
              {sortedSvg.map((item, key) =>
                recentObs !== undefined && recentObs[key] !== null ? (
                  <li key={key} className={classes.magicEightItem}>
                    <Button
                      variant="contained"
                      className={classes.magicEightButton}
                      style={{
                        border: "1px solid #000000",
                        backgroundColor: "#000000"
                      }}
                    >
                      <img
                        src={item}
                        alt="Magic Eight"
                        className={classes.img}
                      />
                    </Button>
                    <p>
                      Last Observed:
                      <br />
                      {recentObs[key]}
                    </p>
                  </li>
                ) : (
                  <li key={key} className={classes.magicEightItem}>
                    <Button
                      disabled
                      variant="contained"
                      className={classes.magicEightButton}
                      style={{ backgroundColor: "#FFFFFF", opacity: 0.8 }}
                    >
                      <img
                        src={item}
                        alt="Magic Eight"
                        className={classes.img}
                      />
                    </Button>
                    <p>
                      Not Yet
                      <br />
                      Observed
                      <br />
                      <br />
                    </p>
                  </li>
                )
              )}
            </ol>
          </Grid>
          <Dialog
            open={isDeleting}
            onClose={this.handleCloseModal}
            aria-labelledby="delete-teacher-modal"
            aria-describedby="prompts a coach to confirm deleting a teacher from My Teachers"
          >
            <DialogTitle
              id="delete-teacher-title"
              style={{ textAlign: "center" }}
            >
              Are you sure you want to remove
              <b style={{ textDecoration: "underline", color: "#2196F3" }}>
                {firstName} {lastName}
              </b>{" "}
              from My Teachers?
            </DialogTitle>
            <DialogActions className={classes.deleteModalButtonContainer}>
              <Button
                onClick={() => this.setState({ isDeleting: false })}
                className={classes.deleteModalButton}
                autoFocus
                style={{ borderColor: "#2196F3" }}
              >
                No,
                <b style={{ color: "#2196F3", padding: "0 0.3em 0 0.3em" }}>
                  KEEP
                </b>
                {firstName} {lastName}
              </Button>
              <Button
                onClick={this.handleDeleteConfirm}
                className={classes.deleteModalButton}
                style={{ borderColor: "#F1231C" }}
              >
                Yes,
                <b style={{ color: "#F1231C", padding: "0 0.3em 0 0.3em" }}>
                  DELETE
                </b>
                {firstName} {lastName}
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
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
          </Dialog>
          <Dialog
            open={editAlert}
            onClose={() => this.setState({ editAlert: false, alertText: "" })}
            aria-labelledby="edit-alert-label"
            aria-describedby="edit-alert-description"
          >
            <DialogTitle id="edit-alert-title">{alertText}</DialogTitle>
          </Dialog>
        </div>
      </div>
    );
  }
}

TeacherDetailPage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

TeacherDetailPage.contextType = FirebaseContext;
export default withStyles(styles)(withRouter(TeacherDetailPage));
