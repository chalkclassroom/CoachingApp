import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LevelOfInstructionHelpCard from '../../../components/LevelOfInstructionComponents/LevelOfInstructionHelpCard.tsx';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";

/**
 * specifies styling for modalins
 * @return {CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: 'fixed',
    top: `50%`,
    left: `50%`,
    height: '80%',
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

const styles: object = {
  paper: {
    position: 'absolute',
    width: '67%',
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  }
};

/**
 * Level Of Instruction time look-fors
 * @class LevelOfInstructionHelp
 */
class LevelOfInstructionHelp extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
    
    this.state = {
      open: true
    }
  }

  handleOpen = (): void => {
    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        <Modal open={this.props.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid container direction="row">
              <Grid item xs={11} />
              <Grid item xs={1}>
                <IconButton style={{ padding: 10 }}>
                  <Tooltip title={"Close"} placement={"right"}>
                    <CloseIcon
                      onClick={this.props.close}
                    />
                  </Tooltip>
                </IconButton>
              </Grid>
            </Grid>
            <Grid container alignItems="center" direction="column" justify="flex-start">
              <LevelOfInstructionHelpCard />
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(LevelOfInstructionHelp);
