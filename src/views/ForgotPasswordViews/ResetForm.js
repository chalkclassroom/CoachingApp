import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`,
    width: "50%"
  },
  form: {
    width: "50%" // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class ResetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      errors: false,
      sent: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    this.validateState(name, event.target.value);
  };

  validateState = (name, value) => {
    switch (name) {
      case "email":
        if (value.length === 0) {
          this.setState({
            emailError: "Cannot be empty or contain numbers"
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
      default:
        this.validateState("email", this.state.email);
        break;
    }
  };

  validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleSubmit = event => {
    this.validateState();
    if (!this.state.errors) {
      this.props.firebase.resetPassword(this.state.email);
      this.setState({ sent: true });
    }
  };

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
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            disabled={this.state.errors}
          >
            Send Reset Link
          </Button>
          {this.state.sent ? <h4>Password Reset Email is Sent</h4> : <div />}
        </Paper>
      </main>
    );
  }
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResetForm);
