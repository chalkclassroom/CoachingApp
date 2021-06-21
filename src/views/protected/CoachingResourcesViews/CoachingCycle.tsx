import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react'

import {
  LazyLoadedResourceCardMedia,
  ResourceCardContent,
  ResourceLabel,
  StyledLink,
  cards 
} from './Common'
import ResourcePageLayout from './ResourcePageLayout'

import HandbookCoverImage from '../../../assets/images/CoachingResources/Katherine Newman - Coach Handbook Cover Image.svg'
import HandbookDocument from '../../../assets/coaching-docs/Katherine Newman - Coaching Best Practices.pdf'

const resourceCard = cards['coaching-cycle']

const useStyles = makeStyles({
  coverImage: {
    maxWidth: 360,
    width: '100%',
  }
})

/**
 * @return {ReactElement}
 */
function CoachingCycleAsideContent(): React.ReactElement {
  const { imageImport, label } = resourceCard

  return <>
    <Card>
      <LazyLoadedResourceCardMedia imageImport={imageImport} />
      <ResourceCardContent>
        <ResourceLabel>{label}</ResourceLabel>
      </ResourceCardContent>
    </Card>
  </>
}

/**
 * @return {ReactElement}
 */
function CoachingCycleMainContent(): React.ReactElement {
  const styles = useStyles()

  return <Grid container spacing={4}>
    <Grid item xs={12}>
      <Typography variant='h5' component='h1' align='center'>CHALK Coaching Cycle</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant='body1'>
        This manual provides an overview of the CHALK Coaching tool. It also includes a real-life example of an instructional coach and teacher implementing a CHALK coaching cycle to advance classroom practices.
      </Typography>
    </Grid>
    <Grid item xs={12} container justify="center">
      <img className={styles.coverImage} src={HandbookCoverImage} />
    </Grid>
    <Grid item xs={12} container justify="center">
      <StyledLink href={HandbookDocument} download>Download</StyledLink>
    </Grid>
  </Grid>
}

/**
 * @return {ReactElement}
 */
export default function CoachingCycle(): React.ReactElement {
  return <ResourcePageLayout
    asideContent={<CoachingCycleAsideContent />}
    mainContent={<CoachingCycleMainContent />}
  />
}
