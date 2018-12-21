import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import Link from "react-router-dom/Link";
import Logo from '../assets/logo.png'
import {withRouter} from 'react-router-dom'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import LoginModal from "./LoginComponent/LoginModal";
import SignUpModal from "./SignUpComponent/SignUpModal";

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

class CommonAppBar extends React.Component{
    state = {
        auth: true,
        anchorEl: null,
        loginModal: false,
        signupModal: false
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
        this.setState({ loginModal: false });
        this.setState({ signupModal: false })
    };

    handleLoginModal= () => {
        this.setState({ loginModal: true })
    };

    handleSignupModal= () => {
        this.setState({ signupModal: true })
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color={"primary"}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Logo"
                            className={classNames(
                                classes.menuButton,
                                classes.menuButtonHidden,
                            )}
                        >
                            <img src={Logo} height={'48'}/>
                        </IconButton>
                        <div color="inherit" className={classes.grow}/>
                        <Button color="secondary" variant={"contained"} onClick={this.handleLoginModal}
                                className={classes.menuButton}>Log In</Button>
                        <Button color="secondary" variant={"contained"} onClick={this.handleSignupModal}
                                className={classes.menuButton}>Sign Up</Button>
                    </Toolbar>
                </AppBar>
                {this.state.loginModal ?
                    <ClickAwayListener onClickAway={this.handleClickAway}> <LoginModal handleClose={this.handleClose}/></ClickAwayListener> : <div/>}
                {this.state.signupModal ?
                    <ClickAwayListener onClickAway={this.handleClickAway}> <SignUpModal handleClose={this.handleClose}/></ClickAwayListener> : <div/>}
            </div>
        );
    }
}

CommonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const AppBarWithRouter = withRouter(CommonAppBar);
export default withStyles(styles)(AppBarWithRouter);