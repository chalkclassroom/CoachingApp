import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles = () => ({
  definitionTitle: {
    backgroundColor: "#cccccc",
    color: "black",
    fontSize: 18,
    textAlign: "center",
    verticalAlign: "middle",
    width: "50%"
  },
  definitionText: {
    backgroundColor: "#e7da84",
    color: "black",
    fontSize: 18,
    textAlign: "center",
    width: "50%"
  },
  buttonTitle: {
    backgroundColor: "#094492",
    color: "white",
    fontSize: 14,
    textAlign: "center",
    width: "20%"
  },
  countChildExamples: {
    backgroundColor: "#d9ead3",
    width: "20%"
  },
  countTeacherExamples: {
    backgroundColor: "#d9ead3",
    width: "20%",
    verticalAlign: "baseline"
  },
  shapeChildExamples: {
    backgroundColor: "#c9daf8",
    width: "20%"
  },
  patternChildExamples: {
    backgroundColor: "#f4cccc",
    width: "20%"
  },
  measureChildExamples: {
    backgroundColor: "#fff2cc",
    width: "20%"
  },
  countExamples: {
    backgroundColor: "#d9ead3",
    textAlign: "center",
    width: "20%"
  },
  shapeExamples: {
    backgroundColor: "#c9daf8",
    textAlign: "center",
    width: "20%"
  },
  patternExamples: {
    backgroundColor: "#f4cccc",
    textAlign: "center",
    width: "20%"
  },
  measureExamples: {
    backgroundColor: "#fff2cc",
    textAlign: "center",
    width: "20%"
  },
  behaviorExamples: {
    backgroundColor: "#FF5252",
    width: "20%"
  }
});

function MathInstructionHelpCard(props) {
  const { classes } = props;
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.definitionTitle}>
              Student Math Type
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell padding="checkbox" className={classes.countExamples}>
              <strong>
                Counting and Numbers
              </strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.shapeExamples}>
              <strong>
                Shapes and Spatial Reasoning
             </strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.patternExamples}>
              <strong>
                Patterns
              </strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.measureExamples}>
              <strong>
                Measurement and Data
              </strong>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.countChildExamples}>
              <strong>Counts, quantifies, or describes sets of objects; connects numerals to counted objects</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.shapeChildExamples}>
              <strong>Identifies, compares, builds, or takes apart shapes; talks about the  position of objects; works with maps</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.patternChildExamples}>
              <strong>
                Notices, copies, or creates a pattern in the environment or with manipulatives
              </strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.measureChildExamples}>
              <strong>
                Compares and orders objects by size, length, or weight; relates time to daily routines or schedule; represents or analyzes data
             </strong>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.countChildExamples}>
              Counts six marbles and says, “I have six.”            </TableCell>
            <TableCell padding="checkbox" className={classes.shapeChildExamples}>
              Points to a picture of a piece of pizza in a book and says, “This is a triangle!”
            </TableCell>
            <TableCell padding="checkbox" className={classes.patternChildExamples}>
              While looking at tiles on the floor child says, “I see black, white, black, white”
            </TableCell>
            <TableCell padding="checkbox" className={classes.measureChildExamples}>
              Places toy animals side by side in order of length
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.countChildExamples}>
              Notices parts of a whole: “I have five bears, two are red and three are blue.”
            </TableCell>
            <TableCell padding="checkbox" className={classes.shapeChildExamples} >
              Creates a square from two triangles.
            </TableCell>
            <TableCell padding="checkbox" className={classes.patternChildExamples}>
              Adds to a green-red-green pattern using cubes
            </TableCell>
            <TableCell padding="checkbox" className={classes.measureChildExamples}>
              Determines that his shoe is “12 cubes long”
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.countChildExamples}>
              Places seven buttons on the 7 card.
             </TableCell>
            <TableCell padding="checkbox" className={classes.shapeChildExamples} >
              Says, “I put the book in the middle of the table.”
             </TableCell>
            <TableCell padding="checkbox" className={classes.patternChildExamples}>
              Creates an A-B-C pattern using stickers (frog, heart, dog, frog, heart dog...etc.)
             </TableCell>
            <TableCell padding="checkbox" className={classes.measureChildExamples}>
              Looks at the picture schedule and says, “Next we have recess!”
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.countChildExamples}>
            </TableCell>
            <TableCell padding="checkbox" className={classes.shapeChildExamples} >
              Draws a simple map of the classroom.
             </TableCell>
            <TableCell padding="checkbox" className={classes.patternChildExamples}>
            </TableCell>
            <TableCell padding="checkbox" className={classes.measureChildExamples}>
              ** I don’t think they would do anything with graphs/data during centers so perhaps we save this one for whole group/small group when we create that?
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.definitionText}>
              Teacher Behaviors
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell padding="checkbox" className={classes.countExamples}>
              <strong>Using math vocabulary</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.shapeExamples}>
              <strong>Asking questions about math concepts</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.patternExamples}>
              <strong> Demonstrating  math concepts  </strong>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell rowspan="6" padding="checkbox" className={classes.countTeacherExamples}>
              <div> number words (one, two, three) </div>
              <div>less</div>
              <div>equal</div>
              <div>compare</div>
              <div>behind</div>
              <div>above</div>
              <div>square</div>
              <div>cone</div>
              <div>pattern</div>
              <div>measure</div>
              <div>length</div>
            </TableCell >
            <TableCell padding="checkbox" className={classes.shapeChildExamples}>
              How many buttons do you have?
            </TableCell>
            <TableCell padding="checkbox" className={classes.patternChildExamples}>
              Shows how to say one number as each object is counted.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.shapeChildExamples}>
              Who has more- Anna or Marco?
            </TableCell>
            <TableCell padding="checkbox" className={classes.patternChildExamples}>
              Models how to identify shapes by counting the sides.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.shapeChildExamples}>
              How many do you need to get to five?
            </TableCell>
            <TableCell padding="checkbox" className={classes.patternChildExamples} >
              Shows how to create a repeating pattern with cubes.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.shapeChildExamples}>
              How do you know that’s a triangle?
             </TableCell>
            <TableCell padding="checkbox" className={classes.patternChildExamples} >
              Demonstrates how to compare the length of two blocks.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.shapeChildExamples}>
              Where did you put the orange block--above or below the blue block?
            </TableCell>
            <TableCell padding="checkbox" className={classes.patternChildExamples} >
              Models how to use position words when talking about the location of objects.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </div>
  )
}

MathInstructionHelpCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MathInstructionHelpCard);
