import * as React from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { withStyles } from "@material-ui/core/styles";
import TransitionTimeHelp from "./TransitionTimeHelp";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TransitionTimer from "./TransitionTimer";
import TransitionLog from "./TransitionLog";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import Notes from "../../../components/Notes";
import { connect } from "react-redux";
import { resetTransitionTime } from "../../../state/actions/transition-time";
// import TransitionTimeRecs from "./TransitionTimeRecs";
import TransitionTypeSel from "./TransitionTypeSel";
import Dashboard from "../../../components/Dashboard";
import * as Constants from "../../../constants";

const styles: object = {
  root: {
    flexGrow: 1,
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  },
};

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

interface Props {
  classes: { root: string, backButton: string },
  location: { state: { teacher: Teacher, teachers: Array<Teacher>}}
};

interface State {
  auth: boolean,
  help: boolean,
  notes: boolean,
  recs: boolean,
  transitionType: string,
  open: boolean,
  transitionEnded: boolean
};

/**
 * transition time observation tool
 * @class TransitionTimePage
 */
class TransitionTimePage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      auth: true,
      help: false,
      notes: false,
      recs: true,
      transitionType: null,
      open: false,
      transitionEnded: false
    };

    // this.handleTransitionType = this.handleTransitionType.bind(this);
  }

  /**
   * @param {string} type
   */
  handleTransitionType = (type: string): void => {
    if (this.state.transitionEnded) {
      this.setState({ transitionEnded: false });
    }
    this.setState({ transitionType: type });
  };

  /**
   * @param {boolean} open
   */
  handleRecsModal = (open: boolean): void => {
    if (open) {
      this.setState({ recs: true });
    } else {
      this.setState({ recs: false });
    }
  };

  handleEndTransition = (): void => {
    this.setState({ transitionEnded: true });
    this.setState({ transitionType: null });
  };

  /**
   * @param {boolean} open
   */
  handleNotes = (open: boolean): void => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };

  handleClickAwayHelp = (): void => {
    this.setState({ help: false });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.exact({ state: PropTypes.exact({ teacher: PropTypes.exact({ id: PropTypes.string})})}).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: object) => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        {this.state.help ? (
          <ClickAwayListener onClickAway={this.handleClickAwayHelp}>
            <TransitionTimeHelp />
          </ClickAwayListener>
        ) : this.state.notes ? (
          <FirebaseContext.Consumer>
            {(firebase: object) => (
              <Notes
                open={true}
                onClose={this.handleNotes}
                color="#094492"
                text="Transition Time Notes"
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer> /* : this.state.recs ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <Recs
                open={true}
                onClose={this.handleRecsModal}
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        )  */
        ) : (
          <div />
        )}
        <main style={{ flex: 1 }}>
          <Grid container spacing={16} alignItems="center">
            <Grid item xs={3}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <Grid item>
                  <Button variant="contained" size="medium" className={classes.backButton}
                    onClick={(): void => {
                        this.props.history.replace({
                          pathname: "/Magic8Menu",
                          state: {
                            teacher: this.props.location.state.teacher,
                            type: "Observe",
                            teachers: this.props.location.state.teachers
                          }
                        })
                    }}>
                    <ChevronLeftRoundedIcon />
                    <b>Observe</b>
                  </Button>
                </Grid>
                <Grid item>
                  <Dashboard
                    type="TT"
                    infoDisplay={<TransitionLog />}
                    infoPlacement="center"
                    completeObservation={true}
                    teacherFirstName={this.props.location.state.teacher.firstName}
                    teacherLastName={this.props.location.state.teacher.lastName}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} justify="center">
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <TransitionTypeSel
                  handleTransitionType={this.handleTransitionType}
                  handleNotes={this.handleNotes}
                  transitionType={this.state.transitionType}
                  transitionEnded={this.state.transitionEnded}
                />
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <FirebaseContext.Consumer>
                  {(firebase: object) => (
                    <TransitionTimer
                      teacherId={this.props.location.state.teacher.id}
                      firebase={firebase}
                      typeSelected={
                        this.state.transitionType === null ? false : true
                      }
                      handleEndTransition={this.handleEndTransition}
                    />
                  )}
                </FirebaseContext.Consumer>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default connect(null, { resetTransitionTime })(
  withStyles(styles)(TransitionTimePage)
);
