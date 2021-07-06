import * as React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar';
import Grid from '@material-ui/core/Grid';
import ActionPlanForm from '../../../components/ActionPlanForm';
import * as Types from '../../../constants/Types';
import * as H from 'history';

interface Props {
  location: H.Location,
  history: H.History
}

interface State {
  teacher: Types.Teacher
}

/**
 * @class ActionPlanView
 */
class ActionPlanView extends React.Component<Props, State>{
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state={
      teacher: {
        email: '',
        firstName: '',
        lastName: '',
        id: '',
        phone: '',
        notes: '',
        role: 'teacher',
        school: ''
      }
    }
  }

  /**
   *
   */
  componentDidMount(): void {
    const firebase = this.context;
    firebase.getTeacherInfo(this.props.location.state.teacherId)
      .then((teacherInfo: {
        email: string,
        firstName: string,
        lastName: string,
        notes: string,
        id: string,
        phone: string,
        role: string,
        school: string
      }) => this.setState({teacher: teacherInfo}))
  }

  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  }

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <main>
          <Grid direction="column" justify="center" alignItems="center" style={{paddingLeft: '3em', paddingRight: '3em', paddingTop: '1em'}}>
            <Grid item>
              <Grid container justify="center" alignItems="center" style={{width: '100%'}}>
                {this.state.teacher ? (
                  <FirebaseContext.Consumer>
                    {(firebase: {
                      createActionPlan(teacherId: string, magic8: string): Promise<void>,
                      getAPInfo(actionPlanId: string): Promise<{
                        sessionId: string,
                        goal: string,
                        goalTimeline: firebase.firestore.Timestamp,
                        benefit: string,
                        dateModified: {seconds: number, nanoseconds: number},
                        dateCreated: {seconds: number, nanoseconds: number},
                        coach: string,
                        teacher: string,
                        tool: string
                      }>,
                      getTeacherActionPlans(practice: string, teacherId: string): Promise<Array<{
                        id: string,
                        date: {seconds: number, nanoseconds: number},
                        newDate: Date
                      }>>,
                      getActionSteps(actionPlanId: string): Promise<Array<{
                        step: string,
                        person: string,
                        timeline: firebase.firestore.Timestamp
                      }>>,
                      saveActionPlan(
                        actionPlanId: string,
                        goal: string,
                        goalTimeline: string,
                        benefit: string
                      ): Promise<void>,
                      saveActionStep(
                        actionPlanId: string,
                        index: string,
                        step: string,
                        person: string,
                        timeline: string
                      ): Promise<void>,
                      createActionStep(actionPlanId: string, index: string): Promise<void>,
                      getCoachFirstName(): Promise<string>,
                      getCoachLastName(): Promise<string>
                    }): React.ReactNode => <ActionPlanForm
                      firebase={firebase}
                      actionPlanId={this.props.location.state.actionPlanId}
                      teacher={this.state.teacher}
                      readOnly={true}
                      actionPlanExists={true}
                      history={this.props.history}
                    />}
                  </FirebaseContext.Consumer>
                ) : (null)}
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

ActionPlanView.contextType = FirebaseContext;
export default ActionPlanView;