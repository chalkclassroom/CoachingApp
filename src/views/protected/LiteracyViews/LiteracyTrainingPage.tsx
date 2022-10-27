import * as React from 'react'
import TrainingLayout from '../../../components/TrainingComponents/TrainingLayout'
import LiteracyIconImage from '../../../assets/images/LiteracyIconImage.svg'
import LiteracyInstructionHelpCard from '../../../components/LiteracyComponents/LiteracyInstructionHelpCard'
import * as Constants from '../../../constants/Constants'
import { LiteracyTypes } from '../../../constants/Constants'

interface Props {
  literacyType: number
  location: {
    state: {
      type: Constants.LiteracyTypes
    }
  }
}

function getConceptsUrl(type: LiteracyTypes): string {
  switch (type) {
    case Constants.LiteracyTypes.FOUNDATIONAL:
      return 'https://storage.googleapis.com/cqrefpwa.appspot.com/Concepts%20LI%20FS(CC).mp4'
    case Constants.LiteracyTypes.WRITING:
      return 'https://storage.googleapis.com/cqrefpwa.appspot.com/Literacy-%20Writing%20Concepts%20(CC)-720p-210713.mp4'
    case Constants.LiteracyTypes.LANGUAGE:
      return 'https://storage.googleapis.com/cqrefpwa.appspot.com/Concepts%20LI%20Lang%20(CC).mp4'
    case Constants.LiteracyTypes.READING:
      return 'https://storage.googleapis.com/cqrefpwa.appspot.com/Book%20Reading%20Concepts_UPDATED.mp4'
    default:
      return ''
  }
}

function getDemonstrationUrl(type: LiteracyTypes): string {
  switch (type) {
    case LiteracyTypes.FOUNDATIONAL: {
      return 'https://storage.googleapis.com/cqrefpwa.appspot.com/Demo%20LI%20FS(CC).mp4'
    }
    case LiteracyTypes.READING: {
      return 'https://storage.googleapis.com/cqrefpwa.appspot.com/Book%20Reading%20Demo-1080p-211025.mp4'
    }
    case LiteracyTypes.LANGUAGE: {
      return 'https://storage.googleapis.com/cqrefpwa.appspot.com/Language%20Environment%20Demo.mp4'
    }
    case LiteracyTypes.WRITING: {
      return 'https://storage.googleapis.com/cqrefpwa.appspot.com/Writing%20Demonstration_FINAL.mp4'
    }
    default: {
      return ''
    }
  }
}

/**
 * @function LiteracyInstructionTrainingPage
 * @return {ReactElement}
 */
export default function LiteracyTrainingPage(props: Props): React.ReactElement {
  const { location } = props
  const type = localStorage.getItem('type');
  return (
    <TrainingLayout
      icon={LiteracyIconImage}
      colorTheme={Constants.LiteracyTheme}
      literacyType={location.state.type}
      conceptsUrl={getConceptsUrl(location.state.type)}
      demonstrationUrl={getDemonstrationUrl(location.state.type)}
      definitions={
        <LiteracyInstructionHelpCard type={location.state.type} />
      }
      section="literacy"
      type={type ? type : ''}
    />
  )
}
