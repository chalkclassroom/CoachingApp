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
import * as Types from '../../../constants/Types';
import { changeTeacher } from '../../../state/actions/teacher';

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
        width: '19em',
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
    programName: string,
    selectedSites: Array<string>,
    sitesList: Array<string>
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
            programName: "",
            selectedSites: [],
            sitesList: [],
            savedProgramName: "",
            savedProgramId: "",
            allLeadersList: [],
            selectedProgramLeaderList: [],
        }
    }

    componentDidMount(): void {
      const firebase = this.context;
      // Set the sites for the dropdown
      firebase.getSites()
       .then((data)=>{
         this.setState({sitesList: data});
       });

      // Set the users for the dropdown
      firebase.getProgramLeaders()
       .then((data)=>{
         this.setState({allLeadersList: data});
       });

    }

    async save(firebase:Firebase){

        const {
          programName,
          selectedSites,
          selectedProgramLeaderList,
          savedProgramId
        } = this.state;


        if (!programName || programName === ""){
            alert("Program name is required");
            return;
        }

        // Create the program
        await firebase.createProgram({ programName, selectedSites: selectedSites})
            .then((data) => {
              console.log("Program Created");
              this.setState({savedProgramName: programName, savedProgramId: data.id});

              // Add the program and sites to list of programs/sites for every user selected as a 'Program Leader'
              selectedProgramLeaderList.forEach(leader => {

                // Add new program to users
                firebase.assignProgramToUser({userId: leader, programId: data.id}).then((res) => {
                  console.log("Program " + data.id + "added to user " + leader);
                }).catch(e => console.error("error => ", e));

                // Assign selected sites to the user
                firebase.assignSiteToUser({userId: leader, bulkSiteIds: selectedSites}).then((res) => {
                  console.log("Sites added to user " + leader);
                }).catch(e => console.error("error => ", e));

              });

              // Add the UserID to every selected site
              selectedSites.forEach(site => {

                // Assign new program ID to each of the sites
                firebase.assignProgramToSite({siteId: site, programId: data.id}).then((res) => {
                  console.log("Program added to site " + site);
                }).catch(e => console.error("error => ", e));

                // Assign selected users to each of the sites
                firebase.assignUserToSiteOrProgram({siteId: site, bulkUserIds: selectedProgramLeaderList}).then((res) => {
                  console.log("Users added to site " + site);
                }).catch(e => console.error("error => ", e));

              });

            }).catch(e => {
                console.log(e)
                alert('Unable to create Program. Please try again')
            }).finally(() => {
                this.setState({ // Hold off setting new state until success has been determined
                  programName: programName,
                  selectedSites: selectedSites
                });

                // Assign the selected users to this program
                firebase.assignUserToSiteOrProgram({programId: this.state.savedProgramId, bulkUserIds: selectedProgramLeaderList}).then((res) => {
                  console.log("Users added to program " + this.state.savedProgramId);
                }).catch(e => console.error("error => Program : " + this.state.savedProgramId, e));

            });

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
            programName,
            savedProgramName
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
            {savedProgramName  &&
            <Alert severity={'success'}>Program has been created with the name "{savedProgramName}"</Alert>}

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
                                    this.setState({programName: event.target.value})}
                                value={programName} placeholder={'Name of Program'} />
                        </StyledFormControl>
                    </Grid>


                    {
                      /*
                      * Select sites
                      */
                    }
                    <Grid item xs={8} spacing={8} className={classes.container}>

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
                              {this.state.sitesList.map(
                                (site, index)=>{
                                  return <MenuItem value={site.id}>
                                    {site.name}
                                  </MenuItem>
                              })}
                            </Select>
                        </StyledFormControl>
                    </Grid>

                    {
                      /*
                      * Select Program Leader
                      */
                    }
                    <Grid item xs={8} spacing={8} className={classes.container}>

                        <StyledFormControl className={classes.formControl}>
                            <InputLabel id="role-select-label">Program Leaders</InputLabel>
                            <Select
                              labelId="demo-mutiple-name-label"
                              id="demo-mutiple-name"
                              multiple
                              className={classes.select}
                              autoWidth={true}
                              value={this.state.selectedProgramLeaderList}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                  this.setState({selectedProgramLeaderList:event.target.value})}
                              input={<Input />}
                              MenuProps={MenuProps}
                            >
                              {this.state.allLeadersList.map(
                                (user, index)=>{
                                  return <MenuItem value={user.id}>
                                    {user.lastName + ", " + user.firstName}
                                  </MenuItem>
                              })}
                            </Select>
                        </StyledFormControl>
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

NewProgramPage.contextType = FirebaseContext

//export default connect(state => ({ isAdmin: state.coachState.role === Role.ADMIN, teacherSelected: state.teacherSelectedState.teacher, testing: "SWEET", teacherList: state.teacherListState.teachers}))(withStyles(styles)(NewProgramPage))
export default connect(state => ({ isAdmin: state.coachState.role === Role.ADMIN}))(withStyles(styles)(NewProgramPage))
