import { Grid, TextField, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add'
import ForwardIcon from '@material-ui/icons/Forward';
import withStyles from '@material-ui/styles/withStyles';

export default class Teachers extends Component {
  
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
        <Grid item xs={6}><span></span></Grid>
        <Grid item xs={3}>
        <Grid container direction='column'>
            <Grid item>
                <Grid container direction='row' >
                    <Grid item>
                        <AddIcon style={{fill: 'white', fontSize:'40', marginTop:'15px'}}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
            <Grid container direction='row' justifyContent='flex-end'>
              <Grid item style={{marginRight:'3vw'}}>
                <TextField
                  style={{width:'160px'}}
                  id="teacher-search"
                  label="Search"
                  type="search"
                  // className={classes.search}
                  variant="outlined"
                  // onChange={onChangeText}
                />
              </Grid>
            </Grid>
          </Grid>
      </Grid>
      </Grid>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid
          item
          xs={11}
          style={{ width: '100%', height: '38vh', border: '2px solid #0988ec', borderRadius: '0.5em', marginTop: '100px' }}
        >
          <table style={{borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th colSpan={2}>
                  <Typography variant="h6" gutterBottom>
                    <strong>Teacher</strong>
                  </Typography>
                </th>
                <th colSpan={2}>
                  <Typography variant="h6" gutterBottom>
                    <strong>Instructional Coach</strong>
                  </Typography>
                </th>
                <th colSpan={1}>
                  <Typography variant="h6" gutterBottom>
                    <strong>Site</strong>
                  </Typography>
                </th>
                <th colSpan={1}>
                  <Typography variant="h6" gutterBottom>
                    <strong>Program</strong>
                  </Typography>
                </th>
              </tr>
              <tr>
                <th>
                  <Typography variant="h6" gutterBottom>
                    Last Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    First Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    Last Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    First Name
                  </Typography>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>


          </table>
        </Grid>
      </Grid>
    </Grid>
    </>)
  }
}
