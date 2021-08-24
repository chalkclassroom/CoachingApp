import React, { useEffect, useState } from 'react'
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
    Select,
    MenuItem,
} from '@material-ui/core'
import AppBar from '../../../components/AppBar'
import Firebase, { FirebaseContext } from '../../../components/Firebase'
import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { Role } from '../../../state/actions/coach'


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

const save = async (email: string,
                    firstName: string,
                    lastName: string,
                    role: Role, firebase: Firebase) => {
    if (!email || email === ""){
        alert("Email is required");
        return
    }

    if (!firstName || firstName === ""){
        alert("First name is required");
        return;
    }

    if (!lastName || lastName === ""){
        alert("Last name is required");
        return;
    }

    if (![Role.ADMIN, Role.COACH, Role.TEACHER].includes(role)){
        alert("Please select a role");
        return;
    }
    const randomString = Math.random().toString(36).slice(-8)
    return firebase.firebaseEmailSignUp({ email, password: randomString, firstName, lastName }, role)
        .then(() => randomString).catch(e => {
            console.log(e)
            alert('Unable to create user. Please try again')
        })


}
/**
 * @return {ReactNode}
 */
const NewUserPage = ({isAdmin = false}): React.ReactNode => {
    const classes = useStyles()

    if (!isAdmin){
        return <div className={classes.root}>
            <FirebaseContext.Consumer>
                {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
            </FirebaseContext.Consumer>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={12}>
                    <Typography>You must be an admin to access this page.</Typography>
                </Grid>
            </Grid>
        </div>
    }
    const [firstName, setFirstName] = useState(``)
    const [lastName, setLastName] = useState(``)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [createdPassword, setCreatedPassword] = useState(null)
    return <div className={classes.root}>
        <FirebaseContext.Consumer>
            {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        {createdPassword  &&
        <Alert severity={'success'}>User {email} has been created with password {createdPassword}</Alert>}
        <div className={classes.formContainer}>
            <Grid container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                  style={{ width: '100vw', height: '100%', paddingTop: '1em' }}>
                <Grid item xs={9}>
                    <Typography style={{ fontSize: '2.5em' }}>
                        New User
                    </Typography>
                </Grid>
                <Grid item xs={6} spacing={8} className={classes.container}>
                    <StyledFormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-name-label">First Name</InputLabel>
                        <Input
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
                            value={firstName} placeholder={'First name'} />
                    </StyledFormControl>
                </Grid>
                <Grid item xs={6} spacing={8} className={classes.container}>
                    <StyledFormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-name-label">Last Name</InputLabel>
                        <Input
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
                            value={lastName} placeholder={'Last name'} />
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
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            value={role}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setRole(event.target.value)}
                        >
                            <MenuItem value="teacher">Teacher</MenuItem>
                            <MenuItem value="coach">Coach</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </StyledFormControl>
                </Grid>
                <Grid item xs={8} spacing={2} className={classes.container}>
                    <FormHelperText>A password will be automatically generated for this user</FormHelperText>
                </Grid>
                <Grid item xs={8} spacing={2} className={classes.container}>
                    <FirebaseContext.Consumer>
                        {(firebase: Firebase) => (
                            <Button variant="contained" color="primary"
                                    onClick={(_) =>
                                        save(email, firstName, lastName, role, firebase)
                                            .then(generatedPassword => setCreatedPassword(generatedPassword))}>Save</Button>)}
                    </FirebaseContext.Consumer>
                </Grid>
            </Grid>
        </div>

    </div>
}

export default connect(state => ({ isAdmin: state.coachState.role === Role.ADMIN }))(NewUserPage)