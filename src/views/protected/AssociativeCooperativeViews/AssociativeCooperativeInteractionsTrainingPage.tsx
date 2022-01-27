import * as React from 'react';
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout';
import AssocCoopIconImage from '../../../assets/images/AssocCoopIconImage.svg';
import AssocCoopHelpCard from '../../../components/AssociativeCooperativeComponents/AssocCoopHelpCard';
import * as Constants from '../../../constants/Constants';

/**
 * @function AssociativeCooperativeInteractionsTrainingPage
 * @return {ReactElement}
 */
export default function AssociativeCooperativeInteractionsTrainingPage(): React.ReactElement {
  return (
    <TrainingLayout
      icon={AssocCoopIconImage}
      colorTheme={Constants.ACTheme}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20AC%20(CC).mp4?alt=media&token=757a15fc-4e2b-437b-b58d-50755b319a4d'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20AC%20(CC).mp4?alt=media&token=27b52565-60e0-4c31-b419-cbccfed38e45'
      definitions={<AssocCoopHelpCard />}
      section='ac'
    />
  );
}