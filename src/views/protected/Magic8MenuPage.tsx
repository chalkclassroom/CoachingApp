import * as React from "react";
import "../../App.css";
import * as PropTypes from "prop-types";
import { Typography, TextField, MenuItem } from "@material-ui/core";
import FirebaseContext from "../../components/Firebase/FirebaseContext";
import AppBar from "../../components/AppBar";
import { withStyles } from "@material-ui/core/styles";
import ToolIcons from '../../components/ToolIcons';
import Grid from '@material-ui/core/Grid';
import { changeTeacher } from '../../state/actions/teacher';
import { connect } from 'react-redux';
import * as Types from '../../constants/Types';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Role } from '../../state/actions/coach'
import Firebase from '../../components/Firebase'

const styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflowX: 'hidden'
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
  }
};

interface Style {
  root: string,
  grow: string,
  goButton: string,
  titleText: string,
  instructionText: string
}

interface Props {
  classes: Style,
  history: H.History,
  location: {
    state: {
      type: string
    }
  },
  changeTeacher(teacher: string): void,
  teacherSelected: Types.Teacher,
  teacherList: Array<Types.Teacher>
}

interface State {
  teacherId: string,
  teacherName: string,
  teacher: {}
}

/**
 * magic 8 menu
 * @class Magic8MenuPage
 */
class Magic8MenuPage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      teacherId: '',
      teacherName: '',
      teacher: {}
    };
  }

  /**
   * @param {ChangeEvent} event
   */
  changeTeacher = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.changeTeacher(event.target.value);
  };

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      grow: PropTypes.string,
      goButton: PropTypes.string,
      titleText: PropTypes.string,
      instructionText: PropTypes.string
    }).isRequired,
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location,
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

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <FirebaseContext.Consumer>
            {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
          </FirebaseContext.Consumer>
        </div>
        <div style={{flexGrow: 1}}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{width: '100vw', height: '100%', paddingTop: '1em'}}
          >
            <Grid item style={{width: '70vw', paddingBottom: '1em'}}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={9}>
                  <Grid container direction="row" justify="flex-start" alignItems="center">
                    <Typography style={{fontSize:'2.5em'}}>
                      {this.props.location.state.type}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid container direction="row" justify="flex-end" alignItems="center">
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
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{width: '70vw', paddingBottom: '1.5em'}}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={12}>
                  <Typography style={{fontSize: '1.2em'}}>
                    Select the skill you would like to focus on:
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{width: '70vw'}}>
              <ToolIcons type={this.props.location.state.type} training={false} history={this.props.history} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {
  teacherSelected: Types.Teacher,
  teacherList: Array<Types.Teacher>
} => {
  return {
    teacherSelected: state.teacherSelectedState.teacher,
    teacherList: state.teacherListState.teachers,
  };
};

Magic8MenuPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, { changeTeacher })(Magic8MenuPage));
