import * as React from 'react';
import * as PropTypes from "prop-types";
import ReactRouterPropTypes from 'react-router-prop-types';
import Magic8Card from './Magic8Card';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import AssocCoopIconImage from "../assets/images/AssocCoopIconImage.svg";
import ClassroomClimateIconImage from "../assets/images/ClassroomClimateIconImage.svg";
import InstructionIconImage from "../assets/images/InstructionIconImage.svg";
import ListeningIconImage from "../assets/images/ListeningIconImage.svg";
import MathIconImage from "../assets/images/MathIconImage.svg";
import SequentialIconImage from "../assets/images/SequentialIconImage.svg";
import EngagementIconImage from "../assets/images/EngagementIconImage.svg";
import LiteracyIconImage from '../assets/images/LiteracyIconImage.svg';
import TransitionTimeIconImage from "../assets/images/TransitionTimeIconImage.svg";
import TransitionTimeObservationPopUp from './TransitionComponents/TransitionTimeObservationPopUp';
import ClassroomClimateObservationPopUp from './ClassroomClimateComponent/ClassroomClimateObservationPopUp';
import MathInstructionObservationPopUp from './MathInstructionComponents/MathInstructionObservationPopUp';
import StudentEngagementObservationPopUp from './StudentEngagementComponents/StudentEngagementObservationPopUp';
import LevelOfInstructionObservationPopUp from './LevelOfInstructionComponents/LevelOfInstructionObservationPopUp';
import ListeningToChildrenObservationPopUp from './ListeningComponents/ListeningToChildrenObservationPopUp';
import SequentialActivitiesObservationPopUp from './SequentialActivitiesComponents/SequentialActivitiesObservationPopUp';
import AssociativeCooperativeInteractionsObservationPopUp from './AssociativeCooperativeComponents/AssociativeCooperativeInteractionsObservationPopUp';
import ObservationModal from './ObservationModal';
import ResultsModal from './ResultsModal';
import LockedModal from './LockedModal';
import ResultsTrainingModal from '../components/TrainingComponents/ResultsTrainingModal';
import { useState } from 'react';
import { connect } from "react-redux";
import * as Types from '../constants/Types';
import * as H from 'history';

interface Props {
  type: string,
  training: boolean,
  unlocked?: Array<number>
  history: H.History
}

/**
 * @function ToolIcons
 * @param {Props} props
 * @return {ReactElement}
 */
