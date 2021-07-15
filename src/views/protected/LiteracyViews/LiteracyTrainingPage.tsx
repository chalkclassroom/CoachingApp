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
      conceptsUrl={
        location.state.type === Constants.LiteracyTypes.FOUNDATIONAL ? (
          'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Literacy-%20Foundational%20Skills%20Concepts%20(CC)-720p-210713.mp4?alt=media&token=26ceaddf-b650-4108-ba36-1dbcd086c901'
        ) : location.state.type === Constants.LiteracyTypes.WRITING ? (
          'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Literacy-%20Writing%20Concepts%20(CC)-720p-210713.mp4?alt=media&token=02ed29ba-1795-453c-8a68-b0d3e4f3fbb5'
        ) : ('')
      }
      demonstrationUrl=''
      definitions={<LiteracyInstructionHelpCard type={location.state.type} />}
      section='literacy'
    />
  );
}