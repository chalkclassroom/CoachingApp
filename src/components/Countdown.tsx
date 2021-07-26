import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Line } from "rc-progress";
import ms from "pretty-ms";
import * as Constants from '../constants/Constants';
import * as Types from '../constants/Types';

const styles: object = {
  line: {
    transform: "rotate(270deg)"
  },
  lineGrid: {
    width: "20vh", // because of transformation, width of container affects height of progress bar
    height: "80%"
  },
  timeText: {
    textAlign: "center",
    fontFamily: 'Arimo',
  },
  timerContainer: {
    marginTop: '10vh'
  },
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    line: {
      transform: 'rotate(0deg)',
    },
    timerContainer: {
      marginTop: 0
    }
  }
};

interface Props {
  classes: Style,
  timerTime: number,
  type: Types.DashboardType,
  time: number,
  horizontal?: boolean
}

interface Style {
  line?: string,
  lineGrid?: string,
  timeText?: string,
  timerContainer?: string
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
    time,
    horizontal
  } = props;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{width: '100%', height: '100%'}}
    >
      <Grid item className={classes.lineGrid} style={{height: horizontal ? '20%' : '80%'}}>
        <div className={classes.timerContainer} />
        <Line
          className={classes.line}
          percent={100 * (time / timerTime)}
          strokeWidth={18}
          strokeColor={
            time > ((1/6) * timerTime)
              ? Constants.Colors[type]
              : "#E55529"
          }
          trailWidth={18}
          style={{
            transform: horizontal ? 'rotate(0deg)' : undefined // timer orientation does not depend on screen orientation
          }}
        />
      </Grid>
      <Grid item className={classes.timeText}>
        {ms(time)}
      </Grid>
    </Grid>
  );
}

Countdown.propTypes = {
  classes: PropTypes.object.isRequired,
  timerTime: PropTypes.number.isRequired,
  type: PropTypes.oneOf<Types.DashboardType>(['AppBar', 'TT', 'CC', 'MI', 'SE', 'IN', 'LC', 'SA', 'LI', 'AC', 'RedGraph', 'NotPresent']).isRequired,
  time: PropTypes.number.isRequired,
  horizontal: PropTypes.bool
}

export default withStyles(styles)(Countdown);
