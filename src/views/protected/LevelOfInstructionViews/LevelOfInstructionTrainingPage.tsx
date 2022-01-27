import * as React from 'react';
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout';
import InstructionIconImage from '../../../assets/images/InstructionIconImage.svg';
import LevelOfInstructionHelpCard from '../../../components/LevelOfInstructionComponents/LevelOfInstructionHelpCard';
import * as Constants from '../../../constants/Constants';

/**
 * @function LevelOfInstructionTrainingPage
 * @return {ReactElement}
 */
export default function LevelOfInstructionTrainingPage(): React.ReactElement {
  return (
    <TrainingLayout
      icon={InstructionIconImage}
      colorTheme={Constants.InstructionTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20IN%20(CC).mp4?alt=media&token=75323b25-5d66-47f2-ae78-163d913d94af'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20IN%20(CC).mp4?alt=media&token=58b5493d-78be-48ad-8dae-f852207b310f'
      definitions={<LevelOfInstructionHelpCard />}
      section='level'
    />
  );
}