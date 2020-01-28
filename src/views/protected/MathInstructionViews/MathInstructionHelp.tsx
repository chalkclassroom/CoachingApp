import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import MathInstructionHelpCard from '../../../components/MathInstructionComponents/MathInstructionHelpCard';
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

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
    width: "67%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8,
  }
};

interface Props {
  classes: Style
}

interface Style {
  paper: string,
}

interface State {
  open: boolean
}

/**
 * MathInstruction time look-fors
 * @class MathInstructionTimeHelp
 */
class MathInstructionTimeHelp extends React.Component<Props, State> {
  state = {
    open: true
  };

  handleOpen = (): void => {
    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

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
            <Grid
              container
              alignItems="center"
              direction="column"
              justify="flex-start"
            >
              
              <Typography variant="h4"  style={{fontFamily: "Arimo"}} gutterBottom>
              Math Opportunities
              </Typography>
              <Typography variant="subtitle2" gutterBottom style={{fontFamily: "Arimo"}}>
              <strong>CENTERS</strong> 
              </Typography>

          
              <MathInstructionHelpCard/>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(MathInstructionTimeHelp);

