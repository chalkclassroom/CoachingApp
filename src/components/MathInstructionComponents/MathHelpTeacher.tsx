import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
  header: {
    fontFamily: 'Arimo',
    fontSize: '1.1em'
  },
  teacherExample: {
    backgroundColor: "#f3f3f3",
    fontFamily: "Arimo",
    fontSize: '0.9em'
  }
};

interface Props {
  classes: {
    header: string,
    teacherExample: string,
  }
}

/**
 * @param {Props} props 
 * @return {ReactElement}
 */
function MathHelpTeacher(props: Props): React.ReactElement {
  const { classes } = props;
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell padding="checkbox" className={classes.header} style={{backgroundColor: '#9cb4d3'}}>
            <strong>Using math vocabulary</strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.header} style={{backgroundColor: '#f6d7ab'}}>
            <strong>Asking questions about math concepts</strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.header} style={{backgroundColor: '#99d3c1'}}>
            <strong>Demonstrating math concepts</strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={5} padding="checkbox" className={classes.teacherExample}>
            number words (one, two, three)
            <br />
            less
            <br />
            equal
            <br />
            compare
            <br />
            behind
            <br />
            above
            <br />
            square
            <br />
            cone
            <br />
            pattern
            <br />
            measure
            <br />
            length
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample}>
            How many buttons do you have?
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample}>
            Shows how to say one number as each object is counted. 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.teacherExample}>
            Who has more- Anna or Marco?
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample}>
            Models how to identify shapes by counting the sides.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.teacherExample}>
            How many do you need to get to five?
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample}>
            Shows how to create a repeating pattern with cubes. 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.teacherExample}>
            How do you know that’s a triangle?
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample}>
            Demonstrates how to compare the length of two blocks.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.teacherExample}>
            Where did you put the orange block--above or below the blue block?
          </TableCell>
          <TableCell padding="checkbox" className={classes.teacherExample}>
            Models how to use position words when talking about the location of objects.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

MathHelpTeacher.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MathHelpTeacher);