/* eslint-disable react/prop-types */

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import {
  makeStyles,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import React, { useState } from 'react'

import Countdown from '../Countdown'
import * as Constants from '../../constants/Constants'

const ratingOptions = [
  {
    value: 0,
    label: '0',
    text: 'Off Task',
  },
  {
    value: 1,
    label: '1',
    text: 'Mildly Engaged',
  },
  {
    value: 2,
    label: '2',
    text: 'Engaged',
  },
  {
    value: 3,
    label: '3',
    text: 'Highly Engaged',
  },
]

interface StudentRatingModalProps {
  countdownTime: number
  displayedStudentName: string | null
  fadeInActive: boolean
  observeLabelPrefix: string
  onCloseClick(): void
  onConfirmRating(rating: number): void
  open: boolean
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    background: '#ede7f6',
    backgroundColor: '#e99b2e',
  },
  paper: {
    position: 'absolute',
    width: '67%',
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8,
  },
}))

const StudentRatingModal: React.FC<StudentRatingModalProps> = ({
  countdownTime,
  displayedStudentName,
  fadeInActive,
  observeLabelPrefix,
  onCloseClick,
  onConfirmRating,
  open,
}) => {
  const classes = useStyles()
  const [localSelectedRating, setSelectedRating] = useState(-1)
  const confirmRatingDisabled = localSelectedRating === -1
  return <Dialog open={open} fullWidth maxWidth="md">
    <Grid
      container
      alignItems="center"
      direction="column"
      justify={'center'}
      style={{ width: '100%' }}
    >
      {/* Fade component flashes an orange background as visual cue that timer has ended */}
      <Fade
        in={fadeInActive}
        timeout={{ enter: 300, exit: 600 }}
        style={{ height: '100%' }}
      >
        <Grid
          item
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: '#EDAF57', // lighter shade of SE color
          }}
        />
      </Fade>
      <Grid item style={{ width: '100%' }}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          style={{ width: '100%' }}
        >
          <Grid item>
            <IconButton
              onClick={onCloseClick}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          variant="h6"
          gutterBottom
          style={{ fontFamily: 'Arimo' }}
        >
          {observeLabelPrefix}this student&apos;s level of engagement.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4" style={{ fontFamily: 'Arimo' }}>
          {displayedStudentName}
        </Typography>
      </Grid>
      <Grid item>
        <Countdown
          type="SE"
          timerTime={5000}
          time={countdownTime}
          horizontal={true}
        />
      </Grid>
      <Grid
        item
        style={{ marginTop: '3em', marginBottom: '3em', width: '100%' }}
      >
        <Grid
          alignItems="stretch"
          direction="row"
          justify="space-around"
          container
          style={{ width: '100%' }}
        >
          <MuiThemeProvider theme={Constants.EngagementTheme}>
            {ratingOptions.map((item, index) => <Button
                key={index}
                variant="contained"
                disabled={countdownTime !== 0}
                color={
                  localSelectedRating === item.value || localSelectedRating === -1
                    ? 'primary'
                    : 'secondary'
                }
                style={{
                  width: '18vh',
                  height: '18vh',
                  maxWidth: 130,
                  maxHeight: 130,
                  fontFamily: 'Arimo',
                  fontSize: 14,
                  paddingTop: 0,
                  paddingBottom: 0,
                  margin: 0,
                }}
                onClick={(): void => setSelectedRating(item.value)}
              >
                <Grid
                  container
                  alignItems="stretch"
                  direction="column"
                  justify="flex-start"
                  style={{
                    width: '18vh',
                    height: '18vh',
                    maxWidth: 130,
                    maxHeight: 130,
                    paddingTop: '1em',
                  }}
                >
                  <Grid item style={{ height: '50%' }}>
                    <Typography
                      variant="h4"
                      style={{
                        fontFamily: 'Arimo',
                        paddingTop: '0.6em',
                      }}
                    >
                      <b>{item.label}</b>
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: 'bold' }}
                    >
                      {item.text}
                    </Typography>
                  </Grid>
                </Grid>
              </Button>)}
          </MuiThemeProvider>
        </Grid>
      </Grid>
      <Grid alignItems="center" direction="row" justify="center" container>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            style={{ fontFamily: 'Arimo' }}
            disabled={confirmRatingDisabled}
            onClick={() => {
              setSelectedRating(-1);
              onConfirmRating(localSelectedRating)
            }}
          >
            CONFIRM RATING
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Dialog>
}

export default StudentRatingModal
