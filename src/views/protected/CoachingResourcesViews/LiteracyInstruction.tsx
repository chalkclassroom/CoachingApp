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

import LiteracyInstructionIcon from '../../../assets/images/LiteracyIconImage.svg'
import HandoutDocumentUrl from '../../../assets/coaching-docs/Literacy Definitions and Examples.pdf'
// import PresentationUrl from '../../../assets/coaching-docs/Literacy Instruction CHALK Presentation.pptx'

const handoutPreviewImport = () => import('../../../assets/coaching-docs/previews/Literacy Definitions and Examples.preview.png')

/**
 * @return {ReactElement}
 */
function LiteracyInstructionMainContent(): React.ReactElement {
  return <Grid container spacing={4}>
    <Grid item xs={12}>
      <Typography variant='h5' component='h1' align='center'>Professional Development Materials</Typography>
    </Grid>
    <Grid item xs={12}>
      <Box pt={12} display="flex" alignItems="center" justifyContent="space-around">
        <Typography variant='h4' component='h2' align='center' style={{ fontWeight: 600 }}>Coming soon</Typography>
      </Box>
    </Grid>
  </Grid>
}

/**
 * @return {ReactElement}
 */
export default function LiteracyInstruction(): React.ReactElement {
  return <ResourcePageLayout
    asideContent={<IconOnlyAsideContent icon={LiteracyInstructionIcon} />}
    mainContent={<LiteracyInstructionMainContent />}
  />
}
