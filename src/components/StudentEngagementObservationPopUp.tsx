import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AnytimeIconImage from '../assets/images/AnytimeIconImage.svg';

/**
 * reminders for student engagement observation
 * @return {ReactElement}
 */
export default function StudentEngagementObservationPopUp(): React.ReactElement {
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            Student Engagement Observation
          </Typography>
        </Grid>
        <Grid item style={{paddingTop: '1em'}}>
          <Typography variant="h6" align="left">
            <ul>
              <li>
                Observe each child for 3 seconds.
              </li>
              <li>
                Rate each child's level of engagement in the learning activity when prompted.
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