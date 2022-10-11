import { 
        Grid, 
        TextField, 
        Typography,
        Dialog,
        DialogActions,
        DialogTitle,
        Button,
       } from '@material-ui/core'
import React, { Component } from 'react'
import Firebase, { FirebaseContext } from '../Firebase'
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif';
import styled from 'styled-components'
import { isThisQuarter } from 'date-fns';

const TableRow = styled.tr`
background-color: white;
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
  archivesList: Array<Object>
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
      sortType: "",
      archivesList: []
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
      this.setState({ // Hold off setting new state until success has been determined
        archiveTeacherId: "",
        archiveTeacherCoach: "",
        archiveModalOpen: false,
        successModalOpen: true,
        archiveType: ""

      });
      // window.location.reload()
      
    });
  }

  async unarchiveCoach(firebase:Firebase) {
    firebase
    const {
      archiveCoachId,
    } = this.state

    await firebase.unarchiveCoach(archiveCoachId)
    .catch(e => {
      console.log(e)
      alert('Unable to unarchive teacher. Please try again')})
    .finally(() => {
      this.setState({ // Hold off setting new state until success has been determined
        archiveTeacherId: "",
        archiveTeacherCoach: "",
        archiveModalOpen: false,
        successModalOpen: true,
        archiveType: ""
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
        archiveTeacherId: "",
        archiveTeacherCoach: "",
        archiveCoachId: "",
        archiveType: ""
      })
  }

  successModalClose = (): void => {
    if(this.state.awaitingConfirmationRef) {
      this.state.awaitingConfirmationRef.resolve(false)
    }
      this.setState({
          awaitingConfirmationRef: null,
          archiveTeacherId: "",
          archiveTeacherCoach: "",
          archiveCoachId: "",
          successModalOpen: false,
          archiveType: ""
      })
    window.location.reload()
  }

  handleTeacherArchiveClick = (item) => {
    this.archiveModalOpen();
    this.setState({
      archiveTeacherId: item.id,
      archiveTeacherCoach: item.coach,
      archiveType: "teacher"
    })
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
      case "firstName":
        archivesList.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0));
        console.log("last name");
        break;
      case "firstNameReverse":
        archivesList.sort((a,b) => (b.firstName > a.firstName) ? 1 : ((a.firstName > b.firstName) ? -1 : 0));
        console.log("reverse last name");
        break;
      case "siteName":
        archivesList.sort((a,b) => (a.site > b.site) ? 1 : ((b.site > a.site) ? -1 : 0));
        console.log("site name");
        break;
      case "siteNameReverse":
        archivesList.sort((a,b) => (b.site > a.site) ? 1 : ((a.site > b.site) ? -1 : 0));
        console.log("reverse site name");
        break;
      case "program":
        archivesList.sort((a,b) => (a.program > b.program) ? 1 : ((b.program > a.program) ? -1 : 0));
        console.log("program name");
        break;
      case "programReverse":
        archivesList.sort((a,b) => (b.program > a.program) ? 1 : ((a.program > b.program) ? -1 : 0));
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

    this.setState({archivesList: archivesList});

  }
  
  render() {
    return (<>
    <Dialog open={this.state.successModalOpen}>
          <DialogTitle style={{ fontFamily: 'Arimo' }}>
              The user has been removed from archives.
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
            marginTop: '130px' }}
        >
          {this.state.archivedData ? (
          <table style={{borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{borderBottom:'2px solid #0988ec'}}>
              <tr>
                <TableHeader
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
                  <Typography variant="h6" gutterBottom>
                    Last Name
                  </Typography>
                </TableHeader>
                <TableHeader
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
                  <Typography variant="h6" gutterBottom>
                    First Name
                  </Typography>
                </TableHeader>
                <TableHeader
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
                  <Typography variant="h6" gutterBottom>
                    Role
                  </Typography>
                </TableHeader>
                <TableHeader
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
                  <Typography variant="h6" gutterBottom>
                    Site
                  </Typography>
                </TableHeader>
                <TableHeader
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
                  <Typography variant="h6" gutterBottom>
                    Program
                  </Typography>
                </TableHeader>
              </tr>
            </thead>
            <tbody>

              {this.state.archivedData.map((value, index) => {
                return (
                  <TableRow 
                key={index} 
                onClick={() => {value.role === "teacher" ? this.handleTeacherArchiveClick(value) : this.handleCoachArchiveClick(value)}}
                >
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.lastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.firstName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.role[0].toUpperCase() + value.role.substring(1)}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.site}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.program}
                    </Typography>
                  </td>
                </TableRow>
                )
              })}

            {/* {this.props.teacherData.map((value, index) => {
                return (
                <TableRow 
                key={index} 
                onClick={() => {this.handleTeacherArchiveClick(value)}}
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
                      Teacher
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
                </TableRow>
              )})}

              {this.props.coachData.map((value, index) => {
                return (
                <TableRow 
                key={index} 
                onClick={() => {this.handleCoachArchiveClick(value)}}
                >
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.lastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.firstName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      Coach
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      <ul style={{listStyleType: 'none', padding: '0', margin: '0'}}>
                        {value.siteList.map((item) => {
                          return (
                            <li>
                              {item.siteName}
                            </li>
                          )
                        })}
                      </ul>
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                    <ul style={{listStyleType: 'none', padding: '0', margin: '0'}}>
                        {value.siteList.map((item) => {
                          return (
                            <li>
                              {item.programName}
                            </li>
                          )
                        })}
                      </ul>
                    </Typography>
                  </td>
                </TableRow>
              )})} */}
              
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
    </Grid>
    </>)
  }
}

Archives.contextType = FirebaseContext
export default Archives