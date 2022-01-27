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

import LevelOfInstructionIcon from '../../../assets/images/InstructionIconImage.svg'
import HandoutDocumentUrl from '../../../assets/coaching-docs/Level of Instruction CHALK Handout.pdf'
import PresentationUrl from '../../../assets/coaching-docs/Level of Instruction CHALK Presentation.pptx'

const handoutPreviewImport = () => import('../../../assets/coaching-docs/previews/Level of Instruction CHALK Handout.preview.jpg')
const presentationPreviewImport = () => import('../../../assets/coaching-docs/previews/Level of Instruction CHALK Presentation.preview.jpg')

/**
 * @return {ReactElement}
 */
function LevelOfInstructionMainContent(): React.ReactElement {
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
export default function LevelOfInstruction(): React.ReactElement {
  return <ResourcePageLayout
    asideContent={<IconOnlyAsideContent icon={LevelOfInstructionIcon} />}
    mainContent={<LevelOfInstructionMainContent />}
  />
}
