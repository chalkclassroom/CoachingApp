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
  siteData: Array<Object>
  sitesList: Array<Object>
}

interface State {
    view: number
    saved: boolean
    currentSites: Array<Object>
    sortType: string
}

class Sites extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  
      this.state = {
    view: 1,
    saved: true,
    currentSites: [],
    sortType: ""
  }
  
  }

  componentDidMount = async () => {
  }

  handlePageChange = (pageNumber: number) => {
    switch (pageNumber) {
      default : case 1:
        if (!this.state.saved) {
          // this.onSaveModalOpen();
          break;
        } else {
          this.setState({view: pageNumber});
          this.props.changePage("Sites");
          break;
        }
      case 2:
        if (!this.state.saved) {
          // this.onSaveModalOpen();
          break;
        } else {
          this.setState({view: pageNumber});
          this.props.changePage("SitesAdd");
          break;
        }
      case 3:
        if (!this.state.saved) {
          // this.onSaveModalOpen();
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

  render() {
    
    return (<>
    <Button
    onClick={() => {this.context.populateFirebase()}}
    >Click Me</Button>
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
            <TableRow key={site.id} onClick={() => {this.handlePageChange(3)}}>
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
                // value={this.state.editTeacherFirstName}
                InputProps={{
                  readOnly: false
                }}
                variant="outlined"
                // onChange={this.handleEditInputChange('firstName')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                id="teacher-lastName"
                label="Last Name"
                type="text"
                // value={this.state.editTeacherLastName}
                InputProps={{
                  readOnly: false
                }}
                variant="outlined"
                // onChange={this.handleEditInputChange('lastName')}
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
              // value={this.state.editEmail}
              InputProps={{
                readOnly: false
              }}
              variant="outlined"
              // onChange={this.handleEditInputChange('email')}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{width:'42vw', maxWidth: '470px'}}
              id="teacher-Coach"
              type="text"
              // value={this.state.editCoach}
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
              // value={this.state.editSite}
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
                // onClick={(_)=>{this.editTeacher(firebase)}}
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