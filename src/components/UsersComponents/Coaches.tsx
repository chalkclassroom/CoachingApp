import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import ForwardIcon from '@material-ui/icons/Forward'
import FolderIcon from '@material-ui/icons/Folder'
import { makeStyles } from '@material-ui/core/styles/index'
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
  Input,
  OutlinedInput,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  TableSortLabel,
  Fab,
} from '@material-ui/core'
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif'
import Firebase, { FirebaseContext } from '../Firebase'
import SaveImage from '../../assets/images/SaveImage.svg'
import SaveGrayImage from '../../assets/images/SaveGrayImage.svg'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import styled from 'styled-components'
import { Alert } from '@material-ui/lab'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const StyledSelect = withStyles({
  root: {
    padding: '11px 14px',
    width: '25.5vw',
    maxWidth: '425px',
  },
  disabled: {
    opacity: 0.3,
  },
})(Select)

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

interface Props {
  changePage(pageName: string): void
  userRole: string
  location: string
  teacherData: Array<Object>
  coachData: Array<Object>
  sitesList: Array<Object>
  siteData: Array<Object>
  updateSendToSitesData(data): void
}

interface State {
  coachList: Array<Object>
  coachesTeachers: Array<Object>
  selectedCoach: string
  view: number
  saved: boolean
  archiveModalOpen: boolean
  successOpen: boolean
  editEmail: string
}

