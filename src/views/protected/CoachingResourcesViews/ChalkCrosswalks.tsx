import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react'

import ClassDocument from '../../../assets/coaching-docs/Katherine Newman - CLASS CHALK Crosswalk.pdf'
import ConsciousDisciplineDocument from '../../../assets/coaching-docs/Katherine Newman - Conscious Discipline CHALK Crosswalk.pdf'
import PyramidModelDocument from '../../../assets/coaching-docs/Katherine Newman - Pyramid Model CHALK crosswalk.pdf'

import {
  LazyLoadedResourceCardMedia,
  ResourceCardContent,
  ResourceLabel,
  cards,
} from './Common'
import ResourcePageLayout from './ResourcePageLayout'

const useStyles = makeStyles(theme => ({
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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

const resourceCard = cards['chalk-crosswalks']

/**
 * @return {ReactElement}
 */
function ChalkCrosswalksAsideContent(): React.ReactElement {
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

const tilesRowInfo = [
  {
    key: 'conscious-discipline',
    label: 'Conscious Discipline',
    documentLink: ConsciousDisciplineDocument,
  },
  {
    key: 'class',
    label: 'Classroom Assessment Scoring System (CLASS)',
    documentLink: ClassDocument,
  },
  {
    key: 'pyramid-model-document',
    label: 'Pyramid Model',
    documentLink: PyramidModelDocument,
  },
]

/**
 * @return {ReactElement}
 */
function ChalkCrosswalksMainContent(): React.ReactElement {
  const styles = useStyles()

  return <Grid container spacing={4}>
    <Grid item xs={12}>
      <Typography variant='h5' component='h1' align='center'>CHALK Crosswalks</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant='h6' component='p'>
        The research-based practices in CHALK Coaching align with key practices featured in three widely-used early childhood programs: the Classroom Assessment Scoring System (CLASS), Conscious Discipline, and the Pyramid Model.
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Box className={styles.tileRow}>
        {tilesRowInfo.map(
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
    </Grid>
    <Grid item xs={12}>
      <Typography variant='h6' component='p'>
        Select a program to preview or download a summary table highlighting the connections between CHALK practices and the components of each program. The crosswalks also offer practical examples of how a coach and teacher might use CHALK to support implementation of strategies from each program.
      </Typography>
    </Grid>
  </Grid>
}

/**
 * @return {ReactElement}
 */
export default function ChalkCrosswalks(): React.ReactElement {
  return <ResourcePageLayout
    asideContent={<ChalkCrosswalksAsideContent />}
    mainContent={<ChalkCrosswalksMainContent />}
  />
}
