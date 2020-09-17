import * as React from 'react';
import TrainingLayout from '../../../components/TrainingLayout';
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
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/AC_Concepts.mp4?alt=media&token=6499ec3f-8f39-4334-aeea-8e34a4e8fb7e'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/A%26C%20Demo.mp4?alt=media&token=8aa8ba49-9dce-4f21-a29e-b5f6382f4698'
      definitions={<AssocCoopHelpCard />}
      section='ac'
    />
  );
}