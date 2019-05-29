import React from 'react';
import Button from '@material-ui/core/Button';
import './typeSelStyle.css'
import '../../../assets/icons/Child Waiting.svg'
import Grid from '@material-ui/core/Grid';


function IconLabelButtons() {
  return (
    <div>
      <Grid
      container
      direction = "column"
      justify = "space-around"
      alignItems = "center"
      >
      <Button>Waiting in line/lining up </Button>
      <Button>Classroom Routines</Button>
      <Button>Traveling outside classroom</Button>
      <Button>Behavior Management Disruption</Button>
      <Button>Children waiting on teacher/materials</Button>
      <Button>Other</Button>

      </Grid>
    </div>

  );
}

export default IconLabelButtons;
