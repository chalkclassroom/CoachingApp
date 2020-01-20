import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import ActionPlanForm from './ActionPlanForm';
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";

/**
 * specifies styling for modal
 * @return {css}
 */
function getModalStyle() {
  return {
    position: "fixed",
    top: `50%`,
    left: `62.5%`,
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

const styles: object = {
  paper: {
    position: "absolute",
    width: "60%",
    height: "70%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8,
    overflow: 'auto'
  },
  photoIcon: {
    height:"15vh"
  },
  "@media (max-width: 700px)": {
    paper: {
      height: '70%',
      width: '60%'
    },
  },
};

interface Style {
  paper: string,
  photoIcon: string,
  '@media (max-width: 700px)': string
}

interface Props {
  classes: Style,
  handleClose(): void,
  firebase: {}
}

interface State {
  open: boolean,
  role: number
}

/**
 * formatting for modal containing pilot sign up form on landing page
 */
class ActionPlanModal extends React.Component<Props, State> {
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

  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    firebase: PropTypes.object.isRequired
  };

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
            {/* <Grid container direction="row">
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
            </Grid> */}
            <ActionPlanForm 
              firebase={this.props.firebase}
              teacherFirstName={this.props.teacherFirstName}
              teacherLastName={this.props.teacherLastName}
              teacherId={this.props.teacherId}
              sessionId={this.props.sessionId}
              // handleEditActionPlan={this.handleEditActionPlan}
              disabled={false}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(ActionPlanModal);