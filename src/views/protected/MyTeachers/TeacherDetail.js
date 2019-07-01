import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../../components/Firebase/context';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AppBar from '../../../components/AppBar';
import LabeledInfo from '../../../components/MyTeachersComponents/LabeledInfo';
import TransitionTimeSvg from '../../../assets/icons/TransitionTime.svg';
import StudentEngagementSvg from '../../../assets/icons/StudentEngagement.svg';
import SequentialActivitiesSvg from '../../../assets/icons/SequentialActivities.svg';
import ListeningToChildrenSvg from '../../../assets/icons/ListeningtoChildren.svg';
import MathInstructionSvg from '../../../assets/icons/MathInstruction.svg';
import LevelOfInstructionSvg from '../../../assets/icons/LevelofInstruction.svg';
import ClassroomClimateSvg from '../../../assets/icons/ClassroomClimate.svg';
import AssocCoopInteractionsSvg from '../../../assets/icons/AssocCoopInteractions.svg';
// import Firebase from "../../../components/Firebase";

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    maxHeight: '100%'
  },
  container: {
    //border: '2px solid #000000',
    margin: '2% 10% 0 10%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-start',
    maxHeight: '50%'
  },
  button: {
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  },
  teacherHeader: {
    //border: '2px solid #DC143C',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '2em',
    marginTop: '1em',
    minWidth: '40%',
    maxWidth: '50%'
  },
  contentContainer: {
    //border: '2px solid #F700FF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  teacherCard: {
    //border: '2px solid #7FFF00',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexGrow: 1,
    marginTop: '1em',
    width: '50%',
    fontSize: '1.5em'
  },
  magicEightCard: {
    //border: '2px solid #00FFFF',
    padding: '0px',
    width: '50%',
    margin: '0',
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
    gridTemplateRows: '50% 50%'
  },
  actionButton: {
    marginLeft: '1em'
  },
  magicEightItem: {
    margin: '3% 3% 15% 3%',
    flexBasis: '22%',
    listStyleType: 'none',
    textAlign: 'center'
  },
  magicEightButton: {
    marginBottom: '15%',
    backgroundColor: '#FFFFFF',
    border: '0px none #FFFFFF',
    borderRadius: '10%',
    padding: '0px',
    width:'80%',
    boxShadow: 'none'
  },
  img: {
    maxHeight: '100px',
    margin: '5%'
  },
  deleteModalButtonContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  deleteModalButton: {
    border: '2px solid #000000',
    textTransform: 'none',
    fontSize: '1em'
  },

  //Minor Breakpoint -> Shrinking desktop window
  '@media only screen and (max-width:1270px)': {
    container: {
      margin: '2% 7% 0 7%'
    }
  },

  //Minor Breakpoint -> Shrinking desktop window
  '@media only screen and (max-width:1145px)': {
    container: {
      margin: '2% 5% 0 5%'
    },
    teacherHeader: {
      minWidth: '50%'
    }
  },

  // iPad Pro 12.9" Portrait
  '@media only screen and (max-width:1024px) and (orientation:portrait)': {
    container: {
      margin: '2% 5% 0 5%',
      fontSize: '1.5em'
    },
    teacherHeader: {
      minWidth: '60%',
      borderBottom: '1px solid #B3D8E6'
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    teacherCard: {
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      fontSize: '1.3em',
      borderBottom: '1px solid #B3D8E6'
    },
    magicEightCard: {
      width: '100%',
      margin: '1em 0 0 0'
    }
  },

  // iPad Pro 10.5" Portrait
  '@media only screen and (max-width:834px) and (orientation: portrait)': {
    container: {
      margin: '2% 5% 0 5%',
      fontSize: '1em'
    },
    teacherHeader: {
      minWidth: '60%',
      borderBottom: '1px solid #B3D8E6'
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    teacherCard: {
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      fontSize: '1.3em',
      borderBottom: '1px solid #B3D8E6'
    },
    magicEightCard: {
      width: '100%',
      margin: '2em 0 0 0'
    }
  },

  //iPad-Mini Portrait
  '@media only screen and (max-width:768px) and (orientation:portrait)': {
    container: {
      margin: '2% 5% 0 5%'
    },
    teacherHeader: {
      minWidth: '60%',
      borderBottom: '1px solid #B3D8E6'
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    teacherCard: {
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      borderBottom: '1px solid #B3D8E6'
    },
    magicEightCard: {
      width: '100%',
      margin: 0
    }
  },

  // iPad-Mini Landscape
  '@media only screen and (max-width:1024px) and (orientation:landscape)': {
    container: {
      margin: '2% 7% 0 7%'
    },
    teacherHeader: {
      minWidth: '50%',
      maxWidth: '60%'
    },
    teacherCard: {
      width: '40%',
      fontSize: '1.3em'
    },
    magicEightCard: {
      width: '60%'
    }
  },
};

const sortedSvg = [TransitionTimeSvg, ClassroomClimateSvg, ListeningToChildrenSvg, LevelOfInstructionSvg,
                           MathInstructionSvg, StudentEngagementSvg, SequentialActivitiesSvg, AssocCoopInteractionsSvg];

class TeacherDetail extends Component {

  constructor (props) {
    super(props);
    this.state = {
      uuid: "",
      firstName: "Practice",
      lastName: "Teacher",
      school: "Elum Entaree School",
      email: "practice@teacher.edu",
      notes: "Really sensitive about her tone\nWorking on behavior management",
      inputFirstName: "Practice",            // firstName
      inputLastName: "Teacher",              // lastName
      inputSchool: "Elum Entaree School",    // school
      inputEmail: "practice@teacher.edu",    // email
      inputNotes: "Really sensitive about her tone\nWorking on behavior management",  // notes
      isEditing: false,
      isDeleting: false
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleEditText = this.handleEditText.bind(this);
    this.handleEditConfirm = this.handleEditConfirm.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidMount () {
    // const uid = this.props.teacherID;
    // call to firebase fetching teacher object with uID
    this.forceUpdate();
  };

  handleBackClick (e) {
    // Route back to MyTeachers page
  };

  handleEditOpen (e) {
    e.preventDefault();
    this.setState({
      isEditing: true
    });
  };

  handleDeleteOpen (e) {
    e.preventDefault();
    this.setState({
      isDeleting: true
    })
  };

  handleCloseModal (e) {
    e.preventDefault();
    const { firstName, lastName, school, email, notes } = this.state;
    this.setState({
      inputFirstName: firstName,
      inputLastName: lastName,
      inputSchool: school,
      inputEmail: email,
      inputNotes: notes,
      isEditing: false,
      isDeleting: false
    });
  };

  handleEditText (e, field) {
    e.preventDefault();
    switch (field) {
      case "first-name":
        this.setState({inputFirstName: e.target.value});
        break;
      case "last-name":
        this.setState({inputLastName: e.target.value});
        break;
      case "school":
        this.setState({inputSchool: e.target.value});
        break;
      case "email":
        this.setState({inputEmail: e.target.value});
        break;
      case "notes":
        this.setState({inputNotes: e.target.value});
        break;
      default:
        console.log("Should never be here.");
        break;
    }
  };

  handleEditConfirm (e) {
    e.preventDefault();
    // Send push call to firebase to edit teacher's (partner's) field(s) in dB
    // get an updated snapshot of teacher info
    // update this.state
    this.setState({
      isEditing: false
    });
    this.forceUpdate();
  };

  handleDeleteConfirm (e) {
    e.preventDefault();
    // Send call to firebase to pop this teacher's ID from the coach's 'partners' list
    // get an updated snapshot of the teacher info
    // update this.state
    this.setState({
      isDeleting: false
    });
    this.forceUpdate();
  };

  render() {
    const { classes } = this.props;
    const { firstName, lastName, school, email, notes, isEditing, isDeleting } = this.state;

    return(
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <div className={classes.container}>
          <Button variant="contained" size="medium" className={classes.button} onClick={this.handleBackClick}>
            <ChevronLeftRoundedIcon />
            <b>My Teachers</b>
          </Button>
          <div className={classes.teacherHeader}>
            <span>
              <b>{firstName} {lastName}</b><br/>
              Teacher
            </span>
            <div>
              <Fab aria-label="Edit" onClick={this.handleEditOpen} className={classes.actionButton} size='small'
                   style={{backgroundColor: '#F9FE49'}}>
                <EditOutlinedIcon style={{color: '#555555'}} />
              </Fab>
              <Fab aria-label="Delete" onClick={this.handleDeleteOpen} className={classes.actionButton} size='small'
                   style={{backgroundColor: '#FF3836'}}>
                <DeleteForeverIcon style={{color: '#C9C9C9'}}/>
              </Fab>
            </div>
          </div>
          <Grid direction="row" justify="space-between" alignItems="stretch" className={classes.contentContainer}>
            <div className={classes.teacherCard}>
              <div style={{display:'flex', flexDirection:'row', minWidth:'45%'}}>
                <LabeledInfo label="First Name" field={firstName}/>
                <LabeledInfo label="Last Name" field={lastName}/>
              </div>
              <LabeledInfo label="School" field={school}/>
              <LabeledInfo label="Email" field={email}/>
              <LabeledInfo label="Notes" field={notes}/>
            </div>
            <ol className={classes.magicEightCard}>
              {sortedSvg.map((item, key) =>
                <li key={key} className={classes.magicEightItem}>
                  <Button variant='contained' className={classes.magicEightButton}>
                    <img src={item} alt="Magic Eight not found" className={classes.img}/>
                  </Button>
                  {/* Logic for getting recent observation/number of goals met*/}
                  <p>Last Observed:<br />
                  1-1-2019</p>
                  <p>Goals Met: 0</p>
                </li>
              )}
            </ol>
          </Grid>
          <Dialog
            open={isDeleting}
            onClose={this.handleCloseModal}
            aria-labelledby="delete-teacher-modal"
            aria-describedby="prompts a coach to confirm deleting a teacher from MyTeachers"
          >
            <DialogTitle id="delete-teacher-title" style={{textAlign: 'center'}}>
              Are you sure you want to remove <b style={{textDecoration: 'underline', color: '#007DAF'}}>
              {firstName} {lastName}</b> from MyTeachers?
            </DialogTitle>
            <DialogActions className={classes.deleteModalButtonContainer}>
              <Button onClick={this.handleCloseModal} className={classes.deleteModalButton} autoFocus
                      style={{borderColor: '#09A1B3'}}>
                No,<b style={{color: '#09A1B3', padding:'0 0.3em 0 0.3em'}}>KEEP</b>{firstName} {lastName}
              </Button>
              <Button onClick={this.handleDeleteConfirm} className={classes.deleteModalButton}
                      style={{borderColor: '#F1231C'}}>
                Yes,<b style={{color: '#F1231C', padding:'0 0.3em 0 0.3em'}}>DELETE</b>{firstName} {lastName}
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={isEditing} onClose={this.handleCloseModal} aria-labelledby="edit-teacher-title">
            <DialogTitle id="edit-teacher-title">Edit {firstName} {lastName}'s Info</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Make edits to the form below and confirm to update this teacher's information.
              </DialogContentText>
              <TextField
                autoFocus
                defaultValue={firstName}
                onChange={this.handleEditText.bind(this, "first-name")}
                margin="dense"
                id="first-name"
                label="First Name"
                type="text"
                fullWidth
              />
              <TextField
                defaultValue={lastName}
                onChange={this.handleEditText.bind(this, "last-name")}
                margin="dense"
                id="last-name"
                label="Last Name"
                type="text"
                fullWidth
              />
              <TextField
                defaultValue={school}
                onChage={this.handleEditText.bind(this, "school")}
                margin="dense"
                id="school"
                label="School"
                type="text"
                fullWidth
              />
              <TextField
                defaultValue={email}
                onChange={this.handleEditText.bind(this, "email")}
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
              />
              <TextField
                defaultValue={notes}
                onChange={this.handleEditText.bind(this, "notes")}
                margin="dense"
                id="notes"
                label="Notes"
                multiline
                rows={10}
                rowsMax={10}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseModal} style={{color:'#F1231C'}}>
                Cancel
              </Button>
              <Button onClick={this.handleEditConfirm} style={{color:'#09A1B3'}}>
                Confirm Edits
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}

TeacherDetail.propTypes = {
  teacherID: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

TeacherDetail.contextType = FirebaseContext;
export default withStyles(styles)(TeacherDetail);
