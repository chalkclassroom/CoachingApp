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
}

interface State {
    view: number
    saved: boolean
}

class Sites extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  
      this.state = {
    view: 1,
    saved: true
  }
  
  }

  handlePageChange = (pageNumber: number) => {
    switch (pageNumber) {
      default : case 1:
        if (!this.state.saved) {
          // this.onSaveModalOpen();
          break;
        } else {
          this.setState({view: pageNumber});
          this.props.changePage("Teachers");
          break;
        }
      case 2:
        if (!this.state.saved) {
          // this.onSaveModalOpen();
          break;
        } else {
          this.setState({view: pageNumber});
          this.props.changePage("TeachersAdd");
          break;
        }
    }
  }

  render() {
    
    return (<>
    <Button
    onClick={() => {this.context.populateFirebase()}}
    >Click Me</Button>
  {this.props.coachData.length > 0 ? (<>
  {this.state.view === 1 ? (<>
    <Grid container direction='row'>
      <Grid item xs={3}>
        <Grid container direction='column' style={{ marginLeft:'30px'}}>
          <Grid item xs={6}>
            <Grid container direction='row' style={{cursor: 'default'}}>
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
    </Grid>
  </>) : (this.state.view === 2 ? (<>
    <Grid container direction='row'>
      <Grid item xs={3}>
        <Grid container direction='column' style={{ marginLeft:'30px'}}>
          <Grid item xs={6}>
            <Grid container direction='row' style={{cursor: 'default'}}>
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
    </Grid>
  </>) : (<></>))}
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
              // onClick={
              //   () =>{
              //     if(this.state.sortType == "siteName")
              //     {
              //       this.sortTeachers("siteNameReverse")
              //     }
              //     else
              //     {
              //       this.sortTeachers("siteName")
              //     }
              //   }
              // }
            >
            <TableSortLabel
              // direction = {this.state.sortType === "siteName" ? 'desc' : 'asc'}
              // active = {['siteName', 'siteNameReverse'].includes(this.state.sortType) ? true : false}
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
              // onClick={
              //   () =>{
              //     if(this.state.sortType == "firstName")
              //     {
              //       this.sortTeachers("firstNameReverse")
              //     }
              //     else
              //     {
              //       this.sortTeachers("firstName")
              //     }
              //   }
              // }
            >
              <TableSortLabel
                // direction = {this.state.sortType === "firstName" ? 'desc' : 'asc'}
                // active = {['firstName', 'firstNameReverse'].includes(this.state.sortType) ? true : false}
                >
                <Typography variant="h6">
                  Last Name
                </Typography>
              </TableSortLabel>
            </th>
            <th
              // onClick={
              //   () =>{
              //     if(this.state.sortType == "firstName")
              //     {
              //       this.sortTeachers("firstNameReverse")
              //     }
              //     else
              //     {
              //       this.sortTeachers("firstName")
              //     }
              //   }
              // }
            >
              <TableSortLabel
                // direction = {this.state.sortType === "firstName" ? 'desc' : 'asc'}
                // active = {['firstName', 'firstNameReverse'].includes(this.state.sortType) ? true : false}
                >
                <Typography variant="h6">
                  First Name
                </Typography>
              </TableSortLabel>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.coachData.map(coach => {
            return coach.siteList.map((value, index) => {
            return(
            <TableRow key={index}>
              <td style={{textAlign:'center'}}>
                <Typography variant="h6"  >
                  {value.siteName}
                </Typography>
              </td>
              <td style={{textAlign:'center'}}>
                <Typography variant="h6"  >
                  {coach.lastName}
                </Typography>
              </td>
              <td style={{textAlign:'center'}}>
                <Typography variant="h6"  >
                  {coach.firstName}
                </Typography>
              </td>
            </TableRow>
            )})
          })}
        </tbody>
      </table>
      </Grid>
    </Grid>
    </>) :  (<></>)}
</>)
    
  }
}

Sites.contextType = FirebaseContext
export default Sites