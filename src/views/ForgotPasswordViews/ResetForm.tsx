import * as React from "react";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

const styles: object = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: '1em'
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: '1em',
    width: "50%"
  },
  form: {
    width: "50%" // Fix IE 11 issue.
  },
  submit: {
    marginTop: '1.5em'
  }
};

interface Props {
  classes: {
    main: string,
    paper: string,
    form: string,
    submit: string
  },
  firebase: {
    resetPassword(email: string): Promise<void>
  }
}

interface State {
  email: string,
  emailError: string,
  errors: boolean,
  sent: boolean
}

/**
 * @class ResetForm
 */
class ResetForm extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      errors: false,
      sent: false
    };
  }

  /**
   * @param {string} name
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   * @return {void}
   */
  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    if (name === 'email') {
      this.setState({
        email: event.target.value
      })
    }
    this.validateState(name, event.target.value);
  };

  /**
   * @param {string} name
   * @param {string} value
   */
  validateState = (name: string, value: string): void => {
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

  /**
   * @param {string} email
   * @return {boolean}
   */
  validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleSubmit = (): void => {
    if (!this.state.errors) {
      this.props.firebase.resetPassword(this.state.email);
      this.setState({ sent: true });
    }
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    firebase: PropTypes.exact({
      resetPassword: PropTypes.func
    }).isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
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

export default withStyles(styles)(ResetForm);
