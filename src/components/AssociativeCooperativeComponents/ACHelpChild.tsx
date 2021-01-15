import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell, TableHead } from '@material-ui/core';

const useStyles = makeStyles({
  titleText: {
    backgroundColor: "#a481d9",
    color: "white",
    // width: "50%",
    fontSize: '1.1em',
    textAlign: "center",
    fontFamily: 'Arimo',
    padding: '0.5em'
  },
  checklistItem: {
    backgroundColor: "#f3f3f3",
    color: "black",
    fontSize: '0.9em',
    textAlign: "center",
    width: "33%",
    fontFamily: 'Arimo',
    verticalAlign: 'top',
    padding: '0.5em'
  },
  example: {
    backgroundColor: "#f3f3f3",
    width: "33%",
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    verticalAlign: 'top',
    padding: '0.5em'
  },
});

/**
 * @return {ReactElement}
 */
export default function ACHelpChild(): React.ReactElement {
  const classes = useStyles();
  return(
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={1} className={classes.titleText}>
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
          <TableCell className={classes.checklistItem}>
            <strong>Doing an activity together that DOES NOT have a predetermined sequence</strong>
          </TableCell>
          <TableCell className={classes.checklistItem}>
            <strong>Playing a game together with formal rules</strong>
          </TableCell>
          <TableCell className={classes.checklistItem}>
            <strong>Doing an activity together that HAS a predetermined sequence</strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Pretending to be a family but it’s unclear who is the parent
            and who is the child; no defined storyline
          </TableCell>
          <TableCell className={classes.example}>
            Following the rules for a memory card game
          </TableCell>
          <TableCell className={classes.example}>
          Pretending to be a family while acting out a clear storyline
          and using role speech (The mom says, “Let’s make the baby some food.”)
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Talking about what kind of structure to build together at blocks 
            (Non-example: each child building their own structure with no talking)
          </TableCell>
          <TableCell className={classes.example}>
            Playing a board game with a teacher and/or peers
          </TableCell>
          <TableCell className={classes.example}>
            Completing a pattern block design together
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Making up a story with a teacher and acting it out with puppets
          </TableCell>
          <TableCell className={classes.example}>
            Creating and following a set of rules for an invented game
          </TableCell>
          <TableCell className={classes.example}>
            Acting out a familiar book with puppets
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}