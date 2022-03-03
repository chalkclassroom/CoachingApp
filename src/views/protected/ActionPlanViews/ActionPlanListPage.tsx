import * as React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableSortLabel
} from '@material-ui/core';
import * as moment from 'moment';
import TransitionTimeIconImage from '../../../assets/images/TransitionTimeIconImage.svg';
import ClassroomClimateIconImage from '../../../assets/images/ClassroomClimateIconImage.svg';
import MathIconImage from '../../../assets/images/MathIconImage.svg';
import EngagementIconImage from '../../../assets/images/EngagementIconImage.svg';
import InstructionIconImage from '../../../assets/images/InstructionIconImage.svg';
import ListeningIconImage from '../../../assets/images/ListeningIconImage.svg';
import SequentialIconImage from '../../../assets/images/SequentialIconImage.svg';
import LiteracyIconImage from '../../../assets/images/LiteracyIconImage.svg';
import AssocCoopIconImage from '../../../assets/images/AssocCoopIconImage.svg';
import ActionPlanList from '../../../components/ActionPlanList';
import * as H from 'history';
import * as Types from '../../../constants/Types';
import Firebase from '../../../components/Firebase'

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
          {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid direction="column" justify="center" alignItems="center">
          <Grid item style={{width: '100%', paddingTop: '2em'}}>
            <Typography variant="h3" align="center" style={{fontFamily: 'Arimo'}}>
              Action Plans
            </Typography>
          </Grid>
          <Grid item style={{width: '100%', paddingTop: '2em'}}>
            <Grid container justify="center" alignItems="center" style={{maxHeight: '70vh', paddingLeft: '5em', paddingRight: '5em', overflow: 'auto'}}>
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