import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import {withRouter} from 'react-router-dom'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper/Paper";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";


// import Firebase, {FirebaseContext} from "./Firebase"

function getModalStyle() {
  return {
    position: "fixed",
    top: `35%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        // eventually get call to firebase using firebase id for id field
        {id: 1, content: "dummy1", timestamp: "12:00"},
        {id: 2, content: "dummy2", timestamp: "12:04"}
      ],
      open: this.props.open,
      newNote: ""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose(false);
  };

  handleChange = (event) => {
    this.setState({newNote: event.target.value});
  };

  handleSubmit = (event) => {
    //Eventually submit this to firebase and read from DB
    let notesArr = [];
    this.state.notes.map((note) => {
      notesArr.push(note);
    });
    const curTimestamp = new Date();
    let newNoteTimestamp = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
    notesArr.push({id: Math.random(), content: this.state.newNote, timestamp: newNoteTimestamp});
    this.setState((state) => {
      return {
        newNote: "",
        notes: notesArr,
        open: state.open
      }
    });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          open={this.state.open}>
          <DialogTitle onClose={this.handleClose}>
            Notes
            {this.state.open ? (
              <IconButton aria-label="Close" className="closeButton" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
          <DialogContent className="notesWrapper" >
            {/*style={{ width: "70%", overflowX: "auto", marginTop: "20%", marginLeft: "15%", backgroundColor: "#bdbdbd" }}*/}
            <Paper className="notesTableContainer"
                   style={{width: "90%", overflowX: "auto", margin: "5%" }}>
              <Table className="notesTable"
                     style={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        backgroundColor: "#3f51b5",
                        color: "white",
                        fontSize: 14
                      }}
                    >
                      Time
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "#3f51b5",
                        color: "white",
                        fontSize: 14
                      }}
                      align="right"
                    >
                      Notes
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.notes.map(note => (
                    <TableRow className="note" key={note.id}>
                      <TableCell component="th" scope="row">
                        {note.timestamp}
                      </TableCell>
                      <TableCell align="right">
                        {note.content}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </DialogContent>
          <DialogActions>
            <form onSubmit={this.handleSubmit}
                  style={{width: "90%", margin: "5%"}}>
              <TextField
                id="standard-new-note"
                label="New Note"
                placeholder="New Note"
                multiline
                className="newNote"
                margin="5%"
                variant="standard"
                style={{width: "83%"}}
                onChange={this.handleChange}
              />
              <IconButton
                aria-label="add_circle"
                type="submit"
                style={{width: "auto", height: "auto", margin: "1%"}}>
                <AddCircleIcon/>
              </IconButton>
            </form>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

Notes.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Notes;