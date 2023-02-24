import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../AppBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TrainingIcon from "@material-ui/icons/School";
import ObserveIcon from "@material-ui/icons/Visibility";
import PeopleIcon from "@material-ui/icons/People";
import ResultsIcon from "@material-ui/icons/PieChart";
import ActionPlansIcon from "@material-ui/icons/CastForEducation";
import ConferencePlansIcon from "@material-ui/icons/ListAlt";
import FirebaseContext from "../Firebase/FirebaseContext";
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif';
import { coachLoaded, Role } from '../../state/actions/coach'
import { connect } from 'react-redux';
import * as Types from '../../constants/Types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as H from 'history';
import Firebase from '../Firebase'

import "firebase/functions";

const styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  grow: {
    flexGrow: 1
  },
  card: {
    maxHeight: "90%",
    flex: 1,
    marginTop: '1em',
    marginBottom: '1em',
    marginLeft: '2em',
    marginRight: '2em'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  image: {
    height: "12vh",
    width: "12vw"
  },
  buttonGrid: {
    height: '30vh'
  },
  landscape: {
    width: '100%'
  },
  portrait: {
    display: 'none'
  },
  helpButtons: {
    fontSize: '1em'
  },
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation: portrait)': {
    portrait: {
      display: 'flex'
    },
    landscape: {
      display: 'none'
    },
    helpButtons: {
      fontSize: '1.5em'
    },
  }
};

interface Style {
  root: string,
  grow: string,
  card: string,
  title: string,
  pos: string,
  image: string,
  buttonGrid: string,
  portrait: string,
  landscape: string,
  helpButtons: string
}

interface Props {
  classes: Style,
  coachName: string,
  getCoach(name: string): void,
  history: H.History
}

interface State {
  teacherModal: boolean,
  type: string,
  coachName: string
}

/**
 * home page
 * @class CreateTable
 */
class CreateTable extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      teacherModal: false,
      type: "",
      coachName: "",
    }
  }

  //const firebase = props.firebase;

  /**
   * @param {string} type
   */
  showTeacherModal = (type: string): void => {
    this.setState({ teacherModal: true, type: type });
  };

  handleClose = (): void => {
    this.setState({
      teacherModal: false,
      type: ""
    });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const firebase = this.context;
    if (!this.props.coachName) {
      firebase.getCoachFirstName().then((name: string): void => {
        this.props.getCoach(name);
      })
    }
    // firebase.handleFetchTrainingStatus();
    // firebase.handleFetchQuestions("transition");
  }

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      grow: PropTypes.string,
      card: PropTypes.string,
      title: PropTypes.string,
      pos: PropTypes.string,
      image: PropTypes.string,
      buttonGrid: PropTypes.string,
      portrait: PropTypes.string,
      landscape: PropTypes.string,
      helpButtons: PropTypes.string
    }).isRequired,
    coachName: PropTypes.string.isRequired,
    getCoach: PropTypes.func.isRequired,
    userRole: PropTypes.string,
    history: ReactRouterPropTypes.history
  }


  createTables = () => {
    const firebase = this.context;

    firebase.populateFirebase();

  }

  retrieveTable = () => {
    const firebase = this.context;
    firebase.retrieveTableFromFirestore();
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes, userRole, coachName } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} noBack={true} />}
        </FirebaseContext.Consumer>
{/* 
        <div className="content-wrap">
          <h1>Create the results tables by clicking the button below: </h1>
          <button onClick={this.createTables}>Create Tables</button>
        </div> */}

        </div>

        {this.state.teacherModal ? (
          <FirebaseContext.Consumer>
            {(firebase: {
              getTeacherList(): Promise<Types.Teacher[]>
            }): React.ReactNode => (
              <TeacherModal
                handleClose={this.handleClose}
                firebase={firebase}
                type={this.state.type}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {coachName: string, userRole: Role} => {
  return {
    coachName: state.coachState.coachName,
    userRole: state.coachState.role
  };
};

CreateTable.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, {getCoach: coachLoaded})(CreateTable));
