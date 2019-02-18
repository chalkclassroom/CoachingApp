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
    //idk how this works
};
class ListDetailTableClassroomClimateResults extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Paper
                style={{ width: "80%", overflowX: "auto", marginRight: "10%" }}
            >
                <Table className={classes.table}>
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
                        {this.props.data.map(row => (
                            <TableRow className={classes.row} key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.time}
                                </TableCell>
                                <TableCell align="right">{row.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

ListDetailTableClassroomClimateResults.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(ListDetailTableClassroomClimateResults);
