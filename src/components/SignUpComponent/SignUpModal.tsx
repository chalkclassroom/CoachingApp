import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import SignUpForm from "./SignUpForm";
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
// import CoachImage from "../../assets/images/CoachImage.svg";
// import NewTeacherImage from "../../assets/images/NewTeacherImage.svg";
// import NewAdministratorImage from "../../assets/images/NewAdministratorImage.svg";
import GrayedAdminImage from "../../assets/images/GrayedAdminImage.svg";
import GrayedTeacherImage from "../../assets/images/GrayedTeacherImage.svg";
import GrayedCoachImage from "../../assets/images/GrayedCoachImage.svg";
import CardContent from "@material-ui/core/CardContent";

/**
 * specifies styling for modal
 * @return {React.CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

const styles: object = {
  paper: {
    position: "absolute",
    width: "60%",
    backgroundColor: 'white',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.2)',
    padding: '2em',
    borderRadius: 8
  },
  root: {
    backgroundColor: '#ffffff'
  },
  mobileRoot: {
    backgroundColor: '#ffffff'
  },
  photoIcon: {
    height: "15vh"
  },
  "@media (max-width: 700px)": {
    root: {
      display: "none"
    },
    paper: {
      height: '80%',
      width: '75%'
    },
    photoIcon: {
      height: "8vh"
    }
  },
  "@media (min-width: 701px)": {
    mobileRoot: {
      display: "none"
    }
  }
};

interface Style {
  paper: string,
  root: string,
  mobileRoot: string,
  photoIcon: string
}

interface Props {
  classes: Style,
  handleClose(): void,
  firebase: {
    firebaseEmailSignUp(
      info: {
        email: string,
        password: string,
        firstName: string,
        lastName: string
      },
      role: string
    ): Promise<void>
  }
}

interface State {
  open: boolean,
  role: number
}

/**
 * @class SignUpModal
 */
class SignUpModal extends React.Component<Props, State> {
  state = {
    open: true,
    role: 0
  };

  handleOpen = (): void => {
    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false });
  };

  /**
   * @param {number} role
   */
  handleChangeRole = (role: number): void => {
    this.setState({ role: role });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    firebase: PropTypes.exact({
      firebaseEmailSignUp: PropTypes.func
    }).isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Modal open={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="space-between"
              >
                <Grid item xs={10}>
                  <Typography component={"h6"} variant={"h6"}>
                    Sign Up
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton style={{ padding: 10 }}>
                    <Tooltip title={"Close"} placement={"right"}>
                      <CloseIcon onClick={this.props.handleClose} />
                    </Tooltip>
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                direction="column"
                justify="flex-start"
              >
                {this.state.role === 0 ? (
                  <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="space-around"
                    style={{ padding: 40 }}
                  >
                    <Card
                      // onClick={() => this.handleChangeRole(1)}
                    >
                      <CardContent>
                        <Grid
                          container
                          alignItems="center"
                          direction="column"
                          justify="flex-start"
                        >
                          <Grid item>
                            <img
                              src={GrayedCoachImage}
                              alt="Coach"
                              className={classes.photoIcon}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" component="h2">
                              Coach
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    <Card
                    // onClick={() => this.handleChangeRole(2)}
                    >
                      <CardContent>
                        <Grid
                          container
                          alignItems="center"
                          direction="column"
                          justify="flex-start"
                        >
                          <Grid item>
                            <img
                              src={GrayedTeacherImage}
                              alt="Teacher"
                              className={classes.photoIcon}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" component="h2">
                              Teacher
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    <Card
                    // onClick={() => this.handleChangeRole(3)}
                    >
                      <CardContent>
                        <Grid
                          container
                          alignItems="center"
                          direction="column"
                          justify="flex-start"
                        >
                          <Grid item>
                            <img
                              src={GrayedAdminImage}
                              alt="Administrator"
                              className={classes.photoIcon}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" component="h2">
                              Admin
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : this.state.role === 1 ? (
                  <SignUpForm
                    mRole="coach"
                    // fullWidth
                    firebase={this.props.firebase}
                  />
                ) : this.state.role === 2 ? (
                  <SignUpForm
                    mRole={"teacher"}
                    firebase={this.props.firebase}
                  />
                ) : (
                  <SignUpForm
                    mRole={"administrator"}
                    firebase={this.props.firebase}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(SignUpModal);