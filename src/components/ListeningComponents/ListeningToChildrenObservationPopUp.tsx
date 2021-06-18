import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SmallGroupIconImage from '../../assets/images/SmallGroupIconImage.svg'

/**
 * reminders for listening to children observation
 * @return {ReactElement}
 */
export default function ListeningToChildrenObservationPopUp(): React.ReactElement {
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item style={{paddingTop: '1em'}}>
          <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
            <ul>
              <li>
                Observe the teacher interacting with children.
              </li>
              <li>
                Select the types of behaviors that show teachers
                <ul>
                  <li>
                    listening to children
                  </li>
                  <li>
                    encouraging child talk
                  </li>
                </ul>
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
                Centers / Small Groups / Table Activities / Mealtimes
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}