import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Paper from "@material-ui/core/Paper/Paper";
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
  magic8: string
}

/**
 * formats table display of observation notes on results screens
 * @class NotesListDetailTable
 */
class NotesListDetailTable extends React.Component<Props, {}> {
  
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    magic8: PropTypes.string.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    let color = '';
    this.props.magic8 === "Transition Time" ? 
      color = Constants.TransitionColor
    : this.props.magic8 === "Classroom Climate" ?
      color = Constants.ClimateColor
    : this.props.magic8 === "Math Instruction" ?
      color = Constants.MathColor
    : this.props.magic8 === "Level of Engagement" ?
      color = Constants.EngagementColor
    : this.props.magic8 === "Level of Instruction" ?
      color = Constants.ListeningColor
    : this.props.magic8 === "Sequential Activities" ?
      color = Constants.SequentialColor
    : color = Constants.ACColor

    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader} style={{backgroundColor: color}}>Time</TableCell>
              <TableCell className={classes.tableHeader} style={{backgroundColor: color}} align="right">
                Notes
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.timestamp}
                </TableCell>
                <TableCell align="right">{row.content}</TableCell>
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
