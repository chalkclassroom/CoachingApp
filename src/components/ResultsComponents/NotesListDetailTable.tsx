import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Paper from "@material-ui/core/Paper/Paper";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import * as Constants from "../../constants";

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
    borderRadius: 8
  },
  tableHeader: {
    color: "white",
    fontSize: '1.2em'
  },
  tableText: {
    color: 'black',
    fontSize: '1em'
  }
};

interface Style {
  paper: string,
  tableHeader: string,
  tableText: string
}

interface Props {
  classes: Style,
  data: Array<{ timestamp: Date, content: string }>,
  magic8: string,
  sessionId: string,
  firebase: {
    addNoteToConferencePlan(conferencePlanId: string, note: string): void
  },
  handleClose(): void,
  open: boolean
}

/**
 * formats table display of observation notes on results screens
 * @class NotesListDetailTable
 */
class NotesListDetailTable extends React.Component<Props, {}> {
  
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    magic8: PropTypes.string.isRequired,
    sessionId: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  };

  /**
   * @param {string} conferencePlanId
   * @param {string} note
   */
  addNoteToConferencePlan = (conferencePlanId: string, note: string): void => {
    this.props.firebase.addNoteToConferencePlan(conferencePlanId, note)
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    let color = '';
    this.props.magic8 === "Transition Time" ? 
      color = Constants.Colors.TT
    : this.props.magic8 === "Classroom Climate" ?
      color = Constants.Colors.CC
    : this.props.magic8 === "Math Instruction" ?
      color = Constants.Colors.MI
    : this.props.magic8 === "Level of Engagement" ?
      color = Constants.Colors.SE
    : this.props.magic8 === "Level of Instruction" ?
      color = Constants.Colors.LI
    : this.props.magic8 === "Listening to Children" ?
      color = Constants.Colors.LC
    : this.props.magic8 === "Sequential Activities" ?
      color = Constants.Colors.SA
    : color = Constants.Colors.AC

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
                      onClick={this.props.handleClose}
                    />
                  </Tooltip>
                </IconButton>
              </Grid>
            </Grid>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeader} style={{backgroundColor: color, width: '15%'}}>Time</TableCell>
                  <TableCell className={classes.tableHeader} style={{backgroundColor: color}} align="left">
                    Notes
                  </TableCell>
                  <TableCell className={classes.tableHeader} style={{backgroundColor: color, width: '10%'}}>Add to Conference Plan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" className={classes.tableText}>
                      {row.timestamp}
                    </TableCell>
                    <TableCell align="left" className={classes.tableText}>{row.content}</TableCell>
                    <TableCell align="center" className={classes.tableText}>
                      <Button onClick={() => this.addNoteToConferencePlan('kcExtyWKyytbMnImnhPF', row.content)}>
                        <AddCircleIcon style={{fill: color}} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Modal>
      </div>
    );
  }
}

NotesListDetailTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(NotesListDetailTable);
