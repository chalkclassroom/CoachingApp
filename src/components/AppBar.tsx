import * as React from "react";
import * as PropTypes from "prop-types";
import {
  withStyles,
  Toolbar,
  Button,
  IconButton,
  Avatar
} from "@material-ui/core";
import { AppBar as NavBar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import LogoImage from "../assets/images/LogoImage.svg";
import { withRouter, RouteComponentProps } from "react-router-dom";
import LoginModal from "./LoginComponent/LoginModal";
import SignUpModal from "./SignUpComponent/SignUpModal";
import MenuIcon from "@material-ui/icons/Menu";
import BackIcon from '@material-ui/icons/ArrowBackIos';
import BurgerMenu from "./BurgerMenu";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ReactRouterPropTypes from 'react-router-prop-types';
import * as Types from '../constants/Types';
import * as firebase from 'firebase/app';
import * as H from 'history';

const styles: object = {
  root: {
    height: '10vh',
    minHeight: '4em',
    maxHeight: '7em'
  },
  backIcon: {
    display: 'none'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    fontFamily: 'Arimo',
    // fontSize: 16,
    // marginLeft: -12,
    // marginRight: 20,
    "&:hover": {
      backgroundColor: "#FFC35C"
    },
    fontSize: 'calc(14px + (30 - 14) * ((100vw - 300px) / (1600 - 300)))'
  },
  link: {
    textDecoration: "none"
  },
  buttonText: {
    fontSize: 'calc(14px + (30 - 14) * ((100vw - 300px) / (1600 - 300)))'
  },
  menuText: {
    color:'#FFFFFF',
    fontSize: 'calc(14px + (30 - 14) * ((100vw - 300px) / (1600 - 300)))'
  },
  chalkText: {
    color: 'white',
    fontFamily: 'Arimo',
    // fontSize: 'calc(18px + (36 - 18) * ((100vw - 300px) / (1600 - 300)))',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: '110%',
    letterSpacing: '0.12em',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  coachingText: {
    color: 'white',
    fontFamily: 'Arimo',
    // fontSize: 'calc(14px + (30 - 14) * ((100vw - 300px) / (1600 - 300)))',
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: '110%',
    letterSpacing: '0.05em'
  },
  "@media (max-width: 767px)": {
    menuButton: {
      marginLeft: '-0.7em',
      marginRight: '0.4em'
    },
    backIcon: {
      display: 'flex'
    },
    chalkText: {
      fontSize: 16
    },
    coachingText: {
      fontSize: 12
    }
  },
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px)': {
    backIcon: {
      // color: 'white',
      display: 'flex'
    }
  }
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
  root: string,
  grow: string,
  menuButton: string,
  link: string,
  logoButton: string,
  buttonText: string,
  menuText: string,
  chalkText: string,
  coachingText: string,
  backIcon: string
}

