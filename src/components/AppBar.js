import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import Link from "react-router-dom/Link";
import Logo from '../logo.svg'
import {withRouter} from 'react-router-dom'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import LoginModal from "./LoginComponent/LoginModal";
import SignUpModal from "./SignUpComponent/SignUpModal";
import MenuIcon from "@material-ui/icons/Menu"
import BurgerMenu from "./BurgerMenu";
import Firebase, {FirebaseContext} from "./Firebase"


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

    constructor(props) {
        super(props);
        this.state = {
            auth: this.checkAuth,
            anchorEl: null,
            loginModal: false,
            signupModal: false,
            open: false
        };
    }

    checkAuth = () => {
        return !(this.props.firebase.auth.currentUser === undefined || this.props.firebase.auth.currentUser === null);
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
        this.setState({ open: !this.state.open });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
        this.setState({ loginModal: false });
        this.setState({ signupModal: false });
        this.setState({ open: false });
    };

    handleLoginModal= () => {
        this.setState({ loginModal: true })
    };

    handleSignupModal= () => {
        this.setState({ signupModal: true })
    };

    handleDrawerClickAway = () => {
        this.setState({ open: false })
    };

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ auth: true })
                : this.setState({ auth: false });
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {this.state.auth?
                        <AppBar position="static" color={"primary"}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="menu"
                                    className={classNames(
                                        classes.menuButton,
                                        classes.menuButtonHidden,
                                    )}
                                    onClick={(event)=>this.handleMenu(event)}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <div color="inherit" className={classes.grow}/>
                            </Toolbar>
                            <BurgerMenu open={this.state.open} handleClose={this.handleMenu} firebase={this.props.firebase}/>
                        </AppBar>
                        : <AppBar position="static" color={"primary"}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="Logo"
                                    className={classNames(
                                        classes.menuButton,
                                        classes.menuButtonHidden,
                                    )}
                                    style={{backgroundColor: '#FFFFFF', margin:10}}
                                >
                                    <img src={Logo} height={'36'}/>
                                </IconButton>
                                <div color="inherit" className={classes.grow}/>
                                <Button color="secondary" variant={"contained"} onClick={this.handleLoginModal}
                                        className={classes.menuButton}>Log In</Button>
                                <Button color="secondary" variant={"contained"} onClick={this.handleSignupModal}
                                        className={classes.menuButton}>Sign Up</Button>
                            </Toolbar>
                            {this.state.loginModal ?
                                <ClickAwayListener onClickAway={this.handleClickAway}> <LoginModal
                                    handleClose={this.handleClose} firebase = {this.props.firebase}/></ClickAwayListener> : <div/>}
                            {this.state.signupModal ?
                                <ClickAwayListener onClickAway={this.handleClickAway}> <SignUpModal
                                    handleClose={this.handleClose} firebase = {this.props.firebase}/></ClickAwayListener> : <div/>}
                        </AppBar>
                  }
                </div>
        );
    }
}

CommonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired,
};

const AppBarWithRouter = withRouter(CommonAppBar);
export default withStyles(styles)(AppBarWithRouter);