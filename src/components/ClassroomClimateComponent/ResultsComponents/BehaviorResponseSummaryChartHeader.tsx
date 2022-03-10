import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

export default function BehaviorResponseSummaryChartHeader () {
  return (
    <>
      <Grid item style={{paddingTop: '1em'}}>
        <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
          Classroom Climate
        </Typography>
      </Grid>
      <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em', paddingBottom: '1em'}}>
        Compare how often the children were:
      </Typography>
    </>
  )
}