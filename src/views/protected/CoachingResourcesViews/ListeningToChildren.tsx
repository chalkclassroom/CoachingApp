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

import ListeningToChildrenIcon from '../../../assets/images/ListeningIconImage.svg'
import HandoutDocumentUrl from '../../../assets/coaching-docs/Listening to Children CHALK Handout.pdf'
import PresentationUrl from '../../../assets/coaching-docs/Listening to Children CHALK Presentation.pptx'

const handoutPreviewImport = () => import('../../../assets/coaching-docs/previews/Listening to Children CHALK Handout.preview.jpg')
const presentationPreviewImport = () => import('../../../assets/coaching-docs/previews/Listening to Children CHALK Presentation.preview.jpg')

/**
 * @return {ReactElement}
 */
function ListeningToChildrenMainContent(): React.ReactElement {
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
export default function ListeningToChildren(): React.ReactElement {
  return <ResourcePageLayout
    asideContent={<IconOnlyAsideContent icon={ListeningToChildrenIcon} />}
    mainContent={<ListeningToChildrenMainContent />}
  />
}
