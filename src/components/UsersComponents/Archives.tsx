import { Grid, TextField, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add'
import ForwardIcon from '@material-ui/icons/Forward';
import withStyles from '@material-ui/styles/withStyles';

export default class Archives extends Component {
  
  render() {
    return (<>
      <Grid container direction='row'>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid
          item
          xs={11}
          style={{ width: '100%', height: '38vh', border: '2px solid #0988ec', borderRadius: '0.5em', marginTop: '130px' }}
        >
          <table style={{borderCollapse: 'collapse', width: '100%' }}>
            <thead>
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
                    Role
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    Site
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    Program
                  </Typography>
                </th>
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
