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
import LiteracyIconImage from "../../../assets/images/LiteracyIconImage.svg";
import AssocCoopIconImage from "../../../assets/images/AssocCoopIconImage.svg";
import ConferencePlanImage from "../../../assets/images/ConferencePlanImage.png";
import ActionPlanImage from "../../../assets/images/ActionPlanImage.png";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  Popover,
  Modal,
  IconButton,
  Tooltip
} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import AddIcon from "@material-ui/icons/Add";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import ObserveIcon from "@material-ui/icons/Visibility";
import ActionPlansIcon from "@material-ui/icons/CastForEducation";
import ConferencePlansIcon from "@material-ui/icons/ListAlt";
import { Calendar, momentLocalizer, SlotInfo, Views, EventProps } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NewEventStepper from '../../../components/MyTeachersComponents/NewEventStepper';
import moment from 'moment';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';
import { changeTeacher } from '../../../state/actions/teacher';
import { connect } from 'react-redux';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

const localizer = momentLocalizer(moment);

interface Event {
  title: string,
  start: Date,
  end: Date,
  allDay?: boolean
  resource: string,
  hexColor?: string,
  type: string
}

/**
 * specifies styling for modal
 * @return {CSSProperties}
 */
 function getModalStyle(): React.CSSProperties {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

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
    paddingLeft: '2em',
    paddingRight: '2em'
    // margin: "2% 5% 2% 5%"
  },
  paper: {
    position: "absolute",
    backgroundColor: 'white',
    width: '60%',
    height: '70%',
    padding: '2em',
    borderRadius: 8,
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
  paper: string,
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
  type: string,
  teacherList: Array<Types.Teacher>
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
  // anchorEl: React.BaseSyntheticEvent<globalThis.Event, EventTarget & Element, EventTarget>;currentTarget: EventTarget & Element | null,
  anchorEl: EventTarget & Element | null,
  clickedEvent: Types.CalendarEvent | null,
  newEventModal: boolean,
  newEventDate: Date | null,
  newEventTeacher: Types.Teacher | null,
  newEventTool: Types.ToolNamesKey | null,
  newEventType: string,
  actionPlanEvents: Array<Types.CalendarEvent>,
  conferencePlanEvents: Array<Types.CalendarEvent>,
  observationEvents: Array<any>,
  changeTeacher(teacherInfo: Types.Teacher): Types.Teacher
  // type: string
}

