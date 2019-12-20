import React from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import {
  // withStyles,
  // AppBar,
  // Toolbar,
  // Typography,
  // Button,
  IconButton
} from "@material-ui/core";
// import { withRouter } from "react-router-dom";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper/Paper";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Grid from "@material-ui/core/Grid";

/**
* formatting and functionalty for notes function in observation tools
* @class Notes
* @param {event} event
*/
class Notes extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      // [
      // eventually get call to firebase using firebase id for id field
      // {id: 1, content: "Mr. Williams spent too much time gathering students after recess", timestamp: "12:00 PM"},
      // ],
      open: this.props.open,
      newNote: ""
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    this.props.firebase.handleFetchNotes().then(notesArr => {
      const formattedNotesArr = [];
      notesArr.map(note => {
        const newTimestamp = new Date(
          note.timestamp.seconds * 1000
        ).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        });
        formattedNotesArr.push({
          id: note.id,
          content: note.content,
          timestamp: newTimestamp
        });
      });
      this.setState({
        newNote: "",
        notes: formattedNotesArr,
        open: this.props.open
      });
      // console.log(this.state);
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose(false);
  };

  /**
   * @param {event} event
   * @return {void}
   */
  handleChange = event => {
    this.setState({ newNote: event.target.value });
  };

  handleSubmit = event => {
    // submit to firebase DB
    this.props.firebase
      .handlePushNotes(this.state.newNote)
      .then(() => {
        /* do nothing */
      })
      .catch(() => {
        console.log("Something wrong with data fetch");
      });

    // update local state for UI
    const notesArr = [];
    this.state.notes.map(note => {
      notesArr.push(note);
    });
    const newNoteTimestamp = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
    notesArr.push({
      id: Math.random(),
      content: this.state.newNote,
      timestamp: newNoteTimestamp
    });
    this.setState(state => {
      return {
        newNote: "",
        notes: notesArr,
        open: state.open
      };
    });
    event.preventDefault();
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          open={this.state.open}
          fullWidth={true}
          maxWidth={"md"}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid container item xs={11}>
              <DialogTitle onClose={this.handleClose}>
                {this.props.text}
              </DialogTitle>
            </Grid>
            <Grid container item xs={1}>
              {this.state.open ? (
                <IconButton
                  aria-label="Close"
                  className="closeButton"
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Grid>
          </Grid>

          <DialogContent className="notesWrapper">
            <Paper
              className="notesTableContainer"
              style={{ width: "90%", overflowX: "auto", margin: "5%" }}
            >
              <Table className="notesTable" style={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        backgroundColor: this.props.color,
                        color: "white",
                        fontSize: 14
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid
                          container
                          item
                          xs={12}
                          alignItems={"center"}
                          justify={"center"}
                        >
                          Time
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: this.props.color,
                        color: "white",
                        fontSize: 14
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid
                          container
                          item
                          xs={12}
                          alignItems={"center"}
                          justify={"center"}
                        >
                          Notes
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.notes ? (
                    this.state.notes.map(note => (
                      <TableRow className="note" key={note.id}>
                        <TableCell component="th" scope="row">
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            text-align="center"
                          >
                            <Grid
                              container
                              item
                              xs={12}
                              alignItems={"center"}
                              justify={"center"}
                            >
                              {/* <em>{moment(note.timestamp.toDate()).format("MMM Do YY HH:mm A")}</em>*/}
                              {note.timestamp}
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell align="right">
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            text-align="center"
                          >
                            <Grid
                              container
                              item
                              xs={12}
                              alignItems={"center"}
                              justify={"center"}
                            >
                              {note.content}
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow></TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </DialogContent>
          <DialogActions>
            <form
              onSubmit={this.handleSubmit}
              style={{ width: "90%", margin: "5%" }}
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid container item xs={11}>
                  <TextField
                    id="standard-new-note"
                    label="New Note"
                    placeholder="Type new note here..."
                    multiline
                    className="newNote"
                    margin="5%"
                    variant="standard"
                    style={{ width: "95%" }}
                    onChange={this.handleChange}
                    value={this.state.newNote}
                  />
                </Grid>
                <Grid container item xs={1}>
                  <IconButton
                    aria-label="add_circle"
                    type="submit"
                    style={{ width: "100%", height: "auto" }}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Notes.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired
};

export default Notes;
