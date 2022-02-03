import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react'

import {
  IconOnlyAsideContent,
  LazyLoadedPreviewImage,
} from './Common'
import ResourcePageLayout from './ResourcePageLayout'

import ClassroomClimateIcon from '../../../assets/images/ClassroomClimateIconImage.svg'
import HandoutDocumentUrl from '../../../assets/coaching-docs/Classroom Climate CHALK Handout.pdf'
import PresentationUrl from '../../../assets/coaching-docs/Classroom Climate CHALK Presentation.pptx'

const handoutPreviewImport = () => import('../../../assets/coaching-docs/previews/Classroom Climate CHALK Handout.preview.jpg')
const presentationPreviewImport = () => import('../../../assets/coaching-docs/previews/Classroom Climate CHALK Presentation.preview.jpg')

/**
 * @return {ReactElement}
 */
function ClassroomClimateMainContent(): React.ReactElement {
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
export default function ClassroomClimate(): React.ReactElement {
  return <ResourcePageLayout
    asideContent={<IconOnlyAsideContent icon={ClassroomClimateIcon} />}
    mainContent={<ClassroomClimateMainContent />}
  />
}
