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
    margin: '2% 10% 0em 10%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    //justifyContent: 'flex-start',
    alignItems: 'flex-start',
    maxHeight: '50%'
  },
  button: {
    color: '#333333',
    //border: '1px solid #333333',
    borderRadius: 3,
    textTransform: 'none'
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
    justifyContent: 'space-between',
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
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
    gridTemplateRows: '50% 50%',
    // justifyContent: 'space-evenly',
    // alignItems: 'flex-start',
    // alignContent: 'stretch'
  },
  teacherHeader: {
    //border: '2px solid #DC143C',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '2em',
    marginTop: '1em',
    width: '50%'
  },
  actionButton: {
    //marginRight: '2em'
    marginLeft: '1em'
  },
  magicEightItem: {
    margin: '3% 3% 30% 3%',
    flexBasis: '22%',
    listStyleType: 'none',
    textAlign: 'center'
  },
  svgStyle: {
    height: '160px',
    width: '160px'
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
  }
};

const sortedSvg = [TransitionTimeSvg, ClassroomClimateSvg, ListeningToChildrenSvg, LevelOfInstructionSvg,
                           MathInstructionSvg, StudentEngagementSvg, SequentialActivitiesSvg, AssocCoopInteractionsSvg];

class TeacherDetail extends Component {

  constructor (props) {
    super(props);
    this.state = {
      inputFirstName: "Katherine",
      inputLastName: "Newman",
      inputSchool: "Ruby Major Elementary",
      inputEmail: "knewman@vanderbilt.edu",
      inputNotes: "Really sensitive about her tone\nWorking on behavior management",
      isEditing: false,
      isDeleting: false
    };


  }

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <div className={classes.container}>
          <Button variant="contained" size="medium" className={classes.button}>
            <ChevronLeftRoundedIcon />
            <b>My Teachers</b>
          </Button>
          <div className={classes.teacherHeader}>
                <span>
                  <b>Katherine Newman</b><br/>
                  Teacher
                </span>
            <div style={{}}>
              <Fab aria-label="Edit" className={classes.actionButton} size='small' style={{backgroundColor: '#F9FE49'}}>
                <EditOutlinedIcon style={{color: '#555555'}} />
              </Fab>
              <Fab aria-label="Delete" className={classes.actionButton} size='small' style={{backgroundColor: '#FF3836'}}>
                <DeleteForeverIcon style={{color: '#C9C9C9'}}/>
              </Fab>
            </div>
          </div>
          <Grid direction="row" justify="space-between" alignItems="stretch" className={classes.contentContainer}>
            <div className={classes.teacherCard}>
              <div style={{display:'flex', flexDirection:'row'}}>
                <LabeledInfo label="First Name" field="Katherine"/>
                <LabeledInfo label="Last Name" field="Newman"/>
              </div>
              <LabeledInfo label="School" field="Ruby Major Elementary"/>
              <LabeledInfo label="Email" field="knewman@vanderbilt.edu"/>
              <LabeledInfo label="Notes" field="Really sensitive about her tone\nWorking on behavior management"/>
            </div>
            <ol className={classes.magicEightCard}>
              {sortedSvg.map((item, key) =>
                <li key={key} className={classes.magicEightItem}>
                  <Button variant='contained' className={classes.magicEightButton}>
                    <img src={item} alt="Magic Eight not found" className={classes.img}/>
                  </Button>
                  <span>Last Observed:<br />
                  1-1-2019</span><br/>
                  <span>Goals Met: 0</span>
                </li>
              )}
            </ol>
          </Grid>
        </div>
      </div>
    )
  }

}

TeacherDetail.propTypes = {
  //teacher: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

TeacherDetail.contextType = FirebaseContext;
export default withStyles(styles)(TeacherDetail);
