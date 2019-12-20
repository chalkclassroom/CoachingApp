import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Paper from "@material-ui/core/Paper/Paper";

const styles: object = {
  paper: {
    width: "100%",
    overflowX: "auto",
    marginRight: "10%"
  },
  tableHeader: {
    backgroundColor: "#094492",
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
  data: Array<{ timestamp: any, content: string }>
}

/**
 * formats table display of observation notes on results screens
 * @class NotesListDetailTable
 */
class NotesListDetailTable extends React.Component<Props, {}> {
  
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Time</TableCell>
              <TableCell className={classes.tableHeader} align="right">
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
