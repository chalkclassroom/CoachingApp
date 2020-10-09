import * as React from "react";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  averageToneRating: number
}

const useStyles = makeStyles({
  slider: {
    "& .MuiSlider-markLabel": {
      fontSize: '1.5em',
      color: 'black'
    },
    "& .MuiSlider-valueLabel": {
      fontSize: '1.2em'
    }
  }
});

/**
 * @param {Props} props
 * @return {ReactElement}
 */
export default function AverageTone(props: Props): React.ReactElement {
  const classes = useStyles();
  const { averageToneRating } = props;
  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5'
    }
  ];
  return (
    <Grid direction="column" justify="center" alignItems="center">
      <Grid item style={{paddingTop: '1em'}}>
        <Typography variant="subtitle1">
          What was the teacher&apos;s average tone rating?
        </Typography>
      </Grid>
      <Grid item style={{padding: '1em'}}>
        <Slider
          aria-labelledby="continuous-slider"
          step={1}
          value={averageToneRating}
          min={1}
          max={5}
          marks={marks}
          valueLabelDisplay="on"
          color="primary"
          className={classes.slider}
        />
      </Grid>
    </Grid>
  );
}