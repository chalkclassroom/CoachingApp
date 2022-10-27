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
  const type = localStorage.getItem('type');
  return (
    <TrainingLayout
      icon={MathIconImage}
      colorTheme={Constants.MathTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20MI%20(CC).mp4?alt=media&token=d85a00b5-bcdf-4aff-81f0-13e5fef93acf'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20MI%20(CC).mp4?alt=media&token=b2577fc1-6461-4c5a-884b-719f8ee3a0c4'
      definitions={<MathHelpCard />}
      section='math'
      type={type ? type : ''}
    />
  );
}