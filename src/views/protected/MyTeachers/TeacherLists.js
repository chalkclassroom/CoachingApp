import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import TransitionTimeSvg from '../../../assets/icons/TransitionTime.svg';
import StudentEngagementSvg from '../../../assets/icons/StudentEngagement.svg';
import SequentialActivitiesSvg from '../../../assets/icons/SequentialActivities.svg';
import ListeningToChildrenSvg from '../../../assets/icons/ListeningtoChildren.svg';
import MathInstructionSvg from '../../../assets/icons/MathInstruction.svg';
import LevelOfInstructionSvg from '../../../assets/icons/LevelofInstruction.svg';
import ClassroomClimateSvg from '../../../assets/icons/ClassroomClimate.svg';
import AssocCoopInteractionsSvg from '../../../assets/icons/AssocCoopInteractions.svg';
import ObserveIcon from "../../../assets/icons/observeIcon.png";
import ConferencePlan from "../../../assets/icons/ConferencePlan.png";
import ActionPlan from "../../../assets/icons/ActionPlan.png";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Other teacher's IDs to populate List and test mechanics


const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    minHeight: '768px',
    //border: '1px solid #000000',
    margin: 0,
    padding: 0
  },
  container: {
    //border: '1px solid #FFD800',
    display: 'flex',
    flexDirection: 'column',
    margin: '2% 5% 2% 5%'
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    cursor: 'pointer'
  },
  title: {
    alignSelf: 'center',
    fontSize: '2.2em'
  },
  table: {
    maxWidth: '100%',
    width: '100%',
    //border: '1px solid #00FFF6',
    overflow: 'scroll',
    fontSize: '1.5em'
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1em'
  },
  actionButton: {
    marginLeft: '2em',
    backgroundColor: '#2196F3',
  },
  search: {
    lineHeight: '1em',
    fontSize: '1.5em',
    maxWidth: '30%',
  },
  nameCellHeader: {
    color: '#000000',
    fontSize: '0.8em',
    padding: '0.5em',
    maxWidth: '12em'
  },
  emailCellHeader: {
    color: '#000000',
    fontSize: '0.8em',
    padding: '0.5em',
    maxWidth: '12em'
  },
  magicEightIcon: {
    height: '55px',
    width: '55px',
    borderRadius: 2
  },
  magicEightCell: {
    textAlign: 'center',
    padding: '0.5em',
    minWidth: '55px',
    maxWidth: '1.8em'
  },
  nameField: {
    textAlign: 'left',
    padding: '0.5em',
    overflow: 'hidden',
    //border: '1px solid #4C00FF'
    maxWidth: '7em'
  },
  emailField: {
    textAlign: 'left',
    padding: '0.5em',
    overflow: 'hidden',
    maxWidth: '18em'
  },
  unlockedIcon: {
    height: '40px',
    width: '40px',
    display: 'block',
    borderRadius: 4
  },
  legendContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1em',
    //border: '1px solid #FF56FF',
    margin:'1.5em 0 0 0',
    justifySelf: 'center',
    overflow: 'scroll'
  },
  legendItem: {
    display: 'flex',
    alignItems:'center',
    fontSize: '1.3em',
    //border: '1px solid #97FF00'
  },
  legendIcon: {
    height: '40px',
    width: '40px',
    marginRight: '0.2em'
  },

  //Minor Breakpoint -> Shrinking desktop window
  '@media only screen and (max-width:1120px)': {
    emailField: {
      maxWidth: '10em'
    }
  },

  // iPad Pro 10.5" Portrait
  '@media only screen and (max-width:834px) and (orientation: portrait)': {
    magicEightCell: {
      display: 'none'
    }
  },

  //iPad-Mini Portrait
  '@media only screen and (max-width:768px) and (orientation:portrait)': {
    legendContainer: {
      padding: '1em 0 1em 0'
    },
    actionContainer: {
      justifyContent: 'space-between'
    },
    actionButton: {
      marginRight: '3em'
    },
    magicEightCell: {
      display: 'none'
    }
  },

  // iPad-Mini Landscape
  '@media only screen and (max-width:1024px) and (orientation:landscape)': {
    nameField: {
      maxWidth: '7.5em'
    },
    emailField: {
      maxWidth: '9em'
    },
  }
});

