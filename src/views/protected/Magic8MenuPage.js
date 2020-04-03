import React, { Component } from "react";
import "../../App.css";
import PropTypes from "prop-types";
import Magic8Card from "../../components/Magic8Card.tsx";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import FirebaseContext from "../../components/Firebase/FirebaseContext";
import AppBar from "../../components/AppBar";
import { withStyles } from "@material-ui/core/styles";
import AssocCoopIconImage from "../../assets/images/AssocCoopIconImage.svg";
import ClassroomClimateIconImage from "../../assets/images/ClassroomClimateIconImage.svg";
import InstructionIconImage from "../../assets/images/InstructionIconImage.svg";
import ListeningIconImage from "../../assets/images/ListeningIconImage.svg";
import MathIconImage from "../../assets/images/MathIconImage.svg";
import SequentialIconImage from "../../assets/images/SequentialIconImage.svg";
import EngagementIconImage from "../../assets/images/EngagementIconImage.svg";
import TransitionTimeIconImage from "../../assets/images/TransitionTimeIconImage.svg";
import ObservationModal from '../../components/ObservationModal';
import ResultsModal from '../../components/ResultsModal';
import TrainingModal from '../../components/TrainingModal';
import TransitionTimeObservationPopUp from '../../components/TransitionComponents/TransitionTimeObservationPopUp';
import ClassroomClimateObservationPopUp from '../../components/ClassroomClimateComponent/ClassroomClimateObservationPopUp';
import MathInstructionObservationPopUp from '../../components/MathInstructionComponents/MathInstructionObservationPopUp';
import StudentEngagementObservationPopUp from '../../components/StudentEngagementObservationPopUp';
import LevelOfInstructionObservationPopUp from '../../components/LevelOfInstructionObservationPopUp';
import ListeningToChildrenObservationPopUp from '../../components/ListeningToChildrenObservationPopUp';
import SequentialActivitiesObservationPopUp from '../../components/SequentialActivitiesComponents/SequentialActivitiesObservationPopUp';
import AssociativeCooperativeInteractionsObservationPopUp from '../../components/AssociativeCooperativeComponents/AssociativeCooperativeInteractionsObservationPopUp';
import LockedModal from '../../components/LockedModal';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import { changeTeacher } from '../../state/actions/teacher';
import { connect } from 'react-redux';

