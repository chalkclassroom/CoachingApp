import { Grid } from '@material-ui/core';
import * as React from 'react';
import { Component } from 'react';

class ReportImages extends React.Component {
    render() {
      return (
        <>
        <Grid container>
            <Grid container>
                <Grid item xs={5}>
                    <h1>View Report Images</h1>
                </Grid>
            </Grid>
        </Grid>
        </>
        )
    }
  }

export default ReportImages;