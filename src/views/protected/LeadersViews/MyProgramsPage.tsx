import * as React from "react";
import * as PropTypes from "prop-types";
import { withRouter, RouteComponentProps } from "react-router-dom";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import CHALKLogoGIF from '../../../assets/images/CHALKLogoGIF.gif';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  Typography,
  Popover,
  Modal,
  IconButton,
  Tooltip,
  Paper,
} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import PeopleIcon from "@material-ui/icons/People";
import DateRangeIcon from '@material-ui/icons/DateRange';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NewEventStepper from '../../../components/MyTeachersComponents/NewEventStepper';
import CalendarEventPopover from '../../../components/MyTeachersComponents/CalendarEventPopover';
import MyProgramsTable from '../../../components/LeadersComponents/MyProgramsTable';
import EditProgramDialog from '../../../components/LeadersComponents/EditProgramDialog';
import ProgramDetails from '../../../components/LeadersComponents/ProgramDetails';
import moment from 'moment';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';
import { changeTeacher, updateTeacherInfo, addTeacher, removeTeacher } from '../../../state/actions/teacher';
import { connect } from 'react-redux';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';
import Firebase from '../../../components/Firebase'


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

const styles = (): object => ({
  root: {
    flexGrow: 1,
    width: "100%",
    minHeight: "768px",
    margin: 0,
    padding: 0
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: '2em',
    paddingRight: '2em'
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
      backgroundColor: 'red'
    },
    "&:hover": {
      backgroundColor: "#555555",
      color: "#FFFFFF"
    },
    cursor: "pointer"
  },
  title: {
    alignSelf: "center",
    fontSize: "2em",
    fontFamily: 'Arimo'
  },
  tableContainer: {
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
    fontSize: "1em",
    padding: "0.5em",
    maxWidth: "12em",
    position: "sticky",
    top: 0,
    backgroundColor: "#FFFFFF",
    fontFamily: 'Arimo',
    fontWeight: 'bold'
  },
  emailCellHeader: {
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
    textAlign: "left",
    padding: "0.5em",
    overflow: "hidden",
    maxWidth: "7em",
    color: "inherit",
    fontFamily: 'Arimo'
  },
  emailField: {
    textAlign: "left",
    padding: "0.5em",
    overflow: "hidden",
    maxWidth: "18em",
    color: "inherit",
    fontFamily: 'Arimo'
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
  teacherList: Array<Types.Teacher>,
  changeTeacher(teacherInfo: Types.Teacher): Types.Teacher,
  updateTeacherInfo(teacher: Types.Teacher): Array<Types.Teacher>,
  addTeacher(teacher: Types.Teacher): Array<Types.Teacher>,
  removeTeacher(teacher: Types.Teacher): void,

  //programDetails: Array<Array<Types.User>>
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
  selectedProgram: Teacher | undefined,
  searched: Array<Teacher>,
  ProgramDetails: Array<Teacher & {type: Types.ToolNamesKey, title: string, start: Date}>,
  isAdding: boolean,
  editing: boolean,
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
  editAlert: boolean,
  alertText: string,
  anchorEl: EventTarget & Element | null,
  clickedEvent: Types.CalendarEvent | null,
  newEventModal: boolean,
  newEventDate: Date | null,
  newEventTeacher: Types.Teacher | null,
  newEventTool: Types.ToolNamesKey | null,
  newEventType: string,
  allEvents: Array<any>,
  dataLoaded: boolean,
  view: number,
  deleteAppointmentDialog: boolean
}

/**
 * @class MyProgramsPage
 */
class MyProgramsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      teachers: [],
      selectedProgram: {id: "", name: ""},
      selectedProgramName: "",
      selectedProgramLeaders: [],
      selectedProgramSites: undefined,
      allSitesList: [],
      allSitesOptions: [],
      allLeadersList: [],
      searched: [],
      ProgramDetails: [],
      isAdding: false,
      editing: false,
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
      editAlert: false,
      alertText: "",
      anchorEl: null,
      clickedEvent: null,
      newEventModal: false,
      newEventDate: new Date(),
      newEventTeacher: null,
      newEventTool: null,
      newEventType: '',
      allEvents: [],
      dataLoaded: false,
      view: 0,
      deleteAppointmentDialog: false,
      programDetails: [{id:"", name:""}]
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const firebase = this.context;

    /*
     * Get list of programs
     */
    firebase.getProgramsForUser({userId: "user"}).then(data => {
      console.log("DATA : " + data);

      this.setState({programDetails: data});

      // Signal that data is loaded so we can remove loading icon
      this.setState({dataLoaded: true});

    }).catch((e) => {
      console.error("ERROR ", e);
    });


    /*
     * Build list of sites for the dropdown in the edit component
     */
    firebase.getSites({userId: "user"}).then(data => {
      this.setState({allSitesList: data});

    }).catch((e) => {
      console.error("ERROR ", e);
    });

    firebase.getSites().then(data => {
      // Set the array of site ids for the 'Edit Program' component
      var tempArray = [];
      var tempObj;
      for(var siteIndex in data)
      {
        tempObj = {id: data[siteIndex].id, name: data[siteIndex].name};
        tempArray.push(tempObj);
      }
      this.setState({allSitesOptions: tempArray});

    }).catch((e) => {
      console.error("ERROR ", e);
    });

    /*
     * Build list of leader for the dropdown in the edit component
     */
    //this.setState({allLeadersList: ["Test2", "Sweet2"]});
    firebase.getAllLeaders().then(data => {
      var results = [];
      this.setState({allLeadersList: data});
    }).catch((e) => {
      console.error("ERROR ", e);
    });
  }


  /*
   * Set/Reset data for selectedProgram by grabbing it from the firestore
   */
  setDataFromFirestore = (programId) => {
    const firebase = this.context;

    // Reset the selected program name and data
    firebase.getUserProgramOrSite({programId: programId}).then(data => {
        this.setState({
          selectedProgram: data,
          selectedProgramName: data.name,
        })
    });

    // Set selected leader Objects
    firebase.getLeadersFromProgram({programId: programId}).then(data => {
      this.setState({selectedProgramLeaders: data});
    }).catch((e) => {
      console.error("ERROR ", e);
    });

    // Set selecte site objects
    this.getSites(programId);

  }


  /**
   * function for editing teacher name or email
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  onChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const text = event.target.value.toLowerCase();
    console.log("TEXT : " + text);

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
   * When a program is clicked on
   */
  selectProgram = (programInfo: Teacher): void => {

    // Set selected program information
    this.setDataFromFirestore(programInfo.id);



    // Change the selected program and open the details popup
    this.setState({
      view: 3,
      selectedProgram: programInfo
    })

  };

  // When the dropdowns are changed in the 'edit' popup
  handleLeaderChange = (data) => {
    var tempSelectedProgram = this.state.selectedProgram;
    tempSelectedProgram.leaders = data;
    this.setState({selectedProgram: tempSelectedProgram});
  }

  handleSitesChange = (data) => {
    var tempSelectedProgram = this.state.selectedProgram;
    tempSelectedProgram.sites = data;
    this.setState({selectedProgram: tempSelectedProgram});
  }

  getSites = async (programId) => {
    const firebase = this.context;

    // Get all the sites for the newly selected program and save it to state
    firebase.getUserProgramOrSite({programId: programId}).then( async (data) => {
      const sites = data.sites;
      let sitesResults = [];
      for(var site in sites)
      {
        var tempSite = await firebase.getUserProgramOrSite({siteId: sites[site]});

        sitesResults.push(tempSite);

      }

      this.setState({selectedProgramSites: sitesResults});

    }).catch((e) => {
      console.error("ERROR ", e);
    });
  }


  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  handleAddText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const type = event.target.name;
    const val = event.target.value;

    var tempProgram = this.state.selectedProgram;

    if (type === 'inputProgramName') {
      tempProgram.name = val;
      this.setState({
        selectedProgram: tempProgram
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
      case "inputProgramName":
        if (!/^[a-zA-Z '-]{2,30}$/.test(val)) {
          this.setState({ fnErrorText: "Invalid Program name." });
        } else {
          this.setState({ fnErrorText: "" });
        }
        break;
      default:
        break;
    }
  };


  handleEditConfirm = (): void | null => {
    const {
      selectedProgram,
    } = this.state;


    if (selectedProgram) {
      // fields are validated
      const firebase = this.context;
      if (
        firebase.setProgram(selectedProgram.id, {
          name: selectedProgram.name,
          leaders: selectedProgram.leaders,
          sites: selectedProgram.sites,
        })
      ) {

        // Edit successfully written
        this.setState(
          {
            selectedProgram: selectedProgram,
          },
          () => {


            // Get the leaders for the newly selected program and save it to state
            firebase.getLeadersFromProgram({programId: selectedProgram.id}).then(data => {
              this.setState({selectedProgramLeaders: data});
            }).catch((e) => {
              console.error("ERROR ", e);
            });

            this.handleCloseModal();

          }
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

  /**
   * @param {boolean} successful
   */
   handleEditAlert = (successful: boolean): void => {
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

  closeProgramDetails = (): void => {
    this.setState({view: 0})
    // Set selected program information
    //this.setDataFromFirestore(this.state.selectedProgram.id);
  }

  handleEdit = (): void => {
    this.setState({
      inputFirstName: this.state.selectedProgram ? this.state.selectedProgram.firstName : '',
      inputLastName: this.state.selectedProgram ? this.state.selectedProgram.lastName : '',
      inputEmail: this.state.selectedProgram ? this.state.selectedProgram.email : '',
      inputSchool: this.state.selectedProgram ? this.state.selectedProgram.school : '',
      inputPhone: this.state.selectedProgram ? this.state.selectedProgram.phone : '',
      inputNotes: this.state.selectedProgram ? this.state.selectedProgram.notes : '',
    }, (): void => {
      this.setState({editing: true})
    })
  }

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
      editing: false,
      alertText: ""
    });

    // Set selected program information
    this.setDataFromFirestore(this.state.selectedProgram.id);


  };

  handleDeleteConfirm = (): Promise<void> => {
    const firebase = this.context;
    console.log("WRONG SPOT");

    return firebase
      .removeSiteOrProgram({programId: this.state.selectedProgram.id})
      .then(() => {
        this.props.removeTeacher(this.state.selectedProgram.id);

        const updatedProgramDetails = [...this.state.programDetails];
        const index = updatedProgramDetails.findIndex(x => x.id === this.state.selectedProgram.id);
        updatedProgramDetails.splice(index, 1)
        this.setState({
          programDetails: updatedProgramDetails
        })

      })
      .catch((e) => {

        console.error("ERROR : ", e);

        // problem with removing teacher
        this.setState(
          {
            editAlert: true,
            alertText:
              "Something went wrong removing this program... " +
              "try refreshing your page or logging out and back in."
          },
          () => setTimeout(() => this.setState({ editAlert: false }), 3000)
        )
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
    changeTeacher: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    const {
      isAdding,
      editing,
      addAlert,
      editAlert,
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
      newEventType,
      deleteAppointmentDialog
    } = this.state;

    /**
     * clicking on calendar event
     * @param {Types.CalendarEvent} event
     * @param {SyntheticEvent} target
     */
    const handleClick = (event: Types.CalendarEvent, target: React.SyntheticEvent): void => {
      target.persist();
      this.setState({
        anchorEl: target.currentTarget,
        clickedEvent: event
      });
      if (event.appointment) {
        const selectedProgram = this.props.teacherList.filter(teacher => {
          return teacher.id === event.resource
        });
        this.setState({
          newEventDate: event.start,
          newEventTeacher: selectedProgram[0],
          newEventTool: event.type,
          newEventType: event.title
        })
      }
    };

    /**
     * closes event popover or create event dialog
     */
    const handleClose = (): void => {
      this.setState({
        anchorEl: null,
        clickedEvent: null,
        newEventDate: null,
        newEventTeacher: null,
        newEventTool: null,
        newEventType: ''
      });
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    /**
     * returns teacher name from id
     * @param {string} id
     * @return {string}
     */
    const getName = (id: string): string => {
      const teacher = this.props.teacherList.find(obj => obj.id === id);
      if (teacher) {
        return (teacher.firstName + ' ' + teacher.lastName)
      } else {
        return ''
      }
    }

    /**
     * returns teacher initials, given name
     * @param {string} name
     * @return {string}
     */
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

    // style for calendar event
    const eventStyleGetter = (event: Types.CalendarEvent, start, end, isSelected) => {
      const style = {
        backgroundColor: event.appointment ? 'white' : Constants.Colors[event.type as Types.DashboardType],
        borderRadius: '0px',
        opacity: 0.8,
        color: event.appointment ? 'black' : 'white',
        display: 'block',
        border: event.appointment ? '1px solid #ababab' : undefined
      };
      return {
        style: style
      };
    };

    /**
     * content for calendar event button
     * @param {object} event
     * @return {JSX.Element}
     */
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
          <Grid item>
            <Typography variant="body2" style={{fontFamily: 'Arimo'}}>
              {getInitials(getName(event.event.resource))}:
            </Typography>
          </Grid>
          <Grid item wrap='nowrap' style={{paddingLeft: '0.2em'}}>
            <Typography variant="body2" style={{fontFamily: 'Arimo', whiteSpace: "normal",
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
          {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid container direction="column" justify="center" alignItems="stretch" className={classes.container}>
          <h2 className={classes.title}>My Programs</h2>
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
              <CalendarEventPopover
                push={this.props.history.push}
                clickedEvent={clickedEvent}
                teacherList={this.props.teacherList}
                changeTeacher={this.props.changeTeacher}
                deleteAppointment={(): void => this.setState({ deleteAppointmentDialog: true })}
                editEvent={(): void => this.setState({ newEventModal: true })}
                getName={getName}
              />
            ) : (<Typography>no event</Typography>)}
          </Popover>
          <Grid item>
            <Grid container direction='row' justify='center' alignItems='center'>
              <Grid item xs={12}>
                <Grid container direction="column" style={{height: this.state.view === 3 ? '75vh' : '60vh'}}>
                  {this.state.dataLoaded ? (this.state.view === 1 ? (
                    // calendar
                    <Grid item style={{height: '100%', width: '100%'}}>
                      <Calendar
                        popup
                        localizer={localizer}
                        events={this.state.allEvents ? this.state.allEvents : []}
                        selectable
                        step={60}
                        showMultiDayTimes
                        components={{
                          event: EventComponent
                        }}
                        eventPropGetter={eventStyleGetter}
                        onSelectEvent={(event: Types.CalendarEvent, target: React.SyntheticEvent): void => {handleClick(event, target)}}
                        onSelectSlot={(slot: SlotInfo): void => {
                          this.setState({newEventDate: slot.start}, () => {
                            this.setState({newEventModal: true})
                          });
                        }}
                        longPressThreshold={20}
                      />
                    </Grid>
                  ) : this.state.view === 0 ? (
                    // table
                    <MyProgramsTable
                      onChangeText={this.onChangeText}
                      programDetails={this.state.programDetails}
                      allSites={this.state.allSitesList}
                      allLeaders={this.state.allLeadersList}
                      selectProgram={this.selectProgram}
                      addingTeacher={(): void => this.setState({ isAdding: true })}
                      push={this.props.history.push}
                    />
                  ) : (
                    null
                  )) : (
                    <Grid container direction="row" justify="center" alignItems="center">
                      <img src={CHALKLogoGIF} alt="Loading" width="80%" />
                    </Grid>
                  )}
                  <ProgramDetails
                    program={this.state.selectedProgram}
                    recentEvents={this.state.allEvents}
                    handleDeleteConfirm={this.handleDeleteConfirm}
                    handleCloseModal={this.handleCloseModal}
                    setEditing={(): void => {
                      this.setState({
                        inputFirstName: this.state.selectedProgram ? this.state.selectedProgram.firstName : '',
                        inputLastName: this.state.selectedProgram ? this.state.selectedProgram.lastName : '',
                        inputEmail: this.state.selectedProgram ? this.state.selectedProgram.email : '',
                        inputSchool: this.state.selectedProgram ? this.state.selectedProgram.school : '',
                        inputPhone: this.state.selectedProgram ? this.state.selectedProgram.phone : '',
                        inputNotes: this.state.selectedProgram ? this.state.selectedProgram.notes : '',
                      }, (): void => {
                        this.setState({editing: true})
                      })
                    }}
                    closeProgramDetails={this.closeProgramDetails}
                    open={this.state.view===3}
                    programLeaders={this.state.selectedProgramLeaders}
                    programSites={this.state.selectedProgramSites}
                    programName={this.state.selectedProgramName}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* {this.state.view !== 3 ? (
            <Grid item style={{paddingTop: '2em'}}>
              <Paper elevation={2}>
                <BottomNavigation
                  value={this.state.view}
                  onChange={(event, newValue) => {
                    this.setState({view: newValue});
                  }}
                  showLabels
                >
                  <BottomNavigationAction label="Programs" icon={<PeopleIcon />} />
                </BottomNavigation>
              </Paper>
            </Grid>
          ) : (null)} */}

          <EditProgramDialog
            adding={isAdding}
            editing={editing}
            handleCloseModal={this.handleCloseModal}
            handleAddText={this.handleAddText}
            inputFirstName={this.state.inputFirstName}
            inputLastName={this.state.inputLastName}
            inputEmail={this.state.inputEmail}
            inputSchool={this.state.inputSchool}
            inputPhone={this.state.inputPhone}
            inputNotes={this.state.inputNotes}
            fnErrorText={fnErrorText}
            lnErrorText={lnErrorText}
            schoolErrorText={schoolErrorText}
            emailErrorText={emailErrorText}
            phoneErrorText={phoneErrorText}
            notesErrorText={notesErrorText}
            handleComplete={isAdding ? this.handleAddConfirm : this.handleEditConfirm}
            classes={classes}
            leadersOptions={this.state.allLeadersList}
            selectedProgram={this.state.selectedProgram}
            handleSitesChange={this.handleSitesChange}
            handleLeaderChange={this.handleLeaderChange}
            sitesOptions={this.state.allSitesOptions}

          />
          <Dialog
            open={addAlert}
            onClose={(): void => this.setState({ addAlert: false, alertText: "" })}
            aria-labelledby="add-alert-label"
            aria-describedby="add-alert-description"
          >
            <DialogTitle id="add-alert-title">{alertText}</DialogTitle>
          </Dialog>
          <Dialog
            open={editAlert}
            onClose={(): void => this.setState({ editAlert: false, alertText: "" })}
            aria-labelledby="edit-alert-label"
            aria-describedby="edit-alert-description"
          >
            <DialogTitle id="edit-alert-title">{alertText}</DialogTitle>
          </Dialog>
          <Dialog
            open={deleteAppointmentDialog}
          >
            <DialogTitle id="alert-dialog-title" style={{fontFamily: 'Arimo'}}>
              {
                clickedEvent ? (
                  "Are you sure you want to delete your appointment with " + getName(clickedEvent.resource) + "?"
                ) : (
                  "Are you sure you want to delete your appointment?"
                )
              }
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={(): void => this.setState({deleteAppointmentDialog: false})}
                style={{ color: "#2196f3" }}
              >
                No
              </Button>
              <Button
                onClick={(): void => {
                  if (clickedEvent) {
                    this.deleteAppointment(clickedEvent.id)
                  }
                  this.setState({deleteAppointmentDialog: false})
                  handleClose();
                }}
                style={{ color: "#F1231C" }}
              >
                Yes
              </Button>
            </DialogActions>
            </Dialog>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {
  teacherList: Array<Types.Teacher>
} => {
  return {
    teacherList: state.teacherListState.teachers
  };
};

MyProgramsPage.contextType = FirebaseContext;
export default withRouter(connect(
  mapStateToProps, {changeTeacher, updateTeacherInfo, addTeacher, removeTeacher}
)(withStyles(styles)(MyProgramsPage)));
// export default withStyles(styles)(withRouter(MyProgramsPage));
