import * as React from 'react';
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout';
import TransitionTimeIconImage from "../../../assets/images/TransitionTimeIconImage.svg";
import TransitionHelpCard from '../../../components/TransitionComponents/TransitionHelpCard';
import * as Constants from '../../../constants/Constants';

/**
 * @function TransitionTimeTrainingPage
 * @return {ReactElement}
 */
export default function TransitionTimeTrainingPage(): React.ReactElement {
  const type = localStorage.getItem('type');
  return (
    <TrainingLayout
      icon={TransitionTimeIconImage}
      colorTheme={Constants.TransitionTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20TT%20(CC).mp4?alt=media&token=f857ceb7-8a17-432a-bb7f-c00d101934a2'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20TT%20(CC).mp4?alt=media&token=de9a9784-fccd-457c-bd44-3a3c1e006d54'
      definitions={<TransitionHelpCard />}
      section='transition'
      type={type ? type : ''}
    />
  );
}