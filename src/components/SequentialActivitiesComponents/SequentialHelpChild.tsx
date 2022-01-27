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
    example: string
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
          <TableCell className={classes.example}>
            <strong>Using materials in a step-by-step, predictable way</strong>
          </TableCell>
          <TableCell className={classes.example}>
            <strong>
              Drawing recognizable images or writing names or messages
              (letters or letter-like forms)
            </strong>
          </TableCell>
          <TableCell className={classes.example}>
            <strong>
              Playing a game with set rules and/or taking turns
            </strong>
          </TableCell>
          <TableCell className={classes.example}>
            <strong>
              Speaking or acting according to a pretend scenario that
              follows a predictable plot
            </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Forming recognizable shapes, letters, or objects
          </TableCell>
          <TableCell className={classes.example}>
            Drawing a recognizable picture like a dog or a tree
          </TableCell>
          <TableCell className={classes.example}>
            Following the rules for Candyland
          </TableCell>
          <TableCell className={classes.example}>
            Acting out a story from a book
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Working a puzzle or matching cards
          </TableCell>
          <TableCell className={classes.example}>
            Writing names or messages with letters or letter-like forms
          </TableCell>
          <TableCell className={classes.example}>
            Taking turns rolling a ball
          </TableCell>
          <TableCell className={classes.example}>
            Pretending to be a family in dramatic play with clear roles and
            predictable actions
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Looking carefully at the pictures of a book in order
          </TableCell>
          <TableCell className={classes.example}>
            Writing in response to journal prompts or labeling a drawing
            (child writes &quot;C&quot; for car)
          </TableCell>
          <TableCell className={classes.example}>
            Following a set of rules for an invented game
          </TableCell>
          <TableCell className={classes.example} />
        </TableRow>
      </TableBody>
    </Table>
  )
}

SequentialHelpChild.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SequentialHelpChild);