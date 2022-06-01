import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { withRouter, RouteComponentProps } from "react-router-dom";
import StarsIcon from '@material-ui/icons/Stars';
import { changeTeacher, getTeacherList } from '../../../state/actions/teacher';
import { connect } from 'react-redux';
import * as Constants from '../../../constants/Constants';
import * as Types from '../../../constants/Types';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';

/**
 * specifies styling for modal
 * @return {CSSProperties}
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
    maxHeight: "500px",
    backgroundColor: 'white',
    overflowY: "auto",
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

type Props = RouteComponentProps & {
  classes: Style,
  type: string,
  history: H.History,
  firebase?: Firebase | null,
  handleClose(): void,
  changeTeacher(teacher: Types.Teacher): Types.Teacher,
  getTeacherList(teachers: Array<Types.Teacher>): Array<Types.Teacher>,
  teacherSelected?: Types.Teacher,
  teacherList: Array<Types.Teacher>
}

interface Push {
  pathname: string,
  state: {
    teacher?: Types.Teacher,
    teachers?: Array<Types.Teacher>,
    type: string
  }
}

interface State {
  open: boolean,
  teachers: Array<Types.Teacher>
}

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
  }

  handleClose = (): void => {
    this.setState({ open: false });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (this.props.teacherList.length === 0 && this.props.firebase) {
      this.props.firebase.getTeacherList().then((teacherPromiseList: Array<Types.Teacher>) => {
        const teacherList = [];
        teacherPromiseList.forEach(tpromise => {
          tpromise.then((data: Types.Teacher) => {
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
  }

  /**
   * @param {object} teacherInfo
   */
  selectTeacher = (teacherInfo: Types.Teacher): void => {
    this.props.history.push({
      pathname: "/Magic8Menu",
      state: { teacher: this.props.teacherSelected, type: this.props.type, teachers: this.props.teacherList}
    });
    this.setState({open: false});
    this.props.handleClose();
    this.props.changeTeacher(teacherInfo);
  }

  static propTypes = {
    classes: PropTypes.exact({
      paper: PropTypes.string,
      root: PropTypes.string,
      list: PropTypes.string,
      inline: PropTypes.string
    }).isRequired,
    handleClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    firebase: PropTypes.exact({getTeacherList: PropTypes.func}),
    history: ReactRouterPropTypes.history.isRequired,
    changeTeacher: PropTypes.func.isRequired,
    getTeacherList: PropTypes.func.isRequired,
    teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }),
    teacherList: PropTypes.array.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    console.log('teacher list', this.props.teacherList);
    const filteredTeachers = this.props.teacherList.filter(teacher => teacher.id !== null);
    return (
      <div>
        <Modal open={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid
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
              // xs={12}
              container
              alignItems="center"
              direction="column"
              justify="flex-start"
            >
              {filteredTeachers.length > 0 ?
                <List className={classes.list}>
                  {this.props.teacherList.length === 0 ? (
                    <>Fetching your teachers...</>
                  ) : (
                    <></>
                  )}
                  {filteredTeachers.map((teacher, index) => (
                    <ListItem
                      key={index}
                      alignItems="center"
                      onClick={(): void =>
                        this.selectTeacher(teacher)
                      }
                    >
                      <ListItemIcon>
                        <StarsIcon style={{color: Constants.Colors.SA}}/>
                      </ListItemIcon>
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
                </List> :
              <p>You have no teachers.</p>}
            </Grid>
          </div>
        </Modal>
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
    teacherList: state.teacherListState.teachers
  };
};

export default withRouter(connect(
  mapStateToProps,
  { changeTeacher, getTeacherList }
)(withStyles(styles)(TeacherModal)));