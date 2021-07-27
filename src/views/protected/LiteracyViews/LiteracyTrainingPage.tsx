import * as React from 'react';
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout';
import LiteracyIconImage from '../../../assets/images/LiteracyIconImage.svg';
import LiteracyInstructionHelpCard from '../../../components/LiteracyComponents/LiteracyInstructionHelpCard';
import * as Constants from '../../../constants/Constants';

interface Props {
  literacyType: number,
  location: {
    state: {
      type: Constants.LiteracyTypes
    }
  },
}

/**
 * @function LiteracyInstructionTrainingPage
 * @return {ReactElement}
 */
export default function LiteracyTrainingPage(props: Props): React.ReactElement {
  const { location } = props;
  return (
    <TrainingLayout
      icon={LiteracyIconImage}
      colorTheme={Constants.LiteracyTheme}
      literacyType={location.state.type}
      conceptsUrl={
        location.state.type === Constants.LiteracyTypes.FOUNDATIONAL ? (
          'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20LI%20FS(CC).mp4?alt=media&token=86c30b5b-130e-4b4f-a11a-618010c488c2'
        ) : location.state.type === Constants.LiteracyTypes.WRITING ? (
          'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20LI%20Writing%20(CC).mp4?alt=media&token=73315d85-4a79-4783-8e68-bd64b4b11fd4'
        ) : location.state.type === Constants.LiteracyTypes.LANGUAGE ? (
          'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20LI%20Lang%20(CC).mp4?alt=media&token=b9722bf1-9def-4f68-8f34-bc539d090658'
        ) : ('')
      }
      demonstrationUrl={
        location.state.type === Constants.LiteracyTypes.FOUNDATIONAL ? (
          'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20LI%20FS(CC).mp4?alt=media&token=9786bee0-fe69-471a-bb23-7181d620907d'
        ) : ('')}
      definitions={<LiteracyInstructionHelpCard type={location.state.type} />}
      section='literacy'
    />
  );
}