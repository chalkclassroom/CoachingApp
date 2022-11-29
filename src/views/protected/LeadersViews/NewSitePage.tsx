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
    siteName: string,
    selectedProgram: Array<string>,
    programsList: Array<string>
}


/**
 *
 */
class NewSitePage extends React.Component<Props, State>{

    /**
     *
     * @param props
     */
    constructor(props: Props){
        super(props);
        this.state = {
            siteName: "",
            selectedProgram: [],
            programsList: [],
            savedSiteName: "",
            allLeadersList: [],
            selectedSiteLeaderList: [],
        }
    }

    componentDidMount(): void {
      this.setPrograms();
    }

    /**
     * Set the sites for the dropdown
     */
     async setPrograms(){
       const firebase = this.context;
       firebase.getPrograms()
        .then((data)=>{

          this.setState({programsList: data});

        });

        // Set the users for the dropdown
        firebase.getSiteLeaders()
         .then((data)=>{
           this.setState({allLeadersList: data});
         });

     }


    async save(firebase:Firebase){

        const {
          siteName,
          selectedProgram,
          selectedSiteLeaderList
        } = this.state;


        if (!siteName || siteName === ""){
            alert("Site name is required");
            return;
        }


        await firebase.createSite({ siteName, selectedProgram: selectedProgram})
            .then((data) => {
              console.log("Site Created");
              this.setState({savedSiteName: siteName});

              // Add the program and sites to list of programs/sites for every user selected as a 'Program Leader'
              selectedSiteLeaderList.forEach(leader => {

                // Add new program to users
                firebase.assignProgramToUser({userId: leader, programId: selectedProgram}).then((res) => {
                  console.log("Program " + data.id + "added to user " + leader);
                }).catch(e => console.error("error => ", e));

                firebase.assignSiteToUser({userId: leader, siteId: data.id}).then((res) => {
                  console.log("Sites added to user " + leader);
                }).catch(e => console.error("error => ", e));

                firebase.assignUserToSiteOrProgram({siteId: data.id, userId: leader}).then((res) => {
                    console.log(leader + " Users added to site " + data.id);
                  }).catch(e => console.error("error => site : " + data.id, e));

              });
            }).catch(e => {
                console.log(e)
                alert('Unable to create Site. Please try again')
            }).finally(() => {
                this.setState({ // Hold off setting new state until success has been determined
                  siteName: siteName,
                  selectedProgram: selectedProgram
                });
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
            siteName,
            savedSiteName
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
            {savedSiteName  &&
            <Alert severity={'success'}>Site has been created with the name "{savedSiteName}"</Alert>}


            <div className={classes.formContainer}>
                <Grid container
                      direction="column"
                      justify="flex-start"
                      alignItems="center"
                      style={{ width: '100vw', height: '100%', paddingTop: '1em' }}>
                    <Grid item xs={9}>
                        <Typography style={{ fontSize: '2.5em' }}>
                            New Site
                        </Typography>
                    </Grid>
                    <Grid item xs={6} spacing={8} className={classes.container}>
                        <StyledFormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-name-label">Name of Site</InputLabel>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    this.setState({siteName: event.target.value})}
                                value={siteName} placeholder={'Name of Site'} />
                        </StyledFormControl>
                    </Grid>


                    <Grid item xs={8} spacing={8} className={classes.container}>

                        {
                          /*
                           * Select Programs
                           */
                        }
                        <StyledFormControl className={classes.formControl}>
                            <InputLabel id="role-select-label">Program</InputLabel>
                            <Select
                              labelId="demo-mutiple-name-label"
                              id="demo-mutiple-name"
                              className={classes.select}
                              autoWidth={true}
                              value={this.state.selectedProgram}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                  this.setState({selectedProgram:event.target.value})}
                              input={<Input />}
                              MenuProps={MenuProps}
                            >
                              {this.state.programsList.map(
                                (site, index)=>{
                                  if(site)
                                  {
                                    return <MenuItem value={site.id}>
                                    {site.name}
                                    </MenuItem>
                                  }
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
                            <InputLabel id="role-select-label">Site Leaders</InputLabel>
                            <Select
                              labelId="demo-mutiple-name-label"
                              id="demo-mutiple-name"
                              multiple
                              className={classes.select}
                              autoWidth={true}
                              value={this.state.selectedSiteLeaderList}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                  this.setState({selectedSiteLeaderList:event.target.value})}
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

NewSitePage.contextType = FirebaseContext

//export default connect(state => ({ isAdmin: state.coachState.role === Role.ADMIN, teacherSelected: state.teacherSelectedState.teacher, testing: "SWEET", teacherList: state.teacherListState.teachers}))(withStyles(styles)(NewSitePage))
export default connect(state => ({ isAdmin: (state.coachState.role === Role.ADMIN || state.coachState.role === Role.PROGRAMLEADER )}))(withStyles(styles)(NewSitePage))
