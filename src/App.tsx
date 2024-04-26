import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import './App.css'
import WelcomePage from './views/WelcomeViews/WelcomePage'
import LoginPage from './views/WelcomeViews/LoginPage'
import ClassroomClimatePage from './views/protected/ClassroomClimateViews/ClassroomClimatePage'
import ClassroomClimateResultsPage from './views/protected/ClassroomClimateViews/ClassroomClimateResultsPage'
import LevelOfInstructionResultsPage from './views/protected/LevelOfInstructionViews/LevelOfInstructionResultsPage'
import Magic8MenuPage from './views/protected/Magic8MenuPage'
import TransitionResultsPage from './views/protected/TransitionViews/TransitionResultsPage'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import TransitionTimePage from './views/protected/TransitionViews/TransitionTimePage'
import ForgotPasswordPage from './views/ForgotPasswordViews/ForgotPasswordPage'
import HomePage from './views/protected/HomeViews/HomePage'
import TeacherListPage from './views/protected/MyTeachers/TeacherListPage'
import ActionPlanListPage from './views/protected/ActionPlanViews/ActionPlanListPage'
import ActionPlanView from './views/protected/ActionPlanViews/ActionPlanView'
import ConferencePlanListPage from './views/protected/ConferencePlanViews/ConferencePlanListPage'
import ConferencePlanView from './views/protected/ConferencePlanViews/ConferencePlanView'
import blue from '@material-ui/core/colors/blue'
import amber from '@material-ui/core/colors/amber'
import { createTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles'
import LevelOfInstructionTrainingPage from './views/protected/LevelOfInstructionViews/LevelOfInstructionTrainingPage'
import LevelOfInstructionPage from './views/protected/LevelOfInstructionViews/LevelOfInstructionPage'
import MathInstructionTrainingPage from './views/protected/MathInstructionViews/MathInstructionTrainingPage'
import AssociativeCooperativeInteractionsPage
  from './views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsPage'
import AssociativeCooperativeInteractionsResultsPage
  from './views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsResultsPage'
import SequentialActivitiesPage from './views/protected/SequentialActivitiesViews/SequentialActivitiesPage'
import SequentialActivitiesResultsPage
  from './views/protected/SequentialActivitiesViews/SequentialActivitiesResultsPage'
import AssociativeCooperativeInteractionsTrainingPage
  from './views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsTrainingPage'
import ClassroomClimateTrainingPage from './views/protected/ClassroomClimateViews/ClassroomClimateTrainingPage'
import SequentialActivitiesTrainingPage
  from './views/protected/SequentialActivitiesViews/SequentialActivitiesTrainingPage'
import StudentEngagementPage from './views/protected/StudentEngagementViews/StudentEngagementPage'
import StudentEngagementResultsPage from './views/protected/StudentEngagementViews/StudentEngagementResultsPage'
import TransitionTimeTrainingPage from './views/protected/TransitionViews/TransitionTimeTrainingPage'
import MathInstructionPage from './views/protected/MathInstructionViews/MathInstructionPage'
import MathInstructionResultsPage from './views/protected/MathInstructionViews/MathInstructionResultsPage'
import ListeningToChildrenPage from './views/protected/ListeningViews/ListeningToChildrenPage'
import ListeningToChildrenResultsPage from './views/protected/ListeningViews/ListeningToChildrenResultsPage'
import ListeningToChildrenTrainingPage from './views/protected/ListeningViews/ListeningToChildrenTrainingPage'
import LiteracyTrainingPage from './views/protected/LiteracyViews/LiteracyTrainingPage'
import CoachingLiteracyInstruction from './views/protected/CoachingResourcesViews/LiteracyInstruction'
import LiteracyInstructionPage from './views/protected/LiteracyViews/LiteracyInstructionPage'
import LiteracyInstructionResultsPage from './views/protected/LiteracyViews/LiteracyInstructionResultsPage'
import AdminPage from './views/protected/AdminViews/AdminPage'
import TeamPage from './views/WelcomeViews/TeamPage'
import TrainingPage from './views/protected/TrainingPage'
import * as ReactGA3 from 'react-ga'
import CoachingResources from './views/protected/CoachingResourcesViews/CoachingResources'
import CoachingCoachingCycle from './views/protected/CoachingResourcesViews/CoachingCycle'
import CoachingProfessionalDevelopmentMaterials
  from './views/protected/CoachingResourcesViews/ProfessionalDevelopmentMaterials'
import CoachingTransitionTime from './views/protected/CoachingResourcesViews/TransitionTime'
import CoachingClassroomClimate from './views/protected/CoachingResourcesViews/ClassroomClimate'
import CoachingMathInstruction from './views/protected/CoachingResourcesViews/MathInstruction'
import CoachingLevelOfInstruction from './views/protected/CoachingResourcesViews/LevelOfInstruction'
import CoachingStudentEngagement from './views/protected/CoachingResourcesViews/StudentEngagement'
import CoachingListeningToChildren from './views/protected/CoachingResourcesViews/ListeningToChildren'
import CoachingSequentialActivities from './views/protected/CoachingResourcesViews/SequentialActivities'
import CoachingAssociativeAndCooperativeInteractions
  from './views/protected/CoachingResourcesViews/AssociativeAndCooperativeInteractions'
import CoachingCoachingBestPractices from './views/protected/CoachingResourcesViews/CoachingBestPractices'
import CoachingChalkCrosswalks from './views/protected/CoachingResourcesViews/ChalkCrosswalks'
import MessagingView from './views/protected/MessagingViews/MessagingView'
import CHALKLogoGIF from './assets/images/CHALKLogoGIF.gif'
import Grid from '@material-ui/core/Grid'
import { coachLoaded, Role } from './state/actions/coach'
import { getUnlocked } from './state/actions/unlocked'
import { LiteracyTrainingFlags, setLiteracyTraining } from './state/actions/training-literacy'
import { getTeacherList } from './state/actions/teacher'
import { connect } from 'react-redux'
import StudentEngagementTrainingPage from './views/protected/StudentEngagementViews/StudentEngagementTrainingPage'
import * as H from 'history'
import * as Types from './constants/Types'
import MyAccountPage from './views/protected/MyAccount/MyAccountPage'
import { UserDocument } from './components/Firebase/Firebase'
import Firebase from './components/Firebase'
import NewUserPage from './views/protected/AdminViews/NewUserPage'
import LeadersDashboard from './views/protected/LeadersViews/LeadersDashboard'
import NewProgramPage from './views/protected/LeadersViews/NewProgramPage'
import MyProgramsPage from './views/protected/LeadersViews/MyProgramsPage'
import NewSitePage from './views/protected/LeadersViews/NewSitePage'
import ReportsPage from './views/protected/ReportsViews/ReportsPage'
import ChalkPracticePage from './views/protected/ChalkPracticeViews/chalkPracticePage'
import UsersPage from './views/protected/UsersViews/UsersPage'

import CreateTable from './components/tempCustomFunction/CreateTable'

ReactGA3.initialize('UA-154034655-1');
ReactGA3.pageview(window.location.pathname + window.location.search);

// LogRocket.init('akprci/cqref');
// setupLogRocketReact(LogRocket);

const styles: Theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      // textColor: "#fff",
      contrastText: "#fff"
    },
    secondary: {
      light: amber[300],
      main: amber[500],
      dark: amber[700],
      contrastText: "#000"
    }
  }
});

