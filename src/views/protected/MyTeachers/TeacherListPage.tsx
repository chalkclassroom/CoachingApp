import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import TransitionTimeIconImage from "../../../assets/images/TransitionTimeIconImage.svg";
import EngagementIconImage from "../../../assets/images/EngagementIconImage.svg";
import SequentialIconImage from "../../../assets/images/SequentialIconImage.svg";
import ListeningIconImage from "../../../assets/images/ListeningIconImage.svg";
import MathIconImage from "../../../assets/images/MathIconImage.svg";
import InstructionIconImage from "../../../assets/images/InstructionIconImage.svg";
import ClassroomClimateIconImage from "../../../assets/images/ClassroomClimateIconImage.svg";
import AssocCoopIconImage from "../../../assets/images/AssocCoopIconImage.svg";
import ConferencePlanImage from "../../../assets/images/ConferencePlanImage.png";
import ActionPlanImage from "../../../assets/images/ActionPlanImage.png";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    // border: '1px solid #000000',
    flexGrow: 1,
    width: "100%",
    minHeight: "768px",
    margin: 0,
    padding: 0
  },
  container: {
    // border: '1px solid #FFD800',
    display: "flex",
    flexDirection: "column",
    margin: "2% 5% 2% 5%"
  },
  row: {
    transitionDuration: "0.2s",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    "&:hover": {
      backgroundColor: "#555555",
      color: "#FFFFFF"
    },
    cursor: "pointer"
  },
  title: {
    alignSelf: "center",
    fontSize: "2.2em"
  },
  tableContainer: {
    // border: '1px solid #00FFF6',
    maxWidth: "100%",
    width: "100%",
    overflow: "auto",
    maxHeight: "16em",
    fontSize: "1.5em",
    boxShadow: "0px 1px 1px 1px #888888"
  },
  actionContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em"
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
    fontSize: "0.8em",
    padding: "0.5em",
    maxWidth: "12em",
    position: "sticky",
    top: 0,
    backgroundColor: "#FFFFFF"
  },
  emailCellHeader: {
    color: "#000000",
    fontSize: "0.8em",
    padding: "0.5em",
    maxWidth: "12em",
    position: "sticky",
    top: 0,
    backgroundColor: "#FFFFFF"
  },
  magicEightIcon: {
    height: "55px",
    width: "55px",
    borderRadius: 2
  },
  magicEightCell: {
    textAlign: "center",
    padding: "0.5em",
    minWidth: "55px",
    maxWidth: "1.8em"
  },
  nameField: {
    // border: '1px solid #4C00FF'
    textAlign: "left",
    padding: "0.5em",
    overflow: "hidden",
    maxWidth: "7em",
    color: "inherit"
  },
  emailField: {
    textAlign: "left",
    padding: "0.5em",
    overflow: "hidden",
    maxWidth: "18em",
    color: "inherit"
  },
  unlockedIcon: {
    height: "40px",
    width: "40px",
    display: "block",
    borderRadius: 4
  },
  legendContainer: {
    // border: '1px solid #FF56FF',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1em",
    margin: "1.5em 0 0 0",
    justifySelf: "center",
    overflow: "scroll"
  },
  legendItem: {
    // border: '1px solid #97FF00'
    display: "flex",
    alignItems: "center",
    fontSize: "1.3em"
  },
  legendIcon: {
    height: "40px",
    width: "40px",
    marginRight: "0.2em"
  },

  // Minor Breakpoint -> Shrinking desktop window
  "@media only screen and (max-width:1120px)": {
    emailField: {
      maxWidth: "10em"
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
    legendContainer: {
      padding: "1em 0 1em 0"
    },
    actionContainer: {
      justifyContent: "space-between"
    },
    actionButton: {
      marginRight: "3em"
    },
    magicEightCell: {
      display: "none"
    },
    tableContainer: {
      maxHeight: "25em"
    }
  },

  // iPad-Mini Landscape
  "@media only screen and (max-width:1024px) and (orientation:landscape)": {
    nameField: {
      maxWidth: "7.5em"
    },
    emailField: {
      maxWidth: "9em"
    }
  }
});

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

const sortedAltText = [
  "Transition Time",
  "Classroom Climate",
  "Listening To Children",
  "Level Of Instruction",
  "Math Instruction ",
  "Student Engagement",
  "Sequential Activities",
  "Assoc Coop Interactions"
];

interface Style {
  root: string,
  container: string,
  title: string,
  actionContainer: string,
  search: string,
  actionButton: string,
  tableContainer: string,
  nameCellHeader: string,
  emailCellHeader: string,
  magicEightCell: string,
  magicEightIcon: string,
  row: string,
  nameField: string,
  emailField: string,
  unlockedIcon: string,
  legendContainer: string,
  legendItem: string,
  legendIcon: string
}

