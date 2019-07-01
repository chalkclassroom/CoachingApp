import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import Logo from '../logo.svg'
import {withRouter} from 'react-router-dom'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import LoginModal from "./LoginComponent/LoginModal";
import SignUpModal from "./SignUpComponent/SignUpModal";
import MenuIcon from "@material-ui/icons/Menu"
import BurgerMenu from "./BurgerMenu";
// import Firebase, {FirebaseContext} from "./Firebase"
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//pages
import About from '../views/WelcomeViews/About.js' 
import TransitionTimeTrainingHome from '../views/protected/TransitionViews/TransitionTimeTrainingHome';

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
        "&:hover" : {
            backgroundColor: "#FFC35C"
        },
    },
    
};

const theme = createMuiTheme ({
    palette: {
        primary: {
            main: '#A1C4FD'
        },
        secondary: {
            main: '#FFFFFF'
        }
    }, 
    shadows: ["none"],
})

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
            <MuiThemeProvider theme = {theme}>
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
                                    <MenuIcon color = "secondary"/>
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    aria-label="Logo"
                                    className={classNames(
                                        classes.menuButton,
                                        classes.menuButtonHidden,
                                    )}
                                    style={{backgroundColor: '#FFFFFF', margin:10}}
                                >
                                    <img src={Logo} height={'36'} alt={""}/>
                                </IconButton>
                                <Typography variant="h6" style={{color:'#FFFFFF',}}>
                                    Classroom Quality - REF
                                </Typography>
                                <div color="inherit" className={classes.grow}/>
                                <Router>
                                <div>
                                <Link to = "/team"style={{ textDecoration: 'none' }} ><Button color="secondary" className={classes.menuButton}
                                onClick={() => this.props.history.push("/team")}>Team</Button></Link>
                                <Link to = "/about"style={{ textDecoration: 'none' }} ><Button color="secondary" className={classes.menuButton}
                                onClick={() => this.props.history.push("/about")}>About</Button></Link>
                                </div>
                                </Router> 
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
                                    <img src={Logo} height={'36'} alt={""}/>
                                </IconButton>
                                <Typography variant="h6" style={{color:'#FFFFFF',}}>
                                    Classroom Quality - REF
                                </Typography>
                                <div color="inherit" className={classes.grow}/>
                                <Button color="secondary" onClick={this.handleLoginModal}
                                        className={classes.menuButton}>Log In</Button>
                                <Button color="secondary"  onClick={this.handleSignupModal} onHover
                                        className={classes.menuButton}>Sign Up</Button>
                                <Router>
                                    <div>
                                <Link to = "/team"style={{ textDecoration: 'none' }} ><Button color="secondary" className={classes.menuButton}
                                onClick={() => this.props.history.push("/team")}>Team</Button></Link>
                                <Link to = "/about"style={{ textDecoration: 'none' }} ><Button color="secondary" className={classes.menuButton}
                                onClick={() => this.props.history.push("/about")}>About</Button></Link>
                                </div>   
                                </Router>        
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
                </MuiThemeProvider>
        );
    }
}

CommonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired,
};

const AppBarWithRouter = withRouter(CommonAppBar);
export default withStyles(styles)(AppBarWithRouter);