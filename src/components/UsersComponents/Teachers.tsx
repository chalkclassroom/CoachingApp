import {
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  withStyles,
  MenuItem,
  Select,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import ForwardIcon from '@material-ui/icons/Forward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import FolderIcon from '@material-ui/icons/Folder'
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif';
import Firebase, { FirebaseContext } from '../Firebase'
import SaveImage from '../../assets/images/SaveImage.svg'
import SaveGrayImage from '../../assets/images/SaveGrayImage.svg'
import { is } from 'date-fns/locale';

const StyledSelect = withStyles({
  root: {
    padding: '11px 14px',
    width: '37vw',
    maxWidth: '430px'
  },
  disabled: {
    opacity: 0.3
  }
})(Select);

const StyledSelectTransfer = withStyles({
  root: {
    padding: '11px 14px',
    width: '25vw',
    // maxWidth: '430px'
  },
  disabled: {
    opacity: 0.3
  }
})(Select);

interface Props {
  changePage(pageName: string): void
  userRole: string
  location: string
  teacherData: Array<Object>
  coachData: Array<Object>
  siteData: Array<Object>
  programData: Array<Object>
}

interface State {
  view: number
  saved: boolean
  addTeacherFirstName: string
  addTeacherLastName: string
  addCoach: string
  addCoachSites: Array<Object>
  addSiteName: string
  addSite: string
  addCoachPrograms: Array<Object>
  addProgram: string
  editTeacherId: string
  editTeacherFirstName: string
  editTeacherLastName: string
  editCoach: string
  editSite: string
  editProgram: string
  transferTeacherId: string
  transferCoachName: string
  transferSiteName: string
  transferProgramName: string
  saveModalOpen: boolean
  awaitingConfirmationRef: { resolve: (discard: boolean) => void  } | null
}

class Teachers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      view: 1,
      saved: true,
      addTeacherFirstName: "",
      addTeacherLastName: "",
      addCoach: "",
      addCoachSites: [],
      addSiteName: "",
      addSite: "",
      addCoachPrograms: [],
      addProgram: "",
      editTeacherId: "",
      editTeacherFirstName: "",
      editTeacherLastName: "",
      editCoach: "",
      editSite: "",
      editProgram: "",
      transferTeacherId: "",
      transferCoachName: "",
      transferSiteName: "",
      transferProgramName: "",
      saveModalOpen: false,
      awaitingConfirmationRef: null
    }

  }

  handlePageChange = (pageNumber: number) => {
    switch (pageNumber) {
      default : case 1:
        if (!this.state.saved) {
          this.onSaveModalOpen();
          break;
        } else {
          this.setState({view: pageNumber});
          this.props.changePage("Teachers");
          break;
        }
      case 2:
        if (!this.state.saved) {
          this.onSaveModalOpen();
          break;
        } else {
          this.setState({view: pageNumber});
          this.props.changePage("TeachersAdd");
          break;
        }
      case 3:
        if (!this.state.saved) {
          this.onSaveModalOpen();
          break;
        } else {
          this.setState({view: pageNumber});
          this.props.changePage("TeachersTransfer");
          break;
        }
      case 4:
        if (!this.state.saved) {
          this.onSaveModalOpen();
          break;
        } else {
          this.setState({view: pageNumber});
          this.props.changePage("TeachersEdit");
          break;
        }
    }
  }

  handleAddInputChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (name === 'firstName') {
      if (event.target.value === "") {
        this.setState({
          addTeacherFirstName: event.target.value,
          saved: true,
        })
      } else {
      this.setState({
        addTeacherFirstName: event.target.value,
        saved: false,
      })}
    }
    if (name === 'lastName') {
      if (event.target.value === "") {
        this.setState({
          addTeacherLastName: event.target.value,
          saved: true,
        })} else {
      this.setState({
        addTeacherLastName: event.target.value,
        saved: false,
      })}
    }
  }

  handleEditInputChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (name === 'firstName') {
      this.setState({
        editTeacherFirstName: event.target.value,
        saved: false,
      })
    }
    if (name === 'lastName') {
      this.setState({
        editTeacherLastName: event.target.value,
        saved: false,
      })
    }
  }

  onSaveModalOpen =  (): Promise<boolean> => {
    this.setState({saveModalOpen: true})
    return new Promise<boolean>((resolve: (discard: boolean) => void, reject): void => {
      this.setState({awaitingConfirmationRef: {resolve}})
    })
  }

  onSaveModalDiscard = (): void => {
    if(this.state.awaitingConfirmationRef) {
      this.state.awaitingConfirmationRef.resolve(true)
    }
      this.setState({
        saveModalOpen: false,
        view: 1,
        saved: true,
        awaitingConfirmationRef: null,
        addTeacherFirstName: "",
        addTeacherLastName: "",
        addCoach: "",
        addCoachSites: [],
        addSiteName: "",
        addSite: "",
        addCoachPrograms: [],
        addProgram: "",
      })
  }

  onSaveModalClose = (): void => {
    if(this.state.awaitingConfirmationRef) {
      this.state.awaitingConfirmationRef.resolve(false)
    }
      this.setState({
          saveModalOpen: false,
        awaitingConfirmationRef: null
      })
  }

  // handleActionPlanModal = async () => {
  //   if(!(this.state.view === 'actionPlan') || this.state.actionPlanFormSaved) {
  //     return Promise.resolve(true)
  //   }
  //   return this.onActionPlanModalOpen();
  // }

  async addTeacher(firebase:Firebase){

    firebase
    const {
        addTeacherFirstName,
        addTeacherLastName,
        addCoach,
        addSiteName,
        addProgram
    } = this.state;

    if (!addTeacherFirstName || addTeacherFirstName === ""){
        alert("First Name is required");
        return
    }

    if (!addTeacherLastName || addTeacherLastName === ""){
        alert("Last name is required");
        return;
    }

    if (!addCoach || addCoach === ""){
        alert("Coach is required");
        return;
    }

    if (!addSiteName || addSiteName === ""){
      alert("Site is required");
      return;
    }

    if (!addProgram || addProgram === ""){
      alert("Program is required");
      return;
    }

    // check user role to make sure site leaders can't change programs
    // if (![Role.ADMIN, Role.COACH, Role.TEACHER, Role.PROGRAMLEADER, Role.SITELEADER].includes(role)){
    //     alert("Please select a role");
    //     return;
    // }

    const randomString = Math.random().toString(36).slice(-8)
    const teacherInfo = {
        firstName: addTeacherFirstName,
        lastName: addTeacherLastName,
        school: addSiteName,
        email: '',
        notes: '',
        phone: ''
    }
    await firebase.addTeacherToCoach(teacherInfo, addCoach)
    .then(() => {
        return randomString
      }).catch(e => {
          console.log(e)
          alert('Unable to create user. Please try again')
      }).finally(() => {
          this.setState({ // Hold off setting new state until success has been determined
            addTeacherFirstName: '',
            addTeacherLastName: '',
            addCoachSites: [],
            addSiteName: '',
            addCoach: '',
            addCoachPrograms: [],
            addProgram: '',
            addSite: ''
          });
          window.location.reload()
      });
  } 

  handleEditClick = (value) => {
    console.log(value)
    this.setState({
      editTeacherId: value.teacherId,
      editTeacherFirstName: value.teacherFirstName,
      editTeacherLastName: value.teacherLastName,
      editCoach: value.coachFirstName + ' ' + value.coachLastName,
      editSite: value.siteName,
      editProgram: value.selectedProgramName
    })
    this.handlePageChange(4)
  }



  handlePopulateSite = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({addCoach: event.target.value, saved: false})
    const selectedSites = this.props.coachData.filter((doc) => {return doc.id === event.target.value})[0].siteList
    this.setState({addCoachSites: selectedSites})
  }

  handlePopulateProgram = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({addSite: event.target.value, saved: false})
    let site = this.props.siteData.filter((doc) => {return doc.id === event.target.value})[0].name
    this.setState({addSiteName: site})
    console.log(site)
    const sites = this.props.coachData.filter((doc) => {return doc.id === this.state.addCoach})[0].siteList
    let programs = []
    sites.map((doc) => {
      if (doc.siteId === event.target.value) {
        programs.push({programId: doc.programId, programName: doc.programName})
      }
    })
    this.setState({addCoachPrograms: programs})
  }

  // handlePopulateSite = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   this.setState({addCoach: event.target.value, saved: false})
  //   const selectedSites = this.props.coachData.filter((doc) => {return doc.id === event.target.value})[0].siteList
  //   this.setState({addCoachSites: selectedSites})
  // }

  render() {


    return (<>
    <Dialog open={this.state.saveModalOpen}>
        <DialogTitle style={{ fontFamily: 'Arimo' }}>
            You have unsaved changes to your entry.
            Would you like to discard the entry?
        </DialogTitle>
        <DialogActions>
            <Button onClick={this.onSaveModalClose}>
                No, keep editing
            </Button>
            <Button onClick={this.onSaveModalDiscard}>
                Yes, discard changes
            </Button>
        </DialogActions>
    </Dialog>
      <Grid container direction='row'>
        <Grid item xs={3}>
            <Grid container direction='column' style={{ marginLeft:'30px'}}>
              {this.state.view !== 4 ? (<>
              {this.state.view === 2 ? (<>
                <Grid item xs={6}>
                    <Grid container direction='row' onClick={() => this.handlePageChange(1)}>
                        <Grid item>
                            <ArrowBackIcon style={{fill: 'green', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography 
                              variant="h6" 
                              gutterBottom 
                              style={{marginTop:'20px' }}
                              >
                                Back
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
              </>) : (<>
                <Grid item xs={6}>
                    <Grid container direction='row' onClick={() => this.handlePageChange(2)}>
                        <Grid item>
                            <AddIcon style={{fill: 'green', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography 
                              variant="h6" 
                              gutterBottom 
                              style={{marginTop:'20px' }}
                              >
                                Add
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>)}
                {this.state.view === 3 ? (<>
                <Grid item xs={6}>
                  <Grid container direction='row' onClick={() => this.handlePageChange(1)}>
                        <Grid item>
                            <ArrowBackIcon style={{fill: 'blue', fontSize:'40', marginTop:'15px',}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6" 
                              gutterBottom 
                              style={{marginTop:'20px',}}
                              >
                                Back
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>) : (<>
                <Grid item xs={6}>
                <Grid container direction='row' onClick={() => this.handlePageChange(3)}>
                        <Grid item>
                            <ForwardIcon style={{fill: 'blue', fontSize:'40', marginTop:'15px',}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6" 
                              gutterBottom 
                              style={{marginTop:'20px',}}
                              >
                                Transfer
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>)}
                </>) : (<>
                  <Grid item xs={6}>
                    <Grid container direction='row'>
                        <Grid item>
                            <FolderIcon style={{fill: 'Khaki', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography 
                              variant="h6" 
                              gutterBottom 
                              style={{marginTop:'20px' }}
                              >
                                Archive
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction='row' onClick={() => this.handlePageChange(1)}>
                        <Grid item>
                            <ArrowBackIcon style={{fill: 'blue', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography 
                              variant="h6" 
                              gutterBottom 
                              style={{marginTop:'20px' }}
                              >
                                Back
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>)}
            </Grid>
        </Grid>
        {this.state.view === 1 ? (<>
        <Grid item xs={6}><span></span></Grid>
        <Grid item xs={3}>
        <Grid container direction='column'>
            <Grid item>
                <Grid container direction='row' >
                    <Grid item>
                        <AddIcon style={{fill: 'white', fontSize:'40', marginTop:'15px'}}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
            <Grid container direction='row' justifyContent='flex-end'>
              <Grid item style={{marginRight:'4vw'}}>
                <TextField
                  style={{width:'160px'}}
                  id="teacher-search"
                  label="Search"
                  type="search"
                  // className={classes.search}
                  variant="outlined"
                  // onChange={onChangeText}
                />
              </Grid>
            </Grid>
          </Grid>
      </Grid>
      </Grid>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid
          item
          xs={11}
          style={{ 
            width: '100%', 
            // height: '38vh', 
            // border: '2px solid #0988ec', 
            // borderRadius: '0.5em', 
            marginTop: '100px' }}
        >
          {this.props.teacherData.length > 0 ? (
          <table style={{borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{borderBottom:'2px solid #0988ec'}}>
              <tr>
                <th colSpan={2}>
                  <Typography variant="h6" gutterBottom>
                    <strong>Teacher</strong>
                  </Typography>
                </th>
                <th colSpan={2}>
                  <Typography variant="h6" gutterBottom>
                    <strong>Instructional Coach</strong>
                  </Typography>
                </th>
                <th colSpan={1}>
                  <Typography variant="h6" gutterBottom>
                    <strong>Site</strong>
                  </Typography>
                </th>
                <th colSpan={1}>
                  <Typography variant="h6" gutterBottom>
                    <strong>Program</strong>
                  </Typography>
                </th>
              </tr>
              <tr>
                <th>
                  <Typography variant="h6" gutterBottom>
                    Last Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    First Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    Last Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    First Name
                  </Typography>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.teacherData.map((value, index) => {
                return (
                <tr 
                key={index} 
                onClick={() => {this.handleEditClick(value)}}
                >
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.teacherLastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.teacherFirstName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.coachLastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.coachFirstName}  
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.siteName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.selectedProgramName}
                    </Typography>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
          ) : (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{height: "100%"}}
            >
              <img src={CHALKLogoGIF} alt="Loading" width="60%" />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>) : (this.state.view === 2 ? (<>
          <Grid item xs={1} style={{marginTop: '45px'}}>

            <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'10px'}}>
                  Teacher
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'10px'}}>
                  Coach
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'3px'}}>
                  Site
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'2px'}}>
                  Program
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <Grid container direction='row' justifyContent='center' spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                    id="teacher-firstName"
                    label="First Name"
                    type="text"
                    value={this.state.addTeacherFirstName}
                    variant="outlined"
                    onChange={this.handleAddInputChange('firstName')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                    id="teacher-lastName"
                    label="Last Name"
                    type="text"
                    value={this.state.addTeacherLastName}
                    variant="outlined"
                    onChange={this.handleAddInputChange('lastName')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.addCoach}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.handlePopulateSite(event)}
                    name="addCoach"
                  >
                    {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.firstName + ' ' + coach.lastName}
                            </MenuItem>
                        )}
                        })}
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.addSite}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.handlePopulateProgram(event)}
                    name="addSite"
                  >
                      {this.state.addCoachSites.map((site, index) => {
                        return (
                          <MenuItem value={site.siteId} key={index}>
                            {site.siteName}
                          </MenuItem>
                        )
                      })}
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.addProgram}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      this.setState({addProgram: event.target.value})}
                    name="addProgram"
                  >
                    {this.state.addCoachPrograms.map((program, index) => {
                      return (
                        <MenuItem value={program.programId} key={index}>
                          {program.programName}
                        </MenuItem>
                      )
                      })
                    }
                  </StyledSelect>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
     
            <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginTop:'45px'}}>
            <Grid item xs={1}/>
              <Grid item xs={1}>
                <FirebaseContext.Consumer>
                  {(firebase: Firebase) => (
                    <Button 
                    onClick={(_)=>{this.addTeacher(firebase)}}
                    >
                      {this.state.saved ? (
                        <img
                          alt="Save"
                          src={SaveGrayImage}
                          style={{
                            width: '80%',
                            minWidth:'70px'
                          }}
                        />
                      ) : (
                        <img
                          alt="Save"
                          src={SaveImage}
                          style={{
                            width: '80%',
                            minWidth:'70px'
                          }}
                        />
                      )}
                    </Button>
                  )}
                </FirebaseContext.Consumer>
              </Grid>     
            </Grid>
    </>) : (this.state.view === 3 ? (<>
      <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginTop: '60px'}}>
          <Grid item xs={1} style={{marginTop: '45px'}}>

            <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'10px'}}>
                  Teacher
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'10px'}}>
                  Coach
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'3px'}}>
                  Site
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'2px'}}>
                  Program
                </Typography>
              </Grid>
            </Grid>
            </Grid>

            <Grid item xs={4} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelectTransfer
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.transferTeacherId}
                    // onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.handlePopulateTeacherInfo(event)}
                    name="selectedCoach"
                  >
                    {this.props.teacherData.map(
                      (teacher, index)=>{
                        return (
                            <MenuItem value={teacher.teacherId} key={index}>
                              {teacher.teacherLastName + ", " + teacher.teacherFirstName}
                            </MenuItem>
                        )
                        })}
                  </StyledSelectTransfer>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                    style={{width:'42vw', maxWidth: '470px'}}
                    id="teacher-Coach"
                    type="text"
                    value={this.state.transferCoachName}
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                  />
              </Grid>
              <Grid item>
                <TextField
                    style={{width:'42vw', maxWidth: '470px'}}
                    id="teacher-Coach"
                    type="text"
                    value={this.state.transferSiteName}
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                  />
              </Grid>
              <Grid item>
                <TextField
                    style={{width:'42vw', maxWidth: '470px'}}
                    id="teacher-Coach"
                    type="text"
                    value={this.state.transferProgramName}
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                  />
              </Grid>
            </Grid>
            </Grid>

            <Grid item xs={1} style={{marginTop: '45px'}}>

            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <ForwardIcon style={{fill: 'white', fontSize:'40', marginTop:'0px',}}/>
              </Grid>
              <Grid item>
                <ForwardIcon style={{fill: 'blue', fontSize:'40', marginTop:'4px',}}/>
              </Grid>
              <Grid item>
                <ForwardIcon style={{fill: 'blue', fontSize:'40', marginTop:'0px',  marginBottom:'0px',}}/> 
              </Grid>
              <Grid item>
                <ForwardIcon style={{fill: 'blue', fontSize:'40', marginTop:'0px', marginBottom:'1px',}}/>
              </Grid>
            </Grid>
            </Grid>

            <Grid item xs={4} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <ForwardIcon style={{fill: 'white', fontSize:'40', marginTop:'0px',}}/>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelectTransfer
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={this.state.selectedCoach}
                    // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    //   this.setState({selectedCoach: event.target.value})}
                    name="selectedCoach"
                    // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                  >
                    {/* {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.lastName + ", " + coach.firstName}
                            </MenuItem>
                        )}
                        })} */}
                  </StyledSelectTransfer>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelectTransfer
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={this.state.selectedCoach}
                    // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    //   this.setState({selectedCoach: event.target.value})}
                    name="selectedCoach"
                    // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                  >
                    {/* {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.lastName + ", " + coach.firstName}
                            </MenuItem>
                        )}
                        })} */}
                  </StyledSelectTransfer>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelectTransfer
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={this.state.selectedCoach}
                    // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    //   this.setState({selectedCoach: event.target.value})}
                    name="selectedCoach"
                    // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                  >
                    {/* {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.lastName + ", " + coach.firstName}
                            </MenuItem>
                        )}
                        })} */}
                  </StyledSelectTransfer>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                </FormControl>
              </Grid>
            </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginTop:'45px'}}>
            <Grid item xs={1}/>
              <Grid item xs={1}>
                <Button >
                  {this.state.saved ? (
                    <img
                      alt="Save"
                      src={SaveGrayImage}
                      style={{
                        width: '80%',
                        minWidth:'70px'
                      }}
                    />
                  ) : (
                    <img
                      alt="Save"
                      src={SaveImage}
                      style={{
                        width: '80%',
                        minWidth:'70px'
                      }}
                    />
                  )}
                </Button>
              </Grid>     
            </Grid>
      </Grid>
    </>) : (this.state.view === 4 ? (<>
      <Grid item xs={1} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'10px'}}>
                  Teacher
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'20px'}}>
                  Coach
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'20px'}}>
                  Site
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'15px'}}>
                  Program
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <Grid container direction='row' justifyContent='center' spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                    id="teacher-firstName"
                    label="First Name"
                    type="text"
                    value={this.state.editTeacherFirstName}
                    InputProps={{
                      readOnly: false
                    }}
                    variant="outlined"
                    onChange={this.handleEditInputChange('firstName')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                    id="teacher-lastName"
                    label="Last Name"
                    type="text"
                    value={this.state.editTeacherLastName}
                    InputProps={{
                      readOnly: false
                    }}
                    variant="outlined"
                    onChange={this.handleEditInputChange('lastName')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  style={{width:'42vw', maxWidth: '470px'}}
                  id="teacher-Coach"
                  type="text"
                  value={this.state.editCoach}
                  InputProps={{
                    readOnly: true
                  }}
                  variant="outlined"
                  />
              </Grid>
              <Grid item>
                <TextField
                  style={{width:'42vw', maxWidth: '470px'}}
                  id="teacher-Site"
                  type="text"
                  value={this.state.editSite}
                  InputProps={{
                    readOnly: true
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{width:'42vw', maxWidth: '470px'}}
                  id="teacher-Program"
                  type="text"
                  value={this.state.editProgram}
                  InputProps={{
                    readOnly: true
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
     
            <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginTop:'45px'}}>
            <Grid item xs={1}/>
              <Grid item xs={1}>
                <FirebaseContext.Consumer>
                  {(firebase: Firebase) => (
                    <Button 
                    onClick={(_)=>{this.addTeacher(firebase)}}
                    >
                      {this.state.saved ? (
                        <img
                          alt="Save"
                          src={SaveGrayImage}
                          style={{
                            width: '80%',
                            minWidth:'70px'
                          }}
                        />
                      ) : (
                        <img
                          alt="Save"
                          src={SaveImage}
                          style={{
                            width: '80%',
                            minWidth:'70px'
                          }}
                        />
                      )}
                    </Button>
                  )}
                </FirebaseContext.Consumer>
              </Grid>     
            </Grid>
    </>) : (null))))}
    </Grid>
    </>)
  }
}

Teachers.contextType = FirebaseContext
export default Teachers