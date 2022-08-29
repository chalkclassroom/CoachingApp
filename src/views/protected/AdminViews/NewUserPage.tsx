import React from 'react'
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    withStyles,
} from '@material-ui/core'
import AppBar from '../../../components/AppBar'
import Firebase, { FirebaseContext } from '../../../components/Firebase'
import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { Role } from '../../../state/actions/coach'
import { RouteComponentProps } from 'react-router-dom'
import * as H from 'history' 
import * as Types from '../constants/Types';


const styles:object = {
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
}

const StyledFormControl = withStyles(() => ({
    root: {
        marginBottom: '1.3rem',
    },
}))(FormControl)


interface Style {
    root: string,
    container: string,
    formContainer: string,
    formControl: string
}

type Props = RouteComponentProps & {
    history: H.History,
    firebase: Firebase,
    isAdmin: boolean,
    highLevelCreate: boolean,
    lowLevelCreate: boolean
}

interface State {
    firstName: string,
    lastName: string,
    email: string,
    role: Role,
    createdPassword: string | undefined,
    showProgram: boolean,
    showSite: boolean,
    programsList: Array<string>,
    sitesList: Array<string>,
    program: string,
    site: string
}

/**
 *
 */
class NewUserPage extends React.Component<Props, State>{

    /**
     *
     * @param props
     */
    constructor(props: Props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            role: Role.ANONYMOUS,
            createdPassword: undefined,
            showProgram: false,
            showSite: false,
            programsList: [],
            sitesList: [],
            program: "",
            site: ""
        }
    }

    componentDidMount(): void {
        const firebase = this.context;
        firebase.getPrograms().then((data) => {
            this.setState({programsList: data.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))});
        });
        firebase.getSites().then((data) => {
            this.setState({sitesList: data.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))});
        })
    }


    /**
     *
     */
    async save(firebase:Firebase){

        const {
            email,
            firstName,
            lastName,
            role,
            site,
            program
        } = this.state;

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

        if (![Role.ADMIN, Role.COACH, Role.TEACHER, Role.PROGRAMLEADER, Role.SITELEADER].includes(role)){
            alert("Please select a role");
            return;
        }

        if (this.state.showSite) {
            if (!site || site === "") {
                alert("Please select a site")
                return;
            }
        }

        if (this.state.showProgram) {
            if (!program || program === "") {
                alert("Please select a program")
                return;
            }
        }

        const randomString = Math.random().toString(36).slice(-8)
        await firebase.firebaseEmailSignUp({ email, password: randomString, firstName, lastName }, role, this.state.showProgram, program, this.state.showSite, site)
            .then(() => {
              this.setState({
                createdPassword: randomString
              });
              return randomString
            }).catch(e => {
                this.setState({
                  createdPassword: undefined
                });
                console.log(e)
                alert('Unable to create user. Please try again')
            }).finally(() => {
                this.setState({ // Hold off setting new state until success has been determined
                  firstName: '',
                  lastName: '',
                  email: '',
                  role: Role.ANONYMOUS,
                });
            });



    }
   
    renderDropdown = param => () => {
        this.setState({showProgram: false, showSite: false});
        switch(param) {
            default: case 0:
                break;
            case 1:
                this.setState({showProgram: true});
                break;
            case 2:
                this.setState({showSite: true})
        }
    }

    /**
     * @return React.ReactNode
     */
    render():React.ReactNode {
        const {
            isAdmin,
            lowLevelCreate,
            highLevelCreate,
            classes
        } = this.props;

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
        const {
            createdPassword,
            email,
            firstName,
            lastName,
            role,
        } = this.state
        return <div className={classes.root}>
            <FirebaseContext.Consumer>
                {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
            </FirebaseContext.Consumer>
            {createdPassword  &&
            <Alert severity={'success'}>User has been created with password {createdPassword}</Alert>}
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
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    this.setState({firstName: event.target.value})}
                                value={firstName} placeholder={'First name'} />
                        </StyledFormControl>
                    </Grid>
                    <Grid item xs={6} spacing={8} className={classes.container}>
                        <StyledFormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-name-label">Last Name</InputLabel>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    this.setState({lastName:event.target.value})}
                                value={lastName} placeholder={'Last name'} />
                        </StyledFormControl>
                    </Grid>
                    <Grid item xs={8} spacing={8} className={classes.container}>
                        <StyledFormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-name-label">Email</InputLabel>
                            <Input onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                this.setState({email: event.target.value})}
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
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                                    this.setState({role: event.target.value})}
                            >
                                <MenuItem onClick={this.renderDropdown(0)} value="teacher">Teacher</MenuItem>
                                <MenuItem onClick={this.renderDropdown(2)} value="coach">Coach</MenuItem>
                                {lowLevelCreate ? <MenuItem onClick={this.renderDropdown(2)} value="siteLeader">Site Leader</MenuItem> : <MenuItem style={{display: 'none'}} value="siteLeader">Site Leader</MenuItem>}
                                {highLevelCreate ? <MenuItem onClick={this.renderDropdown(1)} value="programLeader">Program Leader</MenuItem> : <MenuItem style={{display: 'none'}} value="programLeader">Program Leader</MenuItem>}
                                {highLevelCreate ? <MenuItem onClick={this.renderDropdown(0)} value="admin">Admin</MenuItem> : <MenuItem style={{display: 'none'}} value="admin">Admin</MenuItem>}
                            </Select>
                        </StyledFormControl>
                    </Grid>
                    <Grid item xs={8} spacing={8} className={classes.container}>
                    {this.state.showSite && (<StyledFormControl className={classes.formControl}>
                            <InputLabel id="role-select-label">Site</InputLabel>
                            <Select
                                labelId="role-select-label"
                                id="role-select"
                                value=""
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                                    this.setState({site: event.target.value})}
                            >
                                {this.state.sitesList.map((site, index) => {
                                return <MenuItem value={site.id}>
                                    {site.name}
                                </MenuItem>})}
                                
                            </Select>
                        </StyledFormControl>)}
                    {this.state.showProgram && (<StyledFormControl className={classes.formControl}>
                        <InputLabel id="role-select-label">Program</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            value=""
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                                this.setState({program: event.target.value})}
                        >
                            {this.state.programsList.map((program, index) => {
                                return <MenuItem value={program.id}>
                                    {program.name}
                                </MenuItem>})}
                        </Select>
                    </StyledFormControl>)}
                    </Grid>
                    <Grid item xs={8} spacing={2} className={classes.container}>
                        <FormHelperText>A password will be automatically generated for this user</FormHelperText>
                    </Grid>
                    <Grid item xs={8} spacing={2} className={classes.container}>
                        <FirebaseContext.Consumer>
                            {(firebase: Firebase) => (
                                <Button variant="contained" color="primary"
                                        onClick={(_) =>
                                            this.save(firebase)}>Save</Button>)}
                        </FirebaseContext.Consumer>
                    </Grid>
                </Grid>
            </div>

        </div>
    }
}

const mapStateToProps = (state: Types.ReduxState): {isAdmin: boolean, highLevelCreate: boolean, lowLevelCreate: boolean} => {
    return {
      isAdmin: [Role.ADMIN, Role.PROGRAMLEADER, Role.SITELEADER].indexOf(state.coachState.role) >= 0,
      highLevelCreate: state.coachState.role === Role.ADMIN,
      lowLevelCreate: [Role.ADMIN, Role.PROGRAMLEADER].indexOf(state.coachState.role) >= 0
    }
  }

NewUserPage.contextType = FirebaseContext
// export default connect(state => ({ isAdmin: state.coachState.role === Role.ADMIN }))(withStyles(styles)(NewUserPage))
export default connect(mapStateToProps)(withStyles(styles)(NewUserPage))