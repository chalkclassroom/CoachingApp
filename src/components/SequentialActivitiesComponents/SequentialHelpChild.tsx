import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
  childExample1: {
    backgroundColor: "#FFF6CC",
    fontFamily: "Arimo"
  },
  childExample2: {
    backgroundColor: "#FFEE99",
    fontFamily: "Arimo"
  },
  childExample3: {
    backgroundColor: "#FFE14C",
    fontFamily: "Arimo"
  },
  childExample4: {
    backgroundColor: "#FFD300",
    fontFamily: "Arimo"
  },
};

interface Props {
  classes: {
    childExample1: string,
    childExample2: string,
    childExample3: string,
    childExample4: string,
  }
}

/**
 * @param {Props} props 
 * @return {ReactElement}
 */
function SequentialHelpChild(props: Props): React.ReactElement {
  const { classes } = props;
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell padding="checkbox" className={classes.childExample1}>
            <strong>Using materials in a step-by-step, predictable way</strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample2}>
            <strong>
              Drawing recognizable images or writing names or messages
              (letters or letter-like forms)
            </strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample3}>
            <strong>
              Playing a game with set rules and/or taking turns
            </strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample4}>
            <strong>
              Speaking or acting according to a pretend scenario that
              follows a predictable plot
            </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.childExample1}>
            Forming recognizable shapes, letters, or objects
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample2}>
            Drawing a recognizable picture like a dog or a tree
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample3}>
            Following the rules for Candyland
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample4}>
            Acting out a story from a book
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.childExample1}>
            Working a puzzle or matching cards
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample2}>
            Writing names or messages with letters or letter-like forms
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample3}>
            Taking turns rolling a ball
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample4}>
            Pretending to be a family in dramatic play with clear roles and
            predictable actions
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.childExample1}>
            Looking carefully at the pictures of a book in order
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample2}>
            Writing in response to journal prompts or labeling a drawing
            (child writes &quot;C&quot; for car)
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample3}>
            Following a set of rules for an invented game
          </TableCell>
          <TableCell padding="checkbox" className={classes.childExample4} />
        </TableRow>
      </TableBody>
    </Table>
  )
}

SequentialHelpChild.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SequentialHelpChild);