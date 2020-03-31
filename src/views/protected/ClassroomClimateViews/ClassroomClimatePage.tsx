import * as React from "react";
import * as PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AppBar from "../../../components/AppBar";
import RatingModal from "../../../components/ClassroomClimateComponent/RatingModal";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import BehaviorCounter from "../../../components/ClassroomClimateComponent/BehaviorCounter";
import { connect } from "react-redux";
import {
  appendClimateRating,
  emptyClimateStack
} from "../../../state/actions/classroom-climate";
import Dashboard from "../../../components/Dashboard";
import Countdown from "../../../components/Countdown";
import EmptyToneRating from "../../../components/ClassroomClimateComponent/EmptyToneRating";

/*
    N.B. Time measured in milliseconds.

    Rationale for the 2:10 interval -
    Give coaches ~10 seconds to make and confirm their rating,
    catch up on behavior approval/disapproval count if they need to,
    and then allow for 2 full minutes in between ratings.
 */

const RATING_INTERVAL: number = 130000;

const styles: object = {
  root: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  grow: {
    flexGrow: 1
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  }
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
  classes: { root: string, grow: string, backButton: string },
  location: { state: { teacher: Teacher, teachers: Array<Teacher>}},
  history: {
    replace(
      param: {
        pathname: string,
        state: {
          type: string,
          teacher: Teacher,
          teachers: Array<Teacher>
        }
      }
    ): void
  },
  appendClimateRating(rating: number): void
};

interface State {
  auth: boolean,
  time: number,
  ratingIsOpen: boolean,
  recs: boolean,
  incompleteRating: boolean
}

/**
 * classroom climate observation tool
 * @class ClassroomClimatePage
 */
class ClassroomClimatePage extends React.Component<Props, State> {
  state = {
    auth: true,
    time: RATING_INTERVAL,
    ratingIsOpen: false,
    recs: true,
    incompleteRating: false
  };

  tick = (): void => {
    if (this.state.time <= 0) {
      this.handleRatingModal();
      this.setState({ time: RATING_INTERVAL });
    } else {
      if (this.state.time - 1000 < 0) {
        this.setState({ time: 0 });
      } else {
        this.setState({ time: this.state.time - 1000 });
      }
    }
  };

  /**
   * @return {void}
   */
  handleRatingModal = (): void => {
    this.setState({ ratingIsOpen: true });
  };

  /**
   * @param {number} rating
   * @return {void}
   */
  handleRatingConfirmation = (rating: number): void => {
    this.setState({ ratingIsOpen: false });

    this.props.appendClimateRating(rating);

    const entry = {
      BehaviorResponse: rating,
      Type: "Rat",
      ratingInterval: RATING_INTERVAL
    };
    const firebase = this.context;
    firebase.handlePushClimate(entry);
  };

  /**
   * @return {void}
   */
  handleIncomplete = (): void => {
    this.setState({ incompleteRating: true });
  };

  /**
   * @return {void}
   */
  handleClickAwayIncomplete = (): void => {
    this.setState({ incompleteRating: false });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.exact({
      state: PropTypes.exact({
        teacher: PropTypes.exact({
          email: PropTypes.string,
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          notes: PropTypes.string,
          id: PropTypes.string,
          phone: PropTypes.string,
          role: PropTypes.string,
          school: PropTypes.string
        }).isRequired,
        teachers: PropTypes.array.isRequired
      })
    }).isRequired,
    history: PropTypes.exact({
      replace: PropTypes.func
    }).isRequired,
    appendClimateRating: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div className={this.props.classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Modal open={this.state.ratingIsOpen} onBackdropClick={null}>
          <RatingModal
            handleRatingConfirmation={this.handleRatingConfirmation}
            handleIncomplete={this.handleIncomplete}
          />
        </Modal>
        <Modal open={this.state.incompleteRating}>
          <ClickAwayListener onClickAway={this.handleClickAwayIncomplete}>
            <EmptyToneRating />
          </ClickAwayListener>
        </Modal>
        <header>
          <Grid container direction="row" alignItems="center" justify="flex-start">
            <Grid item xs={3}>
              <Grid container alignItems="center" justify="center">
                <Grid item>
                <Button variant="contained" size="medium" className={this.props.classes.backButton}
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
                    <b>Back</b>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </header>
        <main style={{ flexGrow: 1 }}>
          <Grid
            container
            alignItems={"center"}
            justify={"center"}
            direction={"column"}
            // style={{ margin: 10 }}
          >
            <Grid
              container
              alignItems={"center"}
              justify={"center"}
              direction={"row"}
            >
              <Grid item xs={3} style={{alignSelf: 'flex-start', paddingTop: '0.5em'}}>
                <Grid
                  container
                  alignItems={"center"}
                  justify={"center"}
                  direction={"column"}
                >
                  <Grid item>
                    <Dashboard
                      type="CC"
                      infoDisplay={
                        <Countdown type='CC' time={this.state.time} timerTime={RATING_INTERVAL} />
                      }
                      infoPlacement="center"
                      completeObservation={true}
                      teacherFirstName={this.props.location.state.teacher.firstName}
                      teacherLastName={this.props.location.state.teacher.lastName}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={9}>
                <Grid
                  container
                  alignItems={"center"}
                  justify={"center"}
                  direction={"column"}
                >
                  <FirebaseContext.Consumer>
                    {(firebase: object): React.ReactNode => (
                      <BehaviorCounter
                        teacherId={this.props.location.state.teacher.id}
                        firebase={firebase}
                      />
                    )}
                  </FirebaseContext.Consumer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

ClassroomClimatePage.contextType = FirebaseContext;

export default connect(null, { appendClimateRating, emptyClimateStack })(
  withStyles(styles)(ClassroomClimatePage)
);
