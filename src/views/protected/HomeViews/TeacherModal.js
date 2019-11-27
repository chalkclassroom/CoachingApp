import React from "react";
import PropTypes from "prop-types";
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
import Avatar from "@material-ui/core/Avatar";
import TeacherImage from "../../../assets/icons/TeacherImage.svg";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

function getModalStyle() {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: "40%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 8
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  list: {
    width: "100%",
    height: "500",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

class TeacherModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      value: 0,
      teachers: []
    };

    this.selectTeacher = this.selectTeacher.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount() {
    this.props.firebase.getTeacherList().then(teacherPromiseList => {
      let teacherList = [];
      teacherPromiseList.forEach(tpromise=>{
        tpromise.then(data=>{
          teacherList.push(data);
          this.setState((previousState, currentProps) => {
            return {
              teachers: previousState.teachers.concat(data)
            }
          })
        });
      })
    });
  }

  selectTeacher(teacherInfo) {
    this.props.history.push({
      pathname: "/Magic8Menu",
      state: {teacher: teacherInfo, type: this.props.type}
    });
  }

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
                  <CloseIcon
                    onClick={this.props.handleClose}
                  />
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
                {this.state.teachers.length===0?<>Fetching... Make sure you have Teachers Paired.</>:<></>}
                {this.state.teachers.map((teacher, index) => (
                  <ListItem
                      key={index}
                      alignItems="flex-start"
                      onClick={() =>
                          this.selectTeacher(teacher)
                      }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Teacher Profile Pic"
                        src={TeacherImage}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={teacher.firstName +" "+ teacher.lastName}
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

TeacherModal.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

export default withRouter(connect()(withStyles(styles)(TeacherModal)));
