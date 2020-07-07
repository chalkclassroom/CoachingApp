import * as React from "react";
import * as PropTypes from "prop-types";
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
import LoginModal from "./LoginComponent/LoginModal";
import SignUpModal from "./SignUpComponent/SignUpModal.tsx";
import MenuIcon from "@material-ui/icons/Menu";
import BurgerMenu from "./BurgerMenu";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ReactRouterPropTypes from 'react-router-prop-types';

// import * as Constants from '../constants';

const styles: object = {
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
  typography: {
    useNextVariants: true
  }
});

interface Style {
  grow: string,
  menuButton: string,
  link: string,
  logoButton: string,
  menuText: string,
  chalkText: string,
  coachingText: string
}

interface Props {
  classes: Style,
  firebase: {
    auth: {
      currentUser: firebase.User | null,
      onAuthStateChanged(arg: any): firebase.User | null
    },
  },
  history: {
    push(
      param: (string | {
        pathname: string,
        state: {
          type: string
        }
      }),
    ): void
  }
}

interface State {
  auth: boolean,
  loginModal: boolean,
  signupModal: boolean,
  open: boolean
}

/**
 * App bar
 * @class AppBar
 * @extends React.Component
 * @param {event} event
 * @return {void}
 */
class AppBar extends React.Component<Props, State> {
  /** @param {Props} props */
  constructor(props: Props) {
    super(props);
    this.state = {
      auth: !(
        this.props.firebase.auth.currentUser === undefined ||
        this.props.firebase.auth.currentUser === null
      ),
      loginModal: false,
      signupModal: false,
      open: false
    };
  }

  /* checkAuth = () => {
    return !(
      this.props.firebase.auth.currentUser === undefined ||
      this.props.firebase.auth.currentUser === null
    );
  }; */

  handleMenu = (): void => {
    this.setState({ open: !this.state.open });
  };

  handleClose = (): void => {
    this.setState({ loginModal: false });
    this.setState({ signupModal: false });
    this.setState({ open: false });
  };

  handleLoginModal = (): void => {
    this.setState({ loginModal: true });
  };

  handleSignupModal = (): void => {
    this.setState({ signupModal: true });
  };

  handleDrawerClickAway = (): void => {
    this.setState({ open: false });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.props.firebase.auth.onAuthStateChanged((authUser: firebase.User | null) => {
      authUser ? this.setState({ auth: true }) : this.setState({ auth: false });
    });
  }

  static propTypes = {
    classes: PropTypes.exact({
      grow: PropTypes.string,
      menuButton: PropTypes.string,
      link: PropTypes.string,
      logoButton: PropTypes.string,
      menuText: PropTypes.string,
      chalkText: PropTypes.string,
      coachingText: PropTypes.string
    }).isRequired,
    firebase: PropTypes.exact({
      auth: PropTypes.exact({
        currentUser: PropTypes.object,
        onAuthStateChanged: PropTypes.func
      }).isRequired
    }).isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {this.state.auth ? (
            <NavBar position="static" color={"primary"}>
              <Toolbar>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={4}>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <Grid item>
                        <IconButton
                          color="inherit"
                          aria-label="menu"
                          className={classes.menuButton}
                          onClick={(): void => this.handleMenu()}
                        >
                          <MenuIcon color="secondary" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          color="inherit"
                          aria-label="Logo"
                          className={classes.menuButton}
                          style={{backgroundColor: "#FFFFFF", margin: 10}}
                          onClick = {(): void => this.props.history.push("/Landing")}
                        >
                          <img src={LogoImage} height={'36'} alt={""}/>
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Grid container direction="column" justify="center" alignItems="flex-start">
                          <Grid item>
                            <Typography
                              variant="h6"
                              className={classes.chalkText}
                              onClick = {(): void => this.props.history.push("/Landing")}
                            >
                              CHALK
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h6"
                              className={classes.coachingText}
                              onClick = {(): void => this.props.history.push("/Landing")}
                            >
                              COACHING
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={8}>
                    <div color="inherit" className={classes.grow}/>
                    <Router>
                      <div>
                        <Grid container direction="row" justify="flex-end" alignItems="center">
                          <Grid item>
                            <Link to="/" className={classes.link}>
                              <Button
                                color="secondary"
                                className={classes.menuButton}
                                onClick={(): void => this.props.history.push("/")}
                              >
                                Home
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link to="/team" className={classes.link}>
                              <Button
                                color="secondary"
                                className={classes.menuButton}
                                onClick={(): void => this.props.history.push("/team")}
                              >
                                Team
                              </Button>
                            </Link>
                          </Grid>
                            {/* <Link to="/about" className={classes.link}>
                              <Button
                                color="secondary"
                                className={classes.menuButton}
                                onClick={() => this.props.history.push("/about")}
                              >
                                About
                              </Button>
                            </Link> */}
                        </Grid>
                      </div>
                    </Router>
                  </Grid>
                </Grid>
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
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={4}>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <Grid item>
                        <IconButton
                          color="inherit"
                          aria-label="Logo"
                          className={classes.menuButton}
                          style={{backgroundColor: "#FFFFFF", margin: 10}}
                          onClick = {(): void => this.props.history.push("/")}
                        >
                          <img src={LogoImage} height={'36'} alt={""}/>
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Grid container direction="column" justify="center" alignItems="flex-start">
                          <Grid item>
                            <Typography
                              variant="h6"
                              className={classes.chalkText}
                              onClick = {(): void => this.props.history.push("/")}
                            >
                              CHALK
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h6"
                              className={classes.coachingText}
                              onClick = {(): void => this.props.history.push("/")}
                            >
                              COACHING
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                      <div color="inherit" className={classes.grow}/>
                      <Grid item>
                        <Button
                          color="secondary"
                          onClick={this.handleLoginModal}
                          className={classes.menuButton}
                        >
                          Log In
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="secondary"
                          onClick={this.handleSignupModal}
                          className={classes.menuButton}
                        >
                          Sign Up
                        </Button>
                      </Grid>
                      <Grid>
                        <Router>
                          <div>
                            <Link to="/team" className={classes.link}>
                              <Button
                                color="secondary"
                                className={classes.menuButton}
                                onClick={(): void => this.props.history.push("/team")}
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
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
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

export default withRouter(withStyles(styles)(AppBar));
