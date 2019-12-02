import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import DemoVideo from './DemoVideo';
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Card from "@material-ui/core/Card";
import Coach from "../../assets/icons/newCoach.svg";
//import Teacher from "../../assets/icons/newTeacher.svg";
//import Admin from "../../assets/icons/newAdministrator.svg";
import GrayedAdmin from "../../assets/icons/newAdminGrayed.svg";
import GrayedTeacher from "../../assets/icons/newTeacherGrayed.svg";
import CardContent from "@material-ui/core/CardContent";

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
    width: "60%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 8
  },
  photoIcon: {
    height:"15vh"
  }
});

class PilotModal extends React.Component {
  state = {
    open: true,
    role: 0
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeRole = role => {
    this.setState({ role: role });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal open={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid container direction="row">
              <Grid item xs={11} />
              <Grid item xs={1}>
                <IconButton style={{ padding: 10 }}>
                  <Tooltip title={"Close"} placement={"right"}>
                    <CloseIcon
                      onClick={this.props.handleClose}
                    />
                  </Tooltip>
                </IconButton>
              </Grid>
            </Grid>
            <DemoVideo videoUrl={'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/demo.mp4?alt=media&token=9121566b-bf61-4887-a903-2a8122e0ed02'} />
          </div>
        </Modal>
      </div>
    );
  }
}

PilotModal.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.object.isRequired
};

export default withStyles(styles)(PilotModal);
