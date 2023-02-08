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
      pageHistory: [{url: "Reports", title: "Reports"}],
      subPage: 1,
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


  changePage = (pageUrl) => {
    const pageUrlToName = {
      TeacherProfile: 'Teacher Profile',
      SiteProfile: 'Site Profile',
      ProgramProfile: 'Program Profile',
      CoachProfile: 'Coach Profile',
      Reports: 'Reports',

      TeacherResults: "Results",
      SiteResults: "Results",
      ProgramResults: "Results",
      CoachResults: "Results",
    }

    console.log("Changing the page again : ", pageUrl);

    console.log("Props History : ", this.props.history);


    var pageHistory = [...this.state.pageHistory];

    // We need to add to page history. If the current page is already in the list that means we went back
    if(pageHistory.find(o => o.url === pageUrl))
    {
      this.props.history.push(pageUrl)

      // If the last item in the page history is a results page, we need to set the sub page back to reports form page
      if(pageUrlToName[pageHistory[pageHistory.length - 1].url] === "Results")
      {
        this.setState({subPage: 1});
      }

      // Get the index of the object so we can remove everything after it
      var indexOfPage = pageHistory.map(o => o.url).indexOf(pageUrl);

      pageHistory.length = indexOfPage + 1;
    }
    else
    {
      // Having a problem where the previously viewed profile page shows up in the bread crumbs if the user presses back button then views another profile
      // This is because pressing back button doesn't remove anything from the history
      // So if we're pulling up another profile page, let's just reset the page history THEN push the new page.
      if(pageUrl.includes('Profile'))
      {
        pageHistory = [{url: 'Reports', title: 'Reports'}]
      }

      pageHistory.push({url: pageUrl, title: pageUrlToName[pageUrl]});
    }
    this.setState({
      currentPage: pageUrl,
      pageHistory: pageHistory,
    });
  }


  changeSubPage = (pageNumber) => {
    this.setState({subPage: pageNumber});
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
          {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} callback={() => this.changeSubPage(1) } />}
        </FirebaseContext.Consumer>
        <Grid container className={classes.pictureBar}>
            <Grid item xs={1} style={{padding: '1.5em 0 1.5em 0'}}>
                <img src={ReportsIcon} style={{fill: "#0988ec", height: '70px', width: '70px', minHeight: '2em', maxHeight: '120px', minWidth: '2em', paddingLeft: '2.8em'}} />
            </Grid>
        </Grid>
        <MenuBar
          page={this.state.currentPage}
          pageHistory={this.props.location.pathname === '/Reports' ? [{title: 'Reports', url: 'Reports'}] : this.state.pageHistory}
          changePage={(pageName) => this.changePage(pageName)}
        />
        <div style={{display: "flex"}}>
          <Sidebar
            currPage={this.state.currentPage}
            callback={() => this.changeSubPage(1) }
          />
          <Switch location={location} key={location.pathname}>
            <Route path="/Reports" component={Reports} />
            <Route path="/TeacherProfile" render={(props) =>
              <TeacherProfile
                changePage={(pageName) => this.changePage(pageName)}
                userRole={userRole}
                location={this.props.location}
                changeSubPage={(pageName) => this.changeSubPage(pageName)}
                subPage={this.props.location.pathname === '/Reports' ? 1 : this.state.subPage}
                />
            } />
            <Route path="/CoachProfile" render={(props) =>
              <CoachProfile
                changePage={(pageName) => this.changePage(pageName)}
                userRole={userRole}
                location={this.props.location}
                changeSubPage={(pageName) => this.changeSubPage(pageName)}
                subPage={this.state.subPage}
                />
            } />
            <Route path="/SiteProfile" render={(props) =>
              <SiteProfile
                changePage={(pageName) => this.changePage(pageName)}
                userRole={userRole}
                location={this.props.location}
                changeSubPage={(pageName) => this.changeSubPage(pageName)}
                subPage={this.state.subPage}
                />
            } />
            <Route path="/ProgramProfile" render={(props) =>
              <ProgramProfile
                changePage={(pageName) => this.changePage(pageName)}
                userRole={userRole}
                location={this.props.location}
                changeSubPage={(pageName) => this.changeSubPage(pageName)}
                subPage={this.state.subPage}
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
