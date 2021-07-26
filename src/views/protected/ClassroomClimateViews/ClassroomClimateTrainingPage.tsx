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
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20CC%20(CC).mp4?alt=media&token=d7791f18-2ea8-4652-b464-af89a5679ca6'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Classroom%20Climate%20Demo.mp4?alt=media&token=cb1a1796-59b2-41f9-a170-43fde82f5be4'
      definitions={<ClassroomClimateHelpCard />}
      section='climate'
    />
  );
}