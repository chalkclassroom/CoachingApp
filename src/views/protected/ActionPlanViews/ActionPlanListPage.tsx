import * as React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ActionPlanList from '../../../components/ActionPlanList';
import * as H from 'history';
import * as Types from '../../../constants/Types';

interface Props {
  history: H.History
}

/**
 * @class ActionPlanListPage
 */
class ActionPlanListPage extends React.Component<Props, {}>{
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
  }

  /**
   * @param {string} actionPlanId
   * @param {string} teacherId
   */
  handleChooseActionPlan = (actionPlanId: string, teacherId: string): void => {
    this.props.history.push({
      pathname: "/ActionPlan",
      state: {
        actionPlanId: actionPlanId,
        teacherId: teacherId
      }
    })
  };

  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired
  };

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid direction="column" justify="center" alignItems="center">
          <Grid item style={{width: '100%', paddingTop: '2em'}}>
            <Typography variant="h3" align="center" style={{fontFamily: 'Arimo'}}>
              Action Plans
            </Typography>
          </Grid>
          <Grid item style={{width: '100%', paddingTop: '2em'}}>
            <Grid container justify="center" alignItems="center" style={{maxHeight: '60vh', paddingLeft: '5em', paddingRight: '5em', overflow: 'auto'}}>
              <ActionPlanList onClick={this.handleChooseActionPlan}/>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ActionPlanListPage.contextType = FirebaseContext;
export default ActionPlanListPage;