import * as React from 'react';
import TrainingLayout from '../../../components/TrainingLayout';
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
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Student%20Engagement%20Concepts.mp4?alt=media&token=201b9f73-32c1-4842-aac5-f70a6eb0e375'
      // replace with engagement demo when ready
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Sequential%20Activities%20Demo.mp4?alt=media&token=d7fedabb-3ef1-430f-978a-4493914b1f65'
      definitions={<StudentEngagementHelpCard />}
      section='student'
    />
  );
}