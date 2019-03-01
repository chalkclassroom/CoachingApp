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

// TODO: Fix spacing, make everything more readable and easily modifiable

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

class ClassroomClimateHelp extends React.Component {
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
                Positive Climate
              </Typography>
              <Typography variant="h6" gutterBottom>
                Hints + Reminders: Classifying Behavior Responses
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        backgroundColor: "#E14B24",
                        color: "white",
                        fontSize: 18,
                        textAlign: "center",
                        maxWidth: "25%"
                      }}
                    >
                      DISAPPROVAL
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#E69129",
                        color: "white",
                        fontSize: 18,
                        textAlign: "center",
                        maxWidth: "25%"
                      }}
                    >
                      REDIRECTION
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#46D3AA",
                        color: "white",
                        fontSize: 18,
                        textAlign: "center",
                        maxWidth: "25%"
                      }}
                    >
                      GENERAL PRAISE
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#0C3C87",
                        color: "white",
                        fontSize: 18,
                        textAlign: "center",
                        maxWidth: "25%"
                      }}
                    >
                      SPECIFIC PRAISE
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#F9D8CE" }}>
                      <strong>
                        Teacher discourages behavior without providing an
                        alternative
                      </strong>
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#FAE8CF" }}>
                      <strong>
                        Teacher suggests an alternative to the child's current
                        behavior
                      </strong>
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#D7F6EE" }}>
                      <strong>
                        Teacher gives a general comment of approval
                      </strong>
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#B3D1FA" }}>
                      <strong>
                        Teacher gives a positive comment on a specific behavior
                      </strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#F9D8CE" }}>
                      "Stop it."
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#FAE8CF" }}>
                      "Are you making a good choice?"
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#D7F6EE" }}>
                      "Kiss your brain!"
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#B3D1FA" }}>
                      "I like the way you're using your finger to count the
                      cubes."
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#F9D8CE" }}>
                      "I said stay in your seat."
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#FAE8CF" }}>
                      "Do you want to sit on a letter or a number?"
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#D7F6EE" }}>
                      "Good job!"
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#B3D1FA" }}>
                      "Wow, that puzzle was tricky but you stuck with it!"
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#F9D8CE" }}>
                      Time out
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#FAE8CF" }}>
                      "Do you need some quiet time to calm down?"
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#D7F6EE" }}>
                      Nodding, thumbs up, high five
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#B3D1FA" }}>
                      "Thank you for being Super Friends by sharing the trains!"
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

export default withStyles(styles)(ClassroomClimateHelp);
