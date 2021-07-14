import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SmallGroupIconImage from '../../assets/images/SmallGroupIconImage.svg'
import WholeGroupIconImage from '../../assets/images/WholeGroupIconImage.svg'

/**
 * reminders for level of instruction observation
 * @return {ReactElement}
 */
export default function LevelOfInstructionObservationPopUp(): React.ReactElement {
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item style={{paddingTop: '1em'}}>
          <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
            <ul>
              <li>
                Observe the teacher delivering instruction or
                interacting with children.
              </li>
              <li>
                Select the types of instruction that occur.
              </li>
            </ul>
          </Typography>
        </Grid>
        <Grid item style={{paddingTop: '0.5em', width: '100%'}}>
          <Grid container direction="column" justify="center" alignItems="center" style={{width: '100%'}}>
            <Grid item style={{paddingBottom: '0.5em'}}>
              <Typography variant="h6">
                ACTIVITY SETTING:
              </Typography>
            </Grid>
            <Grid item style={{width: '100%'}}>
              <Grid container direction="row" justify="center" alignItems="flex-start">
                <Grid item xs={4}>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item>
                      <img src={SmallGroupIconImage} width={150}/>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" align="center">
                        Centers
                      </Typography>
                      <Typography variant="h6" align="center">
                        Small Groups
                      </Typography>
                      <Typography variant="h6" align="center">
                        Table Activities
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1} style={{height: '100%'}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <div
                      style={{
                        height: '200px',
                        width: '5px',
                        borderRight: '3px solid #d3d3d3'
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="column" justify="flex-start" alignItems="center">
                    <Grid item>
                      <img src={WholeGroupIconImage} width={150}/>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        Whole Group
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}