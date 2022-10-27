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
  const type = localStorage.getItem('type');
  return (
    <TrainingLayout
      icon={ClassroomClimateIconImage}
      colorTheme={Constants.ClimateTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20CC%20(CC).mp4?alt=media&token=d7791f18-2ea8-4652-b464-af89a5679ca6'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20CC%20(CC).mp4?alt=media&token=482a0756-8b7b-470d-9766-ff7559cdf4a5'
      definitions={<ClassroomClimateHelpCard />}
      section='climate'
      type={type ? type : ''}
    />
  );
}