import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AssocCoopHelpCard from "../../../components/AssociativeCooperativeComponents/AssocCoopHelpCard.tsx";
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

interface State {
  open: boolean
}

/**
 * Assoc Coop time look-fors
 * @class AssocCoopHelp
 */
class AssocCoopHelp extends React.Component<Props, State> {
  state = {
    open: true
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
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
}

export default withStyles(styles)(AssocCoopHelp);
