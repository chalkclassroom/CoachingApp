import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  withStyles,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import { AppBar as NavBar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import LogoImage from "../assets/images/LogoImage.svg";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoginModal from "./LoginComponent/LoginModal";
import SignUpModal from "./SignUpComponent/SignUpModal";
import MenuIcon from "@material-ui/icons/Menu";
import BurgerMenu from "./BurgerMenu";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
// import * as Constants from '../constants';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    fontFamily: 'Arimo',
    fontSize: 16,
    marginLeft: -12,
    marginRight: 20,
    "&:hover": {
      backgroundColor: "#FFC35C"
    }
  },
  link: {
    textDecoration: "none"
  },
  logoButton: {
    backgroundColor: "#FFFFFF",
    margin: 10
  },
  menuText: {
    color:'#FFFFFF',
  },
  chalkText: {
    color: 'white',
    fontFamily: 'Arimo',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: '110%',
    letterSpacing: '0.12em',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  coachingText: {
    color: 'white',
    fontFamily: 'Arimo',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: '110%',
    letterSpacing: '0.05em'
  },
  "@media (max-width: 700px)": {
    menuButton: {
      marginLeft: '-0.7em',
      marginRight: '0.4em'
    },
    chalkText: {
      fontSize: 16
    },
    coachingText: {
      fontSize: 12
    }
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#459aeb'
    },
    secondary: {
      main: "#FFFFFF"
    }
  },
  shadows: ["none"]
});

/**
 * App bar
 * @class AppBar
 * @extends React.Component
 * @param {event} event
 * @return {void}
 */
class AppBar extends React.Component {
  /** @param {Props} props */
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
    return !(
      this.props.firebase.auth.currentUser === undefined ||
      this.props.firebase.auth.currentUser === null
    );
  };

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

  handleLoginModal = () => {
    this.setState({ loginModal: true });
  };

  handleSignupModal = () => {
    this.setState({ signupModal: true });
  };

  handleDrawerClickAway = () => {
    this.setState({ open: false });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser ? this.setState({ auth: true }) : this.setState({ auth: false });
    });
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          {this.state.auth ? (
            <NavBar position="static" color={"primary"}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  className={classNames(
                    classes.menuButton,
                    classes.menuButtonHidden
                  )}
                  onClick={event => this.handleMenu(event)}
                >
                  <MenuIcon color="secondary" />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="Logo"
                  className={classNames(
                    classes.menuButton,
                    classes.menuButtonHidden,
                    classes.logoButton
                  )}
                  onClick = {() => this.props.history.push("/")}
                >
                  <img src={LogoImage} height={'36'} alt={""}/>
                </IconButton>
                <Grid direction="column" justify="center" alignItems="flex-start">
                  <Grid item>
                    <Typography
                      variant="h6"
                      className={classes.chalkText}
                      onClick = {() => this.props.history.push("/")}
                    >
                      CHALK
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography 
                      variant="h6"
                      className={classes.coachingText}
                      onClick = {() => this.props.history.push("/")}
                    >
                      COACHING
                    </Typography>
                  </Grid>
                </Grid>
                <div color="inherit" className={classes.grow}/>
                <Router>
                  <div>
                    <Link to="/" className={classes.link}>
                      <Button
                        color="secondary"
                        className={classes.menuButton}
                        onClick={() => this.props.history.push("/")}
                      >
                        Homepage
                      </Button>
                    </Link>
                    <Link to="/team" className={classes.link}>
                      <Button
                        color="secondary"
                        className={classes.menuButton}
                        onClick={() => this.props.history.push("/team")}
                      >
                        Team
                      </Button>
                    </Link>
                    {/* <Link to="/about" className={classes.link}>
                      <Button
                        color="secondary"
                        className={classes.menuButton}
                        onClick={() => this.props.history.push("/about")}
                      >
                        About
                      </Button>
                    </Link> */}
                  </div>
                </Router>
              </Toolbar>
              <BurgerMenu
                open={this.state.open}
                handleClose={this.handleMenu}
                firebase={this.props.firebase}
              />
            </NavBar>
          ) : (
            <NavBar position="static" color={"primary"}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Logo"
                  className={classNames(
                    classes.menuButton,
                    classes.menuButtonHidden,
                    classes.logoButton
                  )}
                  onClick = {() => this.props.history.push("/")}
                >
                  <img src={LogoImage} height={'36'} alt={""}/>
                </IconButton>
                <Grid direction="column" justify="center" alignItems="flex-start">
                  <Grid item>
                    <Typography
                      variant="h6"
                      className={classes.chalkText}
                      onClick = {() => this.props.history.push("/")}
                    >
                      CHALK
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography 
                      variant="h6"
                      className={classes.coachingText}
                      onClick = {() => this.props.history.push("/")}
                    >
                      COACHING
                    </Typography>
                  </Grid>
                </Grid>
                <div color="inherit" className={classes.grow}/>
                <Button
                  color="secondary"
                  onClick={this.handleLoginModal}
                  className={classes.menuButton}
                >
                  Log In
                </Button>
                <Button
                  color="secondary"
                  onClick={this.handleSignupModal}
                  onHover
                  className={classes.menuButton}
                >
                  Sign Up
                </Button>
                <Router>
                  <div>
                    <Link to="/team" className={classes.link}>
                      <Button
                        color="secondary"
                        className={classes.menuButton}
                        onClick={() => this.props.history.push("/team")}
                      >
                        Team
                      </Button>
                    </Link>
                    {/* <Link to = "/about" className={classes.link}>
                      <Button
                        color="secondary"
                        className={classes.menuButton}
                        onClick={() => this.props.history.push("/about")}
                      >
                        About
                      </Button>
                    </Link> */}
                  </div>   
                </Router>        
              </Toolbar>
              {this.state.loginModal ? (
                <LoginModal
                  handleClose={this.handleClose}
                  firebase={this.props.firebase}
                />
              ) : (
                <div />
              )}
              {this.state.signupModal ? (
                <SignUpModal
                  handleClose={this.handleClose}
                  firebase={this.props.firebase}
                />
              ) : (
                <div />
              )}
            </NavBar>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect()(withStyles(styles)(AppBar)));
