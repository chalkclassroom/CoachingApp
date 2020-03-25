import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Line } from "rc-progress";
import ms from "pretty-ms";
import * as Constants from '../constants';

const styles: object = {
  line: {
    transform: "rotate(270deg)"
  },
  lineGrid: {
    width: "215px",
    height: "225px"
  },
  timeText: {
    textAlign: "center",
    fontFamily: 'Arimo'
  }
};

interface Props {
  classes: Style,
  timerTime: number,
  type: string,
  time: number
}

interface Style {
  line: string,
  lineGrid: string,
  timeText: string
}

/**
 * Timer in dashboard for observation tools
 * @param {Props} props
 * @return {ReactElement}
 */
function Countdown(props: Props): React.ReactElement {
  const {
    classes,
    timerTime,
    type,
    time
  } = props;
  return (
    <Grid
      container
      direction="column"
      justify="flex-end"
      alignItems="center"
    >
      <Grid item className={classes.lineGrid}>
        <div style={{ marginTop: "47%" }} />
        <Line
          className={classes.line}
          percent={100 * (time / timerTime)}
          strokeWidth={10}
          strokeColor={
            time > ((1/6) * timerTime)
              ? Constants.Colors[type]
              : "#E55529"
          }
          trailWidth={10}
        />
      </Grid>
      <Grid item className={classes.timeText}>
        {ms(time)}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Countdown);
