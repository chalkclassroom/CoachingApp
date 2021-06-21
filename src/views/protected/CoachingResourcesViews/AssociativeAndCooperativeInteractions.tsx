import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react'

import {
  LazyLoadedPreviewImage,
} from './Common'
import ResourcePageLayout from './ResourcePageLayout'

import AssociativeAndCooperativeInteractionsIcon from '../../../assets/images/AssocCoopIconImage.svg'
import HandoutDocumentUrl from '../../../assets/coaching-docs/Katherine Newman - Associative and Cooperative Interactions CHALK Handout.pdf'
import PresentationUrl from '../../../assets/coaching-docs/Katherine Newman - Associative and Cooperative CHALK Presentation.pptx'

const useStyles = makeStyles({
  asideIcon: {
    objectFit: 'contain',
    width: '100%',
  },
})

/**
 * @return {ReactElement}
 */
function AssociativeAndCooperativeInteractionsAsideContent(): React.ReactElement {
  const styles = useStyles()

  return <>
    <img src={AssociativeAndCooperativeInteractionsIcon} className={styles.asideIcon} />
  </>
}

const handoutPreviewImport = () => import('../../../assets/coaching-docs/previews/Katherine Newman - Associative and Cooperative Interactions CHALK Handout.preview.jpg')
const presentationPreviewImport = () => import('../../../assets/coaching-docs/previews/Katherine Newman - Associative and Cooperative CHALK Presentation.preview.jpg')

/**
 * @return {ReactElement}
 */
function AssociativeAndCooperativeInteractionsMainContent(): React.ReactElement {
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
export default function AssociativeAndCooperativeInteractions(): React.ReactElement {
  return <ResourcePageLayout
    asideContent={<AssociativeAndCooperativeInteractionsAsideContent />}
    mainContent={<AssociativeAndCooperativeInteractionsMainContent />}
  />
}
