import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add'
import ForwardIcon from '@material-ui/icons/Forward';

export default class Skeleton extends Component {
  render() {
    return (<>
      <Grid container direction='row'>
        <Grid item xs={3}>
            <Grid container direction='column' style={{ marginLeft:'30px'}}>
                <Grid item xs={6}>
                    <Grid container direction='row' >
                        <Grid item>
                            <AddIcon style={{fill: 'green', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" gutterBottom style={{marginTop:'20px' }}>
                                Add
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                <Grid container direction='row'>
                        <Grid item>
                            <ForwardIcon style={{fill: 'blue', fontSize:'40', marginTop:'15px',}}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" gutterBottom style={{marginTop:'20px',}}>
                                Transfer
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={1}><span></span></Grid>
        <Grid item xs={8}>
            <Typography variant="h6" gutterBottom style={{marginTop:'70px'}}>
                Click on one of the tabs to manage users.
            </Typography>
        </Grid>
      </Grid>
      </>)
  }
}