type Props = RouteComponentProps & {
  classes?: Style,
  firebase?: {
    auth: {
      currentUser: null | {
        uid: string
      },
      onAuthStateChanged(arg: any): firebase.User | null,
    },
    firebaseEmailSignIn(credentials: {email: string, password: string}): Promise<Types.UserCredential>,
    firebaseEmailSignUp(
      info: {
        email: string,
        password: string,
        firstName: string,
        lastName: string
      },
      role: string
    ): Promise<void>,
    firebaseSignOut(): Promise<void>,
    getTeacherList(): Promise<Types.Teacher[]>
  },
  history: H.History,
  noBack?: boolean
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
      root: PropTypes.string,
      grow: PropTypes.string,
      menuButton: PropTypes.string,
      link: PropTypes.string,
      logoButton: PropTypes.string,
      buttonText: PropTypes.string,
      menuText: PropTypes.string,
      chalkText: PropTypes.string,
      coachingText: PropTypes.string,
      backIcon: PropTypes.string
    }),
    firebase: PropTypes.exact({
      auth: PropTypes.exact({
        currentUser: PropTypes.exact({
          uid: PropTypes.string
        }),
        onAuthStateChanged: PropTypes.func
      }).isRequired,
      firebaseEmailSignIn: PropTypes.func,
      firebaseEmailSignUp: PropTypes.func,
      firebaseSignOut: PropTypes.func,
      getTeacherList: PropTypes.func
    }),
    history: ReactRouterPropTypes.history,
    noBack: PropTypes.bool
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
            <NavBar position="static" color={"primary"} className={classes.root}>
              {/* <Toolbar style={{border: '1px solid red', height: '10vh'}}> */}
                <Grid container direction="row" alignItems="center" justify="flex-start" style={{height: '100%', paddingLeft: '1em', paddingRight: '1em'}}>
                  <Grid item xs={12} style={{height: '100%'}}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{height: '100%'}}>
                      <Grid item style={{height: '100%'}}>
                        <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                          <Button onClick={(): void => this.props.history.push('/Home')}>
                            <Avatar src={LogoImage} style={{backgroundColor: 'white', border: '0.5em solid white'}} />
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <IconButton
                          color="inherit"
                          aria-label="menu"
                          className={classes.menuButton}
                          onClick={(): void => this.handleMenu()}
                        >
                          <MenuIcon
                            color="secondary"
                            fontSize='large'
                          />
                        </IconButton>
                      </Grid>
                      {this.props.noBack ? (<div />) : (<Grid item className={classes.backIcon}>
                        <IconButton
                          color="inherit"
                          aria-label="menu"
                          className={classes.menuButton}
                          onClick={(): void => this.props.history.goBack()}
                        >
                          <BackIcon
                            color="secondary"
                            fontSize='large'
                          />
                        </IconButton>
                      </Grid>)}
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={6} style={{height: '100%'}}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{height: '100%'}}>
                      <Grid item style={{height: '100%'}}>
                        <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                          <Button onClick={(): void => this.props.history.push('/Home')}>
                            <Avatar src={LogoImage} style={{backgroundColor: 'white', border: '0.5em solid white'}} />
                          </Button>
                        </Grid>
                      </Grid>
                      
                      <Grid item className={classes.backIcon} style={{paddingLeft: '1em'}}>
                        <IconButton
                          color="inherit"
                          aria-label="menu"
                          className={classes.menuButton}
                          onClick={(): void => this.props.history.goBack()}
                        >
                          <BackIcon
                            color="secondary"
                            fontSize='large'
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={6} style={{height: '100%'}}>
                    <Grid container direction="row" justify="flex-end" alignItems="center" style={{height: '100%'}}>
                      <Grid item>
                        <IconButton
                          color="inherit"
                          aria-label="menu"
                          className={classes.menuButton}
                          onClick={(): void => this.handleMenu()}
                        >
                          <MenuIcon
                            color="secondary"
                            fontSize='large'
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid> */}
                  </Grid>
              {/* </Toolbar> */}
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
                  <Grid item xs={6}>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <Grid item style={{height: '100%'}}>
                        <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                          <Button onClick={(): void => this.props.history.push('/Home')}>
                            <Avatar src={LogoImage} style={{backgroundColor: 'white', border: '0.5em solid white'}} />
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item style={{paddingLeft: '1em'}}>
                        <Router>
                          <div>
                            <Link to="/team" className={classes.link}>
                              <Button
                                color="secondary"
                                className={classes.menuButton}
                                onClick={(): void => this.props.history.push("/team")}
                              >
                                <strong>Team</strong>
                              </Button>
                            </Link>
                          </div>
                        </Router>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                      {/* <div color="inherit" className={classes.grow}/> */}
                      <Grid item>
                        <Button
                          color="secondary"
                          onClick={this.handleLoginModal}
                          className={classes.menuButton}
                        >
                          <strong>Log In</strong>
                        </Button>
                      </Grid>
                      <Grid item style={{paddingLeft: '1em'}}>
                        <Button
                          color="secondary"
                          onClick={this.handleSignupModal}
                          className={classes.menuButton}
                        >
                          <strong>Sign Up</strong>
                        </Button>
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
