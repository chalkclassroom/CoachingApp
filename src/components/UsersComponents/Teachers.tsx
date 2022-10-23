import {
  FormControl,
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
  TableSortLabel,
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
import styled from 'styled-components'
import { isThisISOWeek } from 'date-fns';

const StyledSelect = withStyles({
  root: {
    padding: '11px 14px',
    width: '25.5vw',
    maxWidth: '425px'
  },
  disabled: {
    opacity: 0.3
  }
})(Select);

const TableRow = styled.tr`
background-color: white;
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
  siteData: Array<Object>
  programData: Array<Object>
}

interface State {
  teachersList: Array<Object>
  sortType: string
  view: number
  pendingView: number
  saved: boolean
  addTeacherFirstName: string
  addTeacherLastName: string
  addTeacherEmail: string
  addCoach: string
  addCoachSites: Array<Object>
  addSiteName: string
  addSite: string
  addCoachPrograms: Array<Object>
  addProgram: string
  editTeacherId: string
  editTeacherFirstName: string
  editTeacherLastName: string
  editEmail: string
  editCoach: string
  editCoachId: string
  editSite: string
  editProgram: string
  editSiteId: string
  editProgramId: string
  transferTeacherId: string
  transferCoachSites: Array<Object>
  transferCoachPrograms: Array<Object>
  transferCoachName: string
  transferSiteName: string
  transferProgramName: string
  originalCoachId: string
  originalProgramId: string
  changeCoachId: string
  changeSiteName: string
  changeSiteId: string
  changeProgramId: string
  saveModalOpen: boolean
  awaitingConfirmationRef: { resolve: (discard: boolean) => void  } | null
  searchInput: string
  successModalOpen: boolean
  archiveModalOpen: boolean
  success: boolean
  archiveList: Array<Object>
}

class Teachers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      teachersList: [],
      sortType: "",
      view: 1,
      pendingView: 1,
      saved: true,
      addTeacherFirstName: "",
      addTeacherLastName: "",
      addTeacherEmail: "",
      addCoach: "",
      addCoachSites: [],
      addSiteName: "",
      addSite: "",
      addCoachPrograms: [],
      addProgram: "",
      editTeacherId: "",
      editTeacherFirstName: "",
      editTeacherLastName: "",
      editEmail: "",
      editCoach: "",
      editCoachId: "",
      editSite: "",
      editProgram: "",
      editSiteId: "",
      editProgramId: "",
      transferTeacherId: "",
      transferCoachSites: [],
      transferCoachPrograms: [],
      transferCoachName: "",
      transferSiteName: "",
      transferProgramName: "",
      originalCoachId: "",
      originalProgramId: "",
      changeCoachId: "",
      changeSiteName: "",
      changeSiteId: "",
      changeProgramId: "",
      saveModalOpen: false,
      awaitingConfirmationRef: null,
      searchInput: "",
      successModalOpen: false,
      archiveModalOpen: false,
      success: true,
      archiveList: []
    }

  }

  handleSearch = (event) => {
    this.setState({searchInput: event.target.value})
    let searched = this.props.teacherData.filter((item) => {
      return (item.teacherFirstName.toLowerCase().includes(event.target.value.toLowerCase())
      || item.teacherLastName.toLowerCase().includes(event.target.value.toLowerCase())
      || (item.teacherFirstName.toLowerCase() + ' ' + item.teacherLastName.toLowerCase()).includes(event.target.value.toLowerCase())
      || item.coachFirstName.toLowerCase().includes(event.target.value.toLowerCase())
      || item.coachLastName.toLowerCase().includes(event.target.value.toLowerCase())
      || (item.coachFirstName.toLowerCase() + ' ' + item.coachLastName.toLowerCase()).includes(event.target.value.toLowerCase())
      || item.siteName.toLowerCase().includes(event.target.value.toLowerCase())
      || item.selectedProgramName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    })
    console.log(searched)
    this.setState({teachersList: searched})

  }

  sortTeachers = (sortType) => {
    if(!this.state.searchInput) {
      var teachersList = this.props.teacherData;
    } else {
      var teachersList = this.state.teachersList;
    }

    this.setState({sortType: sortType});

    // Sort the teachers list
    switch (sortType) {
      case "lastName":
        teachersList.sort((a,b) => (a.teacherLastName > b.teacherLastName) ? 1 : ((b.teacherLastName > a.teacherLastName) ? -1 : 0));
        console.log("last name");
        break;
      case "lastNameReverse":
        teachersList.sort((a,b) => (b.teacherLastName > a.teacherLastName) ? 1 : ((a.teacherLastName > b.teacherLastName) ? -1 : 0));
        console.log("reverse last name");
        break;
      case "firstName":
        teachersList.sort((a,b) => (a.teacherFirstName > b.teacherFirstName) ? 1 : ((b.teacherFirstName > a.teacherFirstName) ? -1 : 0));
        console.log("last name");
        break;
      case "firstNameReverse":
        teachersList.sort((a,b) => (b.teacherFirstName > a.teacherFirstName) ? 1 : ((a.teacherFirstName > b.teacherFirstName) ? -1 : 0));
        console.log("reverse last name");
        break;
      case "siteName":
        teachersList.sort((a,b) => (a.siteName > b.siteName) ? 1 : ((b.siteName > a.siteName) ? -1 : 0));
        console.log("site name");
        break;
      case "siteNameReverse":
        teachersList.sort((a,b) => (b.siteName > a.siteName) ? 1 : ((a.siteName > b.siteName) ? -1 : 0));
        console.log("reverse site name");
        break;
      case "program":
        teachersList.sort((a,b) => (a.selectedProgramName > b.selectedProgramName) ? 1 : ((b.selectedProgramName > a.selectedProgramName) ? -1 : 0));
        console.log("program name");
        break;
      case "programReverse":
        teachersList.sort((a,b) => (b.selectedProgramName > a.selectedProgramName) ? 1 : ((a.selectedProgramName > b.selectedProgramName) ? -1 : 0));
        console.log("reverse program name");
        break;

      default:
        break;
    }

    this.setState({teachersList: teachersList});

  }

  handlePageChange = (pageNumber: number) => {
    this.setState({pendingView: pageNumber})
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
      if (event.target.value === "" && this.state.addTeacherLastName === "" 
      && this.state.addTeacherEmail === "" && this.state.addCoach === "" 
      && this.state.addSite === "" && this.state.addProgram === "") {
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
      if (event.target.value === "" && this.state.addTeacherFirstName === "" 
      && this.state.addTeacherEmail === "" && this.state.addCoach === "" 
      && this.state.addSite === "" && this.state.addProgram === "") {
        this.setState({
          addTeacherLastName: event.target.value,
          saved: true,
        })} else {
      this.setState({
        addTeacherLastName: event.target.value,
        saved: false,
      })}
    }
    if (name === 'email') {
      if (event.target.value === "" && this.state.addTeacherLastName === "" 
      && this.state.addTeacherFirstName === "" && this.state.addCoach === "" 
      && this.state.addSite === "" && this.state.addProgram === "") {
        this.setState({
          addTeacherEmail: event.target.value,
          saved: true,
        })} else {
      this.setState({
        addTeacherEmail: event.target.value,
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
    if (name === 'email') {
      this.setState({
        editEmail: event.target.value,
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
      let view = this.state.pendingView;
      this.setState({
        saveModalOpen: false,
        view: view,
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
        editTeacherId: "",
        editTeacherFirstName: "",
        editTeacherLastName: "",
        editEmail: "",
        editCoach: "",
        editCoachId: "",
        editSite: "",
        editProgram: "",
        editSiteId: "",
        editProgramId: "",
        transferTeacherId: "",
        transferCoachSites: [],
        transferCoachPrograms: [],
        transferCoachName: "",
        transferSiteName: "",
        transferProgramName: "",
        originalCoachId: "",
        originalProgramId: "",
        changeCoachId: "",
        changeSiteName: "",
        changeSiteId: "",
        changeProgramId: "",
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

  async archiveTeacher(firebase:Firebase) {
    firebase
    const {
      editTeacherId,
      editCoachId,
      editTeacherFirstName,
      editTeacherLastName,
      editSite,
      editProgram,
      editSiteId,
      editProgramId
    } = this.state
    this.setState({success: true})

    await firebase.archiveTeacher(editTeacherId, editCoachId, editTeacherFirstName, editTeacherLastName, editSite, editProgram, editSiteId, editProgramId)
    .catch(e => {
      console.log(e)
      alert('Unable to archive teacher. Please try again')
      this.setState({success: false})
    })
    .finally(() => {

      // let update = this.state.teachersList;
      let update = this.props.teacherData;
      let teacherData = update.find(o => o.teacherId === editTeacherId);
      let teacherIndex = update.indexOf(teacherData);
      update[teacherIndex].archived = true;
      update.splice(teacherIndex, 1);

      this.setState({ // Hold off setting new state until success has been determined
        teacherList: update,
        archiveList: [...this.state.archiveList, teacherData],
        editTeacherId: "",
        editCoachId: "",
        editTeacherFirstName: "",
        editTeacherLastName: "",
        editEmail: "",
        editSite: "",
        editProgram: "",
        editSiteId: "",
        editProgramId: "",
        archiveModalOpen: false,
        successModalOpen: this.state.success ? true : false
      });

      console.log(this.state.archiveList)
    });
  }

  async transferTeacher(firebase:Firebase) {
    firebase
    const {
      transferTeacherId,
      originalCoachId,
      changeCoachId,
      changeSiteName,
      changeProgramId
    } = this.state

    this.setState({success: true})

    if (!changeCoachId || changeCoachId === ""){
      alert("Coach is required");
      return
    }

    if (!changeSiteName || changeSiteName === ""){
      alert("Site is required");
      return;
    }

    if (!changeProgramId || changeProgramId === ""){
      alert("Program is required");
      return;
    }

    await firebase.transferTeacher(transferTeacherId, originalCoachId, changeCoachId, changeSiteName)
    .catch(e => {
      console.log(e)
      alert('Unable to transfer teacher. Please try again')
      this.setState({success: false})
    }).finally(() => {

        let update =  this.state.teachersList;
        let coachData = this.props.coachData.find(o => o.id === changeCoachId);
        let siteData = this.props.siteData.find(o => o.name === changeSiteName);
        let programData = this.props.programData.find(o => o.id === changeProgramId);
        let teacherData = this.props.teacherData.find(o => o.teacherId ===  transferTeacherId);
        let teacherIndex = update.indexOf(teacherData)

        update[teacherIndex].coachId = coachData.id;
        update[teacherIndex].coachFirstName = coachData.firstName;
        update[teacherIndex].coachLastName = coachData.lastName;
        update[teacherIndex].siteName = siteData.name;
        update[teacherIndex].selectedSiteId = siteData.id;
        update[teacherIndex].selectedProgramName = programData.name;
        update[teacherIndex].selectedProgramId = programData.id;

        this.setState({ // Hold off setting new state until success has been determined
          transferTeacherId: "",
          transferCoachSites: [],
          transferCoachPrograms: [],
          transferCoachName: "",
          transferSiteName: "",
          transferProgramName: "",
          originalCoachId: "",
          // originalSiteId: "",
          originalProgramId: "",
          changeCoachId: "",
          changeSiteName: "",
          changeSiteId: "",
          changeProgramId: "",
          successModalOpen: this.state.success ? true : false,
          saved: true
        });
    });
  }

  validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

editTeacher = async (firebase:Firebase) => {
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

    await firebase.editUserName(editTeacherId, editTeacherFirstName, editTeacherLastName, editEmail).
      catch(e => {
        console.log(e)
        alert('Unable to edit teacher. Please try again')
        this.setState({success: false})
      }).finally(() => {
          let update = this.props.teacherData;
          let teacherData = update.find(o => o.teacherId === editTeacherId);
          let teacherDataIndex = update.indexOf(teacherData);
          update[teacherDataIndex].teacherFirstName = editTeacherFirstName;
          update[teacherDataIndex].teacherLastName = editTeacherLastName;
          update[teacherDataIndex].email = editEmail;
          this.setState({ // Hold off setting new state until success has been determined
            teachersList: update,
            editTeacherId: "",
            editTeacherFirstName: "",
            editTeacherLastName: "",
            editEmail: "",
            editCoach: "",
            editCoachId: "",
            editSite: "",
            editProgram: "",
            editSiteId: "",
            editProgramId: "",
            successModalOpen: this.state.success ? true : false,
            saved: true
          });
      });
  }

  async addTeacher(firebase:Firebase){

    firebase
    const {
        addTeacherFirstName,
        addTeacherLastName,
        addCoach,
        addSiteName,
        addProgram,
        addTeacherEmail
    } = this.state;

    this.setState({success: true})

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

    if (addTeacherEmail !== "" && !this.validateEmail(addTeacherEmail)) {
      alert("No email or valid email is required");
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
        email: addTeacherEmail,
        notes: '',
        phone: ''
    }
    const newTeacherRef = await firebase.addTeacherToCoach(teacherInfo, addCoach).catch(e => {
        console.log(e)
        alert('Unable to create user. Please try again')
        this.setState({success: false})
      })

    let update = this.props.teacherData
    let coachData = this.props.coachData.find(o => o.id === addCoach)
    let siteData = this.props.siteData.find(o => o.name ===  addSiteName)
    let programData = this.props.programData.find(o => o.id  === addProgram)

    update.push({
      coachId: coachData.id,
      coachFirstName: coachData.firstName,
      coachLastName: coachData.lastName,
      siteName: siteData.name,
      // teacherId: await this.context.getTeacherId(addTeacherFirstName, addTeacherLastName, addTeacherEmail),
      teacherId: newTeacherRef,
      teacherFirstName: addTeacherFirstName,
      teacherLastName: addTeacherLastName,
      selectedSiteId: siteData.id,
      selectedProgramName: programData.name,
      selectedProgramId: programData.id,
      archived: false,
      email: addTeacherEmail
    })
    this.setState({ // Hold off setting new state until success has been determined
      teachersList: update,
      addTeacherFirstName: '',
      addTeacherLastName: '',
      addTeacherEmail: '',
      addCoachSites: [],
      addSiteName: '',
      addCoach: '',
      addCoachPrograms: [],
      addProgram: '',
      addSite: '',
      successModalOpen: this.state.success ? true : false,
      saved: true
    });
  }

  handleEditClick = (value) => {
    console.log(value)
    this.setState({
      editTeacherId: value.teacherId,
      editTeacherFirstName: value.teacherFirstName,
      editTeacherLastName: value.teacherLastName,
      editEmail: value.email,
      editCoach: value.coachFirstName + ' ' + value.coachLastName,
      editCoachId: value.coachId,
      editSite: value.siteName,
      editSiteId: value.selectedSiteId,
      editProgram: value.selectedProgramName,
      editProgramId: value.selectedProgramId
    })
    this.handlePageChange(4)
  }



  handlePopulateSite = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({addCoach: event.target.value, saved: false})
    const sites = this.props.siteData.map(item => {return item.id})
    let selectedSites = this.props.coachData.filter((doc) => {return doc.id === event.target.value})[0].siteList
    selectedSites = selectedSites.filter(item => {return sites.includes(item.siteId)})
    this.setState({
      addCoachSites: selectedSites,
      addSiteName: "",
      addSite: "",
      addCoachPrograms: [],
      addProgram: "",
    })
  }

  handlePopulateProgram = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({addSite: event.target.value, saved: false})
    let site = this.props.siteData.filter((doc) => {return doc.id === event.target.value})[0].name
    this.setState({addSiteName: site})
    const sites = this.props.coachData.filter((doc) => {return doc.id === this.state.addCoach})[0].siteList
    const filter = this.props.programData.map(item => {return item.id})
    let programs = []
    sites.map((doc) => {
      if (doc.siteId === event.target.value && filter.includes(doc.programId)) {
        programs.push({programId: doc.programId, programName: doc.programName})
      }
    })
    this.setState({addCoachPrograms: programs})
  }

  handlePopulateTeacherInfo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({transferTeacherId: event.target.value, saved: false})
    const selectedTeacher = this.props.teacherData.filter((doc) => {return doc.teacherId === event.target.value})[0]
    this.setState({
      transferCoachName: selectedTeacher.coachFirstName + ' ' + selectedTeacher.coachLastName,
      originalCoachId: selectedTeacher.coachId,
      transferProgramName: selectedTeacher.selectedProgramName,
      originalProgramId: selectedTeacher.selectedProgramId,
      transferSiteName: selectedTeacher.siteName
    })

  }

  handleTransferSite = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({changeCoachId: event.target.value, saved: false})
    const sites = this.props.siteData.map(item => {return item.id})
    let selectedSites = this.props.coachData.filter((doc) => {return doc.id === event.target.value})[0].siteList
    selectedSites = selectedSites.filter(item => {return sites.includes(item.siteId)})
    this.setState({
      transferCoachSites: selectedSites,
      transferCoachPrograms: [],
      changeSiteName: "",
      changeSiteId: "",
      changeProgramId: "",
    })
  }

  handleTransferProgram = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({changeSiteId: event.target.value, saved: false})
    let site = this.props.siteData.filter((doc) => {return doc.id === event.target.value})[0].name
    this.setState({changeSiteName: site})
    console.log(site)
    const sites = this.props.coachData.filter((doc) => {return doc.id === this.state.changeCoachId})[0].siteList
    const filter = this.props.programData.map(item => {return item.id})
    let programs = []
    sites.map((doc) => {
      if (doc.siteId === event.target.value && filter.includes(doc.programId)) {
        programs.push({programId: doc.programId, programName: doc.programName})
      }
    })
    this.setState({transferCoachPrograms: programs})
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
          editEmail: "",
          editCoach: "",
          editCoachId: "",
          editSite: "",
          editProgram: "",
          editSiteId: "",
          editProgramId: "",
          transferTeacherId: "",
          transferCoachSites: [],
          transferCoachPrograms: [],
          transferCoachName: "",
          transferSiteName: "",
          transferProgramName: "",
          originalCoachId: "",
          originalProgramId: "",
          changeCoachId: "",
          changeSiteName: "",
          changeSiteId: "",
          changeProgramId: "",
          successModalOpen: false,
          saved: true
      })
    // window.location.reload()
    this.handlePageChange(1)
  }

  render() {


    return (<>
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
          Are you sure you would like to move this user to archives?
      </DialogTitle>
      <DialogActions>
        <Button onClick={this.archiveModalDiscard}>
            No, go back
        </Button>
        <FirebaseContext.Consumer>
          {(firebase: Firebase) => (
            <Button onClick={(_) => {this.archiveTeacher(firebase)}}>
                Yes, I am sure
            </Button>
          )}
        </FirebaseContext.Consumer>
      </DialogActions>
    </Dialog>
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
    {this.props.teacherData.length > 0 ? (
      <Grid container direction='row' style={{paddingBottom: '30px'}}>
        <Grid item xs={3}>
            <Grid container direction='column' style={{ marginLeft:'30px'}}>
              {this.state.view !== 4 ? (<>
              {this.state.view === 2 ? (<>
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
              </>) : (<>
                <Grid item xs={6}>
                    <Grid container direction='row' style={{cursor: 'default'}} onClick={() => this.handlePageChange(2)}>
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
                  <Grid container direction='row' style={{cursor: 'default'}} onClick={() => this.handlePageChange(1)}>
                        <Grid item>
                            <ArrowBackIcon style={{fill: '#0988ec', fontSize:'40', marginTop:'15px',}}/>
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
                <Grid container direction='row' style={{cursor: 'default'}} onClick={() => this.handlePageChange(3)}>
                        <Grid item>
                            <ForwardIcon style={{fill: '#0988ec', fontSize:'40', marginTop:'15px',}}/>
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
                                Archive
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction='row' style={{cursor: 'default'}} onClick={() => this.handlePageChange(1)}>
                        <Grid item>
                            <ArrowBackIcon style={{fill: '#0988ec', fontSize:'40', marginTop:'15px'}}/>
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
                  value={this.state.searchInput}
                  // className={classes.search}
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.handleSearch(event)}
                />
              </Grid>
            </Grid>
          </Grid>
      </Grid>
      </Grid>
      <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginBottom: '40px'}}>
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
          <table style={{borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{borderBottom:'2px solid #0988ec'}}>
              <tr>
                <th colSpan={2}>
                  <Typography variant="h6">
                    <strong>Teacher</strong>
                  </Typography>
                </th>
                <th colSpan={2}>
                  <Typography variant="h6">
                    <strong>Instructional Coach</strong>
                  </Typography>
                </th>
                <th colSpan={1}
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
                      <strong>Site</strong>
                    </Typography>
                  </TableSortLabel>
                </th>
                <th colSpan={1}
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
                    <strong>Program</strong>
                  </Typography>
                  </TableSortLabel>
                </th>
              </tr>
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
                <th>
                  <Typography variant="h6">
                    Last Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6">
                    First Name
                  </Typography>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!this.state.searchInput && !this.state.sortType ? (<>
              {this.props.teacherData.map((value, index) => {
                return (
                <TableRow
                key={index}
                onClick={() => {this.handleEditClick(value)}}
                >
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.teacherLastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.teacherFirstName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.coachLastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.coachFirstName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.siteName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.selectedProgramName}
                    </Typography>
                  </td>
                </TableRow>
              )})}
              </>) : (<>
                {this.state.teachersList.map((value, index) => {
                return (
                <TableRow
                key={index}
                onClick={() => {this.handleEditClick(value)}}
                >
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.teacherLastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.teacherFirstName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.coachLastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.coachFirstName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.siteName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6">
                      {value.selectedProgramName}
                    </Typography>
                  </td>
                </TableRow>
              )})}
              </>)}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </>) : (this.state.view === 2 ? (<>
          <Grid item xs={1} style={{marginTop: '45px'}}>

            <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
              <Grid item>
                <Typography variant="h6" style={{marginTop:'5px'}}>
                  Teacher
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" style={{marginTop:'8px'}}>
                  Email
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" style={{marginTop:'7px'}}>
                  Coach
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" style={{marginTop:'8px'}}>
                  Site
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" style={{marginTop:'10px'}}>
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
                    style={{width:'13.5vw', maxWidth: '225px'}}
                    size="small"
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
                    style={{width:'13.5vw', maxWidth: '225px'}}
                    size="small"
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
                <TextField
                  size="small"
                  style={{width:'29.7vw', maxWidth: '470px'}}
                  id="teacher-email"
                  label="Email"
                  type="text"
                  value={this.state.addTeacherEmail}
                  variant="outlined"
                  onChange={this.handleAddInputChange('email')}
                />
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
                <Typography variant="h6" gutterBottom >
                  Teacher
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" >
                  Coach
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop: '5px'}}>
                  Site
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" >
                  Program
                </Typography>
              </Grid>
            </Grid>
            </Grid>

            <Grid item xs={4} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.transferTeacherId}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.handlePopulateTeacherInfo(event)}
                    name="selectedCoach"
                  >
                    {this.props.teacherData.map(
                      (teacher, index)=>{
                        return (
                            <MenuItem value={teacher.teacherId} key={index}>
                              {teacher.teacherFirstName + " " + teacher.teacherLastName}
                            </MenuItem>
                        )
                        })}
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                    size='small'
                    style={{width:'30vw', maxWidth: '470px'}}
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
                    size='small'
                    style={{width:'30vw', maxWidth: '470px'}}
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
                    size='small'
                    style={{width:'30vw', maxWidth: '470px'}}
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

            <Grid item xs={1} style={{marginTop: '70px'}}>

            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <ForwardIcon style={{fill: 'white', fontSize:'40', marginTop:'0px',}}/>
              </Grid>
              <Grid item>
                <ForwardIcon style={{fill: '#0988ec', fontSize:'40', marginTop:'0px',}}/>
              </Grid>
              <Grid item>
                <ForwardIcon style={{fill: '#0988ec', fontSize:'40', marginTop:'0px'}}/>
              </Grid>
              <Grid item>
                <ForwardIcon style={{fill: '#0988ec', fontSize:'40', marginBottom:'20px'}}/>
              </Grid>
            </Grid>
            </Grid>

            <Grid item xs={4} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <ForwardIcon style={{fill: 'white', fontSize:'40', marginTop:'0px',}}/>
              </Grid>
              <Grid item>
                <FormControl variant="outlined" >
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.changeCoachId}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.handleTransferSite(event)}
                    name="selectedCoach"
                  >
                    {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.firstName + " " + coach.lastName}
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
                    value={this.state.changeSiteId}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.handleTransferProgram(event)}
                    name="selectedSite"
                  >
                    {this.state.transferCoachSites.map((site, index) => {
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
                    value={this.state.changeProgramId}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      this.setState({changeProgramId: event.target.value})}
                    name="selectedProgram"
                  >
                    {this.state.transferCoachPrograms.map((program, index) => {
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
                    onClick={(_)=>{this.transferTeacher(firebase)}}
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
    </>) : (this.state.view === 4 ? (<>
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

            <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginTop:'45px'}}>
            <Grid item xs={1}/>
              <Grid item xs={1}>
                <FirebaseContext.Consumer>
                  {(firebase: Firebase) => (
                    <Button
                    onClick={(_)=>{this.editTeacher(firebase)}}
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
    ) : (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{height: "100%", marginTop:'8vh'}}
      >
        <img src={CHALKLogoGIF} alt="Loading" width="40%" />
      </Grid>
    )}
    </>)
  }
}

Teachers.contextType = FirebaseContext
export default Teachers
