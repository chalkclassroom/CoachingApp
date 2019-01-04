import React from "react";
import PropTypes from "prop-types";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import NoSsr from "@material-ui/core/NoSsr";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import SchoolIcon from "@material-ui/icons/School";
import BehaviorCounter from "./BehaviorCounter";

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

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3,
        backgroundColor: props.value === 0 ? "#76e9e9" : "#68b0ff"}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
});

class InstructionTransitionToggle extends React.Component {
    state = {
        /*
        Values:
        0 - Instruction
        1 - Transition
         */
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <NoSsr>
                <div className={classes.root}>
                    <MuiThemeProvider theme={tabsPalette}>
                        <AppBar
                            position="static"
                            color={value === 0 ? "primary" : "secondary"}
                        >
                            <Tabs
                                fullWidth
                                value={value}
                                onChange={this.handleChange}
                                indicatorColor={
                                    value === 0 ? "secondary" : "primary"
                                }
                            >
                                <Tab
                                    icon={value === 0 && <SchoolIcon />}
                                    label="Instruction"
                                />
                                <Tab
                                    icon={
                                        value === 1 && (
                                            <TransferWithinAStationIcon />
                                        )
                                    }
                                    label="Transition"
                                />
                            </Tabs>
                        </AppBar>
                        <TabContainer value={this.state.value}>
                            <BehaviorCounter type={this.state.value} />
                        </TabContainer>
                    </MuiThemeProvider>
                </div>
            </NoSsr>
        );
    }
}

InstructionTransitionToggle.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InstructionTransitionToggle);