/**
 *
 * @return {ReactElement}
 */
function PrivateRoute({ auth, allowedRoles = [], userRole = Role.ANONYMOUS, ...rest } : {auth: boolean, allowedRoles: Array<Role>, userRole: Role}): React.ReactElement {
  if (auth){
    if (allowedRoles.length == 0 || allowedRoles.find(r => r === userRole)){
      return (
          <Route
              exact
              {...rest}
          />)
    }else{
      return <Route
          {...rest}
          render={(props): React.ReactNode => {
            return (
                <Redirect to={{ pathname: '/', state: {from: props.location}}} />
            )
          }}
      />
    }
  }else{
    return <Route
        {...rest}
        render={(props): React.ReactNode => {
          return (
              <Redirect to={{ pathname: '/', state: {from: props.location}}} />
          )
        }}
    />
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.bool.isRequired,
  allowedRoles: PropTypes.array,
  userRole: PropTypes.string,
  location: PropTypes.object,
  path: PropTypes.string,
  render: PropTypes.func
}

interface Props {
  firebase: Firebase,
  coachLoaded(name: string, role: Role): void,
  getUnlocked(unlocked: Array<number>): void,
  // adding literacy training data to redux
  setLiteracyTraining(result: LiteracyTrainingFlags): void,
  getTeacherList(teachers: Array<Types.Teacher>): Array<Types.Teacher>
}

interface State {
  auth: boolean,
  loading: boolean,
  role: Role
}

/**
 * @class App
 */
class App extends React.Component<Props, State> {
  removeListener: any;

  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      auth: false,
      loading: true,
      role: Role.ANONYMOUS
    };
  }

  /** invoked after component mounts */
  componentDidMount(): void {
    this.removeListener = this.props.firebase.auth.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.props.firebase.getUserInformation().then((user: UserDocument) => {
          this.props.firebase.getUserRole().then((role: Role) => {
            this.props.coachLoaded(user.firstName, role, user);
            this.setState({
              auth: true,
              loading: false,
              role
            });
          })

        });
        this.props.firebase.getUnlockedSections().then((unlocked: Array<number>) => {
          this.props.getUnlocked(unlocked);
        })
        this.props.firebase.getLiteracyTraining().then((result: LiteracyTrainingFlags ) => {
          this.props.setLiteracyTraining(result)
        })
        this.props.firebase.getTeacherList().then((teacherPromiseList: Array<Types.Teacher>) => {
          const teacherList: Array<Types.Teacher> = [];
          teacherPromiseList.forEach(tpromise => {
            tpromise.then((data: Types.Teacher) => {
              teacherList.push(data);
            });
          });
          this.props.getTeacherList(teacherList);
        });
      } else {
        this.setState({
          auth: false,
          loading: false
        });
      }
    });
  }

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount(): void {
    this.removeListener();
  }

  static propTypes = {
    firebase: PropTypes.object,
    coachLoaded: PropTypes.func.isRequired,
    getUnlocked: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const {
      loading,
        role,
        auth
    } = this.state;
    return loading === true ? (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{height: "100vh"}}
      >
        <img src={CHALKLogoGIF} alt="Loading" width="80%" />
      </Grid>
    ) : (
      <BrowserRouter>
        <MuiThemeProvider theme={styles}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props): React.ReactElement =>
                auth === true ? (
                  <Redirect to={{ pathname: '/Home', state: { from: props.location } }} />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route exact path="/forgot" component={ForgotPasswordPage} />
            <PrivateRoute
              auth={auth}
              path="/Landing"
              render={(props: object) : React.ReactElement=> <WelcomePage {...props}/>}
             allowedRoles={[]}
              userRole={role}
            />
            <PrivateRoute
              auth={auth}
              path="/Invite"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <HomePage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/Account"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <HomePage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/Home"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <HomePage {...props}/>}
            />
            <PrivateRoute
              auth={auth || !auth}
              path="/team"
              allowedRoles={[]}
              userRole={role}
              render={(props: object) : React.ReactElement=> <TeamPage {...props}/>}
            />
            <PrivateRoute
              auth={auth || !auth}
              path="/Training"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <TrainingPage isTeacher={role === Role.TEACHER }{...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/Messaging"
              allowedRoles={[Role.COACH,Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              component={MessagingView}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ActionPlans"
              allowedRoles={[Role.COACH, ,Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ActionPlanListPage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/ActionPlan"
              allowedRoles={[Role.COACH, ,Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History,
                actionPlanId: string,
                location: H.Location,
                classes: {
                  backButton: string
                }
              }) : React.ReactElement=> <ActionPlanView {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              allowedRoles={[Role.COACH, Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              path="/ConferencePlans"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ConferencePlanListPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ConferencePlan"
              allowedRoles={[Role.COACH, Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History,
                location: H.Location,
                classes: {
                  backButton: string
                }
              }) : React.ReactElement=> <ConferencePlanView {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/TransitionTime"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <TransitionTimePage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LevelOfInstruction"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History,
                classes: object
              }) : React.ReactElement=> <LevelOfInstructionPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ClassroomClimate"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ClassroomClimatePage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ListeningToChildren"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ListeningToChildrenPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ListeningToChildrenResults"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ListeningToChildrenResultsPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ListeningToChildrenTraining"
              allowedRoles={[]}
              userRole={role}
              render={(props: object) : React.ReactElement=> <ListeningToChildrenTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/AssociativeCooperativeInteractions"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <AssociativeCooperativeInteractionsPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/AssociativeCooperativeInteractionsResults"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <AssociativeCooperativeInteractionsResultsPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/MathInstruction"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <MathInstructionPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/MathInstructionResults"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <MathInstructionResultsPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/SequentialActivities"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <SequentialActivitiesPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              allowedRoles={[]}
              userRole={role}
              path="/MathInstructionTraining"
              render={(props: object) : React.ReactElement=> <MathInstructionTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/SequentialActivitiesResults"
              allowedRoles={[]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <SequentialActivitiesResultsPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              allowedRoles={[]}
              userRole={role}
              path="/AssociativeCooperativeInteractionsTraining"
              render={(props: object) : React.ReactElement=> <AssociativeCooperativeInteractionsTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              allowedRoles={[]}
              userRole={role}
              path="/LevelOfInstructionTraining"
              render={(props: object) : React.ReactElement=> <LevelOfInstructionTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              allowedRoles={[]}
              userRole={role}
              path="/ClassroomClimateTraining"
              render={(props: object) : React.ReactElement=> <ClassroomClimateTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              allowedRoles={[]}
              userRole={role}
              path="/SequentialActivitiesTraining"
              render={(props: object) : React.ReactElement=> <SequentialActivitiesTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              allowedRoles={[]}
              userRole={role}
              path="/TransitionTimeTraining"
              render={(props: object) : React.ReactElement=> <TransitionTimeTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              allowedRoles={[]}
              userRole={role}
              path="/LiteracyInstructionTraining"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <LiteracyTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LiteracyInstruction"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <LiteracyInstructionPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LiteracyInstructionResults"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <LiteracyInstructionResultsPage {...props}/>}
            />
            <PrivateRoute
              exact
              auth={this.state.auth}
              path="/MyTeachers"
              allowedRoles={[Role.COACH, Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History,
                type: string
              }) : React.ReactElement=> <TeacherListPage {...props}/>}
            />
            <PrivateRoute
                auth={this.state.auth}
                allowedRoles={[]}
                userRole={role}
                path="/StudentEngagement"
                render={(props: object) : React.ReactElement=> <StudentEngagementPage {...props}/>}
            />
            <PrivateRoute
                auth={this.state.auth}
                allowedRoles={[]}
                userRole={role}
                path="/StudentEngagementResults"
                render={(props: {
                  history: H.History
                }) : React.ReactElement=> <StudentEngagementResultsPage {...props}/>}
            />
            <PrivateRoute
                auth={this.state.auth}
                allowedRoles={[]}
                userRole={role}
                path="/StudentEngagementTraining"
                render={(props: object) : React.ReactElement=> <StudentEngagementTrainingPage {...props}/>}
            />

            {/* this is the ugly way I had to do the router bc i wasn't sure how to pass
                          the type prop into the PrivateRoute function*/}
            <Route
              path="/Magic8Menu"
              render={(props): React.ReactElement =>
                this.state.auth === true ? (
                  <Magic8MenuPage
                    {...props}
                    type={
                      props.location.state.type === "Results"
                        ? "Results"
                        : "Observe"
                    }
                  />
                ) : (
                  <Redirect
                    to={{ pathname: "/", state: { from: props.location } }}
                  />
                )
              }
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/TransitionTimeResults"
              allowedRoles={[]}
              userRole={role}
              component={TransitionResultsPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              allowedRoles={[]}
              userRole={role}
              path="/ClassroomClimateResults"
              component={ClassroomClimateResultsPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              allowedRoles={[]}
              userRole={role}
              path="/LevelOfInstructionResults"
              component={LevelOfInstructionResultsPage}
            />
            <PrivateRoute
                auth={this.state.auth}
                allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
                userRole={role}
                path="/Admin"
                component={AdminPage}
            />
            <PrivateRoute
                auth={this.state.auth}
                allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
                userRole={role}
                path="/NewUser"
                component={NewUserPage}
            />

            <PrivateRoute
                auth={this.state.auth}
                path="/MyAccount"
                component={MyAccountPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources"
              exact={true}
              component={CoachingResources}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/CoachingCycle"
              exact={true}
              component={CoachingCoachingCycle}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ProfessionalDevelopmentMaterials"
              exact={true}
              component={CoachingProfessionalDevelopmentMaterials}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ProfessionalDevelopmentMaterials/TransitionTime"
              component={CoachingTransitionTime}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ProfessionalDevelopmentMaterials/ClassroomClimate"
              component={CoachingClassroomClimate}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ProfessionalDevelopmentMaterials/MathInstruction"
              component={CoachingMathInstruction}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ProfessionalDevelopmentMaterials/LevelOfInstruction"
              component={CoachingLevelOfInstruction}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ProfessionalDevelopmentMaterials/StudentEngagement"
              component={CoachingStudentEngagement}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ProfessionalDevelopmentMaterials/ListeningToChildren"
              component={CoachingListeningToChildren}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ProfessionalDevelopmentMaterials/SequentialActivities"
              component={CoachingSequentialActivities}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ProfessionalDevelopmentMaterials/LiteracyInstruction"
              component={CoachingLiteracyInstruction}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ProfessionalDevelopmentMaterials/AssociativeAndCooperativeInteractions"
              component={CoachingAssociativeAndCooperativeInteractions}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/CoachingBestPractices"
              exact={true}
              component={CoachingCoachingBestPractices}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/CoachingResources/ChalkCrosswalks"
              exact={true}
              component={CoachingChalkCrosswalks}
            />

            <PrivateRoute
                auth={this.state.auth}
                allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
                userRole={role}
                path="/LeadersDashboard"
                render={(props: object) : React.ReactElement=> <LeadersDashboard {...props}/>}
            />
            <PrivateRoute
                auth={this.state.auth}
                allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
                userRole={role}
                path="/MyPrograms"
                render={(props: object) : React.ReactElement=> <MyProgramsPage {...props}/>}
            />
            <PrivateRoute
                auth={this.state.auth}
                allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
                userRole={role}
                path="/NewProgram"
                render={(props: object) : React.ReactElement=> <NewProgramPage {...props}/>}
            />
            <PrivateRoute
                auth={this.state.auth}
                allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
                userRole={role}
                path="/NewSite"
                render={(props: object) : React.ReactElement=> <NewSitePage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/Reports"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ReportsPage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/ReportsList"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ReportsPage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/ReportImages"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ReportsPage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/ReportDesc"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ReportsPage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/TeacherProfile"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ReportsPage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/CoachProfile"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ReportsPage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/SiteProfile"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ReportsPage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/ProgramProfile"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ReportsPage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/LeadersClassroomPractices"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ChalkPracticePage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/LeadersUsers"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <UsersPage {...props}/>}
            />

            <PrivateRoute
              auth={auth}
              path="/LeadersTeachers"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <UsersPage {...props}/>}
            />  

            <PrivateRoute
              auth={auth}
              path="/LeadersCoaches"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <UsersPage {...props}/>}
            />  
            <PrivateRoute
              auth={auth}
              path="/LeadersSites"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <UsersPage {...props}/>}
            />
            <PrivateRoute
              auth={auth}
              path="/LeadersArchive"
              allowedRoles={[Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER]}
              userRole={role}
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <UsersPage {...props}/>}
            />    

            <PrivateRoute
              auth={this.state.auth}
              path="/CreateTable"
              exact={true}
              component={CreateTable}
            />

            <Route render={(): React.ReactElement => <h3>No Match</h3>} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default hot(connect(null, {coachLoaded: coachLoaded, getUnlocked, setLiteracyTraining, getTeacherList})(App));
