import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Paper from "@material-ui/core/Paper";
import TransitionTime from "../../../assets/icons/TransitionTime.png";
import ClassroomClimate from "../../../assets/icons/ClassroomClimate.png";
import MathInstruction from "../../../assets/icons/MathInstruction.png";
import StudentEngagement from "../../../assets/icons/StudentEngagement.png";
import LevelofInstruction from "../../../assets/icons/LevelofInstruction.png";
import ListeningtoChildren from "../../../assets/icons/ListeningtoChildren.png";
import SequentialActivities from "../../../assets/icons/SequentialActivities.png";
import AssocCoopInteratcions from "../../../assets/icons/AssocCoopInteractions.png";
import ObserveIcon from "../../../assets/icons/ObserveIcon.png";
import ConferencePlan from "../../../assets/icons/ConferencePlan.png";
import ActionPlan from "../../../assets/icons/ActionPlan.png";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
  root: {
    flexGrow: 1,

  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  table: {
    marginLeft: 80,
    maxWidth: 960
  },
  search: {
  width: 200,
  height: 15,
  marginBottom: 15,
  marginLeft: 80,
  lineHeight: 28,
  padding: 8,
},
});



class TeacherLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      search:false,
      values:{
        lastName:"",
        firstName:"",
        email:""
      }
    };
    this.selectTeacher = this.selectTeacher.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
  }


    componentDidMount() {
    let firebase = this.context;
    firebase.getTeacherList().then(getTeacherList=>{
      console.log("Teacher List", getTeacherList);
      let teacherList = [];
      getTeacherList.forEach(tGet=>{
        tGet.then(data=>{
          console.log("Modal Resolved", data);
          teacherList.push(data);
          console.log(teacherList);
          this.setState((previousState, currentProps) => {
            return {
              teachers: previousState.teachers.concat(data)
            }})
        });
      })
    })
  };


  onChange = e => {
    const text = e.target.value;
    this.setState({
      teachers: this.state.teachers.filter(item => {
        return item.lastName.indexOf(text) !== -1 || item.firstName.indexOf(text) !== -1 || item.email.indexOf(text) !== -1;
      })
    });
  };

  //goes to teacher detail page, pathname needs to be changed later
  selectTeacher(teacherInfo) {
    console.log(teacherInfo);
    this.props.history.push({
      pathname: "/Magic8Menu",
      state: {teacher: teacherInfo, type: this.props.type}
    });
    console.log(this.props.history);
  }

  render() {
    const { classes } = this.props;

    return (
      < div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10 }}
        >
          <Typography
            component={"h4"}
            variant={"h4"}
            align={"center"}
          >
            My Teachers
          </Typography>
        </Grid>
        <input onChange={this.onChange} placeholder="Search..." className={classes.search}/>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-between"
          style={{
           paddingBottom:180
          }}
        >
        <Table className={classes.table} >
          <TableHead >
            <TableRow>
              <TableCell
                align="left"
                style={{
                  color: "black",
                  fontSize: 14,
                  padding:20,
                }}>
                Last
                <br/>
                Name
              </TableCell>
              <TableCell
                style={{
                  color: "black",
                  fontSize: 14,
                  padding:20,
                }}>
                First
                <br/>
                Name
              </TableCell>
              <TableCell
                style={{
                  color: "black",
                  fontSize: 14,
                  padding:24
                }}
              >Email
              </TableCell>

              <TableCell
                align="center"
                style={{
                  padding: 16
                }}
              >
                <img width="55" height="55" style={{ borderRadius: 2 }} alt="" src={TransitionTime}/>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  padding: 16
                }}>
                <img width="55" height="55" style={{ borderRadius: 2 }} alt="" src={ClassroomClimate}/>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  padding: 16
                }}>
                <img width="55" height="55" style={{ borderRadius: 2 }} alt="" src={MathInstruction}/>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  padding: 16
                }}>
                <img width="55" height="55" style={{ borderRadius: 2 }} alt="" src={StudentEngagement}/>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  padding: 16
                }}>
                <img width="55" height="55" style={{ borderRadius: 2 }} alt="" src={LevelofInstruction}/>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  padding: 16
                }}>
                <img width="55" height="55" style={{ borderRadius: 2 }} alt="" src={ListeningtoChildren}/>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  padding: 16
                }}>
                <img width="55" height="55" style={{ borderRadius: 2 }} alt="" src={SequentialActivities}/>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  padding: 16
                }}>
                <img width="55" height="55" style={{ borderRadius: 2 }} alt="" src={AssocCoopInteratcions}/>
              </TableCell>
              <TableCell
                style={{
                  color: "black",
                  fontSize: 14,
                  padding: 16
                }}
              >
                Goals
                <br/>
                Met
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody> {this.state.teachers.map((teacher, index)=>(
            <TableRow className={classes.row} key={index}
                      onClick={() => this.selectTeacher(teacher)}>
              <TableCell align="left" style={{ padding: 20 }}> {teacher.lastName} </TableCell>
              <TableCell align="left" style={{ padding: 20 }}>{teacher.firstName}</TableCell>
              <TableCell align="left" style={{ padding: 24 }}>{teacher.email}</TableCell>

              <TableCell
                align="center" style={{ padding: 16 }}>
                {teacher.unlocked.indexOf(1) !== -1 &&
                <img src={ObserveIcon} style={{ borderRadius: 4, display: "block",  }}
                     width="40" height="40" alt=""/>
                }
              </TableCell>
              <TableCell align="center" style={{ padding: 16 }}>
                {teacher.unlocked.indexOf(2) !== -1 &&
                <img src={ObserveIcon} style={{ borderRadius: 4, display: "block",  }}
                     width="40" height="40" alt=""/>
                }
              </TableCell>
              <TableCell align="center" style={{ padding: 16 }}>
                {teacher.unlocked.indexOf(3) !== -1 &&
                <img src={ObserveIcon} style={{ borderRadius: 4, display: "block", }}
                     width="40" height="40" alt=""/>
                }
              </TableCell>
              <TableCell align="center" style={{ padding: 16 }}>
                {teacher.unlocked.indexOf(4) !== -1 &&
                <img src={ObserveIcon} style={{ borderRadius: 4, display: "block",  }}
                     width="40" height="40" alt=""/>
                }
              </TableCell>
              <TableCell align="center" style={{ padding: 16 }}>
                {teacher.unlocked.indexOf(5) !== -1 &&
                <img src={ObserveIcon} style={{ borderRadius: 4, display: "block", }}
                     width="40" height="40" alt=""/>
                }
              </TableCell>
              <TableCell align="center" style={{ padding: 16 }}>
                {teacher.unlocked.indexOf(6) !== -1 &&
                <img src={ObserveIcon} style={{ borderRadius: 4, display: "block", }}
                     width="40" height="40" alt=""/>
                }
              </TableCell>
              <TableCell align="center" style={{ padding: 16 }}>
                {teacher.unlocked.indexOf(7) !== -1 &&
                <img src={ObserveIcon} style={{ borderRadius: 4, display: "block", }}
                     width="40" height="40" alt=""/>
                }
              </TableCell>
              <TableCell align="center" style={{ padding: 16 }}>
                {teacher.unlocked.indexOf(8) !== -1 &&
                <img src={ObserveIcon} style={{ borderRadius: 4, display: "block", }}
                     width="40" height="40" alt=""/>
                }
              </TableCell>
              <TableCell align="center" style={{ padding: 16 }}>{teacher.goals}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          justify="space-around"
          style={{
            padding: 10,
            marginLeft:80
          }}
        >
          <Grid item
                container
                xs={4}
                alignItems="center"
                direction="row"
                justify="flex-start"
                style={{
                  fontSize: 20
                }}
          >
            <img width="40" height="40" alt="" src={ObserveIcon}/> = Observed
          </Grid>
          <Grid item
                container
                xs={4}
                alignItems="center"
                direction="row"
                justify="flex-start"
                style={{
                  fontSize: 20
                }}
          >
            <img width="40" height="40" alt="" src={ConferencePlan}/> = Conference Prep
          </Grid>
          <Grid item
                container
                xs={4}
                alignItems="center"
                direction="row"
                justify="flex-start"
                style={{
                  fontSize: 20
                }}
          >
            <img width="40" height="40" alt="" src={ActionPlan}/> = Co-created Action plan
          </Grid>
        </Grid>
      </div>
    );
  }
}


TeacherLists.propTypes = {
  classes: PropTypes.object.isRequired,

};

TeacherLists.contextType = FirebaseContext;
export default withStyles(styles)(TeacherLists);
