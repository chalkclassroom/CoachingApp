import { 
        Grid, 
        TextField, 
        Typography,
        Dialog,
        DialogActions,
        DialogTitle,
        Button,
        TableSortLabel
       } from '@material-ui/core'
import React, { Component } from 'react'
import Firebase, { FirebaseContext } from '../Firebase'
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif';
import styled from 'styled-components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import FolderIcon from '@material-ui/icons/Folder'
import SaveImage from '../../assets/images/SaveImage.svg'
import SaveGrayImage from '../../assets/images/SaveGrayImage.svg'
import SiteProfileResults from '../SiteProfileComponents/SiteProfileResults';

const TableRow = styled.tr`
background-color: white;
:nth-child(odd) {
  background-color: rgb(234, 234, 234);
}
&:hover {
  background-color: rgb(9, 136, 236, .4);
  cursor: pointer;
}
`

const TableHeader = styled.th`
&:hover {
  background-color: rgb(9, 136, 236, .4);
  cursor: pointer;
}
`

interface Props {
  changePage(pageName: string): void
  userRole: string
  location: string
  teacherData: Array<Object>
  coachData: Array<Object>
  filter?: Array<string>
  updateTeacherData(data): void 
  updateCoachData(data): void 
  updateSendToSitesData(data): void
  sitesList: Array<Object>
}

interface State {
  archiveModalOpen: boolean
  awaitingConfirmationRef: { resolve: (discard: boolean) => void  } | null
  archiveTeacherId: string
  archiveTeacherCoach: string
  archiveCoachId: string
  archivedData: Array<Object>
  successModalOpen: boolean
  archiveType: string
  sortType: string
  view: number
  saved: boolean
  editTeacherId: string
  editEmail: string
  editTeacherFirstName: string
  editTeacherLastName: string
  editCoach: string
  editCoachId: string
  editSite: string
  editProgram: string
  editSiteId: string
  editProgramId: string
  success: boolean
  saveModalOpen: boolean
  editCoachFirstName: string
  editCoachLastName: string
  editCoachEmail: string
  editCoachSites: string
  editCoachProgramName: string,
  editCoachProgramId: string

}

