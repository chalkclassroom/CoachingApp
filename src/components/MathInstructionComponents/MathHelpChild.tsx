import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
  header: {
    backgroundColor: '#f3f3f3',
    fontFamily: "Arimo",
    fontWeight: 'bold',
    fontSize: '1.1em',
    color: 'black',
    paddingRight: '24px' // default is larger--24 matches paddingLeft default
  },
  childExample: {
    backgroundColor: "#f3f3f3",
    fontSize: '0.9em',
    fontFamily: "Arimo",
    width: '25%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    verticalAlign: 'top'
  }
};

interface Props {
  classes: {
    header: string,
    childExample: string,
  }
}

/**
 * @param {Props} props 
 * @return {ReactElement}
 */
function MathHelpChild(props: Props): React.ReactElement {
  const { classes } = props;
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align="center" className={classes.header} style={{backgroundColor: '#9ccff7'}}>
            Counting and Numbers
          </TableCell>
          <TableCell align="center" className={classes.header} style={{backgroundColor: '#f4bba9'}}>
            Shapes and Spatial Reasoning
          </TableCell>
          <TableCell align="center" className={classes.header} style={{backgroundColor: '#c5afe7'}}>
            Patterns
          </TableCell>
          <TableCell align="center" className={classes.header} style={{backgroundColor: '#ffed99'}}>
            Measurement and Data
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.childExample}>
            <strong>
              Counts, quantifies, or describes sets of objects;
              connects numerals to counted objects
            </strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            <strong>
              Identifies, compares, builds, or takes apart shapes;
              talks about the position of objects; works with maps
            </strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            <strong>
              Notices, copies, or creates a pattern in the
              environment or with manipulatives
            </strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            <strong>
            Compares and orders objects by size, length, or weight;
            relates time to daily routines or schedule;
            represents or analyzes data
            </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.childExample}>
            Counts six marbles and says, “I have six.”
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            Points to a picture of a piece of pizza in a book and says, “This is a triangle!”
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            While looking at tiles on the floor child says, “I see black, white, black, white”
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            Places toy animals side by side in order of length
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.childExample}>
            Notices parts of a whole: “I have five bears, two are red and three are blue.”
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            Creates a square from two triangles.
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            Adds to a green-red-green pattern using cubes
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            Determines that his shoe is “12 cubes long”
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.childExample}>
            Sorts buttons by the number of holes
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            Says, “I put the book in the middle of the table.”
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            Creates an A-B-C pattern using stickers (frog, heart, dog, frog, heart dog...etc.)
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            Looks at the picture schedule and says, “Next we have recess!”
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.childExample}>
            Places seven buttons on the 7 card.
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample}>
            Draws a simple map of the classroom.
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample} />
          <TableCell padding="checkbox" className={classes.childExample} />
        </TableRow>
      </TableBody>
    </Table>
  )
}

MathHelpChild.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MathHelpChild);