import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LevelOfInstructionHelpCard from '../../../components/LevelOfInstructionComponents/LevelOfInstructionHelpCard';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

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
    borderRadius: 8,
    overflowY: 'auto'
  }
};

interface Props {
  classes: {
    paper: string
  },
  open: boolean,
  close(): void
}

/**
 * Level Of Instruction time look-fors
 * @function LevelOfInstructionHelp
 * @param {Props} props
 * @return {ReactElement}
 */
function LevelOfInstructionHelp(props: Props): React.ReactElement {
  const { classes, open, close } = props;
  return (
    <div>
      <Modal open={open}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid container direction="row">
            <Grid item xs={11} />
            <Grid item xs={1}>
              <IconButton style={{ padding: 10 }}>
                <Tooltip title={"Close"} placement={"right"}>
                  <CloseIcon
                    onClick={close}
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

LevelOfInstructionHelp.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default withStyles(styles)(LevelOfInstructionHelp);
