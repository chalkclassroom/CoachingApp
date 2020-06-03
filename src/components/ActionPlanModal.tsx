import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ActionPlanForm from './ActionPlanForm';

/**
 * specifies styling for modal
 * @return {React.CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: "fixed",
    top: `55%`,
    left: `62.5%`,
    transform: `translate(-50%, -50%)`,
  } as React.CSSProperties;
}

const styles: object = {
  paper: {
    position: "absolute",
    width: "70vw",
    height: "80vh",
    backgroundColor: 'white',
    padding: '1em',
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
  firebase: {},
  teacher: Teacher,
  sessionId: string,
  actionPlanExists: boolean,
  magic8: string
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

interface State {
  open: boolean,
  role: number
}

/**
 * formatting for modal containing pilot sign up form on landing page
 * @class ActionPlanModal
 */
class ActionPlanModal extends React.Component<Props, State> {
  state = {
    open: true,
    role: 0
  };

  handleOpen = (): void => {
    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false });
    this.props.handleClose();
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    firebase: PropTypes.object.isRequired,
    teacher: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired,
    sessionId: PropTypes.string.isRequired,
    actionPlanExists: PropTypes.bool.isRequired,
    magic8: PropTypes.string.isRequired
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
            <ActionPlanForm
              firebase={this.props.firebase}
              teacher={this.props.teacher}
              sessionId={this.props.sessionId}
              handleClose={this.handleClose}
              readOnly={false}
              actionPlanExists={this.props.actionPlanExists}
              magic8={this.props.magic8}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(ActionPlanModal);