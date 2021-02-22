import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell } from '@material-ui/core';

const useStyles = makeStyles({
  checklistItem: {
    backgroundColor: "#f3f3f3",
    color: "black",
    fontSize: '0.9em',
    textAlign: "center",
    width: "20%",
    fontFamily: 'Arimo',
    padding: '0.5em',
    verticalAlign: 'top'
  },
  example: {
    backgroundColor: "#f3f3f3",
    width: "20%",
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    padding: '0.5em',
    verticalAlign: 'top',
  },
});

/**
 * @return {ReactElement}
 */
export default function ACHelpTeacher(): React.ReactElement {
  const classes = useStyles();
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            <strong>Participating in children’s play </strong>
          </TableCell>
          <TableCell className={classes.checklistItem}>
            <strong> Asking questions to extend children’s thinking about a shared activity </strong>
          </TableCell>
          <TableCell className={classes.checklistItem}>
            <strong> Encouraging children to share, work, or interact with each other  </strong>
          </TableCell>
          <TableCell className={classes.checklistItem}>
            <strong>Helping children find the words to communicate </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Talking to children about their play-doh creations
          </TableCell>
          <TableCell className={classes.example}>
            Asking children what will happen next during dramatic play
            (e.g., teacher asks, “What ingredients do we need?” while pretending to be the cook)
          </TableCell>
          <TableCell className={classes.example}>
            Demonstrating how to play a new game
          </TableCell>
          <TableCell className={classes.example}>
            Giving children a sentence starter to help them interact
            with peers (Say, “I want to play…”)
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Sorting buttons with children
          </TableCell>
          <TableCell className={classes.example} >
            Asking children what shape of blocks they will need to keep
            their building from falling
          </TableCell>
          <TableCell className={classes.example}>
            Prompting children to ask peers to play or modeling how to share
          </TableCell>
          <TableCell className={classes.example}>
            Helping children solve problems during games or other shared
            activities (Say, “It’s my turn.”)
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.example}>
            Taking on a role in dramatic play
          </TableCell>
          <TableCell className={classes.example}>
            Asking children what they think a character will do next while reading a book together
          </TableCell>
          <TableCell className={classes.example}>
            Giving positive feedback when children share or interact
          </TableCell>
          <TableCell className={classes.example}>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}