class Archives extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      archiveModalOpen: false,
      awaitingConfirmationRef: null,
      archiveTeacherId: "",
      archiveTeacherCoach: "",
      archiveCoachId: "",
      archivedData: [],
      successModalOpen: false,
      archiveType: "",
      sortType: "lastName",
      view: 1,
      saved: true,
      editTeacherId: "",
      editEmail: "",
      editTeacherFirstName: "",
      editTeacherLastName: "",
      editCoach: "",
      editCoachId: "",
      editSite: "",
      editProgram: "",
      editSiteId: "",
      editProgramId: "",
      success: true,
      saveModalOpen: false,
      editCoachFirstName: "",
      editCoachLastName: "",
      editCoachEmail: "",
      editCoachSites: "",
      editCoachProgramName: "",
      editCoachProgramId: ""
    }

  }

  componentDidMount = async () => {
    let archived = await this.context.getArchives();

    if (this.props.userRole === "programLeader") {
      archived = archived.filter((item) => {return this.props.filter.includes(item.programId)})
    }

    if (this.props.userRole === "siteLeader") {
      archived = archived.filter((item) => {return this.props.filter.includes(item.siteId)})
    }

    this.setState({archivedData: archived})
    console.log(this.props.userRole)
  }

  /**
   * 
   *  @brief This function takes an instance of firebase as an input. It retrieves the archiveTeacherId from the component's state, and finds the coachId associated with the archived teacher.
   *  The function then calls the unarchiveTeacher method from the firebase instance, passing in the archiveTeacherId and coachId as arguments.
   *  If the call is successful, the function updates the teacherData in the component's props and the archivedData in the component's state, and sets the state of several other properties.
   *  If the call is not successful, it will throw an error and display an alert message.
   * 
   *  @param {Object} firebase - instance of firebase
   */
  async unarchiveTeacher(firebase:Firebase) {
    firebase
    const {
      archiveTeacherId,
    } = this.state

    const coachId = this.state.archivedData.filter((item) => {return item.id === archiveTeacherId})[0].coach
    await firebase.unarchiveTeacher(archiveTeacherId, coachId)
    .catch(e => {
      console.log(e)
      alert('Unable to unarchive teacher. Please try again')})
    .finally(() => {

      let update = this.props.teacherData;
      let teacherData = update.find(o => o.teacherId === archiveTeacherId);
      let current = this.state.archivedData;
      let isChange = current.find(o => o.id === archiveTeacherId);
      let teacherIndex = update.indexOf(teacherData);
      if (update[teacherIndex].teacherFirstName !== isChange.firstName || update[teacherIndex].teacherLastName !== isChange.lastName) {
        update[teacherIndex].teacherFirstName = isChange.firstName;
        update[teacherIndex].teacherLastName = isChange.lastName;
      }
      update[teacherIndex].archived = false;
      update = update.filter((item) => {return item.archived === false})
      this.props.updateTeacherData(update);

      update =  this.state.archivedData;
      teacherData = update.find(o => o.id === archiveTeacherId);
      teacherIndex = update.indexOf(teacherData);
      update.splice(teacherIndex, 1);


      this.setState({ // Hold off setting new state until success has been determined
        archivedData: update,
        archiveTeacherId: "",
        archiveTeacherCoach: "",
        archiveModalOpen: false,
        successModalOpen: true,
        archiveType: "",
        editTeacherId: "",
        editEmail: "",
        editTeacherFirstName: "",
        editTeacherLastName: "",
        editCoach: "",
        editCoachId: "",
        editSite: "",
        editProgram: "",
        editSiteId: "",
        editProgramId: "",

      });
      // window.location.reload()
      
    });
  }

 /**
  * @brief this function retrieves the coachId from state and calls the unarchiveCoach method from the firebase instance with the id. 
  * If the call is successful it will update the other pages
  * If the call is not successful it will throw an error and display an alert message
  * 
  *  @param {Object} firebase - instance of firebase
  */
  async unarchiveCoach(firebase:Firebase) {
    firebase
    const {
      editCoachId,
    } = this.state

    await firebase.unarchiveCoach(editCoachId)
    .catch(e => {
      console.log(e)
      alert('Unable to unarchive teacher. Please try again')})
    .finally(() => {

      let update = this.props.coachData;
      let coachData = update.find(o => o.id === editCoachId);
      let current = this.state.archivedData;
      let isChange = current.find(o => o.id === editCoachId);
      let coachIndex = update.indexOf(coachData);
      if (update[coachIndex].firstName !== isChange.firstName || update[coachIndex].lastName !== isChange.lastName) {
        update[coachIndex].firstName = isChange.firstName;
        update[coachIndex].lastName = isChange.lastName;
      }
      update[coachIndex].archived = false;
      update = update.filter((item) => {return item.archived === false})
      this.props.updateCoachData(update);


      let sendToSites = this.props.sitesList;
      let coaches = this.props.coachData;
      let coach = coaches.find(o => o.id === editCoachId)
      console.log(sendToSites)

      coach.siteList.map(value => {
        sendToSites.push({
          siteName: value.siteName,
          siteId: value.siteId,
          programName: value.programName,
          programId: value.programId,
          firstName: coach.firstName,
          lastName: coach.lastName,
          id: coach.id,
          archived: coach.archived,
          email: coach.email
        })
      })

      console.log(sendToSites)
      this.props.updateSendToSitesData(sendToSites)

      update =  this.state.archivedData;
      coachData = update.find(o => o.id === editCoachId);
      coachIndex = update.indexOf(coachData);
      update.splice(coachIndex, 1);

      this.setState({ // Hold off setting new state until success has been determined
        archivedData: update,
        archiveTeacherId: "",
        archiveTeacherCoach: "",
        archiveModalOpen: false,
        successModalOpen: true,
        archiveType: "",
        editCoachId: "",
        editCoachFirstName: "",
        editCoachLastName: "",
        editCoachEmail: "",
        editCoachSites: "",
        editCoachProgramName: "",
        editCoachProgramId: "",
      });
      // window.location.reload()
      
    });
  }

  archiveModalOpen =  (): Promise<boolean> => {
    this.setState({archiveModalOpen: true})
    return new Promise<boolean>((resolve: (discard: boolean) => void, reject): void => {
      this.setState({awaitingConfirmationRef: {resolve}})
    })
  }

  archiveModalDiscard = (): void => {
    if(this.state.awaitingConfirmationRef) {
      this.state.awaitingConfirmationRef.resolve(true)
    }
      this.setState({
        archiveModalOpen: false,
        awaitingConfirmationRef: null,
      })
  }

  successModalClose = (): void => {
    if(this.state.awaitingConfirmationRef) {
      this.state.awaitingConfirmationRef.resolve(false)
    }
      this.setState({
          awaitingConfirmationRef: null,
          editTeacherId: "",
          editEmail: "",
          editTeacherFirstName: "",
          editTeacherLastName: "",
          editCoach: "",
          editCoachId: "",
          editSite: "",
          editProgram: "",
          editSiteId: "",
          editProgramId: "",
          archiveTeacherId: "",
          archiveTeacherCoach: "",
          archiveCoachId: "",
          successModalOpen: false,
          archiveType: "",
          view: 1
      })
    // window.location.reload()
  }

  handleCoachArchiveClick = (item) => {
    this.archiveModalOpen();
    this.setState({
      archiveCoachId: item.coachId,
      archiveType: "coach"
    })
  }

  sortTeachers = (sortType) => {
    this.setState({sortType: sortType});
    var archivesList = this.state.archivedData;

    // Sort the teachers list
    switch (sortType) {
      case "lastName":
        archivesList.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0));
        console.log("last name");
        break;
      case "lastNameReverse":
        archivesList.sort((a,b) => (b.lastName > a.lastName) ? 1 : ((a.lastName > b.lastName) ? -1 : 0));
        console.log("reverse last name");
        break;
      case "firstName":
        archivesList.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0));
        console.log("last name");
        break;
      case "firstNameReverse":
        archivesList.sort((a,b) => (b.firstName > a.firstName) ? 1 : ((a.firstName > b.firstName) ? -1 : 0));
        console.log("reverse last name");
        break;
      case "siteName":
        archivesList.map(item => {
          if(item.role === "coach") {
            item.sites.sort((a,b) => (a.site > b.site) ? 1 : ((b.site > a.site) ? -1 : 0))
          }
        })
        archivesList.sort((a,b) => ((a.role === "coach" ? a.sites[0].siteName : a.site) > (b.role === "coach" ? b.sites[0].siteName : b.site)) ? 1 : (((b.role === "coach" ? b.sites[0].siteName : b.site) > (a.role === "coach" ? a.sites[0].siteName : a.site)) ? -1 : 0));
        console.log("site name");
        break;
      case "siteNameReverse":
        archivesList.map(item => {
          if(item.role === "coach") {
            item.sites.sort((a,b) => (b.site > a.site) ? 1 : ((a.site > b.site) ? -1 : 0))
          }
        })
        archivesList.sort((a,b) => ((b.role === "coach" ? b.sites[0].siteName : b.site) > (a.role === "coach" ? a.sites[0].siteName : a.site)) ? 1 : (((a.role === "coach" ? a.sites[0].siteName : a.site) > (b.role === "coach" ? b.sites[0].siteName : b.site)) ? -1 : 0));
        console.log("reverse site name");
        break;
      case "program":
        archivesList.sort((a,b) => ((a.role === "coach" ? a.programName : a.program) > (b.role === "coach" ? b.programName : b.program)) ? 1 : (((b.role === "coach" ? b.programName : b.program) > (a.role === "coach" ? a.programName : a.program)) ? -1 : 0));
        console.log("program name");
        break;
      case "programReverse":
        archivesList.sort((a,b) => ((b.role === "coach" ? b.programName : b.program) > (a.role === "coach" ? a.programName : a.program)) ? 1 : (((a.role === "coach" ? a.programName : a.program) > (b.role === "coach" ? b.programName : b.program)) ? -1 : 0));
        console.log("reverse program name");
        break;
      case "role":
        archivesList.sort((a,b) => (a.role > b.role) ? 1 : ((b.role > a.role) ? -1 : 0));
        console.log("role");
        break;
      case "roleReverse":
        archivesList.sort((a,b) => (b.role > a.role) ? 1 : ((a.role > b.role) ? -1 : 0));
        console.log("reverse role");
        break;

      default:
        break;
    }

    this.setState({archivedData: archivesList});

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
    }
  }

  handleEditInputChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (this.state.archiveType === "teacher") {
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
      if (name === 'email') {
        this.setState({
          editEmail: event.target.value,
          saved: false,
        })
      }
    }
    if (this.state.archiveType === "coach") {
      if (name === 'firstName') {
        this.setState({
          editCoachFirstName: event.target.value,
          saved: false,
        })
      }
      if (name === 'lastName') {
        this.setState({
          editCoachLastName: event.target.value,
          saved: false,
        })
      }
      if (name === 'email') {
        this.setState({
          editCoachEmail: event.target.value,
          saved: false,
        })
      }
    }
  }

  validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  /**
   * @brief function for editing the teacher's details and updating the teacherData and archivedData in the component's state
   * This function takes an instance of firebase as an input. It retrieves the editTeacherId, editTeacherFirstName, editTeacherLastName and editEmail from the component's state.
   * The function checks that the first name and last name are not empty, and that the email (if provided) is valid.
   * If the email provided already exists in the database, the function will alert the user.
   * The function then calls the editUserName method from the firebase instance, passing in the editTeacherId, editTeacherFirstName, editTeacherLastName, editEmail and "teacher" as arguments.
   * If the call is successful, the function updates the teacherData in the component's props and the archivedData in the component's state, and sets the state of several other properties.
   * If the call is not successful, it will throw an error and display an alert message, and set the state of success to false.
   * 
   * @param {Object} firebase - instance of firebase
   */
  async editTeacher(firebase:Firebase) {
    firebase
    const {
      editTeacherId,
      editTeacherFirstName,
      editTeacherLastName,
      editEmail
    } = this.state

    this.setState({success: true})

    if (!editTeacherFirstName || editTeacherFirstName === ""){
      alert("First Name is required");
      return
    }

    if (!editTeacherLastName || editTeacherLastName === ""){
      alert("Last name is required");
      return;
    }

    if (editEmail !== "" && !this.validateEmail(editEmail)) {
      alert("No email or valid email is required");
      return;
    }

    if (await firebase.emailExists(editEmail, editTeacherId)) {
      alert("This email already exists for another user")
      return;
    }

    await firebase.editUserName(editTeacherId, editTeacherFirstName, editTeacherLastName, editEmail, "teacher", true).
      catch(e => {
        console.log(e)
        alert('Unable to edit teacher. Please try again')
        this.setState({success: false})
      }).finally(() => {
          let update = this.state.archivedData;
          let teacherData = update.find(o => o.id === editTeacherId);
          let teacherDataIndex = update.indexOf(teacherData);
          update[teacherDataIndex].firstName = editTeacherFirstName;
          update[teacherDataIndex].lastName = editTeacherLastName;

          let sendBack = this.props.teacherData;
          teacherData = sendBack.find(o => o.teacherId === editTeacherId);
          teacherDataIndex = sendBack.indexOf(teacherData);
          sendBack[teacherDataIndex].firstName = editTeacherFirstName;
          sendBack[teacherDataIndex].lastName = editTeacherLastName;
          sendBack[teacherDataIndex].email = editEmail;
          sendBack = sendBack.filter((item) => {return item.archived === false})
          this.props.updateTeacherData(sendBack);

          this.setState({ // Hold off setting new state until success has been determined
            archivedData: update,
            editTeacherId: "",
            editEmail: "",
            editTeacherFirstName: "",
            editTeacherLastName: "",
            editCoach: "",
            editCoachId: "",
            editSite: "",
            editProgram: "",
            editSiteId: "",
            editProgramId: "",
            archiveTeacherId: "",
            archiveTeacherCoach: "",
            archiveType: "",
            successModalOpen: this.state.success ? true : false,
            saved: true
          });
      });
  }

  handleTeacherEditClick = (value) => {
    let get, coachData, coachIndex, coachName = ""
    if (value.coach) {
      get = this.props.coachData
      coachData = get.find(o => o.id === value.coach)
      coachIndex = get.indexOf(coachData)
      coachName = get[coachIndex].firstName + ' ' + get[coachIndex].lastName
    }

    get = this.props.teacherData
    let teacherData = get.find(o => o.teacherId === value.id)
    let teacherIndex = get.indexOf(teacherData)
    let teacherEmail = get[teacherIndex].email

    
    this.setState({
      editTeacherId: value.id,
      editEmail: teacherEmail,
      editTeacherFirstName: value.firstName,
      editTeacherLastName: value.lastName,
      editCoach: coachName,
      editCoachId: value.coach,
      editSite: value.site,
      editSiteId: value.siteId,
      editProgram: value.program,
      editProgramId: value.programId,
      archiveTeacherId: value.id,
      archiveTeacherCoach: value.coach,
      archiveType: "teacher"
    })
    this.handlePageChange(2)
  }

  handleCoachEditClick = (value) => {
    let sites = ""
    for (let i = 0; i < value.sites.length; i++) {
      sites = sites + value.sites[i].siteName + ","
    }

    sites = sites.slice(0, sites.length-1)

    this.setState({
      editCoachId: value.id,
      editCoachFirstName: value.firstName,
      editCoachLastName: value.lastName,
      editCoachEmail: value.email,
      editCoachSites: sites,
      editCoachProgramName: value.programName,
      editCoachProgramId: value.programId,
      archiveType: "coach"
    })
    this.handlePageChange(2)
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
        editTeacherId: "",
        editEmail: "",
        editTeacherFirstName: "",
        editTeacherLastName: "",
        editCoach: "",
        editCoachId: "",
        editSite: "",
        editProgram: "",
        editSiteId: "",
        editProgramId: "",
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

  /**
   * @brief function for updating a coaches data in state and firebase. Checks if all fields are input correctly and uses them to call the firebase instance method editUserName.
   * On success the function will update firestore and the state
   * On failure the function will throw an error and display an alert
   * 
   * @param {Object} firebase - instance of firebase
   * @returns void
   */
  editCoach = async (firebase:Firebase) => {
    firebase
    const {
      editCoachId,
      editCoachFirstName,
      editCoachLastName,
      editCoachEmail
    } = this.state

    this.setState({success: true})

    if (!editCoachFirstName || editCoachFirstName === ""){
      alert("First Name is required");
      return
    }

    if (!editCoachLastName || editCoachLastName === ""){
      alert("Last name is required");
      return;
    }

    if (editCoachEmail !== "" && !this.validateEmail(editCoachEmail)) {
      alert("No email or valid email is required");
      return;
    }

    if (await firebase.emailExists(editCoachEmail, editCoachId, true)) {
      alert("This email already exists for another user")
      return;
    }

    await firebase.editUserName(editCoachId, editCoachFirstName, editCoachLastName, editCoachEmail, "coach", true).
      catch(e => {
        console.log(e)
        alert('Unable to edit Coach. Please try again')
        this.setState({success: false})
      }).finally(() => {
          let update = this.props.coachData;
          console.log(update)
          let coachData = update.find(o => o.id === editCoachId);
          let coachDataIndex = update.indexOf(coachData);
          update[coachDataIndex].firstName = editCoachFirstName;
          update[coachDataIndex].lastName = editCoachLastName;
          update[coachDataIndex].email = editCoachEmail;

          this.props.updateCoachData(update)

          update = this.props.teacherData;
          console.log(update)
          coachData = update.filter(o => {return o.coachId === editCoachId});
          coachData.map(value => {
            coachDataIndex = update.indexOf(value);
            update[coachDataIndex].coachFirstName = editCoachFirstName;
            update[coachDataIndex].coachLastName = editCoachLastName;
          })
          this.props.updateTeacherData(update)

          update = this.state.archivedData;
          coachData = update.find(o => o.id === editCoachId);
          coachDataIndex = update.indexOf(coachData);
          update[coachDataIndex].firstName = editCoachFirstName;
          update[coachDataIndex].lastName = editCoachLastName;
          update[coachDataIndex].email = editCoachEmail;

          

          this.setState({ // Hold off setting new state until success has been determined
            archivedData: update,
            editCoachId: "",
            editCoachFirstName: "",
            editCoachLastName: "",
            editCoachEmail: "",
            editCoachSites: "",
            editCoachProgramName: "",
            successModalOpen: this.state.success ? true : false,
            saved: true
          });
      });
}
  
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
    <Dialog open={this.state.successModalOpen}>
          <DialogTitle style={{ fontFamily: 'Arimo' }}>
              The action was completed successfully.
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.successModalClose}>
                Ok
            </Button>
          </DialogActions>
      </Dialog>
      <Dialog open={this.state.archiveModalOpen}>
          <DialogTitle style={{ fontFamily: 'Arimo' }}>
              Are you sure you would like to remove this user from archives?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.archiveModalDiscard}>
                No, go back
            </Button>
            <FirebaseContext.Consumer>
              {(firebase: Firebase) => (
                <Button onClick={(_) => {this.state.archiveType === "teacher" ? this.unarchiveTeacher(firebase) : this.unarchiveCoach(firebase)}}>
                    Yes, I am sure
                </Button>
              )}
            </FirebaseContext.Consumer>
          </DialogActions>
      </Dialog>
      {this.state.archivedData ? (<>
      {this.state.view === 2 ? (<>
        <Grid container direction='row' style={{paddingBottom: '30px'}}>
          <Grid item xs={3}>
            <Grid container direction='column' style={{ marginLeft:'30px'}}>           
                <Grid item xs={6}>
                    <Grid container direction='row' style={{cursor: 'default'}} onClick={() => this.handlePageChange(1)}>
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
                <Grid item xs={6}>
                    <Grid container direction='row' style={{cursor: 'default'}} onClick={(_) => {this.setState({archiveModalOpen: true})}}>
                        <Grid item>
                            <FolderIcon style={{fill: 'Khaki', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{marginTop:'20px' }}
                              >
                                Unarchive
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
                </Grid>         
              {this.state.archiveType === "teacher" ? (<>
              <Grid item xs={1} style={{marginTop: '45px'}}>
              <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
                  <Grid item>
                    <Typography variant="h6" style={{marginTop:'15px'}}>
                      Teacher
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{marginTop:'20px'}}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{marginTop:'25px'}}>
                      Coach
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{marginTop:'25px'}}>
                      Site
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{marginTop:'25px'}}>
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
                  id="teacher-email"
                  label="Email"
                  type="text"
                  value={this.state.editEmail}
                  InputProps={{
                    readOnly: false
                  }}
                  variant="outlined"
                  onChange={this.handleEditInputChange('email')}
                  />
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
            </>) : (<>
              <Grid item xs={1} style={{marginTop: '45px'}}>
              <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
                  <Grid item>
                    <Typography variant="h6" style={{marginTop:'15px'}}>
                      Coach
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{marginTop:'20px'}}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{marginTop:'25px'}}>
                      Sites
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{marginTop:'25px'}}>
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
                      id="coach-firstName"
                      label="First Name"
                      type="text"
                      value={this.state.editCoachFirstName}
                      InputProps={{
                        readOnly: false
                      }}
                      variant="outlined"
                      onChange={this.handleEditInputChange('firstName')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                      id="coach-lastName"
                      label="Last Name"
                      type="text"
                      value={this.state.editCoachLastName}
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
                  id="coach-email"
                  label="Email"
                  type="text"
                  value={this.state.editCoachEmail}
                  InputProps={{
                    readOnly: false
                  }}
                  variant="outlined"
                  onChange={this.handleEditInputChange('email')}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    style={{width:'42vw', maxWidth: '470px'}}
                    id="teacher-Coach"
                    type="text"
                    value={this.state.editCoachSites}
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                    />
                </Grid>
                <Grid item>
                  <TextField
                    style={{width:'42vw', maxWidth: '470px'}}
                    id="coach-program"
                    type="text"
                    value={this.state.editCoachProgramName}
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            </>)}
              <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginTop:'45px'}}>
              <Grid item xs={1}/>
                <Grid item xs={1}>
                  <FirebaseContext.Consumer>
                    {(firebase: Firebase) => (
                      <Button
                      onClick={(_)=>{this.state.archiveType === "teacher" ? this.editTeacher(firebase) : this.editCoach(firebase)}}
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
        </Grid>
      </>) : (<>

      <Grid container direction='row'>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid
          item
          xs={11}
          style={{ 
            width: '100%', 
            // height: '38vh', 
            // border: '2px solid #0988ec', 
            // borderRadius: '0.5em', 
            marginTop: '93px' 
          }}
        >
          <table style={{borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{borderBottom:'2px solid #0988ec'}}>
              <tr>
                <th
                  onClick={
                    () =>{
                      if(this.state.sortType == "lastName")
                      {
                        this.sortTeachers("lastNameReverse")
                      }
                      else
                      {
                        this.sortTeachers("lastName")
                      }
                    }
                  }
                >
                  <TableSortLabel
                  direction = {this.state.sortType === "lastName" ? 'desc' : 'asc'}
                  active = {['lastName', 'lastNameReverse'].includes(this.state.sortType) ? true : false}
                  >
                  <Typography variant="h6">
                    Last Name
                  </Typography>
                  </TableSortLabel>
                </th>
                <th
                  onClick={
                    () =>{
                      if(this.state.sortType == "firstName")
                      {
                        this.sortTeachers("firstNameReverse")
                      }
                      else
                      {
                        this.sortTeachers("firstName")
                      }
                    }
                  }
                >
                  <TableSortLabel
                  direction = {this.state.sortType === "firstName" ? 'desc' : 'asc'}
                  active = {['firstName', 'firstNameReverse'].includes(this.state.sortType) ? true : false}
                  >
                  <Typography variant="h6">
                    First Name
                  </Typography>
                  </TableSortLabel>
                </th>
                <th
                  onClick={
                    () =>{
                      if(this.state.sortType == "role")
                      {
                        this.sortTeachers("roleReverse")
                      }
                      else
                      {
                        this.sortTeachers("role")
                      }
                    }
                  }
                >
                  <TableSortLabel
                  direction = {this.state.sortType === "role" ? 'desc' : 'asc'}
                  active = {['role', 'roleReverse'].includes(this.state.sortType) ? true : false}
                  >
                  <Typography variant="h6">
                    Role
                  </Typography>
                  </TableSortLabel>
                </th>
                <th
                  onClick={
                    () =>{
                      if(this.state.sortType == "siteName")
                      {
                        this.sortTeachers("siteNameReverse")
                      }
                      else
                      {
                        this.sortTeachers("siteName")
                      }
                    }
                  }
                >
                  <TableSortLabel
                  direction = {this.state.sortType === "siteName" ? 'desc' : 'asc'}
                  active = {['siteName', 'siteNameReverse'].includes(this.state.sortType) ? true : false}
                  >
                  <Typography variant="h6">
                    Site
                  </Typography>
                  </TableSortLabel>
                </th>
                <th
                  onClick={
                    () =>{
                      if(this.state.sortType == "program")
                      {
                        this.sortTeachers("programReverse")
                      }
                      else
                      {
                        this.sortTeachers("program")
                      }
                    }
                  }
                >
                  <TableSortLabel
                  direction = {this.state.sortType === "program" ? 'desc' : 'asc'}
                  active = {['program', 'programReverse'].includes(this.state.sortType) ? true : false}
                  >
                  <Typography variant="h6">
                    Program
                  </Typography>
                  </TableSortLabel>
                </th>
              </tr>
            </thead>
            <tbody>

              {this.state.archivedData.map((value, index) => {
                if (value.role === "teacher") {
                return (
                  <TableRow 
                key={index} 
                onClick={() => { this.handleTeacherEditClick(value)}}
                >
                  <td style={{textAlign:'left'}}>
                    <Typography variant="h6">
                      {value.lastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'left'}}>
                    <Typography variant="h6">
                      {value.firstName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'left'}}>
                    <Typography variant="h6">
                      {value.role !== "" ? value.role[0].toUpperCase() + value.role.substring(1) : value.role}
                    </Typography>
                  </td>
                  <td style={{textAlign:'left'}}>
                    <Typography variant="h6">
                      {value.site}
                    </Typography>
                  </td>
                  <td style={{textAlign:'left'}}>
                    <Typography variant="h6">
                      {value.program}
                    </Typography>
                  </td>
                </TableRow>
                )}
                if (value.role === "coach") {
                  return (
                  <TableRow 
                key={index} 
                onClick={() => {this.handleCoachEditClick(value)}}
                >
                  <td style={{textAlign:'left'}}>
                    <Typography variant="h6">
                      {value.lastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'left'}}>
                    <Typography variant="h6">
                      {value.firstName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'left'}}>
                    <Typography variant="h6">
                      {value.role !== "" ? value.role[0].toUpperCase() + value.role.substring(1) : value.role}
                    </Typography>
                  </td>
                  <td style={{textAlign:'left'}}>
                    <Typography variant="h6">
                      {value.sites.map(item => {
                        return (
                          <li style={{ listStyleType: 'none', padding: '0', margin: '0'}}>
                            <Typography variant="h6">
                              {item.siteName}
                            </Typography>
                          </li>
                        )
                      })}
                    </Typography>
                  </td>
                  <td style={{textAlign:'left'}}>
                    <Typography variant="h6">
                      {value.programName}
                    </Typography>
                  </td>
                </TableRow>
              )}
              })}
            </tbody>

          </table>
        </Grid>
      </Grid>
    </Grid>
    </>)}
    </>) : (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{height: "100%", marginTop: '8vh'}}
      >
        <img src={CHALKLogoGIF} alt="Loading" width="40%" />
      </Grid>
    )}
    </>)
  }
}

Archives.contextType = FirebaseContext
export default Archives