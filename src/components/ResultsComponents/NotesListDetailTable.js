import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Paper from "@material-ui/core/Paper/Paper";

const styles = {
  paper: {
    width: "100%",
    overflowX: "auto",
    marginRight: "10%"
  },
  tableHeader: {
    backgroundColor: "#094492",
    color: "white",
    fontSize: 14
  },
};

class NotesListDetailTable extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>
                Time
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Notes
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(row => (
              <TableRow className={classes.row} key={row.id}>
                <TableCell component="th" scope="row">
                  {row.timestamp}
                </TableCell>
                <TableCell align="right">
                  {row.content}
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
  data: PropTypes.object.isRequired
};

export default withStyles(styles)(NotesListDetailTable);
