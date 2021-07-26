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
      // replace with engagement demo when ready
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Sequential%20Activities%20Demo.mp4?alt=media&token=d7fedabb-3ef1-430f-978a-4493914b1f65'
      definitions={<StudentEngagementHelpCard />}
      section='student'
    />
  );
}