import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AssocCoopHelpCard from "../../../components/AssociativeCooperativeComponents/AssocCoopHelpCard";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
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
  classes: Style,
  open: boolean,
  close(): void
}

interface Style {
  paper: string,
  definitionTitle: string,
  definitionText: string,
  buttonTitle: string,
  definition2Title: string,
  definition2Text: string,
  lineExamples: string,
}

/**
 * Assoc Coop time look-fors
 * @function AssocCoopHelp
 * @param {Props} props
 * @return {ReactElement}
 */
function AssocCoopHelp(props: Props): React.ReactElement {
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
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
          >
            <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
            Associative and Cooperative Interactions
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{fontFamily: "Arimo"}}>
            <strong>Hints + Reminders: Classifying Associative and Cooperative Interactions</strong>
            </Typography>
            <AssocCoopHelpCard />
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

AssocCoopHelp.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default withStyles(styles)(AssocCoopHelp);
