import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import InfoIcon from "@material-ui/icons/Help";
import EditIcon from "@material-ui/icons/Edit"
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/teal';
import TransitionTimeHelp from "./TransitionTimeHelp";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';



const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: cyan,
    },
});


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class TransitionTime extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        help: false,
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleHelpModal= () => {
        this.setState({ help: true })
    };

    handleClickAway= () => {
        this.setState({ help: false })
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                {/*<FormGroup>*/}
                    {/*<FormControlLabel*/}
                        {/*control={*/}
                            {/*<Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />*/}
                        {/*}*/}
                        {/*label={auth ? 'Logout' : 'Login'}*/}
                    {/*/>*/}
                {/*</FormGroup>*/}
                <AppBar position="static"  color="default">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Transition Time
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
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
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                {this.state.help? <ClickAwayListener onClickAway={this.handleClickAway}> <TransitionTimeHelp/></ClickAwayListener>:<div />}
                <Grid container alignItems={"center"} justify={"center"} direction={"row"}>
                    Time
                </Grid>
                <Grid container alignItems={"center"} justify={"center"} direction={"row"}>
                    <Button variant="fab" mini color="primary" aria-label="Cancel"  fontSize={'large'}>
                       Cancel
                    </Button>
                    <Button variant="fab" color="secondary" aria-label="Start"  fontSize={'large'}>
                       Start
                    </Button>
                </Grid>
                <footer>
                    <Grid container alignItems={"center"} justify={"space-between"} direction={"row"}>
                        <Grid item xs={2}>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleHelpModal}
                                color="inherit"
                            >
                                <InfoIcon color={'secondary'} fontSize={'large'}/>
                            </IconButton>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleNotes}
                                color="inherit"
                            >
                                <EditIcon color={'secondary'} fontSize={'large'}/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>

                        </Grid>
                        <Grid item xs={2}>
                            <Grid container alignItems={"center"} justify={"space-between"} direction={"column"}>
                                Start Time: 12:04 PM
                                Run Time : 17 Minutes
                            <Button variant={'outlined'} color={"secondary"} style={{margin:10}}>
                                Complete Observation
                            </Button>
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
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransitionTime);
