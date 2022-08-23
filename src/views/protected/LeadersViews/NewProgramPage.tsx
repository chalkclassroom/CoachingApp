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
    isAdmin: boolean
}

interface State {
    firstName: string,
    lastName: string,
    email: string,
    role: Role,
    createdPassword: string | undefined
}

/**
 *
 */
class NewProgramPage extends React.Component<Props, State>{

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
            selectedSites: []
        }
    }

    /**
     *
     */
    async save(firebase:Firebase){

        const {
            email,
            firstName,
            lastName,
            role
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

        if (![Role.ADMIN, Role.COACH, Role.TEACHER].includes(role)){
            alert("Please select a role");
            return;
        }
        const randomString = Math.random().toString(36).slice(-8)
        await firebase.firebaseEmailSignUp({ email, password: randomString, firstName, lastName }, role)
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

    /*
     * Set the sites that are chosen for this program
     */
    setSelectedSites = (site) => {
      var sites = this.state.selectedSites.slice();

      //sites.push(site);

      console.warn('Sites: ' + sites.toString());
      console.warn('Site: ' + site);



      this.setState({selectedSites: site});
    }

    /**
     * @return React.ReactNode
     */
    render():React.ReactNode {
        const {
            isAdmin,
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

        // For the 'select sites' component
        const ITEM_HEIGHT = 48
        const ITEM_PADDING_TOP = 8
        const MenuProps = {
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        }

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
                            New Program
                        </Typography>
                    </Grid>
                    <Grid item xs={6} spacing={8} className={classes.container}>
                        <StyledFormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-name-label">Name of Program</InputLabel>
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

                        {
                          /*
                           * Select Programs
                           */
                        }
                        <StyledFormControl className={classes.formControl}>
                            <InputLabel id="role-select-label">Sites</InputLabel>
                            <Select
                              labelId="demo-mutiple-name-label"
                              id="demo-mutiple-name"
                              multiple
                              className={classes.select}
                              autoWidth={true}
                              value={this.state.selectedSites}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                  this.setState({selectedSites:event.target.value})}
                              input={<Input />}
                              MenuProps={MenuProps}
                            >
                              <MenuItem value="ac">
                                Associative Cooperative
                              </MenuItem>
                              <MenuItem value="climate">
                                Classroom Climate
                              </MenuItem>
                              <MenuItem value="engagement">
                                Engagement
                              </MenuItem>
                              <MenuItem value="level">Level</MenuItem>
                              <MenuItem value="listening">
                                Listening
                              </MenuItem>
                              <MenuItem value="math">Math</MenuItem>
                              <MenuItem value="sequential">
                                Sequential
                              </MenuItem>
                              <MenuItem value="transition">
                                Transition
                              </MenuItem>
                              <MenuItem value="literacyFoundationalChild">
                                Literacy - Foundational Child
                              </MenuItem>
                              <MenuItem value="literacyWritingChild">
                                Literacy - Writing Child
                              </MenuItem>
                              <MenuItem value="literacyFoundationalTeacher">
                                Literacy - Foundational Teacher
                              </MenuItem>
                              <MenuItem value="literacyLanguageTeacher">
                                Literacy - Language Teacher
                              </MenuItem>
                              <MenuItem value="literacyReadingTeacher">
                                Literacy - Reading Teacher
                              </MenuItem>
                              <MenuItem value="literacyWritingTeacher">
                                Literacy - Writing Teacher
                              </MenuItem>
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
                                            this.save(firebase)}>Save</Button>)}
                        </FirebaseContext.Consumer>
                    </Grid>
                </Grid>
            </div>

        </div>
    }
}

export default connect(state => ({ isAdmin: state.coachState.role === Role.ADMIN }))(withStyles(styles)(NewProgramPage))
