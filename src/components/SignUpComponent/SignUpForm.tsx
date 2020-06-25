import * as React from "react";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";

const styles: object = {
  main: {
    width: "100%",
    display: "block"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: '1em'
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  submit: {
    marginTop: '1.5em'
  }
};

interface Props {
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
  },
  mRole: string,
  history: {
    push(param: string): void
  },
  classes: {
    main: string,
    paper: string,
    form: string,
    submit: string
  }
}

interface State {
  firstName: string,
  firstNameError: string,
  lastName: string,
  lastNameError: string,
  email: string,
  emailError: string,
  password: string,
  passwordError: string,
  confirmPassword: string,
  confirmPasswordError: string,
  errors: boolean
}

/**
 * form to create account on chalkcoaching.com
 * @class SignUpForm
 */
class SignUpForm extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      confirmPassword: "",
      confirmPasswordError: "",
      errors: false
    };
  }

  /**
   * responds to change in user-entered text
   * @param {string} name
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   * @return {void}
   */
  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    if (name === "firstName") {
      this.setState({
        firstName: event.target.value
      })
    } else if (name === "lastName") {
      this.setState({
        lastName: event.target.value
      })
    } else if (name === "email") {
      this.setState({
        email: event.target.value
      })
    } else if (name === "password") {
      this.setState({
        password: event.target.value
      })
    } else if (name === "confirmPassword") {
      this.setState({
        confirmPassword: event.target.value
      })
    }
    this.validateState(name, event.target.value);
  };

  /**
   * validates user-entered text
   * @param {string} name
   * @param {string} value
   */
  validateState = (name: string, value: string) => {
    switch (name) {
      case "firstName":
        if (value.length < 1) {
          this.setState({
            firstNameError: "Cannot be empty or contain numbers",
            errors: true
          });
        } else {
          this.setState({
            firstNameError: "",
            errors: false
          });
        }
        break;
      case "lastName":
        if (value.length < 1) {
          this.setState({
            lastNameError: "Cannot be empty or contain numbers",
            errors: true
          });
        } else {
          this.setState({
            lastNameError: "",
            errors: false
          });
        }
        break;
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
      case "password":
        if (value.length < 6) {
          this.setState({
            passwordError: "Cannot be empty or contain numbers",
            errors: true
          });
        } else {
          this.setState({
            passwordError: "",
            errors: false
          });
        }
        this.validateState("confirmPassword", this.state.confirmPassword);
        break;
      case "confirmPassword":
        if (value.length < 6) {
          this.setState({
            confirmPasswordError: "Cannot be empty or contain numbers",
            errors: true
          });
        } else if (this.state.password !== value) {
          this.setState({
            confirmPasswordError: "Password did not match",
            errors: true
          });
        } else {
          this.setState({
            confirmPasswordError: "",
            errors: false
          });
        }
        break;
      default:
        this.validateState("confirmPassword", this.state.confirmPassword);
        this.validateState("password", this.state.password);
        this.validateState("firstName", this.state.firstName);
        this.validateState("lastName", this.state.lastName);
        this.validateState("email", this.state.email);
        break;
    }
  };

  /**
   * validates that user-entered text is a valid email
   * @param {string} email
   * @return {boolean}
   */
  validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleSubmit = () => {
    if (!this.state.errors) {
      this.props.firebase
        .firebaseEmailSignUp(
          {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
          },
          this.props.mRole
        )
        .then(() =>  {
          this.props.history.push("/Home");
        });
    }
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    mRole: PropTypes.string.isRequired,
    firebase: PropTypes.exact({
      firebaseEmailSignUp: PropTypes.func
    }).isRequired,
    history: PropTypes.exact({
      push: PropTypes.func
    }).isRequired
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          {this.state.errors ? <Paper> Check your Form Data </Paper> : <div />}
          <TextField
            required
            id="firstname"
            label="First Name"
            value={this.state.firstName}
            onChange={this.handleChange("firstName")}
            margin="normal"
            variant="standard"
            name="firstName"
            autoComplete="firstname"
            autoFocus
            fullWidth
            helperText={this.state.firstNameError}
            error={this.state.firstNameError !== ""}
          />
          <TextField
            required
            id="lastname"
            label="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange("lastName")}
            margin="normal"
            variant="standard"
            name="lastname"
            autoComplete="lastname"
            fullWidth
            helperText={this.state.lastNameError}
            error={this.state.lastNameError !== ""}
          />
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
          <TextField
            required
            id="confirmPassword"
            name="confrimPassword"
            type="password"
            label="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.handleChange("confirmPassword")}
            margin="normal"
            variant="standard"
            fullWidth
            helperText={this.state.confirmPasswordError}
            error={this.state.confirmPasswordError !== ""}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleSubmit}
            disabled={this.state.errors}
          >
            Sign Up
          </Button>
        </Paper>
      </main>
    );
  }
}

export default withRouter(withStyles(styles)(SignUpForm));
