import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SmallGroupIconImage from '../../assets/images/SmallGroupIconImage.svg'
import SuggestedDuration from "../Shared/SuggestedDuration";

/**
 * reminders for sequential activities
 * @return {ReactElement}
 */
export default function SequentialActivitiesObservationPopUp(): React.ReactElement {
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item style={{paddingTop: '1em'}}>
          <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
            <SuggestedDuration duration={30}/>
            <ul>
              <li>
                Visit each center or activity for one minute at a time.
              </li>
              <li>
                Observe whether or not children&apos;s activities follow a
                logical order or sequence of steps that build on each other.
              </li>
              <li>
                Rotate through all centers multiple times.
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
              <img src={SmallGroupIconImage} width={150}/>
              </Grid>
            <Grid item>
              <Typography variant="h6">
                Centers / Small Groups / Table Activities
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}