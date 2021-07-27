import * as React from 'react';
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout';
import EngagementIconImage from "../../../assets/images/EngagementIconImage.svg";
import StudentEngagementHelpCard from "../../../components/StudentEngagementComponents/StudentEngagementHelpCard";
import * as Constants from '../../../constants/Constants';

/**
 * @function StudentEngagementTrainingPage
 * @return {ReactElement}
 */
export default function StudentEngagementTrainingPage(): React.ReactElement {
  return (
    <TrainingLayout
      icon={EngagementIconImage}
      colorTheme={Constants.EngagementTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20SE%20(CC).mp4?alt=media&token=370f505c-b8e6-4dbd-9831-1d1b419e2592'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20SE%20(CC).mp4?alt=media&token=e775fc3d-2a93-41e0-829a-318354f1f9bf'
      definitions={<StudentEngagementHelpCard />}
      section='student'
    />
  );
}