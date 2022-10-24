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
} from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import ForwardIcon from '@material-ui/icons/Forward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FolderIcon from '@material-ui/icons/Folder';
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif';
import Firebase, { FirebaseContext } from '../Firebase';
import SaveImage from '../../assets/images/SaveImage.svg'; 
import SaveGrayImage from '../../assets/images/SaveGrayImage.svg';
import styled from 'styled-components';

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
  coachData: Array<Object>
  teacherData: Array<Object>
  sitesList: Array<Object>
  updateCoachData(data): void 
  updateTeacherData(data): void 
}

interface State {
    view: number
    saved: boolean
    currentSites: Array<Object>
    sortType: string
    editCoachFirstName: string
    editCoachLastName: string
    editCoachEmail: string
    editCoachSiteName: string
    editCoachProgramName: string
    editCoachId: string
    editCoachSiteId: string
    editCoachProgramId: string
    successModalOpen: boolean
    success: boolean
    saveModalOpen: boolean
    pendingView: number
    awaitingConfirmationRef: { resolve: (discard: boolean) => void  } | null

}

class Sites extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  
      this.state = {
    view: 1,
    saved: true,
    currentSites: [],
    sortType: "",
    editCoachFirstName: "",
    editCoachLastName: "",
    editCoachEmail: "",
    editCoachSiteName: "",
    editCoachProgramName: "",
    editCoachId: "",
    editCoachSiteId: "",
    editCoachProgramId: "",
    successModalOpen: false,
    success: true,
    saveModalOpen: false,
    pendingView: 1,
    awaitingConfirmationRef: null

  }
  
  }

  componentDidMount = async () => {
    const maxLen: number = Math.floor(Math.random() * 10)
    let choices: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let checked: Array<number> = maxLen === 0 ? [11] : []

    for(let choice = 0; choice < maxLen; choice++) {
      let num: number = choices[Math.floor(Math.random() * choices.length)];
      checked.push(num)
      choices.splice(choices.indexOf(num), 1)
    }
    console.log(checked)
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
          this.props.changePage("Sites");
          break;
        }
      case 2:
        if (!this.state.saved) {
          this.onSaveModalOpen();
          break;
        } else {
          this.setState({view: pageNumber});
          this.props.changePage("SitesAdd");
          break;
        }
      case 3:
        if (!this.state.saved) {
          this.onSaveModalOpen();
          break;
        } else {
          this.setState({view: pageNumber});
          this.props.changePage("SitesEdit");
          break;
        }
    }
  }

  sortCoaches = (sortType) => {
    var coaches = this.props.sitesList;

    this.setState({sortType: sortType});

    // Sort the teachers list
    switch (sortType) {
      case "lastName":
        coaches.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0));
        console.log("last name");
        break;
      case "lastNameReverse":
        coaches.sort((a,b) => (b.lastName > a.lastName) ? 1 : ((a.lastName > b.lastName) ? -1 : 0));
        console.log("reverse last name");
        break;
      case "firstName":
        coaches.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0));
        console.log("first name");
        break;
      case "firstNameReverse":
        coaches.sort((a,b) => (b.firstName > a.firstName) ? 1 : ((a.firstName > b.firstName) ? -1 : 0));
        console.log("reverse first name");
        break;
      case "siteName":
        coaches.sort((a,b) => (a.siteName > b.siteName) ? 1 : ((b.siteName > a.siteName) ? -1 : 0));
        console.log("site name");
        break;
      case "siteNameReverse":
        coaches.sort((a,b) => (b.siteName > a.siteName) ? 1 : ((a.siteName > b.siteName) ? -1 : 0));
        console.log("reverse site name");
        break;

      default:
        break;
    }

    this.setState({currentSites: coaches});

  }

  validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

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

      await firebase.editUserName(editCoachId, editCoachFirstName, editCoachLastName, editCoachEmail).
        catch(e => {
          console.log(e)
          alert('Unable to edit Coach. Please try again')
          this.setState({success: false})
        }).finally(() => {
            let update = this.props.coachData;
            let coachData = update.find(o => o.id === editCoachId);
            let coachDataIndex = update.indexOf(coachData);
            update[coachDataIndex].firstName = editCoachFirstName;
            update[coachDataIndex].lastName = editCoachLastName;
            update[coachDataIndex].email = editCoachEmail;

            this.props.updateCoachData(update)

            update = this.props.teacherData;
            coachData = update.filter(o => {return o.coachId === editCoachId});
            coachData.map(value => {
              coachDataIndex = update.indexOf(value);
              update[coachDataIndex].coachFirstName = editCoachFirstName;
              update[coachDataIndex].coachLastName = editCoachLastName;
            })
            this.props.updateTeacherData(update)

            update = this.props.sitesList;
            coachData = update.filter(o => {return o.id === editCoachId})
            coachData.map(value => {
              coachDataIndex = update.indexOf(value)
              update[coachDataIndex].firstName = editCoachFirstName;
              update[coachDataIndex].lastName = editCoachLastName;
              update[coachDataIndex].email = editCoachEmail;
            })
            

            this.setState({ // Hold off setting new state until success has been determined
              editCoachId: "",
              editCoachFirstName: "",
              editCoachLastName: "",
              editCoachEmail: "",
              editCoachSiteName: "",
              editCoachProgramName: "",
              editCoachSiteId: "",
              editCoachProgramId: "",
              successModalOpen: this.state.success ? true : false,
              saved: true
            });
        });
  }

  handleEditInputChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
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

  handleEditClick = (value) => {
    console.log(value)
    this.setState({
      editCoachId: value.id,
      editCoachFirstName: value.firstName,
      editCoachLastName: value.lastName,
      editCoachEmail: value.email,
      editCoachSiteName: value.siteName,
      editCoachSiteId: value.siteId,
      editCoachProgramName: value.programName,
      editCoachProgramId: value.programId
    })
    this.handlePageChange(3)
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
        editCoachFirstName: "",
        editCoachLastName: "",
        editCoachEmail: "",
        editCoachSiteName: "",
        editCoachProgramName: "",
        editCoachId: "",
        editCoachSiteId: "",
        editCoachProgramId: "",
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

  successModalClose = (): void => {
    if(this.state.awaitingConfirmationRef) {
      this.state.awaitingConfirmationRef.resolve(false)
    }
      this.setState({
          awaitingConfirmationRef: null,
          successModalOpen: false,
          saved: true,
          editCoachFirstName: "",
          editCoachLastName: "",
          editCoachEmail: "",
          editCoachSiteName: "",
          editCoachProgramName: "",
          editCoachId: "",
          editCoachSiteId: "",
          editCoachProgramId: "",
      })
    this.handlePageChange(1)
  }

  render() {
    
    return (<>
    <Button
    onClick={() => {this.context.populateFirebase()}}
    >Click Me</Button>

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
  {this.props.sitesList.length > 0 ? (<>
    <Grid container direction='row'>
  {this.state.view === 1 ? (<>
    <Grid item xs={3}>
      <Grid container direction='column' style={{ marginLeft:'30px'}}>
        <Grid item xs={6}>
          <Grid container direction='row' style={{cursor: 'default'}} onClick={() => {this.handlePageChange(2)}}>
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
      </Grid>
    </Grid>
  </>) : (this.state.view === 2 ? (<>
    <Grid item xs={3}>
      <Grid container direction='column' style={{ marginLeft:'30px'}}>
        <Grid item xs={6}>
          <Grid container direction='row' style={{cursor: 'default'}} onClick={() => {this.handlePageChange(1)}}>
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
      </Grid>
    </Grid>
  </>) : (this.state.view === 3 ? (<>
    <Grid item xs={3}>
      <Grid container direction='column' style={{ marginLeft:'30px'}}>
        <Grid item xs={6}>
            <Grid container direction='row' style={{cursor: 'default'}} >
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
          <Grid container direction='row' style={{cursor: 'default'}} onClick={() => {this.handlePageChange(1)}}>
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
      </Grid>
    </Grid>
  </>) : (null)))}
  {this.state.view === 1 ? (<>
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid
      item
      xs={8}
      style={{
        width: '100%',
        height: '38vh',
        // border: '2px solid #0988ec',
        // borderRadius: '0.5em',
        marginTop:'180px' }}
      >
      <table style={{borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{borderBottom:'2px solid #0988ec'}}>
          <tr>
            <th
              colSpan={1}
              onClick={
                () =>{
                  if(this.state.sortType == "siteName")
                  {
                    this.sortCoaches("siteNameReverse")
                  }
                  else
                  {
                    this.sortCoaches("siteName")
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
            <th colSpan={2}>
                <Typography variant="h6">
                  <strong>Instructional Coaches</strong>
                </Typography>
            </th>
          </tr>
          <tr>
            <th></th>
            <th
              onClick={
                () =>{
                  if(this.state.sortType == "lastName")
                  {
                    this.sortCoaches("lastNameReverse")
                  }
                  else
                  {
                    this.sortCoaches("lastName")
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
                    this.sortCoaches("firstNameReverse")
                  }
                  else
                  {
                    this.sortCoaches("firstName")
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
          </tr>
        </thead>
        <tbody>
          {this.props.sitesList.map((site) => {
            return (<>
            <TableRow key={site.id} onClick={() => {this.handleEditClick(site)}}>
              <td style={{textAlign:'center'}}>
                <Typography variant="h6"  >
                  {site.siteName}
                </Typography>
              </td>
              <td style={{textAlign:'center'}}>
                <Typography variant="h6"  >
                  {site.lastName}
                </Typography>
              </td>
              <td style={{textAlign:'center'}}>
                <Typography variant="h6"  >
                  {site.firstName}
                </Typography>
              </td>
            </TableRow>
            </>)
          })}
        </tbody>
      </table>
      </Grid>
    </Grid>
    </>) : (this.state.view === 2 ? (<>
    
    </>) : (this.state.view === 3 ? (<>
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
                id="teacher-lastName"
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
              id="teacher-email"
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
              value={this.state.editCoachSiteName}
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
              value={this.state.editCoachProgramName}
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
                onClick={(_)=>{this.editCoach(firebase)}}
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
    </>) : (<></>)))}
    </Grid>
    </>) :  (<>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{height: "100%", marginTop:'8vh'}}
      >
        <img src={CHALKLogoGIF} alt="Loading" width="40%" />
      </Grid>
    </>)}
</>)
    
  }
}

Sites.contextType = FirebaseContext
export default Sites