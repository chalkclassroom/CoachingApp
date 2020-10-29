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
  return (
    <TrainingLayout
      icon={TransitionTimeIconImage}
      colorTheme={Constants.TransitionTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/TT%20Concepts%201.30.2020.mp4?alt=media&token=b11f88fc-ed72-476d-805e-40f8287053ef'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Transition%20Time%20Demo.mp4?alt=media&token=8e00dc42-fcec-4143-a201-36ac64bc8702'
      definitions={<TransitionHelpCard />}
      section='transition'
    />
  );
}