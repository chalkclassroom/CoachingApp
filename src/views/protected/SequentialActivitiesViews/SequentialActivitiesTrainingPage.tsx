import * as React from 'react';
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout';
import SequentialIconImage from "../../../assets/images/SequentialIconImage.svg";
import SequentialHelpCard from "../../../components/SequentialActivitiesComponents/SequentialHelpCard";
import * as Constants from '../../../constants/Constants';

/**
 * @function SequentialActivitiesTrainingPage
 * @return {ReactElement}
 */
export default function SequentialActivitiesTrainingPage(): React.ReactElement {
  const type = localStorage.getItem('type');
  return (
    <TrainingLayout
      icon={SequentialIconImage}
      colorTheme={Constants.SequentialTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20SA%20(CC).mp4?alt=media&token=fbbad7e4-d9ba-49b7-baad-4396d5234ba7'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20SA%20(CC).mp4?alt=media&token=2248e424-1869-42e7-a3e7-7f5fa55ec918'
      definitions={<SequentialHelpCard />}
      section='sequential'
      type={type ? type : ''}
    />
  );
}