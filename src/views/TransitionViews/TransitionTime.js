import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import InfoIcon from "@material-ui/icons/Help";
import EditIcon from "@material-ui/icons/Edit";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/teal";
import TransitionTimeHelp from "./TransitionTimeHelp";
import TranstionType from "./TransitionType";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TransitionTimer from "./TransitionTimer";
import TransitionLog from "./TransitionLog";
import YesNoDialog from "../../components/Shared/YesNoDialog";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ff0000"
        },
        secondary: cyan
    }
});

const styles = {
    root: {
        flexGrow: 1,
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column"
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

class TransitionTime extends React.Component {
    constructor(props) {
        super(props);
        this.handleAppend = this.handleAppend.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    state = {
        auth: true,
        anchorEl: null,
        help: false,
        type: null,
        entries: []
    };

    handleAppend(entry) {
        let newEntries = this.state.entries;
        entry.type = this.state.type;
        newEntries.push(entry);
        this.setState({ entries: newEntries });
    }

    handleTypeChange(newType) {
        this.setState({ type: newType });
    }

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleHelpModal = () => {
        this.setState({ help: true });
    };

    handleClickAway = () => {
        this.setState({ help: false });
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                color="inherit"
                                className={classes.grow}
                            >
                                Transition Time
                            </Typography>
                            {auth && (
                                <div>
                                    <IconButton
                                        aria-owns={
                                            open ? "menu-appbar" : undefined
                                        }
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.handleClose}>
                                            Profile
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose}>
                                            My account
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                    {this.state.help ? (
                        <ClickAwayListener onClickAway={this.handleClickAway}>
                            {" "}
                            <TransitionTimeHelp />
                        </ClickAwayListener>
                    ) : (
                        <div />
                    )}
                    <main style={{ flex: 1 }}>
                        <Grid container spacing={16}>
                            <Grid item xs={4}>
                                <Grid
                                    container
                                    alignItems={"center"}
                                    justify={"center"}
                                    direction={"column"}
                                >
                                    <div style={{ margin: 20 }} />
                                    <TransitionLog
                                        entries={this.state.entries}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid
                                    container
                                    alignItems={"center"}
                                    justify={"center"}
                                    direction={"column"}
                                >
                                    <div style={{ margin: 20 }} />
                                    <TranstionType
                                        handleTypeChange={this.handleTypeChange}
                                    />
                                    <TransitionTimer
                                        handleAppend={this.handleAppend}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </main>
                    <footer>
                        <Grid
                            container
                            alignItems={"center"}
                            justify={"space-between"}
                            direction={"row"}
                        >
                            <Grid item xs={2}>
                                <IconButton
                                    aria-owns={open ? "menu-appbar" : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleHelpModal}
                                    color="inherit"
                                >
                                    <InfoIcon
                                        color={"secondary"}
                                        fontSize={"large"}
                                    />
                                </IconButton>
                                <IconButton
                                    aria-owns={open ? "menu-appbar" : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleNotes}
                                    color="inherit"
                                >
                                    <EditIcon
                                        color={"secondary"}
                                        fontSize={"large"}
                                    />
                                </IconButton>
                            </Grid>
                            <Grid item xs={8} />
                            <Grid item xs={2}>
                                <Grid
                                    container
                                    alignItems={"center"}
                                    justify={"space-between"}
                                    direction={"column"}
                                >
                                    Start Time:{" "}
                                    {new Date().toLocaleString("en-US", {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true
                                    })}
                                    <br />
                                    <YesNoDialog
                                        buttonText={"Complete Observation"}
                                        buttonVariant={"contained"}
                                        buttonColor={"secondary"}
                                        buttonStyle={{margin: 10}}
                                        dialogTitle={"Are you sure you want to complete this observation?"}
                                        shouldOpen={true}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </footer>
                </div>
            </MuiThemeProvider>
        );
    }
}

TransitionTime.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionTime);
