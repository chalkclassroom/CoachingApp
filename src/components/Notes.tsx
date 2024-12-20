import * as React from "react";
import * as PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";
import { Table, TableRow, TableBody, TableCell, TableHead, TextField } from '@material-ui/core';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import NoteText from "./Shared/NoteText";

interface Props {
  open: boolean,
  firebase: {
    handleFetchNotes(): Array<{
      id: string,
      content: string,
      Timestamp: Date
    }>,
    handleUpdateNote(id:string, newText:string):void
    handlePushNotes(note: string): void
  },
  onClose(value: boolean): void,
  text: string,
  color: string
}

interface State {
  notes: Array<{
    content: string,
    timestamp: string,
    id: string
  }>,
  open: boolean,
  newNote: string
}

/**
* formatting and functionalty for notes function in observation tools
* @class Notes
* @param {event} event
*/
class Notes extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      notes: [],
      open: this.props.open,
      newNote: "",
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    let notesArr = this.props.firebase.handleFetchNotes()
      let formattedNotesArr = notesArr.map(note => {
          return {
            content: note.content,
            id: note.id,
            timestamp: note.Timestamp.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true
            })
          }
        })
      this.setState({
        newNote: "",
        notes: formattedNotesArr,
        open: this.props.open
      });
  }


  getFormatedNotes = () => {
    return this.props.firebase.handleFetchNotes().map(note => {
      return {
        content: note.content,
        id: note.id,
        timestamp: note.Timestamp.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        })
      }
    })
  }

  handleOpen = (): void => {
    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false });
    this.props.onClose(false);
  };
  handleUpdateNote = (id: string) => {
      return (newText: string) => {
          this.props.firebase.handleUpdateNote(id, newText)
        this.setState({
          notes: this.getFormatedNotes()
        })
        }
    }

  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   * @return {void}
   */
  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    this.setState({ newNote: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    this.props.firebase.handlePushNotes(this.state.newNote)
    this.setState(state => {
      return {
        newNote: "",
        notes: this.getFormatedNotes(),
        open: state.open
      };
    });
    event.preventDefault();
  };

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    firebase: PropTypes.exact({
      handleFetchNotes: PropTypes.func,
      handlePushNotes: PropTypes.func
    }).isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
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
              <DialogTitle style={{fontFamily: 'Arimo'}}>
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
                          style={{fontFamily: 'Arimo'}}
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
                          style={{fontFamily: 'Arimo'}}
                        >
                          Notes
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{overflowY: 'auto'}}>
                  {this.state.notes ? (
                    this.state.notes.map((note, index) => (
                      <TableRow className="note" key={index} style={{padding: '.5rem 0'}}>
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
                              style={{fontFamily: 'Arimo'}}
                            >
                              {note.timestamp}
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell  align="right" style={{overflowWrap:'break-word'}}>
                          <NoteText text={note.content} id={note.id} handleUpdate={this.handleUpdateNote(note.id, index)} />
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
                    autoFocus
                    id="standard-new-note"
                    label="New Note"
                    placeholder="Type new note here..."
                    multiline
                    className="newNote"
                    margin="normal"
                    variant="standard"
                    style={{ width: "95%" }}
                    onChange={this.handleChange}
                    value={this.state.newNote}
                    inputRef={input => input && input.focus()}
                    InputProps={{style: {fontFamily: 'Arimo'}}}
                    InputLabelProps={{style: {fontFamily: 'Arimo'}}}
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

export default Notes;
