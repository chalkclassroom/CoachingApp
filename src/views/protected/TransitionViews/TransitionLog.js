import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

const TransitionLog = ({ entries, classes }) => {
    const fiveEntries = entries.slice(-5);

    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    Recent Transitions
                </Typography>
                <ul>
                    {fiveEntries.map((entry, index) => (
                        <li key={index}>
                            {entry.end}
                            <br />
                            Duration:{entry.duration}
                            <br />
                            Type:{entry.type}
                        </li>
                    ))}
                </ul>
            </Paper>
        </div>
    );
};

TransitionLog.propTypes = {
    entries: PropTypes.array.isRequired
};

export default withStyles(styles)(TransitionLog);
