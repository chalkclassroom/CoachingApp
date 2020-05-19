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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import * as Constants from "../../constants";

const styles: object = {
  paper: {
    width: "100%",
    overflowX: "auto",
    marginRight: "10%"
  },
  tableHeader: {
    color: "white",
    fontSize: 14
  }
};

interface Style {
  paper: string,
  tableHeader: string
}

interface Props {
  classes: Style,
  data: Array<{ timestamp: Date, content: string }>,
  magic8: string,
  sessionId: string,
  firebase: {
    addNoteToConferencePlan(conferencePlanId: string, note: string): void
  }
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
    sessionId: PropTypes.string.isRequired
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
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader} style={{backgroundColor: color}}>Time</TableCell>
              <TableCell className={classes.tableHeader} style={{backgroundColor: color}} align="right">
                Notes
              </TableCell>
              <TableCell className={classes.tableHeader} style={{backgroundColor: color, width: '10%'}} />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.timestamp}
                </TableCell>
                <TableCell align="right">{row.content}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => this.addNoteToConferencePlan('kcExtyWKyytbMnImnhPF', row.content)}>
                    <AddCircleIcon style={{fill: color}} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

NotesListDetailTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(NotesListDetailTable);
