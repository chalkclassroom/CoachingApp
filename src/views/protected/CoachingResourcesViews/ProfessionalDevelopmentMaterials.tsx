import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React from 'react'
import { Link } from 'react-router-dom'

import {
  LazyLoadedResourceCardMedia,
  ResourceCardContent,
  ResourceLabel,
  cards, ResourcesLandingAsideContent,
} from './Common'
import ResourcePageLayout from './ResourcePageLayout'

import VanderbiltIcon from '../../../assets/icons/VanderbiltPeabodyLogo.png'
import MetroNashvillePublicSchoolsIcon from '../../../assets/icons/MNPSLogo.jpg'

import TransitionTimeIcon from '../../../assets/images/TransitionTimeIconImage.svg'
import ClassroomClimateIcon from '../../../assets/images/ClassroomClimateIconImage.svg'
import MathInstructionIcon from '../../../assets/images/MathIconImage.svg'

import LevelOfInstructionIcon from '../../../assets/images/InstructionIconImage.svg'
import StudentEngagementIcon from '../../../assets/images/EngagementIconImage.svg'
import ListeningToChildrenIcon from '../../../assets/images/ListeningIconImage.svg'

import SequentialActivitiesIcon from '../../../assets/images/SequentialIconImage.svg'
import LiteracyInstructionIcon from '../../../assets/images/LiteracyIconImage.svg'
import AssociativeAndCooperativeInteractionsIcon from '../../../assets/images/AssocCoopIconImage.svg'

const resourceCard = cards['professional-development-materials']

const useStyles = makeStyles(theme => ({
  asideIcon: {
    objectFit: 'contain',
    width: '100%',
  },
  tileRow: {
    alignItems: 'center',
    display: 'flex',
    height: '8rem',
    justifyContent: 'space-evenly',
    paddingBottom: theme.spacing(4),
    width: '100%',
  },
  tileLink: {
    height: '100%',
    width: 'auto',
  },
  tileImage: {
    height: '100%',
    objectFit: 'contain',
  },
}))

/**
 * @return {ReactElement}
 */
function ProfessionalDevelopmentMaterialsAsideContent(): React.ReactElement {
  const styles = useStyles()
  const { imageImport, label, backgroundColor } = resourceCard

  return <>
    <ResourcesLandingAsideContent {...resourceCard} />
    <Box pt={4}>
      <Typography variant="body1">
        Welcome to the CHALK Professional Development Series - a collection of materials developed by early childhood
        researchers at Vanderbilt University’s Peabody College and Pre-K teachers in the Metropolitan Nashville Public
        School System.
      </Typography>
    </Box>
    <Box pt={4}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={6}>
          <img className={styles.asideIcon} src={VanderbiltIcon} />
        </Grid>
        <Grid item xs={6}>
          <img className={styles.asideIcon} src={MetroNashvillePublicSchoolsIcon} />
        </Grid>
      </Grid>
    </Box>
  </>
}

const tilesRowsInfo = [
  [
    {
      key: 'transition-time',
      icon: TransitionTimeIcon,
      materialLinkSuffix: 'TransitionTime',
    },
    {
      key: 'classroom-climate',
      icon: ClassroomClimateIcon,
      materialLinkSuffix: 'ClassroomClimate',
    },
    {
      key: 'math-instruction',
      icon: MathInstructionIcon,
      materialLinkSuffix: 'MathInstruction',
    },
  ],
  [
    {
      key: 'level-of-instruction',
      icon: LevelOfInstructionIcon,
      materialLinkSuffix: 'LevelOfInstruction',
    },
    {
      key: 'student-engagement',
      icon: StudentEngagementIcon,
      materialLinkSuffix: 'StudentEngagement',
    },
    {
      key: 'listening-to-children',
      icon: ListeningToChildrenIcon,
      materialLinkSuffix: 'ListeningToChildren',
    },
  ],
  [
    {
      key: 'sequential-activities',
      icon: SequentialActivitiesIcon,
      materialLinkSuffix: 'SequentialActivities',
    },
    {
      key: 'literacy-instruction',
      icon: LiteracyInstructionIcon,
      materialLinkSuffix: 'LiteracyInstruction',
    },
    {
      key: 'associative-and-cooperative-interactions',
      icon: AssociativeAndCooperativeInteractionsIcon,
      materialLinkSuffix: 'AssociativeAndCooperativeInteractions',
    },
  ],
]

/**
 * @return {ReactElement}
 */
function ProfessionalDevelopmentMaterialsMainContent(): React.ReactElement {
  const styles = useStyles()

  return <Grid container spacing={4}>
    <Grid item xs={12}>
      <Typography variant="h5" component="h1" align="center">Professional Development Materials</Typography>
    </Grid>
    <Grid item xs={12} container justify="center">
      {tilesRowsInfo.map(
        (tilesRow, tilesRowIndex) => (
          <Box key={tilesRowIndex} className={styles.tileRow}>
            {tilesRow.map(
              ({ key, icon, materialLinkSuffix }) => (
                <Link
                  key={key}
                  to={`/CoachingResources/ProfessionalDevelopmentMaterials/${materialLinkSuffix}`}
                  className={styles.tileLink}
                >
                  <img src={icon} className={styles.tileImage} />
                </Link>
              ),
            )}
          </Box>
        ),
      )}
    </Grid>
    <Grid item xs={12}>
      <Typography variant="body1">
        Select a practice to access powerpoint presentations and handouts to support early childhood teachers use of
        research-based instruction.
      </Typography>
    </Grid>
  </Grid>
}

/**
 * @return {ReactElement}
 */
export default function ProfessionalDevelopmentMaterials(): React.ReactElement {
  return <ResourcePageLayout
    asideContent={<ProfessionalDevelopmentMaterialsAsideContent />}
    mainContent={<ProfessionalDevelopmentMaterialsMainContent />}
  />
}
