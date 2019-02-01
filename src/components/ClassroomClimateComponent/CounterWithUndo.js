import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ReplayIcon from "@material-ui/icons/Replay";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

const CounterWithUndo = ({ entries, classes }) => {
    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    Classroom Climate Log
                </Typography>
                <Divider />
                <div style={{ margin: 10 }} />
                <Grid
                    container
                    direction={"row"}
                    justify={"center"}
                    alignItems={"center"}
                >
                    <Chip label={`Total Responses: `} />
                </Grid>
                <div style={{ margin: 10 }} />
                <Grid
                    container
                    direction={"row"}
                    justify={"center"}
                    alignItems={"center"}
                >
                    <Button variant="contained" color="default">
                        Undo
                        <ReplayIcon />
                    </Button>
                </Grid>
            </Paper>
        </div>
    );
};

export default withStyles(styles)(CounterWithUndo);
