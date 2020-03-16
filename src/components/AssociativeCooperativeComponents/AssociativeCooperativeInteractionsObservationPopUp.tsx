import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SmallGroupIconImage from '../../assets/images/SmallGroupIconImage.svg'

/**
 * reminders for associative and cooperative interactions
 * @return {ReactElement}
 */
export default function AssociativeCooperativeObservationPopUp(): React.ReactElement {
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h4" align="center">
            Associative and Cooperative Interactions Observation
          </Typography>
        </Grid>
        <Grid item style={{paddingTop: '1em'}}>
          <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
            <ul>
              <li>
                Visit each center or activity for one minute at a time.
              </li>
              <li>
                Observe the types of interactions between children and/or teachers.
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