import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";

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
  root: {
    backgroundColor: '#ffffff'
  },
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  }
};

interface Style {
  root: string,
  paper: string,
}

interface Props {
  classes: Style,
  content: React.ReactNode,
  handleBegin(): void,
  handleClose(): void,
  open: boolean
}

interface State {
  open: boolean
}

/**
 * Modal displaying information about observation
 * @function ObservationModal
 * @param {Props} props
 * @return {ReactElement}
 */
function ObservationModal(props: Props): React.ReactElement {
  const { classes, handleBegin, handleClose, open, content } = props;
  return (
    <div>
      <Modal open={open}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid
            xs={12}
            container
            alignItems="center"
            direction="row"
            justify="flex-end"
          >
            <IconButton style={{ padding: 10 }}>
              <Tooltip title={"Close"} placement={"right"}>
                <CloseIcon onClick={handleClose} />
              </Tooltip>
            </IconButton>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
            className={classes.root}
          >
            <Grid item>
              {content}
            </Grid>
            <Grid item style={{paddingTop: '2em'}}>
              <Button onClick={handleBegin} variant="contained" color="primary">
                BEGIN OBSERVATION
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

ObservationModal.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.element.isRequired,
  handleBegin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default withStyles(styles)(ObservationModal);