import * as React from "react";
import * as PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import LiteracyInstructionHelpCard from "./LiteracyInstructionHelpCard";

/**
 * specifies styling for modal
 * @return {CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    height: `80%`,
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

const useStyles = makeStyles({
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8,
    overflowY: 'scroll'
  }
});

interface Props {
  open: boolean,
  close(): void,
  type: string | number
}

/**
 * Modal for Literacy Instruction Help
 * @function LiteracyInstructionHelp
 * @param {Props} props
 * @return {ReactElement}
 */
export default function LiteracyInstructionHelp(props: Props): React.ReactElement {
  const { open, close, type } = props;
  const classes = useStyles();
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
          <LiteracyInstructionHelpCard type={type} />
        </div>
      </Modal>
    </div>
  );
}


LiteracyInstructionHelp.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}