class Coaches extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      addTeacherFirstName: '',
      addTeacherLastName: '',
      selectedCoach: '',
      coachList: [],
      coachesTeachers: [],
      editTeacherFirstName: '',
      editTeacherLastName: '',
      editEmail: '',
      editCoach: '',
      editSite: '',
      editProgram: '',
      view: 1,
      saved: true,
      sortType: 'lastName',
      newCoachFirstName: '',
      newCoachLastName: '',
      newCoachEmail: '',
      newCoachSiteIds: [],
      newCoachProgramId: '',
      siteOptions: [],
      siteData: [],
      programData: [],

      selectedTransferCoach: '',
      transferCoachCurrentSiteIds: [],
      transferCoachNewSiteIds: [],
      siteToAdd: '',

      successModalOpen: false,

      successEditTeacherModalOpen: false,

      saveModalOpen: false,
      archiveModalOpen: false,
      successOpen: false,
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (!prevProps.siteData !== this.props.siteData) {
    }
  }

  sortTeachers = sortType => {
    var teachersList = this.state.coachesTeachers

    this.setState({ sortType: sortType })

    // Sort the teachers list
    switch (sortType) {
      case 'lastName':
        teachersList.sort((a, b) =>
          a.teacherLastName > b.teacherLastName
            ? 1
            : b.teacherLastName > a.teacherLastName
            ? -1
            : 0
        )
        break
      case 'lastNameReverse':
        teachersList.sort((a, b) =>
          b.teacherLastName > a.teacherLastName
            ? 1
            : a.teacherLastName > b.teacherLastName
            ? -1
            : 0
        )
        break
      case 'firstName':
        teachersList.sort((a, b) =>
          a.teacherFirstName > b.teacherFirstName
            ? 1
            : b.teacherFirstName > a.teacherFirstName
            ? -1
            : 0
        )
        break
      case 'firstNameReverse':
        teachersList.sort((a, b) =>
          b.teacherFirstName > a.teacherFirstName
            ? 1
            : a.teacherFirstName > b.teacherFirstName
            ? -1
            : 0
        )
        break
      case 'siteName':
        teachersList.sort((a, b) =>
          a.siteName > b.siteName ? 1 : b.siteName > a.siteName ? -1 : 0
        )
        break
      case 'siteNameReverse':
        teachersList.sort((a, b) =>
          b.siteName > a.siteName ? 1 : a.siteName > b.siteName ? -1 : 0
        )
        break
      case 'program':
        teachersList.sort((a, b) =>
          a.selectedProgramName > b.selectedProgramName
            ? 1
            : b.selectedProgramName > a.selectedProgramName
            ? -1
            : 0
        )
        break
      case 'programReverse':
        teachersList.sort((a, b) =>
          b.selectedProgramName > a.selectedProgramName
            ? 1
            : a.selectedProgramName > b.selectedProgramName
            ? -1
            : 0
        )
        break

      default:
        break
    }

    this.setState({ coachesTeachers: teachersList })
  }

  handleEditClick = value => {
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
      editProgramId: value.selectedProgramId,
    })
    this.handlePageChange(4)
  }

  handleEditInputChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
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

  validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  /*
   * When user saves 'edit teacher'
   */
  async editTeacher(firebase: Firebase) {
    firebase
    const {
      editTeacherId,
      editTeacherFirstName,
      editTeacherLastName,
      editEmail,
    } = this.state

    this.setState({ success: true })

    if (!editTeacherFirstName || editTeacherFirstName === '') {
      alert('First Name is required')
      return
    }

    if (!editTeacherLastName || editTeacherLastName === '') {
      alert('Last name is required')
      return
    }

    if (editEmail !== '' && !this.validateEmail(editEmail)) {
      alert('No email or valid email is required')
      return
    }

    await firebase
      .editUserName(
        editTeacherId,
        editTeacherFirstName,
        editTeacherLastName,
        editEmail,
        'teacher'
      )
      .catch(e => {
        console.log(e)
        alert('Unable to edit teacher. Please try again')
        this.setState({ success: false })
      })
      .finally(() => {
        // Update coaches teachers in this state
        var coachesTeachers = this.state.coachesTeachers
        // get the teacher data
        var teacherData = coachesTeachers.find(
          o => o.teacherId === editTeacherId
        )

        var teacherDataIndex = coachesTeachers.indexOf(teacherData)
        coachesTeachers[
          teacherDataIndex
        ].teacherFirstName = editTeacherFirstName
        coachesTeachers[teacherDataIndex].teacherLastName = editTeacherLastName
        coachesTeachers[teacherDataIndex].email = editEmail

        this.setState({ coachesTeachers: coachesTeachers })

        this.setState({
          // Hold off setting new state until success has been determined
          editTeacherId: '',
          editTeacherFirstName: '',
          editTeacherLastName: '',
          editEmail: '',
          editCoach: '',
          editCoachId: '',
          editSite: '',
          editProgram: '',
          successEditTeacherModalOpen: this.state.success ? true : false,
          saved: true,
        })
        // window.location.reload()
      })
  }

  archiveModalOpen = (): Promise<boolean> => {
    this.setState({ archiveModalOpen: true })
    return new Promise<boolean>(
      (resolve: (discard: boolean) => void, reject): void => {
        this.setState({ awaitingConfirmationRef: { resolve } })
      }
    )
  }

  archiveModalDiscard = (): void => {
    if (this.state.awaitingConfirmationRef) {
      this.state.awaitingConfirmationRef.resolve(true)
    }
    this.setState({
      archiveModalOpen: false,
      awaitingConfirmationRef: null,
    })
  }

  /*
   * Handles any changes that are made for text input on new coach page
   */
  handleNewCoachInput = name => {
    if (name === 'firstName') {
      this.setState({
        newCoachFirstName: event.target.value,
        saved: false,
      })
    }
    if (name === 'lastName') {
      this.setState({
        newCoachLastName: event.target.value,
        saved: false,
      })
    }
    if (name === 'email') {
      this.setState({
        newCoachEmail: event.target.value,
        saved: false,
      })
    }
  }

  /*
   * Handles any changes that are made  for program dropdown on new coach page
   */
  handleNewCoachProgramDropdown = programId => {
    // Generate site options for the site dropdown
    var programInfo = this.props.programData.find(o => o.id === programId)

    var siteOptionIds = []
    if (programInfo.sites) {
      siteOptionIds = programInfo.sites
    }

    var siteOptions = []
    for (var siteIndex in siteOptionIds) {
      var siteId = siteOptionIds[siteIndex]
      var siteInfo = this.props.siteData.find(o => o.id === siteId)

      if (siteInfo) {
        siteOptions.push(siteInfo)
      }
    }

    this.setState({
      newCoachProgramId: programId,
      siteOptions: siteOptions,
      saved: false,
    })
  }

  /*
   * Handles any changes that are made  for site dropdown on new coach page
   */
  handleNewCoachSiteDropdown = siteIds => {
    this.setState({
      newCoachSiteIds: siteIds,
      saved: false,
    })
  }

  async addTeacher(firebase: Firebase) {
    firebase
    const {
      editTeacherFirstName,
      editTeacherLastName,
      selectedCoach,
    } = this.state

    if (!editTeacherFirstName || editTeacherLastName === '') {
      alert('First Name is required')
      return
    }

    if (!editTeacherLastName || editTeacherLastName === '') {
      alert('Last name is required')
      return
    }

    // check user role to make sure site leaders can't change programs
    // if (![Role.ADMIN, Role.COACH, Role.TEACHER, Role.PROGRAMLEADER, Role.SITELEADER].includes(role)){
    //     alert("Please select a role");
    //     return;
    // }

    const randomString = Math.random()
      .toString(36)
      .slice(-8)
    const teacherInfo = {
      firstName: editTeacherFirstName,
      lastName: editTeacherLastName,
      email: '',
      notes: '',
      phone: '',
    }
    await firebase
      .addTeacherToCoach(teacherInfo, selectedCoach)
      .then(() => {
        return randomString
      })
      .catch(e => {
        console.log(e)
        alert('Unable to create user. Please try again')
      })
      .finally(() => {
        this.setState({
          // Hold off setting new state until success has been determined
          addTeacherFirstName: '',
          addTeacherLastName: '',
          addCoachSites: [],
          addSiteName: '',
          addCoach: '',
          addCoachPrograms: [],
          addProgram: '',
          addSite: '',
        })
        window.location.reload()
      })
  }

  async addNewCoach(firebase) {
    const {
      newCoachFirstName,
      newCoachLastName,
      newCoachEmail,
      newCoachSites,
      newCoachPrograms,
    } = this.state

    if (!newCoachFirstName || newCoachFirstName === '') {
      alert('First Name is required')
      return
    }

    if (!newCoachLastName || newCoachLastName === '') {
      alert('Last name is required')
      return
    }

    if (!newCoachEmail || newCoachEmail === '') {
      alert('Email is required')
      return
    }

    if (!this.validateEmail(newCoachEmail)) {
      alert('Please enter a valid email')
      return
    }

    const randomString = Math.random()
      .toString(36)
      .slice(-8)
    const coachInfo = {
      firstName: newCoachFirstName,
      lastName: newCoachLastName,
      email: '',
      notes: '',
      phone: '',
    }

    var hasProgram = false
    if (this.state.newCoachProgramId !== '') {
      hasProgram = true
    }
    var hasSite = true

    // Note: we're setting sites to
    await firebase
      .firebaseEmailSignUp(
        {
          email: newCoachEmail,
          password: randomString,
          firstName: newCoachFirstName,
          lastName: newCoachLastName,
        },
        'coach',
        hasProgram,
        this.state.newCoachProgramId,
        hasSite,
        this.state.newCoachSiteIds
      )
      .then(async data => {
        // Add new user to the coach data that we got from props
        var newCoachSiteList = []
        for (var siteIndex in data.sites) {
          var siteId = data.sites[siteIndex]
          var programId = data.sites[siteIndex]

          // Get the site associated with it
          var siteData = await this.props.siteData.find(o => o.id === siteId)

          // Get program that has this site
          var programData = await this.props.programData.find(o =>
            o.sites.includes(programId)
          )

          newCoachSiteList.push({
            programId: data.program,
            programName: programData.name,
            siteId: siteId,
            siteName: siteData.name,
          })
        }

        var newCoachInfo = {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          siteList: newCoachSiteList,
        }

        this.props.coachData.push(newCoachInfo)

        var fullName = data.firstName + ' ' + data.lastName
        await firebase.sendEmailToNewUser(newCoachEmail)

        this.setState({
          createdCoachEmail: newCoachEmail,
          createdCoachPassword: randomString,
        })
        this.setState({
          // Hold off setting new state until success has been determined
          newCoachFirstName: '',
          newCoachLastName: '',
          newCoachEmail: '',
          newCoachProgramId: '',
          newCoachSiteIds: [],
          saved: true,
          successOpen: true,
        })
        return randomString
      })
      .catch(e => {
        this.setState({
          createdPassword: undefined,
        })
        console.log(e)
        alert('Unable to create user. Please try again')
      })
  }

  handlePopulateTable = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let result = []
    this.setState({ selectedCoach: event.target.value })
    this.props.teacherData.map(doc => {
      if (doc.coachId === event.target.value) {
        result.push(doc)
      }
    })
    this.setState(
      { coachesTeachers: result },
      // Sort the data
      function() {
        this.sortTeachers('lastName')
      }
    )

    // Set the coach so the transfer page is already set for this user
    this.handleTransferCoachSelect(event.target.value)
  }

  /*
   * Handle what happens when a coach is selected on the transfer page
   */
  handleTransferCoachSelect = async coachId => {
    // Get the selected coaches info
    var coachInfo = await this.props.coachData.find(o => o.id === coachId)

    // Get the site ids
    var siteIds = []
    if (coachInfo.siteList) {
      var siteList = coachInfo.siteList
      for (var siteIndex in siteList) {
        if (siteList[siteIndex].siteId && siteList[siteIndex].siteId !== '')
          siteIds.push(siteList[siteIndex].siteId)
      }
    }

    // Remove duplicates
    siteIds = [...new Set(siteIds)]

    // Set the value for coach dropdown, from sites dropdown, and initial values of to sites dropdown
    this.setState({
      selectedTransferCoach: coachId,
      transferCoachCurrentSiteIds: siteIds,
      transferCoachNewSiteIds: siteIds,
    })
  }

  /*
   * Handles any changes that are made  for site dropdown on new coach page
   */
  handleTransferCoachSiteDropdown = (siteId, indexToUpdate) => {
    var newSiteIds = [...this.state.transferCoachNewSiteIds]
    var currentSiteIds = [...this.state.transferCoachCurrentSiteIds]

    // Find the index of the site we're change
    //var indexOfSite = transferCoachCurrentSiteIds.indexOf(siteId);

    // Replace the previous ID with the new one
    // If we're choosing a new site
    if (indexToUpdate === -1) {
      newSiteIds.push(siteId)
      currentSiteIds.push(siteId)
    } else {
      newSiteIds[indexToUpdate] = siteId
    }

    this.setState({
      transferCoachNewSiteIds: newSiteIds,
      transferCoachCurrentSiteIds: currentSiteIds,
      saved: false,
    })
  }

  /*
   * Handle what happens when transfer coach is saved
   */
  updateCoachSites = async firebase => {
    // Add any sites that were added
    firebase
      .assignSiteToUser({
        userId: this.state.selectedTransferCoach,
        bulkSiteIds: this.state.transferCoachNewSiteIds,
      })
      .then(data => {
        console.log('Coach sites updated ', data)
      })

    // Remove any sites that were removed
    var previousSites = [...this.state.transferCoachCurrentSiteIds]
    var newSites = [...this.state.transferCoachNewSiteIds]

    // Get sites that are in the old sites but not the new one
    var removedSites = previousSites.filter(function(obj) {
      return newSites.indexOf(obj) == -1
    })
    const coachId = this.state.selectedTransferCoach

    // Remove empty strings (if they are getting removed from site )
    newSites = newSites.filter(o => o !== '')

    // Set the sites in firestore
    firebase.replaceSitesForUser({ siteIds: newSites, userId: coachId })

    var coachesTeachers = [...this.state.coachesTeachers]

    // Remove the sites from the user's document in firestore
    var teachersToRemove = []
    for (var removedSiteIndex in removedSites) {
      var tempSiteId = removedSites[removedSiteIndex]
      //await firebase.removeItemFromArray({siteToRemove: tempSiteId, userToRemoveFrom: coachId})

      // Get teachers to remove from Coach's partner collection
      var teacherToRemoveData = this.props.teacherData.filter(
        x => x.selectedSiteId === tempSiteId
      )

      for (var teacherIndex in teacherToRemoveData) {
        var teacher = teacherToRemoveData[teacherIndex]

        teachersToRemove.push(teacher.teacherId)

        console.log('coachesTeachers => ', coachesTeachers)
        console.log('Teacher ID => ', teacher.teacherId)
      }
      teachersToRemove = teachersToRemove.concat(teachersToRemove)
    }

    // Remove the teachers within those sites from the coach's collection
    // Remove any duplicates first
    teachersToRemove = [...new Set(teachersToRemove)]

    // Remove teachers from Firestore
    await firebase.removeTeacherFromCoach({
      coachId: coachId,
      bulkTeacherIds: teachersToRemove,
    })

    // Remove teachers from coachesTeachers in state to update table
    coachesTeachers = coachesTeachers.filter(
      o => !teachersToRemove.includes(o.teacherId)
    )
    this.setState({ coachesTeachers: coachesTeachers })

    // Remove the teacher from the teacherData that we get from props
    var teacherData = this.props.teacherData
    teacherData = await teacherData.filter(
      o =>
        (o.coachId === coachId && !teachersToRemove.includes(o.teacherId)) ||
        o.coachId !== coachId
    )
    this.props.updateTeacherData(teacherData)

    // Gather info so we can update the coach list given to us in props
    var coaches = this.props.coachData

    var coachInfo = await coaches.find(o => o.id === coachId)

    // Go through each of the site in the user's site list and remove anything that isn't in the new site
    var newCoachSiteList = []
    // Go through each newly selected site ids
    for (var newSiteIndex in newSites) {
      var newSiteId = newSites[newSiteIndex]

      // Get the site associated with it
      var newSiteData = await this.props.siteData.find(o => o.id === newSiteId)

      // Get program that has this site
      var newSitesProgramData = await this.props.programData.find(o =>
        o.sites.includes(newSiteId)
      )

      if (newSitesProgramData) {
        newCoachSiteList.push({
          siteId: newSiteData.id,
          siteName: newSiteData.name,
          programName: newSitesProgramData.name,
          programId: newSitesProgramData.id,
        })
      }
    }

    coachInfo.siteList = newCoachSiteList

    // Update sites, set this teacher as selected, and go back to last page

    let update = this.props.sitesList
    let coachData = update.filter(o => {
      return o.id === coachId
    })
    let removed = []
    console.log(update)
    for (let i = 0; i < coachData.length; i++) {
      removed.push({
        siteId: coachData[i].siteId,
        siteName: coachData[i].siteName,
        programId: coachData[i].programId,
        programName: coachData[i].programName,
      })
      update.splice(update.indexOf(coachData[i]), 1)
    }
    for (let i = 0; i < newCoachSiteList.length; i++) {
      update.push({
        siteName: newCoachSiteList[i].siteName,
        siteId: newCoachSiteList[i].siteId,
        programName: newCoachSiteList[i].name,
        programId: newCoachSiteList[i].id,
        firstName: coachInfo.firstName,
        lastName: coachInfo.lastName,
        id: coachId,
        archived: false,
        email: coachInfo.email,
      })
    }
    for (let i = 0; i < removed.length; i++) {
      let check = update.filter(o => {
        return o.siteId === removed[i].siteId
      })
      if (!(check.length > 0)) {
        update.push({
          siteName: removed[i].siteName,
          siteId: removed[i].siteId,
          programName: removed[i].programName,
          programId: removed[i].programId,
          firstName: '',
          lastName: '',
          id: '',
          archived: false,
          email: '',
        })
      }
    }
    let empty = []
    update.map(o => {
      if (o.id === '') {
        empty.push(o.siteId)
      }
    })
    console.log(empty)
    for (let i = 0; i < newCoachSiteList.length; i++) {
      if (empty.includes(newCoachSiteList[i].siteId)) {
        let site = update.find(o => o.siteId === newCoachSiteList[i].siteId)
        let index = update.indexOf(site)
        update.splice(index, 1)
      }
    }
    this.props.updateSendToSitesData(update)
    /// if site is initially empty remove empty site
    console.log(coachData)
    console.log(newCoachSiteList)
    console.log(update)

    this.setState({
      transferCoachCurrentSiteIds: newSites,
      transferCoachNewSiteIds: newSites,
      selectedCoach: coachId,
      successModalOpen: true,
      saved: true,
    })
  }

  /*
   * Close the confirmation modal that shows after transfer
   */
  successModalClose = () => {
    this.setState({
      successModalOpen: false,
      view: 1,
    })
  }

  /*
   * Close the confirmation modal that shows after edit teacher
   */
  successEditTeacherModalClose = () => {
    this.setState({
      successEditTeacherModalOpen: false,
      view: 1,
    })
  }

  handlePageChange = (pageNumber: number) => {
    if (!this.state.saved) {
      this.setState({ saveModalOpen: true, pageToChangeTo: pageNumber })
      return
    }

    this.setState({ view: pageNumber })

    switch (pageNumber) {
      default:
      case 1:
        this.props.changePage('Teachers')
        break
      case 2:
        this.props.changePage('TeachersAdd')
        break
      case 3:
        this.props.changePage('TeachersTransfer')
        break
      case 4:
        this.props.changePage('TeachersEdit')
        break
    }
  }

  /*
   * When buttons on the unsaved changes modal are clicked
   */
  onSaveModalClose = () => {
    this.setState({
      saveModalOpen: false,
    })
  }

  onSaveModalDiscard = () => {
    this.setState({ saved: true, saveModalOpen: false }, () => {
      this.handlePageChange(this.state.pageToChangeTo)
    })
  }

  async archiveTeacher(firebase: Firebase) {
    firebase
    const {
      editTeacherId,
      editCoachId,
      editTeacherFirstName,
      editTeacherLastName,
      editSite,
      editProgram,
      editSiteId,
      editProgramId,
    } = this.state
    this.setState({ success: true })

    await firebase
      .archiveTeacher(
        editTeacherId,
        editCoachId,
        editTeacherFirstName,
        editTeacherLastName,
        editSite,
        editProgram,
        editSiteId,
        editProgramId
      )
      .catch(e => {
        console.log(e)
        alert('Unable to archive teacher. Please try again')
        this.setState({ success: false })
      })
      .finally(() => {
        let update = this.props.teacherData
        let teacherData = update.find(o => o.teacherId === editTeacherId)
        let teacherIndex = update.indexOf(teacherData)
        update[teacherIndex].archived = true
        update.splice(teacherIndex, 1)
        this.props.updateTeacherData(update)

        this.setState({
          // Hold off setting new state until success has been determined
          selectedCoach: '',
          editTeacherId: '',
          editCoachId: '',
          editTeacherFirstName: '',
          editTeacherLastName: '',
          editSite: '',
          editProgram: '',
          editSiteId: '',
          editProgramId: '',
          archiveModalOpen: false,
          successOpen: this.state.success ? true : false,
        })
        // window.location.reload()
      })
  }

  successModalClose = (): void => {
    if (this.state.awaitingConfirmationRef) {
      this.state.awaitingConfirmationRef.resolve(false)
    }
    this.setState({
      awaitingConfirmationRef: null,
      addTeacherFirstName: '',
      addTeacherLastName: '',
      addCoach: '',
      addCoachSites: [],
      addSiteName: '',
      addSite: '',
      addCoachPrograms: [],
      addProgram: '',
      editTeacherId: '',
      editTeacherFirstName: '',
      editTeacherLastName: '',
      editCoach: '',
      editEmail: '',
      editCoachId: '',
      editSite: '',
      editProgram: '',
      editSiteId: '',
      editProgramId: '',
      transferTeacherId: '',
      transferCoachSites: [],
      transferCoachPrograms: [],
      transferCoachName: '',
      transferSiteName: '',
      transferProgramName: '',
      originalCoachId: '',
      originalProgramId: '',
      changeCoachId: '',
      changeSiteName: '',
      changeSiteId: '',
      changeProgramId: '',
      successOpen: false,
      successModalOpen: false,
    })
    this.handlePageChange(1)
  }

  render() {
    return (
      <>
        {this.state.createdCoachEmail && (
          <Alert severity={'success'} style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90vw',
                alignItems: 'center',
              }}
            >
              <div style={{ paddingRight: '20px' }}>
                New Coach has been created with the password{' '}
                {this.state.createdCoachPassword} <br />
                An email has been sent to {this.state.createdCoachEmail} to
                reset their password.
              </div>
              <div
                onClick={() => {
                  this.setState({
                    createdCoachEmail: undefined,
                    createdCoachPassword: '',
                  })
                }}
              >
                Close
              </div>
            </div>
          </Alert>
        )}

        <Dialog open={this.state.successModalOpen}>
          <DialogTitle style={{ fontFamily: 'Arimo' }}>
            Site Transfer Has Been Completed Successfully
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.successModalClose}>Ok</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.successEditTeacherModalOpen}>
          <DialogTitle style={{ fontFamily: 'Arimo' }}>
            Teacher has been successfully saved.
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.successEditTeacherModalClose}>Ok</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.successOpen}>
          <DialogTitle style={{ fontFamily: 'Arimo' }}>
            The action was completed successfully.
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.successModalClose}>Ok</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.archiveModalOpen}>
          <DialogTitle style={{ fontFamily: 'Arimo' }}>
            Are you sure you would like to move this user to archives?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.archiveModalDiscard}>No, go back</Button>
            <FirebaseContext.Consumer>
              {(firebase: Firebase) => (
                <Button
                  onClick={_ => {
                    this.archiveTeacher(firebase)
                  }}
                >
                  Yes, I am sure
                </Button>
              )}
            </FirebaseContext.Consumer>
          </DialogActions>
        </Dialog>

        {/*
          popup - leaving page with unsaved changes
      */}
        <Dialog open={this.state.saveModalOpen}>
          <DialogTitle style={{ fontFamily: 'Arimo' }}>
            You have unsaved changes to your entry. Would you like to discard
            the entry?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.onSaveModalClose}>No, keep editing</Button>
            <Button onClick={this.onSaveModalDiscard}>
              Yes, discard changes
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container direction="row">
          <Grid item xs={3}>
            <Grid container direction="column" style={{ marginLeft: '30px' }}>
              {this.state.view !== 4 ? (
                <>
                  {this.state.view === 2 ? (
                    <>
                      <Grid item xs={6}>
                        <Grid
                          container
                          direction="row"
                          style={{ cursor: 'default' }}
                          onClick={() => this.handlePageChange(1)}
                        >
                          <Grid item>
                            <ArrowBackIcon
                              style={{
                                fill: 'green',
                                fontSize: '40',
                                marginTop: '15px',
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h6"
                              style={{ marginTop: '20px' }}
                            >
                              Back
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={6}>
                        <Grid
                          container
                          direction="row"
                          style={{ cursor: 'default' }}
                          onClick={() => this.handlePageChange(2)}
                        >
                          <Grid item>
                            <AddIcon
                              style={{
                                fill: 'green',
                                fontSize: '40',
                                marginTop: '15px',
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h6"
                              style={{ marginTop: '20px' }}
                            >
                              Add
                            </Typography>
                          </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </>)}
                {this.props.coachData.length > 0 ? (<>
                {this.state.view === 3 ? (<>
                <Grid item xs={6}>
                  <Grid container direction='row' style={{cursor: 'default'}} onClick={() => this.handlePageChange(1)}>
                        <Grid item>
                            <ArrowBackIcon style={{fill: '#0988ec', fontSize:'40', marginTop:'15px',}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6"

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

                              style={{marginTop:'20px',}}
                              >
                                Transfer
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>)}
                </>) : (<></>)}
                </>) : (<>
                  <Grid item xs={6}>
                    <Grid container direction='row' style={{cursor: 'default'}} onClick={(_) => {this.setState({archiveModalOpen: true})}}>
                        <Grid item>
                            <FolderIcon style={{fill: 'Khaki', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6"

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

        {this.props.coachData.length > 0 ? (<>
          <Grid container direction='column'>
            <Grid item xs={12}><span></span></Grid>
            <Grid item xs={12}>
              <Grid container direction='row'>
                <Grid item xs={1}><span></span></Grid>
                <Grid item xs={2}>
                  <Typography variant="h6"   style={{marginTop:'5px',}}>
                    Coach
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <FormControl variant="outlined">
                    <StyledSelect
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.selectedCoach}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        this.handlePopulateTable(event)
                      }
                      name="selectedCoach"
                      // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                    >
                      {this.props.coachData.map(
                        (coach, index)=>{
                          if(coach.id !== "") {
                          return (
                              <MenuItem value={coach.id} key={index}>
                                {coach.lastName + ", " + coach.firstName}
                              </MenuItem>
                          )}
                          })}
                    </StyledSelect>
                    {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid
            item
            xs={8}
            style={{
              width: '100%',
              height: '38vh',
              // border: '2px solid #0988ec',
              // borderRadius: '0.5em',
              marginTop:'60px' }}
            >
            <table style={{borderCollapse: 'collapse', width: '100%' }}>
              <thead style={{borderBottom:'2px solid #0988ec'}}>
                <tr>
                  <th colSpan={2}>
                    <Typography variant="h6"  >
                      <strong>Teachers Coached</strong>
                    </Typography>
                  </th>
                  <th
                    colSpan={1}
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
                  <th
                    colSpan={1}
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
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.selectedCoach !== "" ? (<>
                {this.state.coachesTeachers.map((value, index) => {
                  return(
                  <TableRow key={index} onClick={() => {this.handlePageChange(4); this.handleEditClick(value)}}>
                    <td style={{textAlign:'left'}}>
                      <Typography variant="h6"  >
                        {value.teacherLastName}
                      </Typography>
                    </td>
                    <td style={{textAlign:'left'}}>
                      <Typography variant="h6"  >
                        {value.teacherFirstName}
                      </Typography>
                    </td>
                    <td style={{textAlign:'left'}}>
                      <Typography variant="h6"  >
                        {value.siteName}
                      </Typography>
                    </td>
                    <td style={{textAlign:'left'}}>
                      <Typography variant="h6"  >
                        {value.selectedProgramName}
                      </Typography>
                    </td>
                  </TableRow>
                  )
                })}
                </>) : (<></>)}
              </tbody>


            </table>
            </Grid>
          </Grid>
          </>) : (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{height: "100%", marginTop:'8vh'}}
          >
            <img src={CHALKLogoGIF} alt="Loading" width="40%" style={{maxHeight: '100%'}} />
          </Grid>
          )}
      </>) : (this.state.view === 2 ? (<>
          <Grid item xs={1} style={{marginTop: '45px'}}>

            <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
              <Grid item>
                <Typography variant="h6"   style={{marginTop:'10px'}}>
                  Coach
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6"   style={{marginTop:'10px'}}>
                  Email
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6"   style={{marginTop:'2px'}}>
                  Program
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6"   style={{marginTop:'3px'}}>
                  Sites
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
                      id="teacher-search"
                      label="First Name"
                      type="search"
                      variant="outlined"
                      onChange={() => this.handleNewCoachInput('firstName')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      style={{width:'13.5vw', maxWidth: '225px'}}
                      size="small"
                      id="teacher-search"
                      label="Last Name"
                      type="search"
                      variant="outlined"
                      onChange={() => this.handleNewCoachInput('lastName')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  size="small"
                  style={{width:'29.5vw', maxWidth: '470px'}}
                  id="teacher-search"
                  label="Email"
                  type="search"
                  variant="outlined"
                  onChange={() => this.handleNewCoachInput('email')}
                />
              </Grid>

              {/*
                Programs dropdown
                */}
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    autoWidth={true}
                    value={this.state.newCoachSelectedProgram}
                    onChange={(event) => this.handleNewCoachProgramDropdown(event.target.value)}
                    input={<OutlinedInput  />}
                    autoWidth={true}
                  >
                    {this.props.programData.map(
                      (option, index)=>{

                        return <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>

                    })}
                  </StyledSelect>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                </FormControl>
              </Grid>

              {/*
                Sites dropdown
                */}
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    multiple
                    autoWidth={true}
                    value={this.state.newCoachSiteIds}
                    onChange={(event) => this.handleNewCoachSiteDropdown(event.target.value)}
                    input={<OutlinedInput />}
                    autoWidth={true}
                  >
                    {this.state.siteOptions.map(
                      (option, index)=>{

                        return <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>

                    })}
                  </StyledSelect>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
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
                    onClick={(_)=>{this.addNewCoach(firebase)}}
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
                  {this.props.coachData.length > 0 ? (
                    <>
                      {this.state.view === 3 ? (
                        <>
                          <Grid item xs={6}>
                            <Grid
                              container
                              direction="row"
                              style={{ cursor: 'default' }}
                              onClick={() => this.handlePageChange(1)}
                            >
                              <Grid item>
                                <ArrowBackIcon
                                  style={{
                                    fill: '#0988ec',
                                    fontSize: '40',
                                    marginTop: '15px',
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant="h6"
                                  style={{ marginTop: '20px' }}
                                >
                                  Back
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item xs={6}>
                            <Grid
                              container
                              direction="row"
                              style={{ cursor: 'default' }}
                              onClick={() => this.handlePageChange(3)}
                            >
                              <Grid item>
                                <ForwardIcon
                                  style={{
                                    fill: '#0988ec',
                                    fontSize: '40',
                                    marginTop: '15px',
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant="h6"
                                  style={{ marginTop: '20px' }}
                                >
                                  Transfer
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <Grid item xs={6}>
                    <Grid
                      container
                      direction="row"
                      style={{ cursor: 'default' }}
                      onClick={_ => {
                        this.setState({ archiveModalOpen: true })
                      }}
                    >
                      <Grid item>
                        <FolderIcon
                          style={{
                            fill: 'Khaki',
                            fontSize: '40',
                            marginTop: '15px',
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" style={{ marginTop: '20px' }}>
                          Archive
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      container
                      direction="row"
                      style={{ cursor: 'default' }}
                      onClick={() => this.handlePageChange(1)}
                    >
                      <Grid item>
                        <ArrowBackIcon
                          style={{
                            fill: '#0988ec',
                            fontSize: '40',
                            marginTop: '15px',
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" style={{ marginTop: '20px' }}>
                          Back
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          {this.state.view === 1 ? (
            <>
              {this.props.coachData.length > 0 ? (
                <>
                  <Grid container direction="column">
                    <Grid item xs={12}>
                      <span></span>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction="row">
                        <Grid item xs={1}>
                          <span></span>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="h6" style={{ marginTop: '5px' }}>
                            Coach
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <FormControl variant="outlined">
                            <StyledSelect
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={this.state.selectedCoach}
                              onChange={(
                                event: React.ChangeEvent<HTMLSelectElement>
                              ) => this.handlePopulateTable(event)}
                              name="selectedCoach"
                              // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                            >
                              {this.props.coachData.map((coach, index) => {
                                if (coach.id !== '') {
                                  return (
                                    <MenuItem value={coach.id} key={index}>
                                      {coach.lastName + ', ' + coach.firstName}
                                    </MenuItem>
                                  )
                                }
                              })}
                            </StyledSelect>
                            {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={8}
                      style={{
                        width: '100%',
                        height: '38vh',
                        // border: '2px solid #0988ec',
                        // borderRadius: '0.5em',
                        marginTop: '60px',
                      }}
                    >
                      <table
                        style={{ borderCollapse: 'collapse', width: '100%' }}
                      >
                        <thead style={{ borderBottom: '2px solid #0988ec' }}>
                          <tr>
                            <th colSpan={2}>
                              <Typography variant="h6">
                                <strong>Teachers Coached</strong>
                              </Typography>
                            </th>
                            <th
                              colSpan={1}
                              onClick={() => {
                                if (this.state.sortType == 'siteName') {
                                  this.sortTeachers('siteNameReverse')
                                } else {
                                  this.sortTeachers('siteName')
                                }
                              }}
                            >
                              <TableSortLabel
                                direction={
                                  this.state.sortType === 'siteName'
                                    ? 'desc'
                                    : 'asc'
                                }
                                active={
                                  ['siteName', 'siteNameReverse'].includes(
                                    this.state.sortType
                                  )
                                    ? true
                                    : false
                                }
                              >
                                <Typography variant="h6">
                                  <strong>Site</strong>
                                </Typography>
                              </TableSortLabel>
                            </th>
                            <th
                              colSpan={1}
                              onClick={() => {
                                if (this.state.sortType == 'program') {
                                  this.sortTeachers('programReverse')
                                } else {
                                  this.sortTeachers('program')
                                }
                              }}
                            >
                              <TableSortLabel
                                direction={
                                  this.state.sortType === 'program'
                                    ? 'desc'
                                    : 'asc'
                                }
                                active={
                                  ['program', 'programReverse'].includes(
                                    this.state.sortType
                                  )
                                    ? true
                                    : false
                                }
                              >
                                <Typography variant="h6">
                                  <strong>Program</strong>
                                </Typography>
                              </TableSortLabel>
                            </th>
                          </tr>
                          <tr>
                            <th
                              onClick={() => {
                                if (this.state.sortType == 'lastName') {
                                  this.sortTeachers('lastNameReverse')
                                } else {
                                  this.sortTeachers('lastName')
                                }
                              }}
                            >
                              <TableSortLabel
                                direction={
                                  this.state.sortType === 'lastName'
                                    ? 'desc'
                                    : 'asc'
                                }
                                active={
                                  ['lastName', 'lastNameReverse'].includes(
                                    this.state.sortType
                                  )
                                    ? true
                                    : false
                                }
                              >
                                <Typography variant="h6">Last Name</Typography>
                              </TableSortLabel>
                            </th>
                            <th
                              onClick={() => {
                                if (this.state.sortType == 'firstName') {
                                  this.sortTeachers('firstNameReverse')
                                } else {
                                  this.sortTeachers('firstName')
                                }
                              }}
                            >
                              <TableSortLabel
                                direction={
                                  this.state.sortType === 'firstName'
                                    ? 'desc'
                                    : 'asc'
                                }
                                active={
                                  ['firstName', 'firstNameReverse'].includes(
                                    this.state.sortType
                                  )
                                    ? true
                                    : false
                                }
                              >
                                <Typography variant="h6">First Name</Typography>
                              </TableSortLabel>
                            </th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.selectedCoach !== '' ? (
                            <>
                              {this.state.coachesTeachers.map(
                                (value, index) => {
                                  return (
                                    <TableRow
                                      key={index}
                                      onClick={() => {
                                        this.handlePageChange(4)
                                        this.handleEditClick(value)
                                      }}
                                    >
                                      <td style={{ textAlign: 'center' }}>
                                        <Typography variant="h6">
                                          {value.teacherLastName}
                                        </Typography>
                                      </td>
                                      <td style={{ textAlign: 'center' }}>
                                        <Typography variant="h6">
                                          {value.teacherFirstName}
                                        </Typography>
                                      </td>
                                      <td style={{ textAlign: 'center' }}>
                                        <Typography variant="h6">
                                          {value.siteName}
                                        </Typography>
                                      </td>
                                      <td style={{ textAlign: 'center' }}>
                                        <Typography variant="h6">
                                          {value.selectedProgramName}
                                        </Typography>
                                      </td>
                                    </TableRow>
                                  )
                                }
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </tbody>
                      </table>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{ height: '100%', marginTop: '8vh' }}
                >
                  <img
                    src={CHALKLogoGIF}
                    alt="Loading"
                    width="40%"
                    style={{ maxHeight: '100%' }}
                  />
                </Grid>
              )}
            </>
          ) : this.state.view === 2 ? (
            <>
              <Grid item xs={1} style={{ marginTop: '45px' }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={3}
                >
                  <Grid item>
                    <Typography variant="h6" style={{ marginTop: '10px' }}>
                      Coach
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{ marginTop: '10px' }}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{ marginTop: '2px' }}>
                      Program
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{ marginTop: '3px' }}>
                      Sites
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={5} style={{ marginTop: '45px' }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      spacing={3}
                    >
                      <Grid item xs={6}>
                        <TextField
                          style={{ width: '13.5vw', maxWidth: '225px' }}
                          size="small"
                          id="teacher-search"
                          label="First Name"
                          type="search"
                          variant="outlined"
                          onChange={() => this.handleNewCoachInput('firstName')}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          style={{ width: '13.5vw', maxWidth: '225px' }}
                          size="small"
                          id="teacher-search"
                          label="Last Name"
                          type="search"
                          variant="outlined"
                          onChange={() => this.handleNewCoachInput('lastName')}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <TextField
                      size="small"
                      style={{ width: '29.5vw', maxWidth: '470px' }}
                      id="teacher-search"
                      label="Email"
                      type="search"
                      variant="outlined"
                      onChange={() => this.handleNewCoachInput('email')}
                    />
                  </Grid>

                  {/*
                Programs dropdown
                */}
                  <Grid item>
                    <FormControl variant="outlined">
                      <StyledSelect
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        autoWidth={true}
                        value={this.state.newCoachSelectedProgram}
                        onChange={event =>
                          this.handleNewCoachProgramDropdown(event.target.value)
                        }
                        input={<OutlinedInput />}
                        autoWidth={true}
                      >
                        {this.props.programData.map((option, index) => {
                          return (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          )
                        })}
                      </StyledSelect>
                      {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                    </FormControl>
                  </Grid>

                  {/*
                Sites dropdown
                */}
                  <Grid item>
                    <FormControl variant="outlined">
                      <StyledSelect
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        multiple
                        autoWidth={true}
                        value={this.state.newCoachSiteIds}
                        onChange={event =>
                          this.handleNewCoachSiteDropdown(event.target.value)
                        }
                        input={<OutlinedInput />}
                        autoWidth={true}
                      >
                        {this.state.siteOptions.map((option, index) => {
                          return (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          )
                        })}
                      </StyledSelect>
                      {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: '45px' }}
              >
                <Grid item xs={1} />
                <Grid item xs={1}>
                  <FirebaseContext.Consumer>
                    {(firebase: Firebase) => (
                      <Button
                        onClick={_ => {
                          this.addNewCoach(firebase)
                        }}
                      >
                        {this.state.saved ? (
                          <img
                            alt="Save"
                            src={SaveGrayImage}
                            style={{
                              width: '80%',
                              minWidth: '70px',
                            }}
                          />
                        ) : (
                          <img
                            alt="Save"
                            src={SaveImage}
                            style={{
                              width: '80%',
                              minWidth: '70px',
                            }}
                          />
                        )}
                      </Button>
                    )}
                  </FirebaseContext.Consumer>
                </Grid>
              </Grid>
            </>
          ) : this.state.view === 3 ? (
            <>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                style={{ marginTop: '60px', marginBottom: '60px' }}
              >
                <Grid item xs={1} style={{}}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={3}
                  >
                    <Grid item>
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        Coach
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        Site
                      </Typography>
                    </Grid>
                    {this.state.transferCoachCurrentSiteIds.map(
                      (siteId, index) => {
                        return (
                          <Grid item style={{ height: '66px' }}>
                            <Typography
                              variant="h6"
                              style={{ marginTop: '10px' }}
                            ></Typography>
                          </Grid>
                        )
                      }
                    )}
                  </Grid>
                </Grid>

                <Grid item xs={8} style={{}}>
                  <Grid
                    item
                    className="select-coach-wrap"
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ 'margin-bottom': '33px' }}
                  >
                    {/*
                Select coach dropdown
              */}
                    <FormControl variant="outlined">
                      <StyledSelect
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.selectedTransferCoach}
                        onChange={(
                          event: React.ChangeEvent<HTMLSelectElement>
                        ) => this.handleTransferCoachSelect(event.target.value)}
                        name="selectedCoach"
                        // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                      >
                        {this.props.coachData.map((coach, index) => {
                          if (coach.id !== '') {
                            return (
                              <MenuItem value={coach.id} key={index}>
                                {coach.lastName + ', ' + coach.firstName}
                              </MenuItem>
                            )
                          }
                        })}
                      </StyledSelect>
                      {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                    </FormControl>
                  </Grid>

                  {/*
              Each site row
            */}
                  {this.state.transferCoachNewSiteIds.map((siteId, index) => {
                    // Get the current site from state
                    var currentSites = [
                      ...this.state.transferCoachCurrentSiteIds,
                    ]
                    var currentSiteId = currentSites[index]

                    // Get the info for this item
                    var siteData = this.props.siteData.find(
                      o => o.id === currentSiteId
                    )

                    return (
                      <div
                        style={{
                          display: 'flex',
                          'flex-wrap': 'no-wrap',
                          'justify-content': 'space-between',
                          'margin-bottom': '20px',
                        }}
                      >
                        <Grid item>
                          <FormControl variant="outlined" disabled>
                            <StyledSelect
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              autoWidth={true}
                              value={siteData.id}
                              input={<OutlinedInput />}
                              autoWidth={true}
                            >
                              <MenuItem key={siteData.id} value={siteData.id}>
                                {siteData.name}
                              </MenuItem>
                            </StyledSelect>
                            {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                          </FormControl>
                        </Grid>

                        {/* ARROW */}
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacing={3}
                        >
                          <Grid item>
                            <ForwardIcon
                              style={{
                                fill: '#0988ec',
                                fontSize: '40',
                                marginTop: '4px',
                              }}
                            />
                          </Grid>
                        </Grid>

                        {/* TO SITE DROPDOWN */}
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacing={3}
                        >
                          <Grid item>
                            <FormControl variant="outlined">
                              <StyledSelect
                                labelId="demo-simple-select-disabled-label"
                                id="demo-simple-select-disabled"
                                autoWidth={true}
                                value={
                                  this.state.transferCoachNewSiteIds[index]
                                }
                                onChange={event =>
                                  this.handleTransferCoachSiteDropdown(
                                    event.target.value,
                                    index
                                  )
                                }
                                input={<OutlinedInput />}
                                autoWidth={true}
                              >
                                <MenuItem key={'nosite'} value={''}>
                                  (None)
                                </MenuItem>
                                {this.props.siteData.map((option, index) => {
                                  if (
                                    this.state.transferCoachNewSiteIds.indexOf(
                                      option.id
                                    ) < 0 ||
                                    siteId === option.id
                                  ) {
                                    return (
                                      <MenuItem
                                        key={option.id}
                                        value={option.id}
                                      >
                                        {option.name}
                                      </MenuItem>
                                    )
                                  }
                                })}
                              </StyledSelect>
                              {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </div>
                    )
                  })}

                  {/*
              Need a row for adding new sites
            */}

                  <div
                    style={{
                      display: 'flex',
                      'flex-wrap': 'no-wrap',
                      'justify-content': 'space-between',
                      'margin-bottom': '20px',
                    }}
                  >
                    <Grid item>
                      <FormControl variant="outlined" disabled>
                        <StyledSelect
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          autoWidth={true}
                          //value={this.state.transferCoachCurrentSiteIds}
                          input={<OutlinedInput />}
                          onChange={event =>
                            this.handleTransferCoachSiteDropdown(
                              event.target.value,
                              -1
                            )
                          }
                          autoWidth={true}
                        >
                          <MenuItem></MenuItem>
                        </StyledSelect>
                        {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                      </FormControl>
                    </Grid>

                    {/* ARROW */}
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item>
                        <ForwardIcon
                          style={{
                            fill: '#0988ec',
                            fontSize: '40',
                            marginTop: '4px',
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* TO SITE DROPDOWN */}
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item>
                        <FormControl variant="outlined">
                          <StyledSelect
                            labelId="demo-simple-select-disabled-label"
                            id="demo-simple-select-disabled"
                            autoWidth={true}
                            value={this.state.siteToAdd}
                            onChange={event =>
                              this.handleTransferCoachSiteDropdown(
                                event.target.value,
                                -1
                              )
                            }
                            input={<OutlinedInput />}
                            autoWidth={true}
                          >
                            {this.props.siteData.map((option, index) => {
                              if (
                                this.state.transferCoachNewSiteIds.indexOf(
                                  option.id
                                ) < 0
                              ) {
                                return (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                  </MenuItem>
                                )
                              }
                            })}
                          </StyledSelect>
                          {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                {/*
            Select coach dropdown
          */}
                {/*
          <Grid item xs={4} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>


                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.selectedTransferCoach}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      this.handleTransferCoachSelect(event.target.value)
                    }
                    name="selectedCoach"
                    // disabled={!(this.props.coachData.length > 0)
                  >
                    {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.lastName + ", " + coach.firstName}
                            </MenuItem>
                        )}
                        })}
                  </StyledSelect>
                </FormControl>
              </Grid>
              */}

                {/*
                From site dropdown
              */}
                {/*
              {this.state.transferCoachCurrentSiteIds.map(
                (siteId, index)=>{
                    // Get the info for this item
                    var siteData = this.props.siteData.find(o => o.id === siteId);

                    return <Grid item>
                              <FormControl variant="outlined" disabled>
                                <StyledSelect
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  multiple
                                  autoWidth={true}
                                  value={this.state.transferCoachCurrentSiteIds}
                                  input={<OutlinedInput />}
                                  autoWidth={true}
                                >


                                      <MenuItem key={siteData.id} value={siteData.id}>
                                        {siteData.name}
                                      </MenuItem>


                                </StyledSelect>
                              </FormControl>
                            </Grid>
              })}
              */}
                {/*
                Need an extra row for new sites
              */}
                {/*
              <Grid item>
                <FormControl variant="outlined" disabled>
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    autoWidth={true}
                    value={this.state.transferCoachCurrentSiteIds}
                    input={<OutlinedInput />}
                    autoWidth={true}
                  >


                        <MenuItem>

                        </MenuItem>


                  </StyledSelect>
                </FormControl>
              </Grid>


            </Grid>
          </Grid>
          */}

                {/*
            Arrow
          */}
                {/*}
          <Grid item xs={1} style={{marginTop: '45px'}}>
            <Grid item>
              <ForwardIcon style={{fill: 'white', fontSize:'40', marginTop:'0px',}}/>
            </Grid>
            {this.state.transferCoachCurrentSiteIds.map(
              (siteId, index)=>{
                return <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>

                          <Grid item>
                            <ForwardIcon style={{fill: '#0988ec', fontSize:'40', marginTop:'4px',}}/>
                          </Grid>
                        </Grid>
              }
            )}

            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>

              <Grid item>
                <ForwardIcon style={{fill: '#0988ec', fontSize:'40', marginTop:'4px',}}/>
              </Grid>
            </Grid>

          </Grid>
          */}
                {/*
            To Site options
          */}

                {/*
          <Grid item xs={4} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <ForwardIcon style={{fill: 'white', fontSize:'40', marginTop:'0px',}}/>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                    autoWidth={true}
                    value={this.state.transferCoachNewSiteIds}
                    onChange={(event) => this.handleTransferCoachSiteDropdown(event.target.value)}
                    input={<OutlinedInput />}
                    autoWidth={true}
                  >
                    {this.props.siteData.map(
                      (option, index)=>{

                        return <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>

                    })}
                  </StyledSelect>
                </FormControl>
              </Grid>
            </Grid>

          </Grid>
          */}

                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginTop: '45px' }}
                >
                  <Grid item xs={1} />
                  <Grid item xs={1}>
                    <FirebaseContext.Consumer>
                      {(firebase: Firebase) => (
                        <Button
                          onClick={_ => {
                            this.updateCoachSites(firebase)
                          }}
                        >
                          {this.state.saved ? (
                            <img
                              alt="Save"
                              src={SaveGrayImage}
                              style={{
                                width: '80%',
                                minWidth: '70px',
                              }}
                            />
                          ) : (
                            <img
                              alt="Save"
                              src={SaveImage}
                              style={{
                                width: '80%',
                                minWidth: '70px',
                              }}
                            />
                          )}
                        </Button>
                      )}
                    </FirebaseContext.Consumer>
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : this.state.view === 4 ? (
            <>
              <Grid item xs={1} style={{ marginTop: '45px' }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={3}
                >
                  <Grid item>
                    <Typography variant="h6" style={{ marginTop: '15px' }}>
                      Teacher
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{ marginTop: '20px' }}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{ marginTop: '25px' }}>
                      Coach
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{ marginTop: '25px' }}>
                      Site
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{ marginTop: '25px' }}>
                      Program
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={5} style={{ marginTop: '45px' }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      spacing={3}
                    >
                      <Grid item xs={6}>
                        <TextField
                          id="teacher-firstName"
                          label="First Name"
                          type="text"
                          value={this.state.editTeacherFirstName}
                          InputProps={{
                            readOnly: false,
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
                            readOnly: false,
                          }}
                          variant="outlined"
                          onChange={this.handleEditInputChange('lastName')}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <TextField
                      style={{ width: '42vw', maxWidth: '470px' }}
                      id="teacher-email"
                      label="Email"
                      type="text"
                      value={this.state.editEmail}
                      InputProps={{
                        readOnly: false,
                      }}
                      variant="outlined"
                      onChange={this.handleEditInputChange('email')}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      style={{ width: '42vw', maxWidth: '470px' }}
                      id="teacher-Coach"
                      type="text"
                      value={this.state.editCoach}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      style={{ width: '42vw', maxWidth: '470px' }}
                      id="teacher-Site"
                      type="text"
                      value={this.state.editSite}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      style={{ width: '42vw', maxWidth: '470px' }}
                      id="teacher-Program"
                      type="text"
                      value={this.state.editProgram}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: '45px' }}
              >
                <Grid item xs={1} />
                <Grid item xs={1}>
                  <FirebaseContext.Consumer>
                    {(firebase: Firebase) => (
                      <Button
                        onClick={_ => {
                          this.editTeacher(firebase)
                        }}
                      >
                        {this.state.saved ? (
                          <img
                            alt="Save"
                            src={SaveGrayImage}
                            style={{
                              width: '80%',
                              minWidth: '70px',
                            }}
                          />
                        ) : (
                          <img
                            alt="Save"
                            src={SaveImage}
                            style={{
                              width: '80%',
                              minWidth: '70px',
                            }}
                          />
                        )}
                      </Button>
                    )}
                  </FirebaseContext.Consumer>
                </Grid>
              </Grid>
            </>
          ) : null}
        </Grid>
      </>
    )
  }
}

Coaches.contextType = FirebaseContext
export default Coaches
