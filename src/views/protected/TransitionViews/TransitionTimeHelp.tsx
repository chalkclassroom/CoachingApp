import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

/**
 * specifies styling for modal
 * @return {css}
 */
function getModalStyle() {
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
    borderRadius: 8,
    backgroundColor: 'white',
    padding: '1em'
  },
  definitionTitle: {
    backgroundColor: "#094492",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "50%"
  },
  definitionText: {
    backgroundColor: "#759fe5",
    width: "50%"
  },
  buttonTitle: {
    backgroundColor: "#094492",
    color: "white",
    fontSize: 14,
    textAlign: "center",
    width: "20%"
  },
  lineExamples: {
    backgroundColor: "#AED581",
    width: "20%"
  },
  travelingExamples: {
    backgroundColor: "#FFA726",
    width: "20%"
  },
  waitingExamples: {
    backgroundColor: "#FF7043",
    width: "20%"
  },
  routinesExamples: {
    backgroundColor: "#64B5F6",
    width: "20%"
  },
  behaviorExamples: {
    backgroundColor: "#FF5252",
    width: "20%"
  }
};

interface Props {
  classes: Style
}

interface Style {
  paper: string,
  definitionTitle: string,
  definitionText: string,
  buttonTitle: string,
  lineExamples: string,
  travelingExamples: string,
  waitingExamples: string,
  routinesExamples: string,
  behaviorExamples: string,
}

interface State {
  open: boolean
}

/**
 * transition time look-fors
 * @class TransitionTimeHelp
 */
class TransitionTimeHelp extends React.Component<Props, State> {
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
        <Modal open={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid
              container
              alignItems="center"
              direction="column"
              justify="flex-start"
            >
              <Typography variant="h4" gutterBottom>
                Reducing Transitions
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Remember, a <strong>transition</strong> is a period of time in
                which <strong>most</strong> of the class is not involved in a
                learning activity.
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.definitionTitle}>
                      TRANSITIONS BEGIN WHEN:
                    </TableCell>
                    <TableCell className={classes.definitionTitle}>
                      TRANSITIONS END WHEN:
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.definitionText}>
                      <strong>
                        A majority (more than half) of the children are in
                        transition
                      </strong>
                    </TableCell>
                    <TableCell className={classes.definitionText}>
                      <strong>
                        A majority (more than half) of the children have started
                        the next activity
                      </strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{ padding: 10 }}
              >
                While you are recording a transition, choose the button
                representing the <strong>primary</strong> reason for that
                transition. <strong>Change </strong>
                the button if the primary reason changes during the same
                transition. Choose the <strong>“Other”</strong> button if the
                reason for the transition is not represented in the other
                buttons, and you will be prompted to explain the reason in the
                Notes.
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      className={classes.buttonTitle}
                    >
                      Waiting in line/lining up
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.buttonTitle}
                    >
                      Traveling outside the classroom
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.buttonTitle}
                    >
                      Children waiting on teacher/materials
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.buttonTitle}
                    >
                      Classroom Routines
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.buttonTitle}
                    >
                      Behavior Management Disruption
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      className={classes.lineExamples}
                    >
                      <strong>Lining up or waiting in line</strong>
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.travelingExamples}
                    >
                      <strong>
                        Walking from one part of the school to another
                      </strong>
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.waitingExamples}
                    >
                      <strong>
                        Delays or interruptions because teacher or materials are
                        not ready
                      </strong>
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.routinesExamples}
                    >
                      <strong>
                        Participating in routine, non-learning activities
                      </strong>
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.behaviorExamples}
                    >
                      <strong>
                        Delays or interruptions due to behavior management
                      </strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      className={classes.lineExamples}
                    >
                      Lining up to leave the classroom, playground, etc.
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.travelingExamples}
                    >
                      Walking to the playground, library, music room, etc.
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.waitingExamples}
                    >
                      Teacher stops an activity or delays the start of a new
                      activity to gather or prepare materials
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.routinesExamples}
                    >
                      Cleaning up, hand-washing, getting out cots or meal trays,
                      etc.
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.behaviorExamples}
                    >
                      Teacher stops a learning activity to address behavior
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      className={classes.lineExamples}
                    >
                      Children are lined up but are waiting to go to the next
                      place
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.travelingExamples}
                    ></TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.waitingExamples}
                    >
                      Teacher stops an activity or delays the start of a new
                      activity to do something unrelated to activity
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.routinesExamples}
                    >
                      Bathroom and/or water break in the classroom or hallway
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.behaviorExamples}
                    ></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      className={classes.lineExamples}
                    >
                      Waiting in line for lunch
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.travelingExamples}
                    ></TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.waitingExamples}
                    ></TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.routinesExamples}
                    >
                      Moving from one activity to another (e.g., whole group to
                      centers)
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      className={classes.behaviorExamples}
                    ></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(TransitionTimeHelp);
