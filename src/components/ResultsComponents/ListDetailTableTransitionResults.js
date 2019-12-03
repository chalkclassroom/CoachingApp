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
    width: "60vw",
    overflowX: "auto"
  },
  tableHeader: {
    backgroundColor: "#3f51b5",
    color: "white",
    fontSize: 14
  },
  tableBody: {
    backgroundColor: "#ffc107",
    color: "black",
    fontSize: 14
  }
};
class ListDetailTableTransitionResults extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Start Time</TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Duration
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(row => (
              <TableRow className={classes.row} key={row.id}>
                <TableCell component="th" scope="row">
                  {row.startTime}
                </TableCell>
                <TableCell align="right">{row.duration}</TableCell>
                {row.type === "INSIDE" ? (
                  <TableCell className={classes.tableBody}>
                    {row.type}
                  </TableCell>
                ) : row.type === "OUTSIDE" ? (
                  <TableCell className={classes.tableBody}>
                    {row.type}
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ListDetailTableTransitionResults.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withStyles(styles)(ListDetailTableTransitionResults);
