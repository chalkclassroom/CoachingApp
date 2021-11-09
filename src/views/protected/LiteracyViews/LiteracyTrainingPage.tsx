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
      return 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20LI%20FS(CC).mp4?alt=media&token=86c30b5b-130e-4b4f-a11a-618010c488c2'
    case Constants.LiteracyTypes.WRITING:
      return 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Writing%20Demonstration_FINAL.mp4?alt=media&token=d1a74b8a-2119-40c7-97bb-97135f0ab0a5'
    case Constants.LiteracyTypes.LANGUAGE:
      return 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Concepts%20LI%20Lang%20(CC).mp4?alt=media&token=b9722bf1-9def-4f68-8f34-bc539d090658'
    case Constants.LiteracyTypes.READING:
      return 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Book%20Reading%20Concepts_UPDATED.mp4?alt=media&token=32bf8ecd-0dc5-4080-9c76-c7385627bb72'
    default:
      return ''
  }
}

function getDemonstrationUrl(type: LiteracyTypes): string {
  switch (type) {
    case LiteracyTypes.FOUNDATIONAL: {
      return 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20LI%20FS(CC).mp4?alt=media&token=9786bee0-fe69-471a-bb23-7181d620907d'
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
    />
  )
}
