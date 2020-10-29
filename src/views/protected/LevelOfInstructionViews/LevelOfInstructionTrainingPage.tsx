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
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Level%20of%20Instruction%20Concepts.mp4?alt=media&token=a6757bbf-a815-4949-84bc-4bc602178b17'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Level%20of%20Instruction%20Demo.mp4?alt=media&token=95ba2041-d63d-42b4-b37c-b43389700d3c'
      definitions={<LevelOfInstructionHelpCard />}
      section='level'
    />
  );
}