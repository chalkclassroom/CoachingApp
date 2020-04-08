import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import TableHead from '@material-ui/core/TableHead/index';
import Table from '@material-ui/core/Table/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
  titleText: {
    backgroundColor: "#a481d9",
    color: "white",
    width: "50%",
    fontSize: '1.1em',
    textAlign: "center",
    fontFamily: 'Arimo'
  },
  checklistItem: {
    backgroundColor: "#f3f3f3",
    color: "black",
    fontSize: '0.9em',
    textAlign: "center",
    width: "20%",
    fontFamily: 'Arimo',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    verticalAlign: 'top'
  },
  example: {
    backgroundColor: "#f3f3f3",
    width: "20%",
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    verticalAlign: 'top',
  },
};

interface Props {
  classes: {
    titleText: string,
    checklistItem: string,
    example: string
  }
}

/**
 * @param {Props} props 
 * @return {ReactElement}
 */
function ACHelpChild(props: Props): React.ReactElement {
  const { classes } = props;
  return(
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2} className={classes.titleText}>
            <strong>
              Associative Interactions </strong>
          </TableCell>
          <TableCell colSpan={2} className={classes.titleText}>
            <strong>
              Cooperative Interactions
            </strong>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong> Participating in a conversation about a shared activity</strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong>Engaging in an open-ended activity without clear roles or order</strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong> Following formal rules of a game and/or taking turns</strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong>Doing an activity together that has a predetermined sequence </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.example}>
            Talking about what kind of structure to build at blocks
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Pretending to be a family but it’s unclear who is the parent and who is the child; no defined storyline
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Following the rules for a memory card game
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Pretending to be a customer and server at a restaurant while using role speech (“What would you like to eat?”)
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.example}>
            Talking while making pretend potions together at the sand table
          </TableCell>
          <TableCell padding="checkbox" className={classes.example} >
            Drawing together at the dry erase board
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Following a set of rules for an invented game
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Completing a pattern block design together
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.example}>
            Talking to a teacher about a book character
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Moving cars around the blocks center together
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

ACHelpChild.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ACHelpChild);