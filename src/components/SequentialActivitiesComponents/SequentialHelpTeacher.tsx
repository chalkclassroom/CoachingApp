import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
  teacherExample1: {
    backgroundColor: "#f3f3f3",
    fontFamily: "Arimo"
  },
  teacherExample2: {
    backgroundColor: "#f3f3f3",
    fontFamily: "Arimo"
  },
  teacherExample3: {
    backgroundColor: "#f3f3f3",
    fontFamily: "Arimo"
  },
  teacherExample4: {
    backgroundColor: "#f3f3f3",
    fontFamily: "Arimo"
  },
};

interface Props {
  classes: {
    teacherExample1: string,
    teacherExample2: string,
    teacherExample3: string,
    teacherExample4: string
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
          <TableCell padding="checkbox" className={classes.teacherExample1}>
            <strong>
              Helping children do sequential activities with manipulatives
              or toys
            </strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample2}>
            <strong>Demonstrating the steps to an activity or game</strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample3}>
            <strong>
              Supporting children as they act out a dramatic play scenario
              or book
            </strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample4}>
            <strong>
              Supporting children&apos;s drawing of an image or writing a message
            </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.teacherExample1}>
            Asking children if they want to put blocks in order from shortest
            to tallest
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample2}>
            Modeling the steps for playing a dice game
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample3}>
            Inviting children to act out a book with puppets
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample4}>
            Asking children to talk about their drawing and/or discussing
            details they could add
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.teacherExample1}>
            Showing children a new puzzle
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample2}>
            Demonstrating how to sort objects into groups by color, shape,
            size
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample3}>
            Joining children&apos;s pretend play as a character to help them act
            out a predictable scenario (doctor&apos;s office, restaurant, etc.)
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample4}>
            Inviting children to create a message based on their developmental
            level (scribbles, letter-like forms, or letters representing
            beginning sounds)
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