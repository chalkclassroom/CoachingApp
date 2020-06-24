import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { withRouter } from "react-router-dom";
import StarsIcon from '@material-ui/icons/Stars';
import { changeTeacher, getTeacherList } from '../../../state/actions/teacher';
import { connect } from 'react-redux';
import * as Constants from '../../../constants/Constants';

/**
 * specifies styling for modal
 * @return {css}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

const styles: object = {
  paper: {
    position: "absolute",
    width: "40%",
    borderRadius: 8,
    backgroundColor: 'white',
    padding: '2em'
  },
  root: {
    width: "100%",
    backgroundColor: 'white'
  },
  list: {
    width: "100%",
    height: "500",
    backgroundColor: 'white'
  },
  inline: {
    display: "inline"
  }
};

interface Style {
  paper: string,
  root: string,
  list: string,
  inline: string
}

interface Props {
  classes: Style,
  type: string,
  history: { push(param: string | Push): void },
  firebase: { getTeacherList(): Promise<Teacher[]> },
  handleClose(): void,
  changeTeacher(teacher: Teacher): Teacher,
  getTeacherList(teachers: Array<Teacher>): Array<Teacher>,
  teacherSelected: Teacher,
  teacherList: Array<Teacher>
}

interface Push {
  pathname: string,
  state: {
    teacher?: Teacher,
    teachers?: Array<Teacher>,
    type: string
  }
}

interface State {
  open: boolean,
  teachers: Array<Teacher>
}

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
};

/**
 * modal to select teacher before observation or results
 * @class TeacherModal
 */
class TeacherModal extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      open: true,
      teachers: []
    };

    this.selectTeacher = this.selectTeacher.bind(this);
  }

  handleClose = (): void => {
    this.setState({ open: false });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.props.firebase.getTeacherList().then((teacherPromiseList: Array<Teacher>) => {
      const teacherList = [];
      teacherPromiseList.forEach(tpromise => {
        tpromise.then((data: Teacher) => {
          teacherList.push(data);
          this.setState((previousState) => {
            return {
              teachers: previousState.teachers.concat(data)
            };
          }, () => { this.props.getTeacherList(this.state.teachers) });
        });
      });
    });
  }

  /**
   * @param {object} teacherInfo
   */
  selectTeacher(teacherInfo: Teacher): void {
    this.props.history.push({
      pathname: "/Magic8Menu",
      state: { teacher: this.props.teacherSelected, type: this.props.type, teachers: this.props.teacherList}
    });
    this.setState({open: false});
    this.props.handleClose();
    this.props.changeTeacher(teacherInfo);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    firebase: PropTypes.exact({getTeacherList: PropTypes.func}).isRequired,
    history: PropTypes.exact({push: PropTypes.func}).isRequired,
    changeTeacher: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    console.log('teacher list', this.props.teacherList);
    return (
      <div>
        <Modal open={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid
              xs={12}
              container
              alignItems="center"
              direction="row"
              justify="space-between"
            >
              <Typography component={"h6"} variant={"h6"}>
                Select a Teacher
              </Typography>
              <IconButton style={{ padding: 10 }}>
                <Tooltip title={"Close"} placement={"right"}>
                  <CloseIcon onClick={this.props.handleClose} />
                </Tooltip>
              </IconButton>
            </Grid>
            <Grid
              xs={12}
              container
              alignItems="center"
              direction="column"
              justify="flex-start"
            >
              <List className={classes.list}>
                {this.state.teachers.length === 0 ? (
                  <>Fetching... Make sure you have Teachers Paired.</>
                ) : (
                  <></>
                )}
                {this.state.teachers.map((teacher, index) => (
                  <ListItem
                      key={index}
                      alignItems="center"
                      onClick={(): void =>
                        this.selectTeacher(teacher)
                      }
                  >
                    <ListItemAvatar>
                      {/* <Avatar
                        alt="Teacher Profile Pic"
                        src={TeacherSvg}
                      /> */}
                      <StarsIcon style={{color: Constants.Colors.SA }}/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={teacher.firstName + " " + teacher.lastName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            School Name
                          </Typography>
                          {" — Class Name"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teacherSelected: state.teacherSelectedState.teacher,
    teacherList: state.teacherListState.teachers
  };
};

// export default withRouter(withStyles(styles)(TeacherModal));

// export default withRouter(connect(null,{ changeTeacher })(withStyles(styles)(TeacherModal)));

export default withRouter(connect(
  mapStateToProps,
  { changeTeacher, getTeacherList }
)(withStyles(styles)(TeacherModal)));