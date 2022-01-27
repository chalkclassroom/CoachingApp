import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell } from '@material-ui/core';

const styles: object = {
  header: {
    fontFamily: 'Arimo',
    fontSize: '1.1em',
    padding: '0.5em'
  },
  teacherExample: {
    backgroundColor: "#f3f3f3",
    fontFamily: "Arimo",
    fontSize: '0.9em',
    height: '20%',
    padding: '0.5em',
    verticalAlign: 'top'
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
          <TableCell align="center" className={classes.header} style={{backgroundColor: '#9cb4d3'}}>
            <strong>Using math vocabulary</strong>
          </TableCell>
          <TableCell align="center" className={classes.header} style={{backgroundColor: '#b8efe0'}}>
            <strong>Asking questions about math concepts</strong>
          </TableCell>
          <TableCell align="center" className={classes.header} style={{backgroundColor: '#f6d7ab'}}>
            <strong>Demonstrating math concepts</strong>
          </TableCell>
          <TableCell align="center" className={classes.header} style={{backgroundColor: '#99d3c1'}}>
            <strong>Helping children use math to problem solve</strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={5} className={classes.teacherExample}>
            <ul style={{paddingLeft: '0.5em', marginTop: 0}}>
              <li>
              number words (one, two, three)
              </li>
              <li>
                less
              </li>
              <li>
                equal
              </li>
              <li>
                compare
              </li>
              <li>
                behind
              </li>
              <li>
                above
              </li>
              <li>
                square
              </li>
              <li>
                cone
              </li>
              <li>
                pattern
              </li>
              <li>
                measure
              </li>
              <li>
                length
              </li>
            </ul>
          </TableCell>
          <TableCell className={classes.teacherExample}>
            How many buttons do you have?
          </TableCell>
          <TableCell className={classes.teacherExample}>
            Shows how to say one number as each object is counted.
          </TableCell>
          <TableCell className={classes.teacherExample}>
            Highlights how classroom objects (clock, class schedule, blocks)
            can be used for math activities.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.teacherExample}>
            Who has more- Anna or Marco?
          </TableCell>
          <TableCell className={classes.teacherExample}>
            Models how to identify shapes by counting the sides.
          </TableCell>
          <TableCell className={classes.teacherExample}>
            Models ways in which math can be used to solve everyday problems
            <br />
            <i>If there are 6 cookies and three of you, how many cookies should everyone get?</i>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.teacherExample}>
            How many do you need to get to five?
          </TableCell>
          <TableCell className={classes.teacherExample}>
            Shows how to create a repeating pattern with cubes.
          </TableCell>
          <TableCell className={classes.teacherExample}>
            Suggests alternative strategies when student is
            struggling with math problem.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.teacherExample}>
            How do you know that’s a triangle?
          </TableCell>
          <TableCell className={classes.teacherExample}>
            Demonstrates how to compare the length of two blocks.
          </TableCell>
          <TableCell className={classes.teacherExample}>
            Prompts children to come up with multiple strategies to solve math problem.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.teacherExample}>
            Where did you put the orange block--above or below the blue block?
          </TableCell>
          <TableCell className={classes.teacherExample}>
            Models how to use position words when talking about the location of objects.
          </TableCell>
          <TableCell className={classes.teacherExample}>
            Encourages children to take on challenges they have
            not previously been taught to solve.
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