const ToolNames = {
  'TT': 'TransitionTime',
  'CC': 'ClassroomClimate',
  'MI': 'MathInstruction',
  'IN': 'LevelOfInstruction',
  'SE': 'StudentEngagement',
  'LC': 'ListeningToChildren',
  'SA': 'SequentialActivities',
  'LI': 'LiteracyInstruction',
  'AC': 'AssociativeCooperativeInteractions'
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
      anchorEl: null,
      clickedEvent: null,
      newEventModal: false,
      newEventDate: new Date(),
      newEventTeacher: null,
      newEventTool: null,
      newEventType: '',
      actionPlanEvents: [],
      conferencePlanEvents: [],
      observationEvents: []
      // type: ''
    };
  }

  /**
   * hi
   */
  clickMe(): void {
    const firebase = this.context;
    firebase
      .getTeacherList()
      .then((teachers: Array<Promise<Teacher>>) => {
        console.log('teachers', teachers);
        const recentObservations = [];
        teachers.forEach((teacher: Promise<Teacher>) => {
          console.log('HI')
          teacher.then((data: Teacher) => {
            console.log('HERE I AM')
            firebase
            .getRecentObservations2(data.id)
            .then((recentObs: Array<string>) => {
              /* this.setState({
                recentObs: recentObs
              }) */
              console.log('recent obs HELLO', recentObs);
              recentObservations.push(recentObs)
            })
            .catch((error: Error) =>
              console.error("Error occurred getting recent observations: ", error)
            );
          })
          
        })
          }
      )
      .catch((error: Error) =>
        console.error("Error occurred fetching teacher list: ", error)
      );
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const firebase = this.context;
    console.log('COMPONENTDIDMOUNT');
    firebase.getRecentObservations3().then((data: Array<{
      id: string,
      sessionStart: {value: Date},
      teacher: string,
      type: string
    }>) => {
      console.log('i got the data here', data);
      const myArr: Array<Types.CalendarEvent> = [];
      data.forEach((observation: {
        id: string,
        sessionStart: {value: Date},
        teacher: string,
        type: string
      }) => {
        /* const obsArray = Object.entries(observation).filter(value => value[1] !== null);
        const obsObject = {id: '', sessionStart: null, teacher: '', type: ''};
        console.log('obs obj', obsObject) */
        myArr.push({
          title: 'Observation',
          start: observation.sessionStart.value,
          end: observation.sessionStart.value,
          allDay: false,
          resource: observation.teacher.slice(6),
          // hexColor: 'a0febf',
          type: observation.type,
          id: observation.id
        })

        /* const newObs = {
          title: 'Observation',
          start: new Date(2021, 5, 14, 8, 30, 14, 0),
          end: new Date(2021, 5, 14, 9, 10, 47, 0),
          allDay: false,
          resource: '7OTNaap61PbpMsM2p2JS',
          hexColor: 'a0febf',
          type: value.idAC ? 'AC': value.idCC ? 'CC' : value.idTT ? 'TT' : value.idSA ? 'SA' : value.idSE ? 'SE' : value.idIN ? 'IN' : value.idLC ? 'LC' : value.idMI ? 'MI' : 'LI'
        } */
      })
      console.log('what is myArr', myArr)
      this.setState({observationEvents: myArr})
    });
    firebase.getActionPlanEvents().then((actionPlanEvents: Array<Types.CalendarEvent>) => {
      this.setState({actionPlanEvents: actionPlanEvents})
    })
    firebase.getConferencePlanEvents().then((conferencePlanEvents: Array<Types.CalendarEvent>) => {
      this.setState({conferencePlanEvents: conferencePlanEvents})
    })
    this.setState({
      teachers: this.props.teacherList
    }, () => {
      console.log('and now the teachers are', this.state.teachers);
      const recentObservations = [];
        /* this.state.teachers.forEach((teacher: Promise<Teacher>) => {
          console.log('HI')
          teacher.then((data: Teacher) => {
            console.log('HERE I AM', data.id)
            firebase
            .getRecentObservations2(data.id)
            .then((recentObs: Array<string>) => {
              /* this.setState({
                recentObs: recentObs
              })
              console.log('recent obs HELLO', recentObs);
              recentObservations.push(recentObs)
            })
            .catch((error: Error) =>
              console.error("Error occurred getting recent observations: ", error)
            );
          })
          
        }) */
        /* this.state.teachers.forEach((teacher: Types.Teacher) => {
          console.log('teacher', teacher);
          // teacher.then((data: Teacher) => {
            if (teacher.id !== 'rJxNhJmzjRZP7xg29Ko6') {
            console.log('data', teacher);
             
            firebase
            .getRecentObservations2(teacher.id)
            .then((recentObs: Array<string>) => {
              console.log('recent obs HELLO?', recentObs);
              recentObservations.push(recentObs);
              const observations = {
                'TT': recentObs[0],
                'CC': recentObs[1],
                'LC': recentObs[2],
                'IN': recentObs[3],
                'MI': recentObs[4],
                'SE': recentObs[5],
                'SA': recentObs[6],
                'LI': recentObs[7],
                'AC': recentObs[8]
              }
              console.log('adding this to whatever', {...teacher, ...observations})
              this.setState(prevState => {
                const copyOfState = [...prevState.teachers];
                const index = copyOfState.findIndex(x => x.id === teacher.id);
                const copyOfTeacher = {...copyOfState[index]};
                const updatedTeacher = Object.assign(copyOfTeacher, observations);
                // copyOfTeacher.concat({...observations});
                copyOfState[index] = updatedTeacher;
                return {
                  // teachers: prevState.teachers.concat({...teacher, ...observations}),
                  teachers: copyOfState,
                  searched: prevState.teachers.concat(teacher)
                };
              }, () => console.log('WHAT IS STATE NOW', this.state.teachers))
            })
            
            .catch((error: Error) =>
              console.error("Error occurred getting recent observations: ", error)
            );
            this.setState(prevState => {
              return {
                // teachers: prevState.teachers.concat(data),
                searched: prevState.teachers.concat(teacher)
              };
            })
          } 
        } */
        // )
    })
    
    
    /* firebase
      .getTeacherList()
      .then((teachers: Array<Promise<Teacher>>) => {
        console.log('teachers', teachers);
        const recentObservations = [];
        teachers.forEach((teacher: Promise<Teacher>) => {
          console.log('HI')
          teacher.then((data: Teacher) => {
            console.log('HERE I AM', data.id)
            firebase
            .getRecentObservations2(data.id)
            .then((recentObs: Array<string>) => {
              this.setState({
                recentObs: recentObs
              })
              console.log('recent obs HELLO', recentObs);
              recentObservations.push(recentObs)
            })
            .catch((error: Error) =>
              console.error("Error occurred getting recent observations: ", error)
            );
          })
          
        })
        teachers.forEach((teacher: Promise<Teacher>) => {
          console.log('teacher', teacher);
          teacher.then((data: Teacher) => {
            if (data.id !== 'rJxNhJmzjRZP7xg29Ko6') {
            console.log('data', data);
             
            firebase
            .getRecentObservations2(data.id)
            .then((recentObs: Array<string>) => {
              this.setState({
                recentObs: recentObs
              })
              console.log('recent obs HELLO?', recentObs);
              recentObservations.push(recentObs);
              const observations = {
                'TT': recentObs[0],
                'CC': recentObs[1],
                'LC': recentObs[2],
                'IN': recentObs[3],
                'MI': recentObs[4],
                'SE': recentObs[5],
                'SA': recentObs[6],
                'LI': recentObs[7],
                'AC': recentObs[8]
              }
              console.log('adding this to whatever', {...data, ...observations})
              this.setState(prevState => {
                return {
                  teachers: prevState.teachers.concat({...data, ...observations}),
                  searched: prevState.teachers.concat(data)
                };
              })
            })
            
            .catch((error: Error) =>
              console.error("Error occurred getting recent observations: ", error)
            );
            this.setState(prevState => {
              return {
                teachers: prevState.teachers.concat(data),
                searched: prevState.teachers.concat(data)
              };
            })
          } else {
            this.setState(prevState => {
              return {
                teachers: prevState.teachers.concat(data),
                searched: prevState.teachers.concat(data)
              };
            })
          }
        }
          )
        }
        )
          }
      ) */
      /* .catch((error: Error) =>
        console.error("Error occurred fetching teacher list: ", error)
      ); */

      /* firebase
      .getRecentObservations2(this.state.teacherUID)
      .then((recentObs: Array<string>) =>
        this.setState({
          recentObs: recentObs
        })
      )
      .catch((error: Error) =>
        console.error("Error occurred getting recent observations: ", error)
      ); */
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

  handleAddConfirm = (): void | null => {
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
    history: ReactRouterPropTypes.history.isRequired,
    changeTeacher: PropTypes.string.isRequired
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
      notesErrorText,
      anchorEl,
      clickedEvent,
      newEventModal,
      newEventDate,
      newEventTeacher,
      newEventTool,
      newEventType
    } = this.state;

    // const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: Types.CalendarEvent, target: React.SyntheticEvent): void => {
    target.persist();
    this.setState({
      anchorEl: target.currentTarget,
      clickedEvent: event
    });
  };

  const handleClose = (): void => {
    this.setState({
      anchorEl: null,
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const getName = (id: string): string => {
    const teacher = this.props.teacherList.find(obj => obj.id === id);
    if (teacher) {
      return (teacher.firstName + ' ' + teacher.lastName)
    } else {
      return ''
    }
  }

    const getInitials = (name: string): string => {
      let i = 0;
      let initials = name.charAt(0);
      while (i < name.length) {
        const space = name.indexOf(' ', i);
        if (space === -1) {
          break
        }
        initials = initials.concat(name.charAt(space + 1));
        i = space + 1
      }
      return initials
    };

    const myEventsList: Array<Types.CalendarEvent> = [
      {
        title: 'Observation',
        start: new Date(2021, 5, 14, 8, 30, 14, 0),
        end: new Date(2021, 5, 14, 9, 10, 47, 0),
        allDay: false,
        resource: '7OTNaap61PbpMsM2p2JS',
        hexColor: 'a0febf',
        type: 'LI'
      },
      {
        title: 'Conference Plan',
        start: new Date(2021, 5, 20, 13, 30, 14, 0),
        end: new Date(2021, 5, 20, 13, 30, 14, 0),
        allDay: false,
        resource: '7OTNaap61PbpMsM2p2JS',
        hexColor: 'a0febf',
        type: 'LI'
      },
      {
        title: 'Observation',
        start: new Date(2021, 5, 17, 8, 30, 14, 0),
        end: new Date(2021, 5, 17, 9, 10, 47, 0),
        allDay: false,
        resource: 'EYaU6BCbNUcPTSsxU14G9IaGXHJ3',
        hexColor: 'ead2a2',
        type: 'CC'
      },
      {
        title: 'Action Plan',
        start: new Date(2021, 5, 24, 9, 10, 47, 0),
        end: new Date(2021, 5, 24, 9, 10, 47, 0),
        allDay: false,
        resource: '7OTNaap61PbpMsM2p2JS',
        hexColor: 'fde1f0',
        type: 'MI'
      },
      {
        title: 'Observation',
        start: new Date(2021, 5, 24, 9, 10, 47, 0),
        end: new Date(2021, 5, 24, 9, 10, 47, 0),
        allDay: false,
        resource: 'EYaU6BCbNUcPTSsxU14G9IaGXHJ3',
        hexColor: 'fde1f0',
        type: 'TT'
      },
      {
        title: 'Observation',
        start: new Date(2021, 5, 26, 9, 10, 47, 0),
        end: new Date(2021, 5, 26, 9, 10, 47, 0),
        allDay: false,
        resource: 'EYaU6BCbNUcPTSsxU14G9IaGXHJ3',
        hexColor: 'fde1f0',
        type: 'TT'
      }
    ];

    const allViews = Object.keys(Views).map(k => Views[k]);

    const ColoredDateCellWrapper = ({ children }) =>
      React.cloneElement(React.Children.only(children), {
        style: {
          backgroundColor: 'black',
        },
      })

    const eventStyleGetter = (event: Types.CalendarEvent, start, end, isSelected) => {
      const backgroundColor = '#' + event.hexColor;
      const style = {
          // backgroundColor: backgroundColor,
          // backgroundColor: 'white',
          backgroundColor: Constants.Colors[event.type as Types.DashboardType],
          borderRadius: '0px',
          opacity: 0.8,
          color: 'white',
          // border: '1px solid gray',
          display: 'block'
      };
      return {
          style: style
      };
  };

    const EventComponent = (event: {
      event: Types.CalendarEvent,
      continuesAfter: boolean,
      continuesPrior: boolean,
      isAllDay: boolean,
      title: string,
      slotEnd: Date,
      slotStart: Date
    }): JSX.Element => {
      return (
        <Grid container direction='row' justify='flex-start' alignItems='center'>
          <Grid item xs={2}>
            <Typography variant="body2" style={{fontFamily: 'Arimo'}}>
              {getInitials(getName(event.event.resource))}:
            </Typography>
          </Grid>
          <Grid item xs={9} wrap='nowrap' style={{paddingLeft: '0.5em'}}>
            <Typography variant="body2" style={{fontFamily: 'Arimo', whiteSpace: "normal",
              // wordWrap: "break-word"
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {event.event.title}
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <div className={classes.container}>
          <h2 className={classes.title}>My Teachers</h2>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            style={{padding: '1em'}}
          >
            {clickedEvent !== null ? (
              <Grid container direction="column" style={{padding: '1em'}}>
                <Grid item>
                  <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                    {getName(clickedEvent.resource)}
                  </Typography>
                </Grid>
                <Grid item style={{paddingTop: '0.5em', paddingBottom: '0.5em', height: '2em'}}>
                  <Grid container direction="row" justify="flex-start" alignItems="center">
                    {/* <Grid item style={{paddingRight: '0.5em'}}>
                      {clickedEvent.title === 'Observation' ? <ObserveIcon style={{fill: Constants.Colors[clickedEvent.type as Types.DashboardType]}} />
                        : clickedEvent.title === 'Action Plan' ? <ActionPlansIcon style={{fill: Constants.Colors[clickedEvent.type as Types.DashboardType]}} />
                        : <ConferencePlansIcon style={{fill: Constants.Colors[clickedEvent.type as Types.DashboardType]}} />
                      }
                    </Grid> */}
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        onClick={(): void => {
                          const teacherObject = this.props.teacherList.filter(teacher => {
                            return teacher.id === clickedEvent.resource
                          })
                          this.props.changeTeacher(teacherObject[0])
                          this.props.history.push({
                            pathname: `/${ToolNames[clickedEvent.type as ToolNamesKey]}Results`,
                            state: {sessionId: clickedEvent.id}
                          })
                        }}
                        // onClick={(): void => {console.log('tool', ToolNames[clickedEvent.type as ToolNamesKey])}}
                        style={{fontFamily: 'Arimo', fontWeight: 'bold'}}
                      >
                        {clickedEvent.title}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{height: '4em', paddingTop: '0.5em'}}>
                  <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={9}>
                      <Typography>
                        {Constants.ToolNames[clickedEvent.type as Types.ToolNamesKey]}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <img src={
                        clickedEvent.type === 'TT' ? TransitionTimeIconImage
                        : clickedEvent.type === 'CC' ? ClassroomClimateIconImage
                        : clickedEvent.type === 'MI' ? MathIconImage
                        : clickedEvent.type === 'IN' ? InstructionIconImage
                        : clickedEvent.type === 'SE' ? EngagementIconImage
                        : clickedEvent.type === 'LC' ? ListeningIconImage
                        : clickedEvent.type === 'SA' ? SequentialIconImage
                        : clickedEvent.type === 'LI' ? LiteracyIconImage
                        : AssocCoopIconImage
                      } style={{height: '3em', width: '3em'}} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (<Typography>no event</Typography>)}
          </Popover>
          {/* <div className={classes.actionContainer}>
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
          </div> */}
          {/* <button
            onClick={(): void => {
              console.log('blahBLAHBLAH2', myEventsList.concat(this.state.actionPlanEvents, this.state.conferencePlanEvents))
            }}
          >
            click me
          </button> */}
          <div>
            <Grid container direction='row' justify='center' alignItems='center'>
              {/* <Grid item xs={3}>
                <List>
                  {this.state.teachers.length > 0 ? this.state.teachers.map((teacher, index) => {
                    return (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Checkbox>

                          </Checkbox>
                        </ListItemIcon>
                        <ListItemText>
                          {teacher.firstName + ' ' + teacher .lastName}
                        </ListItemText>
                      </ListItem>
                    )
                  }) : 'no teachers'}
                </List>
              </Grid> */}
              <Grid item xs={12}>
                {this.state.observationEvents ? (<Calendar
                  popup
                  localizer={localizer}
                  // events={[...myEventsList, ...this.state.actionPlanEvents]}
                  events={this.state.observationEvents ? this.state.observationEvents.concat(this.state.actionPlanEvents, this.state.conferencePlanEvents) : []}
                  selectable
                  step={60}
                  showMultiDayTimes
                  components={{
                    event: EventComponent,
                    // timeSlotWrapper: ColoredDateCellWrapper,
                    // eventPropGetter: eventStyleGetter
                  }}
                  style={{height: '70vh'}}
                  eventPropGetter={eventStyleGetter}

                  onSelectEvent={(event: Types.CalendarEvent, target: React.SyntheticEvent): void => {handleClick(event, target)}}
                  onSelectSlot={(slot: SlotInfo
                    /* {
                    action: string,
                    bounds: {},
                    box: undefined,
                    start: Date,
                    end: Date,
                    slots: Array<Date>
                  } */
                  ): void => {
                    this.setState({newEventDate: slot.start}, () => {
                      this.setState({newEventModal: true})
                    });
                  }}
                  longPressThreshold={20}
                />) : (<Typography>Fetching data</Typography>)}
              </Grid>
            </Grid>
          </div>
          {/* <div className={classes.tableContainer}>
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
          </div> */}
          <Modal open={newEventModal}>
            <div style={getModalStyle()} className={classes.paper}>
              <Grid container direction="column" style={{height: '100%', overflowY: 'auto'}}>
                <Grid item style={{height: '20%'}}>
                  <Grid container direction="row" style={{height: '100%'}}>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                      <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', padding: '1em'}}>
                        Create New Event
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton style={{ padding: 10 }}>
                        <Tooltip title={"Close"} placement={"right"}>
                          <CloseIcon
                            onClick={(): void => {this.setState({newEventModal: false})}}
                          />
                        </Tooltip>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{height: '80%'}}>
                  <NewEventStepper
                    date={newEventDate}
                    setDate={(newDate: Date): void => {this.setState({newEventDate: newDate})}}
                    teacher={newEventTeacher}
                    setTeacher={(newTeacher: Types.Teacher): void => {this.setState({newEventTeacher: newTeacher})}}
                    tool={newEventTool}
                    setTool={(newTool: Types.ToolNamesKey): void => {this.setState({newEventTool: newTool})}}
                    type={newEventType}
                    setType={(newType: string): void => {this.setState({newEventType: newType})}}
                    teacherList={this.state.teachers}
                    closeModal={(): void => this.setState({newEventModal: false})}
                  />
                </Grid>
              </Grid>
            </div>
          </Modal>
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

const mapStateToProps = (state: Types.ReduxState): {
  // teacherSelected: Types.Teacher,
  teacherList: Array<Types.Teacher>
} => {
  return {
    // teacherSelected: state.teacherSelectedState.teacher,
    teacherList: state.teacherListState.teachers
  };
};

TeacherListPage.contextType = FirebaseContext;
export default withRouter(connect(
  mapStateToProps, {changeTeacher}
)(withStyles(styles)(TeacherListPage)));
// export default withStyles(styles)(withRouter(TeacherListPage));
