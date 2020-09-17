import * as React from 'react';
import TrainingLayout from '../../../components/TrainingLayout';
import ListeningIconImage from '../../../assets/images/ListeningIconImage.svg';
import ListeningToChildrenHelpCard from '../../../components/ListeningComponents/ListeningToChildrenHelpCard';
import * as Constants from '../../../constants/Constants';

/**
 * @function ListeningToChildrenTrainingPage
 * @return {ReactElement}
 */
export default function ListeningToChildrenTrainingPage(): React.ReactElement {
  return (
    <TrainingLayout
      icon={ListeningIconImage}
      colorTheme={Constants.ListeningTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Listening%20to%20Children%20Concepts%20(subtitles).mp4?alt=media&token=e022fcbe-e38a-4f40-bb45-f150df013da6'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Listening%20to%20Children%20Demo.mp4?alt=media&token=4fa8b5c2-cc26-4072-b779-181a74c243a1'
      definitions={<ListeningToChildrenHelpCard />}
      section='listening'
    />
  );
}