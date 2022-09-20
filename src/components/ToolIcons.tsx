import * as React from 'react';
import * as PropTypes from "prop-types";
import ReactRouterPropTypes from 'react-router-prop-types';
import Magic8Card from './Magic8Card';
import Grid from '@material-ui/core/Grid';
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
import LiteracyModal from './LiteracyComponents/LiteracyModal';
import LiteracyIconCard from './LiteracyComponents/LiteracyIconCard';
import ObservationModal from './ObservationModal';
import ResultsModal from './ResultsModal';
import LockedModal from './LockedModal';
import ResultsTrainingModal from '../components/TrainingComponents/ResultsTrainingModal';
import { useState } from 'react';
import { connect } from "react-redux";
import * as Types from '../constants/Types';
import * as Constants from '../constants/Constants';
import * as H from 'history';
import { Role } from '../state/actions/coach'

interface Props {
  type: string,
  training: boolean,
  unlocked?: Array<number>
  history: H.History,
  isTeacher: boolean,
  trainingLiteracy: Types.TrainingLiteracy
  practice?: boolean
}

/**
 * @function ToolIcons
 * @param {Props} props
 * @return {ReactElement}
 */
function ToolIcons(props: Props): React.ReactElement {
  const { history, type, training, unlocked, trainingLiteracy, practice } = props;
  const [selected, setSelected] = useState<Types.Selected>('none');
  const [resultsTrainingModal, setResultsTrainingModal] = useState(false);
  const [observeModal, setObserveModal] = useState(false);
  const [resultsModal, setResultsModal] = useState(false);
  const [lockedModal, setLockedModal] = useState(false);
  const [literacyTrainingModal, setLiteracyTrainingModal] = useState(false);

  // add in other sections later (just tracking knowledge check completion for now)
  const foundationalUnlocked=
    // trainingLiteracy.conceptsFoundational &&
    // trainingLiteracy.definitionsFoundational &&
    // trainingLiteracy.demoFoundational &&
    trainingLiteracy.knowledgeCheckFoundational;
  const writingUnlocked=
    // trainingLiteracy.conceptsWriting &&
    // trainingLiteracy.definitionsWriting &&
    // trainingLiteracy.demoWriting &&
    trainingLiteracy.knowledgeCheckWriting;
  const readingUnlocked=
    // trainingLiteracy.conceptsReading &&
    // trainingLiteracy.definitionsReading &&
    // trainingLiteracy.demoReading &&
    trainingLiteracy.knowledgeCheckReading;
  const languageUnlocked=
    // trainingLiteracy.conceptsLanguage &&
    // trainingLiteracy.definitionsLanguage &&
    // trainingLiteracy.demoLanguage &&
    trainingLiteracy.knowledgeCheckLanguage;

  const ObservationPopUp = {
    'TransitionTime': <TransitionTimeObservationPopUp />,
    'ClassroomClimate': <ClassroomClimateObservationPopUp />,
    'MathInstruction': <MathInstructionObservationPopUp />,
    'StudentEngagement': <StudentEngagementObservationPopUp />,
    'LevelOfInstruction': <LevelOfInstructionObservationPopUp />,
    'ListeningToChildren': <ListeningToChildrenObservationPopUp />,
    'SequentialActivities': <SequentialActivitiesObservationPopUp />,
    'LiteracyInstruction': <div />, // Literacy has its own Observation Modal
    'AssociativeCooperativeInteractions': <AssociativeCooperativeInteractionsObservationPopUp />,
    'none': <div />
  }

  const handleClick = (tool: Types.Selected, unlocked: boolean): void => {
    setSelected(tool);
    if (training) {
      if (type === 'Observe') {
        if (tool === 'LiteracyInstruction') {
          setLiteracyTrainingModal(true)
        } else {
          history.push({
            pathname: `/${tool}Training`,
          });
        }
      } else if (type === 'Practice') {
        if (tool === 'LiteracyInstruction') {
          localStorage.setItem('type', 'practice');
          setLiteracyTrainingModal(true)
        } else {
          localStorage.setItem('type', 'practice');
          history.push({
            pathname: `/${tool}Training`,
          });
        }
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
      <Grid container direction="column" justify="center" alignItems="center" style={{width: '100%', height: '100%', 'flex-wrap': 'nowrap'}}>
      {practice ? (<>
      <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{width: '100%', paddingBottom: '1em'}}>
            <Grid item>
              <Magic8Card
                title="TransitionTime"
                icon={TransitionTimeIconImage}
                onClick={handleClick}
                unlocked={true}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <Magic8Card
                title="ClassroomClimate"
                icon={ClassroomClimateIconImage}
                onClick={handleClick}
                unlocked={true}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <Magic8Card
                title="MathInstruction"
                icon={MathIconImage}
                onClick={handleClick}
                unlocked={true}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{width: '100%', paddingBottom: '1em'}}>
            <Grid item>
              <Magic8Card
                title="LevelOfInstruction"
                icon={InstructionIconImage}
                onClick={handleClick}
                unlocked={true}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <Magic8Card
                title="StudentEngagement"
                icon={EngagementIconImage}
                onClick={handleClick}
                unlocked={true}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <Magic8Card
                title="ListeningToChildren"
                icon={ListeningIconImage}
                onClick={handleClick}
                unlocked={true}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{width: '100%'}}>
            <Grid item>
              <Magic8Card
                title="SequentialActivities"
                icon={SequentialIconImage}
                onClick={handleClick}
                unlocked={true}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <LiteracyIconCard
                title="LiteracyInstruction"
                icon={LiteracyIconImage}
                onClick={handleClick}
                foundational={true}
                writing={true}
                reading={true}
                language={true}
                unlocked={true}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <Magic8Card
                title="AssociativeCooperativeInteractions"
                icon={AssocCoopIconImage}
                onClick={handleClick}
                unlocked={true}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
          </Grid>
        </Grid>
      </>) : (<>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{width: '100%', paddingBottom: '1em'}}>
            <Grid item>
              <Magic8Card
                title="TransitionTime"
                icon={TransitionTimeIconImage}
                onClick={handleClick}
                unlocked={unlocked ? unlocked.includes(1) : false}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <Magic8Card
                title="ClassroomClimate"
                icon={ClassroomClimateIconImage}
                onClick={handleClick}
                unlocked={unlocked ? unlocked.includes(2) : false}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <Magic8Card
                title="MathInstruction"
                icon={MathIconImage}
                onClick={handleClick}
                unlocked={unlocked ? unlocked.includes(3) : false}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{width: '100%', paddingBottom: '1em'}}>
            <Grid item>
              <Magic8Card
                title="LevelOfInstruction"
                icon={InstructionIconImage}
                onClick={handleClick}
                unlocked={unlocked ? unlocked.includes(5) : false}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <Magic8Card
                title="StudentEngagement"
                icon={EngagementIconImage}
                onClick={handleClick}
                unlocked={unlocked ? unlocked.includes(4) : false}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <Magic8Card
                title="ListeningToChildren"
                icon={ListeningIconImage}
                onClick={handleClick}
                unlocked={unlocked ? unlocked.includes(6) : false}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{width: '100%'}}>
            <Grid item>
              <Magic8Card
                title="SequentialActivities"
                icon={SequentialIconImage}
                onClick={handleClick}
                unlocked={unlocked ? unlocked.includes(7) : false}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <LiteracyIconCard
                title="LiteracyInstruction"
                icon={LiteracyIconImage}
                onClick={handleClick}
                foundational={foundationalUnlocked}
                writing={writingUnlocked}
                reading={readingUnlocked}
                language={languageUnlocked}
                unlocked={unlocked ? unlocked.includes(8) : false}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
            <Grid item>
              <Magic8Card
                title="AssociativeCooperativeInteractions"
                icon={AssocCoopIconImage}
                onClick={handleClick}
                unlocked={unlocked ? unlocked.includes(8) : false}
                training={training}
                isTeacher={props.isTeacher}
                type={type}
              />
            </Grid>
          </Grid>
        </Grid>
        </>)}
      </Grid>
      {selected === 'LiteracyInstruction' ? (
        <LiteracyModal
          open={observeModal}
          handleBegin={(checklistType: Constants.LiteracyTypes): void => {
            history.push({pathname:`/${selected}`, state: {checklist: checklistType}})
          }}
          handleClose={(): void => setObserveModal(false)}
          tool={selected}
          type='Observe'
          foundational={foundationalUnlocked}
          writing={writingUnlocked}
          reading={readingUnlocked}
          language={languageUnlocked}
        />
      ) : (
        <ObservationModal
          type={selected}
          open={observeModal}
          content={ObservationPopUp[selected]}
          handleBegin={(): void => {
            history.push({pathname:`/${selected}`})
          }}
          handleClose={(): void => setObserveModal(false)}
        />
      )}
      <LockedModal
        open={lockedModal}
        handleClose={(): void => setLockedModal(false)}
      />
      {selected === 'LiteracyInstruction' ? (
        <LiteracyModal
          open={resultsModal}
          handleBegin={(checklistType: Constants.LiteracyTypes): void => {
            history.push({pathname:`/${selected}Results`, state: {type: checklistType}})
          }}
          handleClose={(): void => setResultsModal(false)}
          tool={selected}
          type='Results'
          foundational={foundationalUnlocked}
          writing={writingUnlocked}
          reading={readingUnlocked}
          language={languageUnlocked}
        />
      ) : (
        <ResultsModal
          open={resultsModal}
          handleBegin={(): void => history.push({pathname: `/${selected}Results`})}
          handleClose={(): void => setResultsModal(false)}
          tool={selected}
        />
      )}
      <ResultsTrainingModal
        type={selected}
        open={resultsTrainingModal}
        handleClose={(): void => {
          setResultsTrainingModal(false);
        }}
      />
      <LiteracyModal
        open={literacyTrainingModal}
        handleBegin={(checklistType: Constants.LiteracyTypes): void => {
          history.push({pathname:`/${selected}Training`, state: {type: checklistType}})
        }}
        handleClose={(): void => setLiteracyTrainingModal(false)}
        tool={selected}
        type='Training'
        foundational={foundationalUnlocked}
        writing={writingUnlocked}
        reading={readingUnlocked}
        language={languageUnlocked}
      />
    </div>
  );
}