interface Props {
  history: {
    push(
      param: (string | {
        pathname: string,
        state: {
          type: string
        }
      }),
    ): void
  }
  classes: Style
}

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
};

interface State {
  teachers: Array<Teacher>,
  searched: Array<Teacher>,
  isAdding: boolean,
  inputFirstName: string,
  inputLastName: string,
  inputSchool: string,
  inputEmail: string,
  inputPhone: string,
  inputNotes: string,
  fnErrorText: string,
  lnErrorText: string,
  schoolErrorText: string,
  emailErrorText: string,
  phoneErrorText: string,
  notesErrorText: string,
  addAlert: boolean,
  alertText: string
}

class TeacherListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      searched: [],
      isAdding: false,
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
      phoneErrorText: "",
      notesErrorText: "",
      addAlert: false,
      alertText: ""
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const firebase = this.context;
    firebase
      .getTeacherList()
      .then(teachers =>
        teachers.forEach(teacher =>
          teacher.then(data =>
            this.setState(prevState => {
              return {
                teachers: prevState.teachers.concat(data),
                searched: prevState.teachers.concat(data)
              };
            })
          )
        )
      )
      .catch(error =>
        console.error("Error occurred fetching teacher list: ", error)
      );
  }

  onChangeText = event => {
    const text = event.target.value.toLowerCase();
    if (text === "") {
      this.setState(prevState => {
        return { searched: prevState.teachers }; // original teacher list
      });
    } else {
      this.setState(prevState => {
        return {
          searched: prevState.teachers.filter(
            item =>
              item.lastName.toLowerCase().indexOf(text) !== -1 ||
              item.firstName.toLowerCase().indexOf(text) !== -1 ||
              item.email.toLowerCase().indexOf(text) !== -1
          )
        };
      });
    }
  };

  selectTeacher = teacherInfo => {
    this.props.history.push({
      pathname: `/MyTeachers/${teacherInfo.id}`,
      state: { teacher: teacherInfo, type: this.props.type }
    });
  };

  handleAddText = event => {
    const type = event.target.name;
    const val = event.target.value;
    this.setState(
      {
        [type]: val
      },
      () => this.validateInputText(type, val)
    );
  };

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
      case "inputSchool":
        if (!/^[a-zA-Z ]{2,100}$/.test(val)) {
          this.setState({
            schoolErrorText: "Invalid school (max 100 characters)."
          });
        } else {
          this.setState({ schoolErrorText: "" });
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

  handleAddConfirm = () => {
    const {
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
      firebase
        .addTeacher({
          firstName: inputFirstName,
          lastName: inputLastName,
          school: inputSchool,
          email: inputEmail,
          notes: inputNotes,
          phone: inputPhone
        })
        .then(id =>
          firebase
            .getTeacherInfo(id)
            .then(teacherInfo =>
              this.setState(
                prevState => {
                  return {
                    teachers: prevState.teachers.concat(teacherInfo),
                    searched: prevState.teachers.concat(teacherInfo)
                  };
                },
                () => {
                  this.handleCloseModal();
                  this.handleAddAlert(true);
                }
              )
            )
            .catch(error => {
              console.error(
                "Error occurred fetching new teacher's info: ",
                error
              );
              this.handleCloseModal();
              this.handleAddAlert(false);
            })
        )
        .catch(error => {
          console.error("Error occurred adding teacher to dB: ", error);
          this.handleCloseModal();
          this.handleAddAlert(false);
        });
    }
  };

  handleAddAlert = successful => {
    if (successful) {
      this.setState(
        {
          addAlert: true,
          alertText: "Teacher successfully added!"
        },
        () =>
          setTimeout(
            () => this.setState({ addAlert: false, alertText: "" }),
            1500
          )
      );
    } else {
      this.setState(
        {
          addAlert: true,
          alertText:
            "Something went wrong... try refreshing your page or logging out and back in."
        },
        () =>
          setTimeout(
            () => this.setState({ addAlert: false, alertText: "" }),
            3000
          )
      );
    }
  };

  handleCloseModal = () => {
    this.setState({
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
      isAdding: false,
      alertText: ""
    });
  };

  render() {
    const { classes } = this.props;
    const {
      isAdding,
      addAlert,
      alertText,
      fnErrorText,
      lnErrorText,
      emailErrorText,
      schoolErrorText,
      phoneErrorText,
      notesErrorText
    } = this.state;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <div className={classes.container}>
          <h2 className={classes.title}>My Teachers</h2>
          <div className={classes.actionContainer}>
            <TextField
              id="teacher-search"
              label="Search"
              type="search"
              className={classes.search}
              variant="outlined"
              onChange={this.onChangeText}
            />
            <Fab
              aria-label="Add Teacher"
              onClick={() => this.setState({ isAdding: true })}
              className={classes.actionButton}
              size="small"
            >
              <AddIcon style={{ color: "#FFFFFF" }} />
            </Fab>
          </div>
          <div className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.nameCellHeader}>
                    Last
                    <br />
                    Name
                  </TableCell>
                  <TableCell className={classes.nameCellHeader}>
                    First
                    <br />
                    Name
                  </TableCell>
                  <TableCell className={classes.emailCellHeader}>
                    Email
                  </TableCell>
                  {sortedSvg.map((item, key) => (
                    <TableCell
                      className={classes.magicEightCell}
                      style={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#FFFFFF"
                      }}
                    >
                      <img
                        src={item}
                        alt={sortedAltText[key]}
                        className={classes.magicEightIcon}
                      />
                    </TableCell>
                  ))}
                  <TableCell className={classes.nameCellHeader}>
                    Goals
                    <br />
                    Met
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.searched.map((teacher, index) => (
                  <TableRow
                    className={classes.row}
                    key={index}
                    onClick={() => this.selectTeacher(teacher)}
                  >
                    <TableCell className={classes.nameField}>
                      {teacher.lastName}
                    </TableCell>
                    <TableCell className={classes.nameField}>
                      {teacher.firstName}
                    </TableCell>
                    <TableCell className={classes.emailField}>
                      {teacher.email}
                    </TableCell>
                    {[...Array(8).keys()].map(key => (
                      <TableCell className={classes.magicEightCell}>
                        {teacher.unlocked !== undefined &&
                          teacher.unlocked.indexOf(key + 1) !== -1 && (
                            <VisibilityOutlinedIcon
                              className={classes.unlockedIcon}
                            />
                          )}
                      </TableCell>
                    ))}
                    <TableCell className={classes.nameField}>
                      {teacher.goals !== undefined && teacher.goals}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className={classes.legendContainer}>
            <div className={classes.legendItem}>
              <VisibilityOutlinedIcon className={classes.legendIcon} />=
              Observed
            </div>
            <div className={classes.legendItem}>
              <img
                alt="Conference Prep"
                src={ConferencePlanImage}
                className={classes.legendIcon}
              />
              = Conference Prep
            </div>
            <div className={classes.legendItem}>
              <img
                alt="Co-created Action Plan"
                src={ActionPlanImage}
                className={classes.legendIcon}
              />
              = Co-created Action plan
            </div>
          </div>
          <Dialog
            open={isAdding}
            onClose={this.handleCloseModal}
            aria-labelledby="add-teacher-title"
          >
            <DialogTitle id="add-teacher-title">Add a New Teacher</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Make edits to the form below and confirm to add a teacher to
                your My Teachers list.
              </DialogContentText>
              <TextField
                autoFocus
                required
                onChange={this.handleAddText}
                margin="dense"
                id="first-name"
                name="inputFirstName"
                label="First Name"
                helperText={fnErrorText}
                error={!!fnErrorText}
                type="text"
                fullWidth
              />
              <TextField
                required
                onChange={this.handleAddText}
                margin="dense"
                id="last-name"
                name="inputLastName"
                label="Last Name"
                helperText={lnErrorText}
                error={!!lnErrorText}
                type="text"
                fullWidth
              />
              <TextField
                required
                onChange={this.handleAddText}
                margin="dense"
                id="school"
                name="inputSchool"
                label="School"
                helperText={schoolErrorText}
                error={!!schoolErrorText}
                type="text"
                fullWidth
              />
              <TextField
                required
                onChange={this.handleAddText}
                margin="dense"
                id="email"
                name="inputEmail"
                label="Email"
                helperText={emailErrorText}
                error={!!emailErrorText}
                type="email"
                fullWidth
              />
              <TextField
                onChange={this.handleAddText}
                margin="dense"
                id="phone"
                name="inputPhone"
                label="Phone"
                placeholder="###-###-####"
                helperText={phoneErrorText}
                error={!!phoneErrorText}
                type="tel"
                fullWidth
              />
              <TextField
                onChange={this.handleAddText}
                margin="dense"
                id="notes"
                name="inputNotes"
                label="Notes"
                helperText={notesErrorText}
                error={!!notesErrorText}
                multiline
                rows={8}
                rowsMax={8}
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
                onClick={this.handleAddConfirm}
                style={{ color: "#2196F3" }}
              >
                Add New Teacher
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={addAlert}
            onClose={() => this.setState({ addAlert: false, alertText: "" })}
            aria-labelledby="add-alert-label"
            aria-describedby="add-alert-description"
          >
            <DialogTitle id="add-alert-title">{alertText}</DialogTitle>
          </Dialog>
        </div>
      </div>
    );
  }
}

TeacherListPage.propTypes = {
  classes: PropTypes.object.isRequired
};

TeacherListPage.contextType = FirebaseContext;
export default withStyles(styles)(withRouter(TeacherListPage));
