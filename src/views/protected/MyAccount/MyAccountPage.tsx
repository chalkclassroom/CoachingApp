import React, { useState } from 'react'
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    makeStyles,
    Typography,
    withStyles,
} from '@material-ui/core'
import AppBar from '../../../components/AppBar'
import Firebase, { FirebaseContext } from '../../../components/Firebase'
import { connect } from 'react-redux'


const useStyles = makeStyles(_ => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    formControl: {
        minWidth: 300,
    },
    formContainer: {
        marginTop: '2.3em',
    },
    comparisonText: {
        paddingLeft: '1em',
        lineHeight: '0.8em',
        fontFamily: 'Arimo',
    },
    container: {
        marginLeft: '1em',
    },
    select: {
        width: '15em',
    },
}))

const StyledFormControl = withStyles(() => ({
    root: {
        marginBottom: '1.3rem',
    },
}))(FormControl)


/**
 * @return {ReactNode}
 */
const MyAccountPage = ({ user = { firstName: '', lastName: '', email: '' }, history }): React.ReactNode => {
    const classes = useStyles()
    const [firstName, setFirstName] = useState(`${user.firstName}`)
    const [lastName, setLastName] = useState(`${user.lastName}`)
    const [email, setEmail] = useState(user.email)
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const save = async (firstName: string,
                  lastName: string,
                  currentEmail: string,
                  email: string,
                  currentPassword: string,
                  password: string,
                  confirmPassword: string, firebase: Firebase) => {

        // If we're changing password
        if (password !== confirmPassword) {
            alert('The passwords you have entered do not match')
            return;
        }

        // If they didn't specify current password
        if(currentPassword === "" )
        {
          alert('Please confirm your current password')
          return "false";
        }

        // Check if we're changing email
        var changingEmail = (currentEmail !== email) ? true : false;

        // If we're changing password
        var changingPassword = ((password !== "" && confirmPassword !== "") && password === confirmPassword ) ? true: false;

        // Handle changing password
        if ( changingPassword )
        {

          // If the current password isn't correct
          var checkSignIn = await firebase.firebaseEmailSignIn({email: currentEmail, password: currentPassword});
          if(checkSignIn === undefined)
          {
            return "false";
          }

          // We have to reauthenticate (if we're changing email, we'll do it later)
          firebase.reauthenticate({email: currentEmail, password: currentPassword})
              .then(user => {
                  user.updatePassword(password);
              })
              .catch(e => {
                  console.log(e);
                  alert("Unable to authenticate you. Please confirm your current password")
                  return false;
              });
        }


        // Update all other information
        return await firebase.updateCurrentUsersInfo(firstName, lastName, email)
          .then( async user => {

            // If we're changing email, we have to reauthenticate
            if(changingEmail)
            {

              await user.updateEmail(email);

              // If we're changing password, whe have to authenticate using new password
              var passwordToUse = (changingPassword) ? password : currentPassword;

              firebase.reauthenticate({email: email, password: passwordToUse})
              currentEmail = email;
            }

            alert('Changes have been saved!');

            return "success"
          });



    }

    return <div className={classes.root}>
        <FirebaseContext.Consumer>
            {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <div className={classes.formContainer}>
            <Grid container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                  style={{ width: '100vw', height: '100%', paddingTop: '1em' }}>
                <Grid item xs={9}>
                    <Typography style={{ fontSize: '2.5em' }}>
                        My Account
                    </Typography>
                </Grid>
                <Grid item xs={6} spacing={8} className={classes.container}>
                    <StyledFormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                        <Input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
                               value={firstName} placeholder={"First name"} />
                    </StyledFormControl>
                </Grid>
                <Grid item xs={6} spacing={8} className={classes.container}>
                    <StyledFormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                        <Input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
                               value={lastName} placeholder={"Last name"}/>
                    </StyledFormControl>
                </Grid>
                <Grid item xs={8} spacing={8} className={classes.container}>
                    <StyledFormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-name-label">Email</InputLabel>
                        <Input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                               value={email} />
                    </StyledFormControl>
                </Grid>
                <Grid item xs={8} spacing={8} className={classes.container}>
                    <StyledFormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-name-label">Current Password</InputLabel>
                        <Input type="password"
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(event.target.value)}
                               value={currentPassword} />
                    </StyledFormControl>
                </Grid>
                <Grid item xs={8} spacing={2} className={classes.container}>
                    <FormHelperText>Enter a new password twice to change your password</FormHelperText>
                </Grid>
                <Grid item xs={8} spacing={2} className={classes.container}>
                    <StyledFormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-name-label">Password</InputLabel>
                        <Input type="password" placeholder="Password"
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                               value={password} />
                        <Input type="password" placeholder="Confirm"
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
                               value={confirmPassword} />
                    </StyledFormControl>
                </Grid>
                <Grid item xs={8} spacing={2} className={classes.container}>
                    <FirebaseContext.Consumer>
                        {(firebase:Firebase) => (
                            <Button variant="contained" color="primary"
                                    onClick={(_) =>
                                        save(firstName, lastName, user.email, email, currentPassword, password, confirmPassword, firebase)
                                            .then((res) => {
                                                if(res === "success")
                                                {
                                                  history.push("/Home")
                                                  location.reload();
                                                }
                                              }
                                            )
                                          }>Save</Button>)}
                    </FirebaseContext.Consumer>
                </Grid>
            </Grid>
        </div>

    </div>
}

export default connect(state => ({ user: state.coachState.user }))(MyAccountPage)
