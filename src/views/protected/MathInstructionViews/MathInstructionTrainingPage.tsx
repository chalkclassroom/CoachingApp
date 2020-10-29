import * as React from 'react';
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout';
import MathIconImage from '../../../assets/images/MathIconImage.svg';
import MathHelpCard from '../../../components/MathInstructionComponents/MathHelpCard';
import * as Constants from '../../../constants/Constants';

/**
 * @function MathInstructionTrainingPage
 * @return {ReactElement}
 */
export default function MathInstructionTrainingPage(): React.ReactElement {
  return (
    <TrainingLayout
      icon={MathIconImage}
      colorTheme={Constants.MathTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Math%20Opportunities%20Concepts.mp4?alt=media&token=601148ea-87ec-4c1d-8949-d972be9d4903'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Math%20Instruction%20Demo.mp4?alt=media&token=fa1d02bd-e012-498f-9db5-8c85b523990f'
      definitions={<MathHelpCard />}
      section='math'
    />
  );
}