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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        backgroundColor: "#094492",
                        color: "white",
                        fontSize: 18,
                        textAlign: "center",
                        width: "50%"
                      }}
                    >
                      TRANSITIONS BEGIN WHEN:
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#094492",
                        color: "white",
                        fontSize: 18,
                        textAlign: "center",
                        width: "50%"
                      }}
                    >
                      TRANSITIONS END WHEN:
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#759fe5", width: "50%"}}>
                      <strong>
                        A majority (more than half) of the children
                        are in transition
                      </strong>
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#759fe5", width: "50%" }}>
                      <strong>
                        A majority (more than half) of the children
                        have started the next activity
                      </strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography variant="subtitle2" gutterBottom style={{padding:10}}>
              While you are recording a transition, choose the button representing 
              the <strong>primary</strong> reason for that transition. <strong>Change </strong>  
              the button if the primary reason changes during the same transition. 
              Choose the <strong>“Other”</strong> button if the reason for the transition is not represented 
              in the other buttons, and you will be prompted to explain the reason in the Notes.
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"
                      style={{ 
                        backgroundColor: "#094492", 
                        color: "white",
                        fontSize: 14,
                        textAlign: "center", 
                        width: "20%"}}>
                      Waiting in line/lining up
                    </TableCell>
                    <TableCell padding="checkbox"
                      style={{ 
                        backgroundColor: "#094492", 
                        color: "white",
                        fontSize: 14,
                        textAlign: "center", 
                        width: "20%"}}>
                      Traveling outside the classroom
                    </TableCell>
                    <TableCell padding="checkbox"
                      style={{ 
                        backgroundColor: "#094492", 
                        color: "white",
                        fontSize: 14,
                        textAlign: "center", 
                        width: "20%"}}>
                      Children waiting on teacher/materials
                    </TableCell>
                    <TableCell padding="checkbox"
                      style={{ 
                        backgroundColor: "#094492", 
                        color: "white",
                        fontSize: 14,
                        textAlign: "center", 
                        width: "20%"}}>
                      Classroom Routines
                    </TableCell>
                    <TableCell padding="checkbox"
                      style={{ 
                        backgroundColor: "#094492", 
                        color: "white",
                        fontSize: 14,
                        textAlign: "center", 
                        width: "20%"}}>
                      Behavior Management Disruption
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#AED581", width:"20%"}}>
                      <strong>Lining up or waiting in line</strong>
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FFA726", width:"20%" }}>
                      <strong>Walking from one part of the school to another</strong>
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FF7043", width:"20%" }}>
                      <strong>Delays or interruptions because teacher or materials are not ready</strong>
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#64B5F6", width:"20%" }}>
                      <strong>Participating in routine, non-learning activities</strong>
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FF5252", width:"20%" }}>
                      <strong>Delays or interruptions due to behavior management</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} style={{backgroundColor: "#759fe5", textAlign:"center"}}>
                      <strong>EXAMPLES:</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#AED581", width:"20%"  }}>
                      Lining up to leave the classroom, playground, etc.
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FFA726", width:"20%"  }}>
                      Walking to the playground, library, music room, etc.
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FF7043", width:"20%" }}>
                      Teacher stops an activity or delays the start of a new activity to gather or prepare materials 
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#64B5F6", width:"20%" }}>
                      Cleaning up, hand-washing, getting out cots or meal trays, etc.
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FF5252", width:"20%" }}>
                      Teacher stops a learning activity to address behavior
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#AED581", width:"20%"  }}>
                      Children are lined up but are waiting to go to the next place
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FFA726", width:"20%"  }}>
                      
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FF7043", width:"20%" }}>
                      Teacher stops an activity or delays the start of a new activity to do something unrelated to activity
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#64B5F6", width:"20%" }}>
                      Bathroom and/or water break in the classroom or hallway
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FF5252", width:"20%" }}>
                     
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#AED581" }}>
                      Waiting in line for lunch
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FFA726" }}>
                      
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FF7043"}}>
                      
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#64B5F6"}}>
                      Moving from one activity to another (e.g., whole group to centers)
                    </TableCell>
                    <TableCell padding="checkbox" style={{ backgroundColor: "#FF5252"}}>
                      
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
