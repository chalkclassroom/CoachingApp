import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import Grid from "@material-ui/core/Grid";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { coachLoaded, Role } from '../../../state/actions/coach'
import { connect } from 'react-redux';
import * as Types from '../../../constants/Types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as H from 'history';
import Firebase from '../../../components/Firebase'
import MenuBar from './MenuBar'
import ReportsIcon from '../../../assets/icons/ReportsIcon.png';
import Reports from './Reports';
import ReportsList from "./ReportsList";
import ReportDesc from "./ReportDesc";
import ReportImages from "./ReportImages";
import Sidebar from "./Sidebar";
import { Switch, Route,} from "react-router-dom";
import ReportsImages from "./ReportImages";
import TeacherProfile from "../../../components/TeacherProfileComponents/TeacherProfile";
import CoachProfile from "../../../components/CoachProfileComponents/CoachProfile";
import SiteProfile from "../../../components/SiteProfileComponents/SiteProfile";
import ProgramProfile from "../../../components/ProgramProfileComponents/ProgramProfile";


const styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  pictureBar: {
    position: 'static',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    minHeight: '4em',
    maxHeight: '200px',
  },
};

interface Style {
  root: string,
  pictureBar: string
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
 * reports page
 * @class ReportsPage
 */
class ReportsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      teacherModal: false,
      type: "",
      coachName: "",
      currentPage: "",
    }
  }

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
      pictureBar: PropTypes.string,
    }).isRequired,
    coachName: PropTypes.string.isRequired,
    getCoach: PropTypes.func.isRequired,
    userRole: PropTypes.string,
    history: ReactRouterPropTypes.history
  }


  changePage = (pageName) => {
    this.setState({currentPage: pageName});
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
          {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid container className={classes.pictureBar}>
            <Grid item xs={1} style={{padding: '1.5em 0 1.5em 0'}}>
                <img src={ReportsIcon} style={{fill: "#0988ec", height: '70px', width: '70px', minHeight: '2em', maxHeight: '120px', minWidth: '2em', paddingLeft: '2.8em'}} />
            </Grid>
        </Grid>
        <MenuBar/>
        <div style={{display: "flex"}}>
          <Sidebar currPage={this.state.currentPage} />
          <Switch location={location} key={location.pathname}>
            <Route path="/Reports" component={Reports} />
            <Route path="/ReportsList" component={ReportsList} />
            <Route path="/ReportImages" component={ReportImages} />
            <Route path="/ReportDesc" component={ReportDesc} />
            <Route path="/TeacherProfile" render={(props) =>
              <TeacherProfile
                changePage={(pageName) => this.changePage(pageName)}
                userRole={userRole}
                location={this.props.location}
                />
            } />
            <Route path="/CoachProfile" render={(props) =>
              <CoachProfile
                changePage={(pageName) => this.changePage(pageName)}
                userRole={userRole}
                location={this.props.location}
                />
            } />
            <Route path="/SiteProfile" render={(props) =>
              <SiteProfile
                changePage={(pageName) => this.changePage(pageName)}
                userRole={userRole}
                location={this.props.location}
                />
            } />
            <Route path="/ProgramProfile" render={(props) =>
              <ProgramProfile
                changePage={(pageName) => this.changePage(pageName)}
                userRole={userRole}
                location={this.props.location}
                />
            } />
            {/* <Route path="/TeacherResults" component={TeacherResults} />
            <Route path="/CoachResults" component={CoachResults} />
            <Route path="/SiteResults" component={SiteResults} />
            <Route path="/ProgramResults" component={ProgramResults} /> */}
          </Switch>
        </div>
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

ReportsPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, {getCoach: coachLoaded})(ReportsPage));
