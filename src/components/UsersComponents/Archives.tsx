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
  cursor: pointer;
}
`

interface Props {
  changePage(pageName: string): void
  userRole: string
  location: string
  teacherData: Array<Object>
  coachData: Array<Object>
}

interface State {
  archiveModalOpen: boolean
  awaitingConfirmationRef: { resolve: (discard: boolean) => void  } | null
  archiveTeacherId: string
  archiveTeacherCoach: string
  archiveCoachId: string
  archivedData: Array<Object>
  successModalOpen: boolean
  type: string
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
      type: "",
    }

  }

  componentDidMount = async () => {
    let archived = await this.context.getArchives();
    this.setState({archivedData: archived})
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
        type: ""

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
        type: ""
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
        type: ""
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
          type: ""
      })
    window.location.reload()
  }

  handleTeacherArchiveClick = (item) => {
    this.archiveModalOpen();
    this.setState({
      archiveTeacherId: item.teacherId,
      archiveTeacherCoach: item.coachId,
      type: "teacher"
    })
  }

  handleCoachArchiveClick = (item) => {
    this.archiveModalOpen();
    this.setState({
      archiveCoachId: item.coachId,
      type: "coach"
    })
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
                <Button onClick={(_) => {this.state.type === "teacher" ? this.unarchiveTeacher(firebase) : this.unarchiveCoach(firebase)}}>
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
          {this.props.teacherData.length > 0 ? (
          <table style={{borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{borderBottom:'2px solid #0988ec'}}>
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
                    Role
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    Site
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    Program
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>

            {this.props.teacherData.map((value, index) => {
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
    </Grid>
    </>)
  }
}

Archives.contextType = FirebaseContext
export default Archives