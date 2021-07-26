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
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Level%20of%20Instruction%20Demo.mp4?alt=media&token=95ba2041-d63d-42b4-b37c-b43389700d3c'
      definitions={<LevelOfInstructionHelpCard />}
      section='level'
    />
  );
}