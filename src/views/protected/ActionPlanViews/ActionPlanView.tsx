import * as React from 'react';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar.js';
import Grid from '@material-ui/core/Grid';
import ActionPlanForm from '../../../components/ActionPlanForm';
import Button from '@material-ui/core/Button';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { withStyles } from "@material-ui/core/styles";

interface Props {
  actionPlanId: string,
  location: {state: {actionPlanId: string, teacherId: string}},
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
  teacher: Teacher
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

const styles: object = {
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  }
};

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
      teacher: null
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

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <header>
          <Grid container direction="row" alignItems="flex-start" justify="flex-start">
            <Grid item xs={3}>
              <Grid container alignItems="center" justify="flex-start">
                <Grid item style={{paddingLeft: '1.5em'}}>
                  <Button
                    variant="contained"
                    size="medium"
                    className={classes.backButton}
                    onClick={(): void => {
                      this.props.history.replace({
                        pathname: "/ActionPlans"
                      })
                    }}
                  >
                    <ChevronLeftRoundedIcon />
                    <b>Back</b>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </header>
        <main>
          <Grid direction="column" justify="center" alignItems="center" style={{paddingLeft: '1.5em', paddingRight: '1.5em'}}>
            <Grid item>
              <Grid container justify="center" alignItems="center" style={{width: '100%'}}>
                {this.state.teacher ? (
                  <FirebaseContext.Consumer>
                    {(firebase: object): React.ReactNode => <ActionPlanForm 
                      firebase={firebase}
                      actionPlanId={this.props.location.state.actionPlanId}
                      teacher={this.state.teacher}
                      readOnly={true}
                      actionPlanExists={true}
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
export default withStyles(styles)(ActionPlanView);