import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react'

import {
  IconOnlyAsideContent,
  LazyLoadedPreviewImage,
} from './Common'
import ResourcePageLayout from './ResourcePageLayout'

import SequentialActivitiesIcon from '../../../assets/images/SequentialIconImage.svg'
import HandoutDocumentUrl from '../../../assets/coaching-docs/Sequential Activities CHALK Handout.pdf'
import PresentationUrl from '../../../assets/coaching-docs/Sequential Activities CHALK presentation.pptx'

const handoutPreviewImport = () => import('../../../assets/coaching-docs/previews/Sequential Activities CHALK Handout.preview.jpg')
const presentationPreviewImport = () => import('../../../assets/coaching-docs/previews/Sequential Activities CHALK presentation.preview.jpg')

/**
 * @return {ReactElement}
 */
function SequentialActivitiesMainContent(): React.ReactElement {
  return <Grid container spacing={4}>
    <Grid item xs={12}>
      <Typography variant='h5' component='h1' align='center'>Professional Development Materials</Typography>
    </Grid>
    <Grid item xs={12}>
      <Box pt={2} display="flex" alignItems="center" justifyContent="space-around">
        <LazyLoadedPreviewImage imageImport={handoutPreviewImport} docUrl={HandoutDocumentUrl} />
        <Box minWidth="2rem" />
        <LazyLoadedPreviewImage imageImport={presentationPreviewImport} docUrl={PresentationUrl} />
      </Box>
    </Grid>
  </Grid>
}

/**
 * @return {ReactElement}
 */
export default function SequentialActivities(): React.ReactElement {
  return <ResourcePageLayout
    asideContent={<IconOnlyAsideContent icon={SequentialActivitiesIcon} />}
    mainContent={<SequentialActivitiesMainContent />}
  />
}
