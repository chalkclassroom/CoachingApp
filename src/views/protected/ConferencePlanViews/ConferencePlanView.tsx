import * as React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar';
import Grid from '@material-ui/core/Grid';
import ConferencePlanForm from '../../../components/ConferencePlanForm';
import * as Types from '../../../constants/Types';
import * as H from 'history';
import Firebase from '../../../components/Firebase'

interface Props {
  location: H.Location,
  history: H.History
}

interface State {
  teacher: Types.Teacher,
}

/**
 * @class ConferencePlanView
 */
class ConferencePlanView extends React.Component<Props, State>{
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
          {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <main>
          <Grid direction="column" justify="center" alignItems="center" style={{paddingLeft: '3em', paddingRight: '3em', paddingTop: '1em'}}>
            <Grid item>
              <Grid container justify="center" alignItems="center" style={{width: '100%'}}>
                {this.state.teacher ? (
                  <FirebaseContext.Consumer>
                    {(firebase: Firebase): React.ReactNode => <ConferencePlanForm
                      firebase={firebase}
                      conferencePlanId={this.props.location.state.conferencePlanId}
                      teacher={this.state.teacher}
                      readOnly={true}
                      conferencePlanExists={true}
                      history={this.props.history}
                      sessionId={this.props.location.state.sessionId}
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

ConferencePlanView.contextType = FirebaseContext;
export default ConferencePlanView;