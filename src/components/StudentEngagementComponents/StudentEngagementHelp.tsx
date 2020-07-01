import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import StudentEngagementHelpCard from './StudentEngagementHelpCard';
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
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
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8,
  }
};

interface Props {
  classes: {
    paper: string,
  },
  open: boolean,
  close(): void
}


/**
 * student engagement look-fors
 * @param {Props} props
 * @return {ReactElement}
 * @class StudentEngagementHelp
 */
function StudentEngagementHelp(props: Props): React.ReactElement {
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
          <StudentEngagementHelpCard />
        </div>
      </Modal>
    </div>
  );
}

StudentEngagementHelp.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default withStyles(styles)(StudentEngagementHelp);