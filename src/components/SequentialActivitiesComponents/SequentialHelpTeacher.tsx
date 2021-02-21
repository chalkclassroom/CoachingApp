import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell } from '@material-ui/core';

const styles: object = {
  example: {
    backgroundColor: "#f3f3f3",
    fontFamily: "Arimo",
    verticalAlign: 'top',
    fontSize: '0.9em',
    padding: '0.5em',
    width: '25%'
  }
};

interface Props {
  classes: {
    example: string,
  }
}

/**
 * @param {Props} props 
 * @return {ReactElement}
 */
function SequentialHelpTeacher(props: Props): React.ReactElement {
  const { classes } = props;
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className={classes.example}>
            <strong>
              Helping children do sequential activities with manipulatives
              or toys
            </strong>
          </TableCell>
          <TableCell className={classes.example}>
            <strong>
              Supporting children as they draw images or write messages
            </strong>
          </TableCell>
          <TableCell className={classes.example}>
            <strong>Demonstrating the steps to an activity or game</strong>
          </TableCell>
          <TableCell className={classes.example}>
            <strong>
              Supporting children as they act out a dramatic play scenario
              or book
            </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Asking children if they want to put blocks in order from shortest
            to tallest
          </TableCell>
          <TableCell className={classes.example}>
            Asking children to talk about their drawing and/or discussing
            details they could add
          </TableCell>
          <TableCell className={classes.example}>
            Modeling the steps for playing a dice game
          </TableCell>
          <TableCell className={classes.example}>
            Inviting children to act out a book with puppets
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Showing children a new puzzle
          </TableCell>
          <TableCell className={classes.example}>
            Inviting children to create a message based on their developmental
            level (scribbles, letter-like forms, or letters representing
            beginning sounds)
          </TableCell>
          <TableCell className={classes.example}>
            Demonstrating how to sort objects into groups by color, shape,
            size
          </TableCell>
          <TableCell className={classes.example}>
            Joining children&apos;s pretend play as a character to help them act
            out a predictable scenario (doctor&apos;s office, restaurant, etc.)
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

SequentialHelpTeacher.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SequentialHelpTeacher);