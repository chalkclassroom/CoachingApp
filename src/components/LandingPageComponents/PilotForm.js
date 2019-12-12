import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from "react-router-dom";
import Typography from '@material-ui/core/Typography/Typography';
import Grid from "@material-ui/core/Grid";
import { connect } from 'react-redux';

const styles = theme => ({
  main: {
    width: '100%',
    display: 'block',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

/**
 * Pilot sign up form on landing page
 * @class PilotForm
 */
class PilotForm extends React.Component{
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError:'',
      program: '',
      pilotSignUp: false,
    };
  }

  /**
   * responds to change in user-entered text
   * @param {string} name
   * @param {event} event
   * @return {void}
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.validateState(name, event.target.value);
  };

  /**
   * validates user-entered text
   * @param {string} name
   * @param {value} value
   */
  validateState = (name, value) => {
    switch (name) {
      case 'firstName':
        if (value.length < 1) {
          this.setState({
            'firstNameError': 'Cannot be empty or contain numbers',
            'errors': true,
          });
        } else {
          this.setState({
            'firstNameError': '',
            'errors': false
          });
        }
        break;
      case 'lastName':
        if (value.length < 1) {
          this.setState({
            'lastNameError': 'Cannot be empty or contain numbers',
            'errors': true,
          });
        } else {
          this.setState({
            'lastNameError': '',
            'errors': false,
          });
        }
        break;
      case 'email':
        if (value.length === 0) {
          this.setState({
            'emailError': 'Cannot be empty or contain numbers',
          });
        } else if (!this.validateEmail(value)) {
          this.setState({
            'emailError': 'Not a valid email address',
            'errors': true,
          });
        } else {
          this.setState({
            'emailError': '',
            'errors': false,
          });
        }
        break;
      case 'password':
        if (value.length < 6) {
          this.setState({
            'passwordError': 'Cannot be empty or contain numbers',
            'errors': true,
          });
        } else {
          this.setState({
            'passwordError': '',
            'errors': false,
          });
        }
        this.validateState('confirmPassword', this.state.confirmPassword);
        break;
      case 'confirmPassword':
        if (value.length < 6) {
          this.setState({
            'confirmPasswordError': 'Cannot be empty or contain numbers',
            'errors': true,
          });
        } else if (this.state.password !== value) {
          this.setState({
            'confirmPasswordError': 'Password did not match',
            'errors': true,
          });
        } else {
          this.setState({
            'confirmPasswordError': '',
            'errors': false,
          });
        }
        break;
      default:
        this.validateState('confirmPassword', this.state.confirmPassword);
        this.validateState('password', this.state.password);
        this.validateState('firstName', this.state.firstName);
        this.validateState('lastName', this.state.lastName);
        this.validateState('email', this.state.email);
        break;
    }
  };

  /**
   * verifies that user-entered text is a valid email address
   * @param {string} email
   * @return {boolean}
   */
  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  /**
   * submits pilot form to firebase
   */
  handleSubmit = () =>{
    this.validateState();
    if (!this.state.errors){
      this.props.firebase.firebasePilotSignUp({
        email: this.state.email,
        program: this.state.program,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }, this.props.mRole)
      .then( () => {
          this.setState({
            pilotSignUp: true
          });
          console.log('pilot submitted');
      });
    }
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render(){
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          {this.state.pilotSignUp ? (
            <div>
              <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                  Thanks for signing up!
                </Typography>
                <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                  We will be in touch.
                </Typography>
              </Grid>
            </div>
          ) : (
            <div>
              <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                Participate in our Pilot Program!
              </Typography>
              <TextField
                required
                id="firstname"
                label="First Name"
                value={this.state.firstName}
                onChange={this.handleChange('firstName')}
                margin="normal"
                variant="standard"
                name="firstName"
                autoComplete="firstname"
                autoFocus
                fullWidth
                helperText={this.state.firstNameError}
                error={(this.state.firstNameError !== '')}
              />
              <TextField
                required
                id="lastname"
                label="Last Name"
                value={this.state.lastName}
                onChange={this.handleChange('lastName')}
                margin="normal"
                variant="standard"
                name="lastname"
                autoComplete="lastname"
                fullWidth
                helperText={this.state.lastNameError}
                error={(this.state.lastNameError !== '')}
              />
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
                variant="standard"
                fullWidth
                helperText={this.state.emailError}
                error={(this.state.emailError !== '')}
              />
              <TextField
                required
                id="program"
                name="program"
                type="program"
                label="School District or Other Affiliation"
                value={this.state.program}
                onChange={this.handleChange('program')}
                margin="normal"
                variant="standard"
                fullWidth
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
                disabled={this.state.errors}
              >
                Submit
              </Button>
            </div>
          )}
        </Paper>
      </main>
    );
  }
}

PilotForm.propTypes = {
  classes: PropTypes.object.isRequired,
  mRole: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired
};

export default withRouter(connect()(withStyles(styles)(PilotForm)));