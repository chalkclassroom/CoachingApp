import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";

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
  root: {
    backgroundColor: '#ffffff'
  },
  mobileRoot: {
    backgroundColor: '#ffffff'
  },
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
  infoText: {
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    fontSize: 22,
    padding: 10
  },
  detailText: {
    fontFamily: "Arimo",
    fontSize: 18,
    padding: 10
  },
  titleText: {
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    padding: 10
  },
  "@media (max-width: 700px)": {
    root: {
      display: "none"
    },
    paper: {
      height: '60%'
    },
    titleText: {
      fontSize: 24,
    },
    infoText: {
      fontSize: 18
    },
    detailText: {
      fontSize: 14
    }
  },
  "@media (min-width: 701px)": {
    mobileRoot: {
      display: "none"
    }
  }
};

interface Style {
  root: string,
  mobileRoot: string,
  paper: string,
  infoText: string,
  detailText: string,
  titleText: string,
  "@media (max-width: 700px)": string,
  '@media (min-width: 701px)': string
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
 * @class ObservationModal
 */
class ObservationModal extends React.Component<Props, State> {
  state = {
    open: true
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
            <Grid
              xs={12}
              container
              alignItems="center"
              direction="row"
              justify="flex-end"
            >
              {/* <Typography component={"h6"} variant={"h6"}>
                {this.props.}
              </Typography> */}
              <IconButton style={{ padding: 10 }}>
                <Tooltip title={"Close"} placement={"right"}>
                  <CloseIcon onClick={this.props.handleClose} />
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
                {this.props.content}
              </Grid>
              <Grid item style={{paddingTop: '2em'}}>
                <Button onClick={this.props.handleBegin} variant="contained" color="primary">
                  BEGIN OBSERVATION
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}


export default withStyles(styles)(ObservationModal);