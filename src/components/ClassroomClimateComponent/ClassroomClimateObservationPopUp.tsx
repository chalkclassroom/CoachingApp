import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AnytimeIconImage from '../../assets/images/AnytimeIconImage.svg';
import SuggestedDuration from "../Shared/SuggestedDuration";

/**
 * reminders for classroom climate observation
 * @return {ReactElement}
 */
export default function ClassroomClimateObservationPopUp(): React.ReactElement {
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item style={{paddingTop: '1em'}}>
          <Typography variant="h6" align="left"  style={{fontFamily: 'Arimo'}}>
            <SuggestedDuration />
            As you observe, select
          </Typography>
          <Typography variant="h6" align="left"  style={{fontFamily: 'Arimo'}}>
            <ul>
              <li>
                teachers&apos; behaviors from the options provided
              </li>
              <li>
                a teacher tone rating when prompted
              </li>
            </ul>
          </Typography>
        </Grid>
        <Grid item style={{paddingTop: '0.5em'}}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
              <Typography variant="h6">
                ACTIVITY SETTING:
              </Typography>
            </Grid>
              <Grid item>
              <img src={AnytimeIconImage} width={150}/>
              </Grid>
            <Grid item>
              <Typography variant="h6">
                Any time of the day!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}