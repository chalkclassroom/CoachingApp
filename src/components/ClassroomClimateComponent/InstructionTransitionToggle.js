import React from "react";
import PropTypes from "prop-types";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import SchoolIcon from "@material-ui/icons/School";
import { connect } from "react-redux";
import { toggleNewClimateType } from "../../state/actions/classroom-climate";

const tabsPalette = createMuiTheme({
    palette: {
        primary: {
            main: "#76e9e9"
        },
        secondary: {
            main: "#68b0ff"
        }
    }
});

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        margin: 20
    },
    button: {
        margin: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    iconSmall: {
        fontSize: 20
    },
    grow: {
        flexGrow: 1
    }
});

class InstructionTransitionToggle extends React.Component {
    state = {};

    render() {
        return (
            <div className={this.props.classes.root}>
                <MuiThemeProvider theme={tabsPalette}>
                    <Grid
                        container
                        className={this.props.classes.grow}
                        direction={"row"}
                        justify={"center"}
                        alignItems={"center"}
                        spacing={16}
                    >
                        <Grid item>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                className={this.props.classes.button}
                                style={{ minWidth: 200 }}
                                onClick={() =>
                                    this.props.toggleNewClimateType(
                                        "instruction"
                                    )
                                }
                            >
                                Instruction
                                <SchoolIcon
                                    className={this.props.classes.rightIcon}
                                />
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={"contained"}
                                color={"secondary"}
                                className={this.props.classes.button}
                                style={{ minWidth: 200 }}
                                onClick={() =>
                                    this.props.toggleNewClimateType(
                                        "transition"
                                    )
                                }
                            >
                                Transition
                                <TransferWithinAStationIcon
                                    className={this.props.classes.rightIcon}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </div>
        );
    }
}

InstructionTransitionToggle.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
    connect(
        null,
        { toggleNewClimateType }
    )(InstructionTransitionToggle)
);
