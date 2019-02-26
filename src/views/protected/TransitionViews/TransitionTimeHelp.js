import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function getModalStyle() {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 8
  }
});

class TransitionTimeHelp extends React.Component {
  state = {
    open: true
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
              <Typography variant="h6" gutterBottom>
                Hints + Reminders: Classifying Transition Types
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        backgroundColor: "#E69129",
                        color: "white",
                        fontSize: 18,
                        textAlign: "center",
                        width: "50%"
                      }}
                    >
                      INSIDE
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#46D3AA",
                        color: "white",
                        fontSize: 18,
                        textAlign: "center",
                        width: "50%"
                      }}
                    >
                      OUTSIDE
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#FAE8CF" }}>
                      <strong>
                        Children are waiting for a learning activity to
                        begin/continue -OR- Children are participating in
                        classroom routines
                      </strong>
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#D7F6EE" }}>
                      <strong>
                        Children are travelling to another area of the school
                      </strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#FAE8CF" }}>
                      Cleaning up, handwashing, getting out cots or meal trays
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#D7F6EE" }}>
                      Walking in the hallway
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#FAE8CF" }}>
                      <strong>Children are waiting </strong> for instructions or
                      materials
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#D7F6EE" }}>
                      Lining up to leave the classroom, playground, etc.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#FAE8CF" }}>
                      Teacher <strong>stops an activity</strong> to gather
                      materials or correct behavior
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#D7F6EE" }}>
                      Bathroom and/or water break in the hallway
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#FAE8CF" }}>
                      One activity has ended but another hasn't started yet
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#D7F6EE" }}>
                      Waiting in the lunch line
                    </TableCell>
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
