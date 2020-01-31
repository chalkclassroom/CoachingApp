import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles = () => ({
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
  disapprovalTitle: {
    backgroundColor: "#E14B24",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "25%"
  },
  disapprovalExample: {
    backgroundColor: "#F9D8CE",
    padding: "1%"
  },
  redirectionTitle: {
    backgroundColor: "#E69129",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "25%"
  },
  redirectionExample: {
    backgroundColor: "#FAE8CF",
    padding: "1%"
  },
  generalTitle: {
    backgroundColor: "#46D3AA",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "25%"
  },
  generalExample: {
    backgroundColor: "#D7F6EE",
    padding: "1%"
  },
  specificTitle: {
    backgroundColor: "#0C3C87",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "25%"
  },
  specificExample: {
    backgroundColor: "#B3D1FA",
    padding: "1%"
  }
});


function ClassroomClimateHelpCard(props) {
  const { classes } = props;
  return (
    <div>
       <Table padding="checkbox">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.disapprovalTitle}>
                      DISAPPROVAL
                    </TableCell>
                    <TableCell className={classes.redirectionTitle}>
                      REDIRECTION
                    </TableCell>
                    <TableCell className={classes.generalTitle}>
                      GENERAL PRAISE
                    </TableCell>
                    <TableCell className={classes.specificTitle}>
                      SPECIFIC PRAISE
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.disapprovalExample}>
                      <strong>
                        Teacher discourages behavior without providing an
                        alternative
                      </strong>
                    </TableCell>
                    <TableCell className={classes.redirectionExample}>
                      <strong>
                        Teacher suggests an alternative to the child&apos;s current
                        behavior
                      </strong>
                    </TableCell>
                    <TableCell className={classes.generalExample}>
                      <strong>
                        Teacher gives a general comment of approval
                      </strong>
                    </TableCell>
                    <TableCell className={classes.specificExample}>
                      <strong>
                        Teacher gives a positive comment on a specific behavior
                      </strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.disapprovalExample}>
                      &quot;Stop it.&quot;
                    </TableCell>
                    <TableCell className={classes.redirectionExample}>
                      &quot;Are you making a good choice?&quot;
                    </TableCell>
                    <TableCell className={classes.generalExample}>
                      &quot;Kiss your brain!&quot;
                    </TableCell>
                    <TableCell className={classes.specificExample}>
                      &quot;I like the way you&apos;re using your finger to count the
                      cubes.&quot;
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.disapprovalExample}>
                      &quot;I said stay in your seat.&quot;
                    </TableCell>
                    <TableCell className={classes.redirectionExample}>
                      &quot;Do you want to sit on a letter or a number?&quot;
                    </TableCell>
                    <TableCell className={classes.generalExample}>
                      &quot;Good job!&quot;
                    </TableCell>
                    <TableCell className={classes.specificExample}>
                      &quot;Wow, that puzzle was tricky but you stuck with it!&quot;
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.disapprovalExample}>
                      Time out
                    </TableCell>
                    <TableCell className={classes.redirectionExample}>
                      &quot;Do you need some quiet time to calm down?&quot;
                    </TableCell>
                    <TableCell className={classes.generalExample}>
                      Nodding, thumbs up, high five
                    </TableCell>
                    <TableCell className={classes.specificExample}>
                      &quot;Thank you for being Super Friends by sharing the trains!&quot;
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
    </div>
  )
}

ClassroomClimateHelpCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClassroomClimateHelpCard);
