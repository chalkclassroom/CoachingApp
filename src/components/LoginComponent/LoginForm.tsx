import * as React from "react";
import * as PropTypes from "prop-types";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import * as LogRocket from 'logrocket';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';

const styles: object = {
  main: {
    width: "100%"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: '1em',
    minHeight: '340px',
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  submit: {
    marginTop: '1.5em'
  }
};

interface UserCredential {
  credential: {
    providerId: string,
    signInMethod: string
  },
  user: {
    uid: string,
    displayName: string,
    email: string
  }
}

type Props = RouteComponentProps & {
  classes: {
    main: string,
    paper: string,
    form: string,
    submit: string
  },
  firebase: {
    firebaseEmailSignIn(credentials: {email: string, password: string}): Promise<UserCredential>
  },
  history: H.History
}

interface State {
  email: string,
  emailError: string,
  password: string,
  passwordError: string,
  errors: boolean
}

/**
 * Login Form
 * @class LoginForm
 */
class LoginForm extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
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
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   * @return {void}
   */
  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    if (name === 'email'){
      this.setState({
        email: event.target.value
      })
    } else if (name === 'password') {
      this.setState({
        password: event.target.value
      })
    }
    this.validateState(name, event.target.value);
  };

  /**
   * @param {string} name
   * @param {value} value
   */
  validateState = (name: string, value: string): void => {
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
  validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleSubmit = (e): void => {
    if (!this.state.errors) {
      this.props.firebase
        .firebaseEmailSignIn(
          { email: this.state.email, password: this.state.password }
        )
        .then(userCredential=>{
            LogRocket.identify(userCredential.user.uid, {
              name: userCredential.user.displayName,
              email: userCredential.user.email,
            });
            this.props.history.push("/Home");
        });
        e.preventDefault()
    }
  };

  static propTypes = {
    classes: PropTypes.exact({
      main: PropTypes.string,
      paper: PropTypes.string,
      form: PropTypes.string,
      submit: PropTypes.string
    }).isRequired,
    firebase: PropTypes.exact({
      firebaseEmailSignIn: PropTypes.func
    }).isRequired,
    history: ReactRouterPropTypes.history.isRequired
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
          <form onSubmit={this.handleSubmit}>
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
          <br />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // onClick={this.handleSubmit}
            disabled={this.state.errors}
          >
            Log in
          </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(withRouter(LoginForm));
