import * as React from 'react';
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout';
import ClassroomClimateIconImage from '../../../assets/images/ClassroomClimateIconImage.svg';
import ClassroomClimateHelpCard from '../../../components/ClassroomClimateComponent/ClassroomClimateHelpCard';
import * as Constants from '../../../constants/Constants';

/**
 * @function ClassroomClimateTrainingPage
 * @return {ReactElement}
 */
export default function ClassroomClimateTrainingPage(): React.ReactElement {
  return (
    <TrainingLayout
      icon={ClassroomClimateIconImage}
      colorTheme={Constants.ClimateTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/CC%20Concepts%207-17-19.mp4?alt=media&token=2375a7d2-3c6e-4eec-a9c0-a29214db9cdf'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Classroom%20Climate%20Demo.mp4?alt=media&token=cb1a1796-59b2-41f9-a170-43fde82f5be4'
      definitions={<ClassroomClimateHelpCard />}
      section='climate'
    />
  );
}