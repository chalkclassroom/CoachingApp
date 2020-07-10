import * as React from "react";
import * as PropTypes from "prop-types";
import { withRouter, RouteComponentProps } from "react-router-dom";
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
import { withStyles, Theme } from "@material-ui/core/styles";
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
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as Types from '../../../constants/Types';

const styles = (theme: Theme): object => ({
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

type Props = RouteComponentProps & {
  history: H.History,
  classes: Style,
  type: string
}

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
  alertText: string,
  // type: string
}

/**
 * @class TeacherListPage
 */
class TeacherListPage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
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
      alertText: "",
      // type: ''
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const firebase = this.context;
    firebase
      .getTeacherList()
      .then((teachers: Array<Promise<Teacher>>) => {
        console.log('teachers', teachers);
        teachers.forEach((teacher: Promise<Teacher>) => {
          console.log('teacher', teacher);
          teacher.then((data: Teacher) => {
            console.log('data', data);
            this.setState(prevState => {
              return {
                teachers: prevState.teachers.concat(data),
                searched: prevState.teachers.concat(data)
              };
            })
          }
          )
        }
        )
          }
      )
      .catch((error: Error) =>
        console.error("Error occurred fetching teacher list: ", error)
      );
  }

  /**
   * function for editing teacher name or email
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  onChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const text = event.target.value.toLowerCase();
    if (text === "") {
      this.setState((prevState: State) => {
        return { searched: prevState.teachers }; // original teacher list
      });
    } else {
      this.setState((prevState: State) => {
        return {
          searched: prevState.teachers.filter(
            item =>
              item.lastName.toLowerCase().includes(text) ||
              item.firstName.toLowerCase().includes(text) ||
              item.email.toLowerCase().includes(text)
          )
        };
      });
    }
  };

  /**
   * @param {Teacher} teacherInfo
   */
  selectTeacher = (teacherInfo: Teacher): void => {
    this.props.history.push({
      pathname: `/MyTeachers/${teacherInfo.id}`,
      state: { teacher: teacherInfo, type: this.props.type }
    });
  };

  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  handleAddText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const type = event.target.name;
    const val = event.target.value;
    if (type === 'inputFirstName') {
      this.setState({
        inputFirstName: val
      }, () => this.validateInputText(type, val))
    } else if (type === 'inputLastName') {
      this.setState({
        inputLastName: val
      }, () => this.validateInputText(type, val))
    } else if (type === 'inputSchool') {
      this.setState({
        inputSchool: val
      }, () => this.validateInputText(type, val))
    } else if (type === 'inputEmail') {
      this.setState({
        inputEmail: val
      }, () => this.validateInputText(type, val))
    } else if (type === 'inputPhone') {
      this.setState({
        inputPhone: val
      }, () => this.validateInputText(type, val))
    } else if (type === 'inputNotes') {
      this.setState({
        inputNotes: val
      }, () => this.validateInputText(type, val))
    }
  };

  /**
   * 
   * @param {string} type
   * @param {string} val
   */
  validateInputText = (type: string, val: string): void => {
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

  handleAddConfirm = (): void => {
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
        .then((id: string) =>
          firebase
            .getTeacherInfo(id)
            .then((teacherInfo: Teacher) =>
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
            .catch((error: Error) => {
              console.error(
                "Error occurred fetching new teacher's info: ",
                error
              );
              this.handleCloseModal();
              this.handleAddAlert(false);
            })
        )
        .catch((error: Error) => {
          console.error("Error occurred adding teacher to dB: ", error);
          this.handleCloseModal();
          this.handleAddAlert(false);
        });
    }
  };

  /**
   * @param {boolean} successful
   */
  handleAddAlert = (successful: boolean): void => {
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

  handleCloseModal = (): void => {
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

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      container: PropTypes.string,
      title: PropTypes.string,
      actionContainer: PropTypes.string,
      search: PropTypes.string,
      actionButton: PropTypes.string,
      tableContainer: PropTypes.string,
      nameCellHeader: PropTypes.string,
      emailCellHeader: PropTypes.string,
      magicEightCell: PropTypes.string,
      magicEightIcon: PropTypes.string,
      row: PropTypes.string,
      nameField: PropTypes.string,
      emailField: PropTypes.string,
      unlockedIcon: PropTypes.string,
      legendContainer: PropTypes.string,
      legendItem: PropTypes.string,
      legendIcon: PropTypes.string
    }).isRequired,
    type: PropTypes.string.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
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
          {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
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
              onClick={(): void => this.setState({ isAdding: true })}
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
                  {sortedSvg.map((item, index) => (
                    <TableCell
                      className={classes.magicEightCell}
                      style={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#FFFFFF"
                      }}
                      key={index}
                    >
                      <img
                        src={item}
                        alt={sortedAltText[index]}
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
                    onClick={(): void => this.selectTeacher(teacher)}
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
                    {[...Array(8).keys()].map((value, index) => (
                      <TableCell className={classes.magicEightCell} key={index}>
                        {teacher.unlocked !== undefined &&
                          teacher.unlocked.includes(index + 1) && (
                            <VisibilityOutlinedIcon
                              className={classes.unlockedIcon}
                            />
                          )}
                      </TableCell>
                    ))}
                    <TableCell className={classes.nameField}>
                      {/* {teacher.goals !== undefined && teacher.goals} */}
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
            onClose={(): void => this.setState({ addAlert: false, alertText: "" })}
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

TeacherListPage.contextType = FirebaseContext;
export default withStyles(styles)(withRouter(TeacherListPage));
