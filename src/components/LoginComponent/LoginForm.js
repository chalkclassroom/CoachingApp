import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import LogRocket from 'logrocket';

const styles = theme => ({
  main: {
    width: "100%"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

/**
 * Login Form
 * @class LoginForm
 */
class LoginForm extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      errors: false
    };
  }

  /**
   * @param {string} name
   * @param {event} event
   * @return {void}
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    this.validateState(name, event.target.value);
  };

  /**
   * @param {string} name
   * @param {value} value
   */
  validateState = (name, value) => {
    switch (name) {
      case "email":
        if (value.length === 0) {
          this.setState({
            emailError: "Cannot be Empty"
          });
        } else if (!this.validateEmail(value)) {
          this.setState({
            emailError: "Not a valid email address",
            errors: true
          });
        } else {
          this.setState({
            emailError: "",
            errors: false
          });
        }
        break;
      case "password":
        if (value.length < 6) {
          this.setState({
            passwordError: "Cannot be empty",
            errors: true
          });
        } else {
          this.setState({
            passwordError: "",
            errors: false
          });
        }
        break;
      default:
        this.validateState("password", this.state.password);
        this.validateState("email", this.state.email);
        break;
    }
  };

  /**
   * @param {string} email
   * @return {boolean}
   */
  validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleSubmit = () => {
    this.validateState();
    if (!this.state.errors) {
      this.props.firebase
        .firebaseEmailSignIn(
          { email: this.state.email, password: this.state.password },
          this.props.role
        )
        .then(userCredential=>{
            LogRocket.identify(userCredential.user.uid, {
              name: userCredential.user.displayName,
              email: userCredential.user.email,
            });
            this.props.history.push("/Home");
        });
    }
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleChange("email")}
            margin="normal"
            variant="standard"
            fullWidth
            helperText={this.state.emailError}
            error={this.state.emailError !== ""}
          />
          <TextField
            required
            id="password"
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange("password")}
            margin="normal"
            variant="standard"
            fullWidth
            helperText={this.state.passwordError}
            error={this.state.passwordError !== ""}
          />
          <br />
          <Link to="/forgot">Forgot your password?</Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            disabled={this.state.errors}
          >
            Log in
          </Button>
        </Paper>
      </main>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(LoginForm));
