/* eslint-disable react/prop-types */

import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import React from 'react'

import ActivitySettingButtons from './ActivitySettingButtons'

interface SelectActivityModalProps {
  entryType: number
  open: boolean
  onActivitySettingChange(activitySetting: number): void
}

const SelectActivityModal: React.FC<SelectActivityModalProps> = ({
  entryType,
  onActivitySettingChange,
  open,
}) => {
  return (
    <Dialog open={open}>
      <Grid
        container
        alignItems="center"
        direction="column"
        justify="center"
        style={{ width: '100%' }}
      >
        <Grid item>
          <Typography
            align="center"
            variant="h5"
            style={{ fontFamily: 'Arimo', paddingBottom: '1em' }}
          >
            Please select the current activity setting in the classroom:
          </Typography>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <ActivitySettingButtons
            activitySetting={entryType}
            changeActivitySetting={onActivitySettingChange}
          />
        </Grid>
        <Grid item>
          <Typography
            align="center"
            variant="h6"
            style={{
              fontFamily: 'Arimo',
              paddingBottom: '1em',
              paddingTop: '1em',
            }}
          >
            You may change your selection later if the activity setting changes
            during your observation.
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default SelectActivityModal
