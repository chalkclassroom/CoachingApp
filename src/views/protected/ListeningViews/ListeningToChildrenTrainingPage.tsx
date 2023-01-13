import * as React from 'react';
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout';
import ListeningIconImage from '../../../assets/images/ListeningIconImage.svg';
import ListeningToChildrenHelpCard from '../../../components/ListeningComponents/ListeningToChildrenHelpCard';
import * as Constants from '../../../constants/Constants';

/**
 * @function ListeningToChildrenTrainingPage
 * @return {ReactElement}
 */
export default function ListeningToChildrenTrainingPage(): React.ReactElement {
  const type = localStorage.getItem('type');
  return (
    <TrainingLayout
      icon={ListeningIconImage}
      colorTheme={Constants.ListeningTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20LC%20(CC).mp4?alt=media&token=0cabbd15-3b54-45c0-919d-6e7c98ac4e5f'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20LC%20(CC).mp4?alt=media&token=4ba283ac-133a-4bd2-a040-639748c3cc3d'
      definitions={<ListeningToChildrenHelpCard />}
      section='listening'
      type={type ? type : ''}
    />
  );
}