function ToolIcons(props: Props): React.ReactElement {
  const { history, type, training, unlocked } = props;
  const [selected, setSelected] = useState<Types.Selected>('none');
  const [resultsTrainingModal, setResultsTrainingModal] = useState(false);
  const [observeModal, setObserveModal] = useState(false);
  const [resultsModal, setResultsModal] = useState(false);
  const [lockedModal, setLockedModal] = useState(false);

  const ObservationPopUp = {
    'TransitionTime': <TransitionTimeObservationPopUp />,
    'ClassroomClimate': <ClassroomClimateObservationPopUp />,
    'MathInstruction': <MathInstructionObservationPopUp />,
    'StudentEngagement': <StudentEngagementObservationPopUp />,
    'LevelOfInstruction': <LevelOfInstructionObservationPopUp />,
    'ListeningToChildren': <ListeningToChildrenObservationPopUp />,
    'SequentialActivities': <SequentialActivitiesObservationPopUp />,
    'LiteracyInstruction': <div />,
    'AssociativeCooperativeInteractions': <AssociativeCooperativeInteractionsObservationPopUp />,
    'none': <div />
  }
  
  const handleClick = (tool: Types.Selected, unlocked: boolean): void => {
    setSelected(tool);
    if (training) {
      if (type === 'Observe') {
        history.push({
          pathname: `/${tool}Training`,
        });
      } else {
        setResultsTrainingModal(true);
      }
    } else {
      if (unlocked) {
        if (type === 'Observe') {
          setObserveModal(true);
        } else {
          setResultsModal(true);
        }
      } else {
        setLockedModal(true);
      }
    }
  }

  return (
    <div style={{width: '100%', height: '100%'}}>
      <Grid container direction="column" justify="center" alignItems="center" style={{width: '100%', height: '100%'}}>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{width: '100%', paddingBottom: '1em'}}>
            <Grow in={true}>
              <Grid item>
                <Magic8Card
                  title="TransitionTime"
                  icon={TransitionTimeIconImage}
                  onClick={handleClick}
                  unlocked={unlocked ? unlocked.includes(1) : false}
                  training={training}
                  type={type}
                />
              </Grid>
            </Grow>
            <Grow in={true} timeout={1000}>
              <Grid item>
                <Magic8Card
                  title="ClassroomClimate"
                  icon={ClassroomClimateIconImage}
                  onClick={handleClick}
                  unlocked={unlocked ? unlocked.includes(2) : false}
                  training={training}
                  type={type}
                />
              </Grid>
            </Grow>
            <Grow in={true} timeout={1500}>
              <Grid item>
                <Magic8Card
                  title="MathInstruction"
                  icon={MathIconImage}
                  onClick={handleClick}
                  unlocked={unlocked ? unlocked.includes(3) : false}
                  training={training}
                  type={type}
                />
              </Grid>
            </Grow>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{width: '100%', paddingBottom: '1em'}}>
            <Grow in={true} timeout={1000}>
              <Grid item>
                <Magic8Card
                  title="LevelOfInstruction"
                  icon={InstructionIconImage}
                  onClick={handleClick}
                  unlocked={unlocked ? unlocked.includes(5) : false}
                  training={training}
                  type={type}
                />
              </Grid>
            </Grow>
            <Grow in={true} timeout={1500}>
              <Grid item>
                <Magic8Card
                  title="StudentEngagement"
                  icon={EngagementIconImage}
                  onClick={handleClick}
                  unlocked={unlocked ? unlocked.includes(4) : false}
                  training={training}
                  type={type}
                />
              </Grid>
            </Grow>
            <Grow in={true} timeout={2000}>
              <Grid item>
                <Magic8Card
                  title="ListeningToChildren"
                  icon={ListeningIconImage}
                  onClick={handleClick}
                  unlocked={unlocked ? unlocked.includes(6) : false}
                  training={training}
                  type={type}
                />
              </Grid>
            </Grow>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{width: '100%'}}>
            <Grow in={true} timeout={1500}>
              <Grid item>
                <Magic8Card
                  title="SequentialActivities"
                  icon={SequentialIconImage}
                  onClick={handleClick}
                  unlocked={unlocked ? unlocked.includes(7) : false}
                  training={training}
                  type={type}
                />
              </Grid>
            </Grow>
            <Grow in={true} timeout={2000}>
              <Grid item>
                <Magic8Card
                  title="LiteracyInstruction"
                  icon={LiteracyIconImage}
                  onClick={handleClick}
                  unlocked={unlocked ? unlocked.includes(9) : false}
                  training={training}
                  type={type}
                />
              </Grid>
            </Grow>
            <Grow in={true} timeout={2500}>
              <Grid item>
                <Magic8Card
                  title="AssociativeCooperativeInteractions"
                  icon={AssocCoopIconImage}
                  onClick={handleClick}
                  unlocked={unlocked ? unlocked.includes(8) : false}
                  training={training}
                  type={type}
                />
              </Grid>
            </Grow>
          </Grid>
        </Grid>
      </Grid>
      <ObservationModal
        open={observeModal}
        content={ObservationPopUp[selected]}
        handleBegin={(): void => history.push({pathname: `/${selected}`})}
        handleClose={(): void => setObserveModal(false)}
      />
      <LockedModal
        open={lockedModal}
        handleClose={(): void => setLockedModal(false)}
      />
      <ResultsModal
        open={resultsModal}
        handleBegin={(): void => history.push({pathname: `/${selected}Results`})}
        handleClose={(): void => setResultsModal(false)}
        tool={selected}
      />
      <ResultsTrainingModal
        open={resultsTrainingModal}
        handleClose={(): void => {
          setResultsTrainingModal(false);
        }}
      />
    </div>
  );
}

ToolIcons.propTypes = {
  type: PropTypes.string.isRequired,
  training: PropTypes.bool.isRequired,
  unlocked: PropTypes.array,
  history: ReactRouterPropTypes.history.isRequired
}

const mapStateToProps = (state: Types.ReduxState): {
  unlocked: Array<number>
} => {
  return {
    unlocked: state.unlockedState.unlocked
  };
};

export default connect(mapStateToProps, null)(ToolIcons);