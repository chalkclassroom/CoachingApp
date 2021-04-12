import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AnytimeIconImage from '../../assets/images/AnytimeIconImage.svg';

/**
 * reminders for transition time observation
 * @return {ReactElement}
 */
export default function TransitionTimeObservationPopUp(): React.ReactElement {
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        {/* <Grid item>
          <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
            Transition Time Observation
          </Typography>
        </Grid> */}
        <Grid item style={{paddingTop: '1em'}}>
          <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
            When you observe a transtion in the classroom,
          </Typography>
          <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
            <ul>
              <li>
                choose a reason for the transition and start the timer
              </li>
              <li>
                stop the timer when the transition ends
              </li>
            </ul>
          </Typography>
        </Grid>
        <Grid item style={{paddingTop: '0.5em'}}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
              <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                ACTIVITY SETTING:
              </Typography>
            </Grid>
              <Grid item>
              <img src={AnytimeIconImage} width={150}/>
              </Grid>
            <Grid item>
              <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                Any time of the day!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}