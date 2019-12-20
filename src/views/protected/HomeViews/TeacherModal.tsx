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
import { connect } from "react-redux";
import StarsIcon from '@material-ui/icons/Stars';
import * as Constants from '../../../constants';

/**
 * specifies styling for modal
 * @return {css}
 */
function getModalStyle() {
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
  history: { push(object: Push): void },
  firebase: { getTeacherList(): Promise<Teacher[]> },
  handleClose(): void
}

interface Push {
  pathname: string,
  state: object
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

  handleClose = () => {
    this.setState({ open: false });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    console.log(typeof this.props.handleClose);
    this.props.firebase.getTeacherList().then((teacherPromiseList: Array<Teacher>) => {
      const teacherList = [];
      teacherPromiseList.forEach(tpromise => {
        tpromise.then((data: Teacher) => {
          teacherList.push(data);
          this.setState((previousState) => {
            return {
              teachers: previousState.teachers.concat(data)
            };
          });
        });
      });
    });
  }

  /**
   * @param {object} teacherInfo 
   */
  selectTeacher(teacherInfo: Teacher) {
    this.props.history.push({
      pathname: "/Magic8Menu",
      state: { teacher: teacherInfo, type: this.props.type }
    });
    console.log(' history is ', this.props.history, ' and the type is ', typeof this.props.history);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    firebase: PropTypes.exact({getTeacherList: PropTypes.func}).isRequired,
    history: PropTypes.exact({push: PropTypes.func}).isRequired
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;

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
                      onClick={() =>
                          this.selectTeacher(teacher)
                      }
                  >
                    <ListItemAvatar>
                      {/* <Avatar
                        alt="Teacher Profile Pic"
                        src={TeacherSvg}
                      /> */}
                      <StarsIcon style={{color: Constants.SequentialColor }}/>
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

export default withRouter(connect()(withStyles(styles)(TeacherModal)));