const sortedSvg = [TransitionTimeSvg, ClassroomClimateSvg, ListeningToChildrenSvg, LevelOfInstructionSvg,
  MathInstructionSvg, StudentEngagementSvg, SequentialActivitiesSvg, AssocCoopInteractionsSvg];

const sortedAltText = ["Transition Time", "Classroom Climate", "Listening To Children", "Level Of Instruction",
  "Math Instruction ", "Student Engagement", "Sequential Activities", "Assoc Coop Interactions"];


class TeacherLists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      searched: []
    };

    this.selectTeacher = this.selectTeacher.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let firebase = this.context;
    firebase.getTeacherList()
      .then( teachers => {
        teachers.forEach( teacher => {
          teacher.then( data => {
            this.setState(prevState => {
              return {
                teachers: prevState.teachers.concat(data),
                searched: prevState.teachers.concat(data)
              }
            })
          });
        });
      })
      .catch(e => {
        console.log("Error occurred fetching teacher list: ", e)
      })
  };

  onChangeText = e => {
    const text = e.target.value;
    if (text === "") {
      this.setState(prevState => {
        return { searched: prevState.teachers } // original teacher list
      })
    } else {
      this.setState(prevState => {
        return {
          searched: prevState.teachers.filter( item =>
            item.lastName.indexOf(text) !== -1 || item.firstName.indexOf(text) !== -1 || item.email.indexOf(text) !== -1
          )}
      })
    }
  };

  selectTeacher (teacherInfo) {
    this.props.history.push({
      pathname: `/MyTeachers/${teacherInfo.id}`,
      state: {teacher: teacherInfo, type: this.props.type }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        <div className={classes.container}>
          <h2 className={classes.title}>
            My Teachers
          </h2>
          <div className={classes.actionContainer} >
            <TextField
              id="teacher-search"
              label="Search"
              type="search"
              className={classes.search}
              variant="outlined"
              onChange={this.onChangeText}
            />
            <Fab aria-label="Add Teacher" onClick={null}
                 className={classes.actionButton} size='small'>
              <AddIcon style={{color: '#FFFFFF'}} />
            </Fab>
          </div>
          <div className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.nameCellHeader} >
                    Last<br/>Name
                  </TableCell>
                  <TableCell className={classes.nameCellHeader} >
                    First<br/>Name
                  </TableCell>
                  <TableCell className={classes.emailCellHeader} >
                    Email
                  </TableCell>
                  {sortedSvg.map((item, key) =>
                    <TableCell className={classes.magicEightCell} >
                      <img src={item} alt={sortedAltText[key]}
                           className={classes.magicEightIcon}/>
                    </TableCell>
                  )}
                  <TableCell className={classes.nameCellHeader} >
                    Goals<br/>Met
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.searched.map((teacher, index) => (
                <TableRow className={classes.row} key={index}
                          onClick={() => this.selectTeacher(teacher)}>
                  <TableCell className={classes.nameField}>{teacher.lastName}</TableCell>
                  <TableCell className={classes.nameField}>{teacher.firstName}</TableCell>
                  <TableCell className={classes.emailField}>{teacher.email}</TableCell>
                  {[...Array(8).keys()].map( key =>
                    <TableCell className={classes.magicEightCell}>
                      {teacher.unlocked.indexOf(key+1) !== -1 &&
                      <img src={ObserveIcon} className={classes.unlockedIcon} alt="Observed" />
                      }
                    </TableCell>
                  )}
                  <TableCell className={classes.nameField}>{teacher.goals}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className={classes.legendContainer} >
            <div className={classes.legendItem} >
              <img alt="Observed" src={ObserveIcon} className={classes.legendIcon} />
              = Observed
            </div>
            <div className={classes.legendItem} >
              <img alt="Conference Prep" src={ConferencePlan} className={classes.legendIcon} />
              = Conference Prep
            </div>
            <div className={classes.legendItem} >
              <img alt="Co-created Action Plan" src={ActionPlan} className={classes.legendIcon} />
              = Co-created Action plan
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TeacherLists.propTypes = {
  classes: PropTypes.object.isRequired
};

TeacherLists.contextType = FirebaseContext;
export default withStyles(styles)(withRouter(TeacherLists));
