import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import DemoVideo from './DemoVideo';
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

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
    width: "60%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
  photoIcon: {
    height:"15vh"
  }
};

interface Style {
  paper: string,
  photoIcon: string
}

interface Props {
  classes: Style,
  handleClose(): void
}

interface State {
  open: boolean,
  role: number
}

/**
 * formatting for modal containing demo video on landing page
 * @class DemoModal
 */
class DemoModal extends React.Component<Props, State> {
  state = {
    open: true,
    role: 0
  };

  handleOpen = (): void => {
    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
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
            <DemoVideo videoUrl={'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Homescreen%20Demo%20Video.mp4?alt=media&token=92cd9d44-b8e0-4f81-b7d5-efd435d0671a'} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(DemoModal);
