import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'

import * as Constants from '../../constants/Constants'

interface ActivitySettingButtonsProps {
  activitySetting: number
  changeActivitySetting(activitySetting: number): void
}

const ActivitySettingButtons = (
  props: ActivitySettingButtonsProps
): React.ReactElement => {
  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      <MuiThemeProvider theme={Constants.EngagementTheme}>
        <Button
          variant="contained"
          color={
            props.activitySetting === 0 || props.activitySetting === -1
              ? 'primary'
              : 'secondary'
          }
          onClick={(): void => {
            props.changeActivitySetting(0)
          }}
        >
          Small Group
        </Button>
        <Button
          variant="contained"
          color={
            props.activitySetting === 1 || props.activitySetting === -1
              ? 'primary'
              : 'secondary'
          }
          onClick={(): void => {
            props.changeActivitySetting(1)
          }}
        >
          Whole Group
        </Button>
        <Button
          variant="contained"
          color={
            props.activitySetting === 3 || props.activitySetting === -1
              ? 'primary'
              : 'secondary'
          }
          onClick={(): void => {
            props.changeActivitySetting(3)
          }}
        >
          Centers
        </Button>
        <Button
          variant="contained"
          color={
            props.activitySetting === 2 || props.activitySetting === -1
              ? 'primary'
              : 'secondary'
          }
          onClick={(): void => {
            props.changeActivitySetting(2)
          }}
        >
          Transition
        </Button>
      </MuiThemeProvider>
    </Grid>
  )
}

export default ActivitySettingButtons