const CardRow = styled.div`
  position: relative;
  display: block;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 1
  },
  goButton: {
    backgroundColor: "#2196F3",
    marginLeft: "75%",
    transform: "scale(1.1)",
    display: "flex",
    marginBottom: "5px",
    color: "white",
    marginTop: "4vh"
  },
  titleText: {
    fontSize: "2.9em",
    color: "#000000",
    marginTop: "5%",
    fontFamily: "Arimo"
  },
  instructionText: {
    fontSize: "1em",
    color: "#000000",
    marginLeft: "17%",
    marginTop: "2%",
    marginBottom: "2vh",
    fontFamily: "Arimo"
  },

};

const MAP = {
  None: 0,
  TransitionTime: 1,
  ClassroomClimate: 2,
  MathInstruction: 3,
  StudentEngagement: 4,
  LevelOfInstruction: 5,
  ListeningToChildren: 6,
  SequentialActivities: 7,
  AssociativeCooperativeInteractions: 8
};

/**
 * magic 8 menu
 * @class Magic8MenuPage
 */
class Magic8MenuPage extends Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      allowed: false,
      numSelected: 0,
      selected: "none",
      unlocked: [],
      unlockedData: false,
      page: '',
      teacherId: '',
      teacherName: '',
      teacher: {}
    };

    this.setUnlockedSectionsState = this.setUnlockedSectionsState.bind(this);
  }

  /**
   * @param {string} selected 
   * @param {string} title 
   * @return {void}
   */
  onClick = (selected, title) => {
    if (selected && this.state.numSelected > 0) {
      this.setState({
        numSelected: this.state.numSelected - 1,
        selected: "none"
      });
      if (this.state.numSelected === 1) {
        this.setState({ allowed: false });
      }
    } else if (this.state.numSelected < 1) {
      this.setState({
        numSelected: this.state.numSelected + 1,
        allowed: true,
        selected: title
      });
    }
  }

  handleGoButton = () => {
    if (this.state.page === "Training") {
      this.props.history.push({
        pathname: `/${this.state.selected}Training`,
      });
    } else if (this.state.unlocked.includes(MAP[this.state.selected])) {
      if (this.state.page === "Observe") {
        this.props.history.push({
          pathname: `/${this.state.selected}`,
        });
      } else if (this.state.page === "Results") {
        this.props.history.push({
          pathname: `/${this.state.selected}Results`,
        });
      }
    }
  };

  /**
   * @return {void}
   */
  setUnlockedSectionsState() {
    const firebase = this.context;
    firebase.getUnlockedSections().then(unlocked => {
      this.setState({
        unlocked: unlocked,
        unlockedData: true
      });
    });
  }

  /**
   * @return {void}
   */
  handleCloseModal = () => {
    this.setState({
      numSelected: 0
    })
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    this.setUnlockedSectionsState();
    this.setState({
      page: this.props.history.location.state.type === "Training"
        ? "Training"
        : this.props.history.location.state.type === "Observe"
        ? "Observe"
        : "Results",
    });
  }

  /**
   * 
   * @param {Props} prevProps 
   */
  componentDidUpdate(prevProps) {
    if (this.props.location.state.type !== prevProps.location.state.type) {
      this.setState({
        page: this.props.location.state.type,
      });
    }
  }

  /**
   * @param {event} event
   */
  changeTeacher = (event) => {
    this.props.changeTeacher(event.target.value);
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    const ObservationPopUp = {
      'TransitionTime': <TransitionTimeObservationPopUp />,
      'ClassroomClimate': <ClassroomClimateObservationPopUp />,
      'MathInstruction': <MathInstructionObservationPopUp />,
      'StudentEngagement': <StudentEngagementObservationPopUp />,
      'LevelOfInstruction': <LevelOfInstructionObservationPopUp />,
      'ListeningToChildren': <ListeningToChildrenObservationPopUp />,
      'SequentialActivities': <SequentialActivitiesObservationPopUp />,
      'AssociativeCooperativeInteractions': <AssociativeCooperativeInteractionsObservationPopUp />
    }
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh', overflowX: 'hidden'}}>
        <div>
          <FirebaseContext.Consumer>
            {firebase => <AppBar firebase={firebase} />}
          </FirebaseContext.Consumer>
        </div>
        <div style={{flexGrow: 1}}>
          <Grid container direction="column" justify="flex-start" alignItems="center" style={{width: '100vw', height: '100%', paddingTop: '3em'}}>
            <Grid item style={{width: '70vw', paddingBottom: '1em'}}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={9}>
                  <Grid container direction="row" justify="flex-start" alignItems="center">
                    <Typography style={{fontSize:'3em'}}>
                      {this.state.page}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid container direction="row" justify="flex-end" alignItems="center">
                    {this.props.history.location.state.type === "Training" ? <div /> : (
                      <TextField
                        select
                        style={{width: '100%'}}
                        value={this.props.teacherSelected}
                        onChange={this.changeTeacher}
                        InputLabelProps={{ shrink: true, style: {fontFamily: 'Arimo'} }}
                        InputProps={{style: {fontFamily: 'Arimo', fontStyle: 'normal'}}}
                      >
                        {this.props.teacherList.map((teacher, index)=> 
                          {return <MenuItem key={index} id={teacher.id} value={teacher} style={{fontFamily: 'Arimo'}}>
                            <em>{teacher.firstName + " " + teacher.lastName}</em>
                          </MenuItem>})}
                      </TextField>)
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{width: '70vw', paddingBottom: '1.5em'}}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={12}>
                  <Typography style={{fontSize: '1.2em'}}>
                    Select the skill you would like to{" "}
                    {this.state.page === "Training" ? "learn:" : "focus on:"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{width: '70vw', paddingBottom: '1em'}}>
              <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                  <Magic8Card
                    title="TransitionTime"
                    icon={TransitionTimeIconImage}
                    onClick={this.onClick}
                    numSelected={this.state.numSelected}
                    unlocked={this.state.unlocked.includes(1)}
                    page={this.state.page}
                  />
                </Grid>
                <Grid item>
                  <Magic8Card
                    title="ClassroomClimate"
                    icon={ClassroomClimateIconImage}
                    onClick={this.onClick}
                    numSelected={this.state.numSelected}
                    unlocked={this.state.unlocked.includes(2)}
                    page={this.state.page}
                  />
                </Grid>
                <Grid item>
                  <Magic8Card
                    title="MathInstruction"
                    icon={MathIconImage}
                    onClick={this.onClick}
                    numSelected={this.state.numSelected}
                    unlocked={this.state.unlocked.includes(3)}
                    page={this.state.page}
                  />
                </Grid>
                <Grid item>
                  <Magic8Card
                    title="StudentEngagement"
                    icon={EngagementIconImage}
                    onClick={this.onClick}
                    numSelected={this.state.numSelected}
                    unlocked={this.state.unlocked.includes(4)}
                    page={this.state.page}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{width: '70vw'}}>
              <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                  <Magic8Card
                    title="LevelOfInstruction"
                    icon={InstructionIconImage}
                    onClick={this.onClick}
                    numSelected={this.state.numSelected}
                    unlocked={this.state.unlocked.includes(5)}
                    page={this.state.page}
                  />
                </Grid>
                <Grid item>
                  <Magic8Card
                    title="ListeningToChildren"
                    icon={ListeningIconImage}
                    onClick={this.onClick}
                    numSelected={this.state.numSelected}
                    unlocked={this.state.unlocked.includes(6)}
                    page={this.state.page}
                  />
                </Grid>
                <Grid item>
                  <Magic8Card
                    title="SequentialActivities"
                    icon={SequentialIconImage}
                    onClick={this.onClick}
                    numSelected={this.state.numSelected}
                    unlocked={this.state.unlocked.includes(7)}
                    page={this.state.page}
                  />
                </Grid>
                <Grid item>
                  <Magic8Card
                    title="AssociativeCooperativeInteractions"
                    icon={AssocCoopIconImage}
                    onClick={this.onClick}
                    numSelected={this.state.numSelected}
                    unlocked={this.state.unlocked.includes(8)}
                    page={this.state.page}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <ObservationModal
            open={
              this.state.numSelected===1 &&
              this.state.page==="Observe" &&
              this.state.unlocked.includes(MAP[this.state.selected]) &&
              this.state.unlockedData
            }
            content={ObservationPopUp[this.state.selected]}
            handleBegin={this.handleGoButton}
            handleClose={this.handleCloseModal}
          />
          <LockedModal
            open={
              this.state.numSelected===1 &&
              (this.state.page==="Observe" || this.state.page==="Results") &&
              !this.state.unlocked.includes(MAP[this.state.selected]) &&
              this.state.unlockedData
            }
            handleClose={this.handleCloseModal}
          />
          <ResultsModal
            open={
              this.state.numSelected===1 &&
              this.state.page==="Results" &&
              this.state.unlocked.includes(MAP[this.state.selected]) &&
              this.state.unlockedData
            }
            handleBegin={this.handleGoButton}
            handleClose={this.handleCloseModal}
            tool={this.state.selected}
          />
          <TrainingModal
            open={
              this.state.numSelected===1 &&
              this.state.page==="Training" &&
              this.state.unlockedData
            }
            handleBegin={this.handleGoButton}
            handleClose={this.handleCloseModal}
            tool={this.state.selected}
          />
        </div>
      </div>
    );
  }
}

Magic8MenuPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  changeTeacher: PropTypes.func.isRequired,
  teacherSelected: PropTypes.exact({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    notes: PropTypes.string,
    id: PropTypes.string,
    phone: PropTypes.string,
    role: PropTypes.string,
    school: PropTypes.string
  }).isRequired,
  teacherList: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    teacherSelected: state.teacherSelectedState.teacher,
    teacherList: state.teacherListState.teachers
  };
};

Magic8MenuPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, { changeTeacher })(Magic8MenuPage));
