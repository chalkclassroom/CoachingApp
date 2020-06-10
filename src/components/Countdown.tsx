import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Line} from "rc-progress";
import ms from "pretty-ms";
import * as Constants from '../constants';

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
            justify="center"
            alignItems="center"
            style={{width: '100%', height: '100%'}}
        >
            <Grid item className={classes.lineGrid}>
                <div style={{marginTop: "10vh"}}/>
                <Line
                    className={classes.line}
                    percent={100 * (time / timerTime)}
                    strokeWidth={18}
                    strokeColor={
                        time > ((1 / 6) * timerTime)
                            ? Constants.Colors[type]
                            : "#E55529"
                    }
                    trailWidth={18}
                />
            </Grid>
            <Grid item className={classes.timeText}>
                {ms(time)}
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(Countdown);
