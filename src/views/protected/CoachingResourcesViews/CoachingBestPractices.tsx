import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react'

import {
  LazyLoadedResourceCardMedia,
  ResourceCardContent,
  ResourceLabel,
  cards, ResourcesLandingAsideContent,
} from './Common'
import ResourcePageLayout from './ResourcePageLayout'

import RelationshipBuildingDocument from '../../../assets/coaching-docs/Relationship Building.pdf'
import CoachingCommunicationSkillsDocument from '../../../assets/coaching-docs/Coaching Communication Skills.pdf'
import TeacherDrivenCoachingDocument from '../../../assets/coaching-docs/Teacher Driven Coaching.pdf'
import GoalSettingConversationsDocument from '../../../assets/coaching-docs/Goal Setting Conversations.pdf'
import CoachingStrategiesAndResourcesDocument from '../../../assets/coaching-docs/Coaching Strategies and Resources.pdf'
import ProfessionalLearningCommunitiesAndChalkDocument from '../../../assets/coaching-docs/Professional Learning Communities and CHALK.pdf'
import CompleteManualDocument from '../../../assets/coaching-docs/Coaching Best Practices.pdf'

const resourceCard = cards['coaching-best-practices']

const useStyles = makeStyles(theme => ({
  coverImage: {
    maxWidth: 360,
    width: '100%',
  },
  tileRow: {
    alignItems: 'stretch',
    display: 'flex',
    minHeight: '10rem',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(4),
    width: '100%',
  },
  tile: {
    alignItems: 'center',
    display: 'flex',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: '1rem',
    color: theme.palette.common.white,
    fontSize: theme.typography.h5.fontSize,
    justifyContent: 'center',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
    width: '100%',
    '&:first-child': {
      marginLeft: 'unset',
    },
    '&:last-child': {
      marginRight: 'unset',
    }
  }
}))


const tilesRowsInfo = [
  [
    {
      key: 'relationship-building',
      label: 'Relationship Building',
      documentLink: RelationshipBuildingDocument
    },
    {
      key: 'coaching-communication-skills',
      label: 'Coaching Communication Skills',
      documentLink: CoachingCommunicationSkillsDocument,
    },
    {
      key: 'teacher-driven-coaching',
      label: 'Teacher Driven Coaching',
      documentLink: TeacherDrivenCoachingDocument,
    },
  ],
  [
    {
      key: 'goal-setting-conversations',
      label: 'Goal Setting Conversations',
      documentLink: GoalSettingConversationsDocument,
    },
    {
      key: 'coaching-strategies-and-resources',
      label: 'Coaching Strategies And Resources',
      documentLink: CoachingStrategiesAndResourcesDocument,
    },
    {
      key: 'professional-learning-communities-and-chalk',
      label: 'Professional Learning Communities And CHALK',
      documentLink: ProfessionalLearningCommunitiesAndChalkDocument,
    },
  ]
]

/**
 * @return {ReactElement}
 */
function CoachingBestPracticesMainContent(): React.ReactElement {
  const styles = useStyles()

  return <Grid container spacing={4}>
    <Grid item xs={12}>
      <Typography variant='h5' component='h1' align='center'>Coaching Best Practices</Typography>
    </Grid>
    <Grid item xs={12} container justify="center">
    </Grid>
    <Grid item xs={12}>
      {tilesRowsInfo.map(
        (tilesRow, tilesRowIndex) => (
          <Box key={tilesRowIndex} className={styles.tileRow}>
            {tilesRow.map(
              ({ key, label, documentLink }) => (
                <Link 
                  key={key}
                  href={documentLink}
                  download
                  className={styles.tile}
                >
                  {label}
                </Link>
              )
            )}
          </Box>
        )
      )}
      <Grid item xs={12}>
        <Typography variant='h6' component='p' align='center'>
          Download the complete manual <Link href={CompleteManualDocument} download>here</Link> or select a topic above to view or download specific sections.
        </Typography>
      </Grid>
    </Grid>
  </Grid>
}

/**
 * @return {ReactElement}
 */
export default function CoachingBestPractices(): React.ReactElement {
  return <ResourcePageLayout
    asideContent={<ResourcesLandingAsideContent {...resourceCard} />}
    mainContent={<CoachingBestPracticesMainContent />}
  />
}
