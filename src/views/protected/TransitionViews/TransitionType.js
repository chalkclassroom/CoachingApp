import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";

const COLOR_1 = "#F9A796";
const COLOR_2 = "#FFE79D";
const COLOR_3 = "#4DEDBC";

const theme1 = createMuiTheme({
    palette: {
        primary: {
            main: COLOR_1
        },
        secondary: {
            main: "#ffffff"
        }
    }
});

const theme2 = createMuiTheme({
    palette: {
        primary: {
            main: COLOR_2
        },
        secondary: {
            main: "#ffffff"
        }
    }
});

const theme3 = createMuiTheme({
    palette: {
        primary: {
            main: COLOR_3
        },
        secondary: {
            main: "#ffffff"
        }
    }
});

const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    },
    grow: {
        flexGrow: 1
    }
});

class SimpleMenu extends React.Component {
    handleChange = type => {
        this.props.handleTypeChange(type);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container className={classes.grow} spacing={16}>
                    <Grid item>
                        <MuiThemeProvider theme={theme1}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                style={{ maxWidth: 100, minHeight: 67 }}
                                onClick={() => this.handleChange("Wait Time")}
                            >
                                Wait Time
                            </Button>
                        </MuiThemeProvider>
                    </Grid>
                    <Grid item>
                        <MuiThemeProvider theme={theme2}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                style={{ maxWidth: 100, minHeight: 67 }}
                                onClick={() =>
                                    this.handleChange("Inside Classroom")
                                }
                            >
                                Inside Classroom
                            </Button>
                        </MuiThemeProvider>
                    </Grid>
                    <Grid item>
                        <MuiThemeProvider theme={theme3}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                style={{ maxWidth: 100, minHeight: 67 }}
                                onClick={() =>
                                    this.handleChange("Outside Classroom")
                                }
                            >
                                Outside Classroom
                            </Button>
                        </MuiThemeProvider>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

SimpleMenu.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleMenu);
