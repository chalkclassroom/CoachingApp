import * as React from "react";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  averageToneRating: number,
  pdf?: boolean
}

const useStyles = makeStyles({
  slider: {
    "& .MuiSlider-markLabel": {
      fontSize: '3em',
      color: 'black',
      fontFamily: 'Arimo'
    },
    "& .MuiSlider-valueLabel": {
      fontSize: '1.2em',
      fontFamily: 'Arimo'
    }
  }
});

/**
 * @param {Props} props
 * @return {ReactElement}
 */
export default function AverageTone(props: Props): React.ReactElement {
  const classes = useStyles();
  const { averageToneRating, pdf } = props;
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
    <Grid direction="column" justify="center" alignItems="center" style={{minHeight: 500}}>
      <Grid item style={{paddingTop: '1em'}}>
        {pdf ? (
          <Typography variant="h6" align="center" style={{fontFamily: 'Arimo', paddingBottom: '2em'}}>
            <strong>Average Tone</strong>
          </Typography>
        ) : (
          <Typography variant="subtitle1">
            What was the teacher&apos;s average tone rating?
          </Typography>
        )}
      </Grid>
      <Grid item style={{padding: '1em'}}>
        <Slider
          aria-labelledby="continuous-slider"
          step={1}
          value={Math.round(averageToneRating*10)/10} // one decimal place
          min={1}
          max={5}
          marks={marks}
          valueLabelDisplay="on"
          color="primary"
          className={classes.slider}
        />
      </Grid>
      <Grid item style={{paddingTop: '2em'}}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
          <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
            <strong>1:  Anger </strong>(yelling, sarcasm)
          </Typography>
          <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
            <strong>2:  Irritation </strong>(frowning, eye-rolling)
          </Typography>
          <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
            <strong>3:  Neutral </strong>(neutral facial expression)
          </Typography>
          <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
            <strong>4:  Positive Interest </strong>(smiling, nodding)
          </Typography>
          <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
            <strong>5:  Excitement </strong>(laughing, enthusiastic voice)
          </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}