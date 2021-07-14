import * as React from 'react';
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout';
import LiteracyIconImage from '../../../assets/images/LiteracyIconImage.svg';
import LiteracyInstructionHelpCard from '../../../components/LiteracyComponents/LiteracyInstructionHelpCard';
import * as Constants from '../../../constants/Constants';

interface Props {
  literacyType: number,
  location: {
    state: {
      type: Constants.LiteracyTypes
    }
  },
}

/**
 * @function LiteracyInstructionTrainingPage
 * @return {ReactElement}
 */
export default function LiteracyTrainingPage(props: Props): React.ReactElement {
  const { location } = props;
  return (
    <TrainingLayout
      icon={LiteracyIconImage}
      colorTheme={Constants.LiteracyTheme}
      literacyType={location.state.type}
      conceptsUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Listening%20to%20Children%20Concepts%20(subtitles).mp4?alt=media&token=e022fcbe-e38a-4f40-bb45-f150df013da6'
      demonstrationUrl='https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Listening%20to%20Children%20Demo.mp4?alt=media&token=4fa8b5c2-cc26-4072-b779-181a74c243a1'
      definitions={<LiteracyInstructionHelpCard type={location.state.type} />}
      section='literacy'
    />
  );
}