import * as React from 'react';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar.js';
import Grid from '@material-ui/core/Grid';
import ConferencePlanForm from '../../../components/ConferencePlanForm';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from '@material-ui/core/Button';

interface Props {
  actionPlanId: string,
  location: {state: {conferencePlanId: string, teacherId: string, sessionId: string}},
  classes: {
    backButton: string
  },
  history: {
    replace(
      param: {
        pathname: string
      }
    ): void
  }
}

interface State {
  teacher: Teacher,
  dialog: boolean,
  event: React.SyntheticEvent
}

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
      teacher: null,
      dialog: false,
      event: null
    }
  }

  onClickAway = (e: React.SyntheticEvent): void => {
    // alert('clicked away');
    // alert(e.currentTarget);
    /* this.setState({
      event: e
    }, () => {this.setState({dialog: true})}) */
  }

  handleYes = (e: React.SyntheticEvent): void => {
    this.setState({dialog: false});
    e;
    console.log('event', e);
  }

  handleNo = (): void => {
    // event.preventDefault();
    this.setState({dialog: false})
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

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Dialog open={this.state.dialog}>
          <DialogTitle>
            You must save or undo your changes before navigating away from the page.
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => this.handleYes(this.state.event)}>
              Undo Changes
            </Button>
            <Button onClick={this.handleNo}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <main>
          <ClickAwayListener onClickAway={this.onClickAway}>
          <Grid direction="column" justify="center" alignItems="center" style={{paddingLeft: '3em', paddingRight: '3em', paddingTop: '1em'}}>
            <Grid item>
              <Grid container justify="center" alignItems="center" style={{width: '100%'}}>
                {this.state.teacher ? (
                  <FirebaseContext.Consumer>
                    {(firebase: object): React.ReactNode => <ConferencePlanForm 
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
          </ClickAwayListener>
        </main>
      </div>
    );
  }
}

ConferencePlanView.contextType = FirebaseContext;
export default ConferencePlanView;