ToolIcons.propTypes = {
  isTeacher: PropTypes.bool,
  type: PropTypes.string.isRequired,
  training: PropTypes.bool.isRequired,
  unlocked: PropTypes.array,
  history: ReactRouterPropTypes.history.isRequired,
  role: PropTypes.string
}

const mapStateToProps = (state: Types.ReduxState): {
  unlocked: Array<number>,
  isTeacher: boolean,
  trainingLiteracy: {
    conceptsFoundational: boolean,
    conceptsWriting: boolean,
    conceptsReading: boolean,
    conceptsLanguage: boolean,
    definitionsFoundational: boolean,
    definitionsWriting: boolean,
    definitionsReading: boolean,
    definitionsLanguage: boolean,
    demoFoundational: boolean,
    demoWriting: boolean,
    demoReading: boolean,
    demoLanguage: boolean,
    knowledgeCheckFoundational: boolean,
    knowledgeCheckWriting: boolean,
    knowledgeCheckReading: boolean,
    knowledgeCheckLanguage: boolean
  }
} => {
  return {
    isTeacher: state.coachState.role === Role.TEACHER,
    unlocked: state.unlockedState.unlocked
        || state.coachState.role === Role.TEACHER,
    trainingLiteracy: state.trainingLiteracyState
  };
};

export default connect(mapStateToProps, null)(ToolIcons);
