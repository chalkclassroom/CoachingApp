import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import Typography from '@material-ui/core/Typography/index';

const styles: object = {
  sectionTitle: {
    backgroundColor: "#d3d3d3",
    color: "black",
    fontSize: 18,
    textAlign: "center",
    width: "50%",
    fontFamily: "Arimo"
  },
  definitionText1: {
    backgroundColor: "#d9eafb",
    width: "50%",
    fontFamily: "Arimo"
  },
  definitionText2: {
    backgroundColor: "#b4d6f7",
    width: "50%",
    fontFamily: "Arimo"
  },
  buttonTitle: {
    backgroundColor: "#094492", 
    color: "white",
    fontSize: 14,
    textAlign: "center", 
    fontFamily: "Arimo"
  },
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
  teacherExample1: {
    backgroundColor: "#d9eafb",
    fontFamily: "Arimo"
  },
  teacherExample2: {
    backgroundColor: "#b4d6f7",
    fontFamily: "Arimo"
  },
  teacherExample3: {
    backgroundColor: "#7cb8f1",
    fontFamily: "Arimo"
  },
  teacherExample4: {
    backgroundColor: "#459aeb",
    fontFamily: "Arimo"
  },
};

interface Props {
  classes: {
    sectionTitle: string,
    definitionText1: string,
    definitionText2: string,
    buttonTitle: string,
    childExample1: string,
    childExample2: string,
    childExample3: string,
    childExample4: string,
    teacherExample1: string,
    teacherExample2: string,
    teacherExample3: string,
    teacherExample4: string
  }
}

/**
 * hints and reminders for sequential activities observation
 * @param {Props} props 
 * @return {ReactNode}
 */
function SequentialHelpCard(props: Props): React.ReactNode {
  const { classes } = props;
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} className={classes.sectionTitle}>
              Sequential Activities Definition
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.definitionText1}>
              <Typography variant="subtitle2" style={{fontFamily: "Arimo"}}>
                <strong>
                  Sequential:
                </strong>
                <br />
                Child follows a predetermined sequence of steps that build
                on each other when doing an activity or using materials.
                <br />
                <br />
                <strong>
                  Examples:
                </strong>
                <ul>
                  <li>
                    Using manipulatives in a sequenced manner (counting, 
                    sorting, making shapes, etc.)
                  </li>
                  <li>
                    Building a recognizable structure with blocks (house, zoo)
                  </li>
                  <li>
                    Acting out a pretend play scenario with a predictable plot
                    and role speech (i.e., clear indication that children are
                    acting as specific characters)
                  </li>
                </ul>
              </Typography>
            </TableCell>
            <TableCell className={classes.definitionText2}>
              <Typography variant="subtitle2" style={{fontFamily: "Arimo"}}>
                <strong>
                  Non-Sequential:
                </strong>
                <br />
                Child does not follow a predetermined set of steps when doing an
                activity or using materials. It is not clear to the observer that the
                child is working towards a goal involving steps that build on each
                other.
                <br />
                <br />
                <strong>
                  Examples:
                </strong>
                <ul>
                  <li>
                    Exploring manipulatives in an open-ended manner (scooping and
                    dumping cubes)
                  </li>
                  <li>
                    Playing with blocks without building something specific
                  </li>
                  <li>
                    Doing pretend actions that are not part of a predictable plot
                    (i.e., moving pots around on the stove)
                  </li>
                  <li>
                    Repeatedly shoveling and pouring sand
                  </li>
                </ul>
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" colSpan={4} className={classes.sectionTitle}>
              Sequential Child Behaviors
            </TableCell>
          </TableRow>
        </TableHead>
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
              (child writes "C" for car)
            </TableCell>
            <TableCell padding="checkbox" className={classes.childExample3}>
              Following a set of rules for an invented game
            </TableCell>
            <TableCell padding="checkbox" className={classes.childExample4} />
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" colSpan={4} className={classes.sectionTitle}>
              Teacher Behaviors
            </TableCell>
          </TableRow>
        </TableHead>
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
                Supporting children's drawing of an image or writing a message
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
              Joining children's pretend play as a character to help them act
              out a predictable scenario (doctor's office, restaurant, etc.)
            </TableCell>
            <TableCell padding="checkbox" className={classes.teacherExample4}>
              Inviting children to create a message based on their developmental
              level (scribbles, letter-like forms, or letters representing
              beginning sounds)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

SequentialHelpCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SequentialHelpCard);
