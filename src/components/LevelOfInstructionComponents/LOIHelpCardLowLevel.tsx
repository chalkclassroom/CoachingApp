import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  lowLevelSubtitle: {
    backgroundColor: "#1155cc",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: '50%',
    fontFamily: 'Arimo',
    padding: '0.5em'
  },
  example: {
    backgroundColor: "#f3f3f3",
    color: 'black',
    padding: "0.5em",
    width: '50%',
    fontFamily: 'Arimo',
    fontSize: '0.9em',
    verticalAlign: 'top'
  }
});

/** 
 * @return {ReactElement}
 */
export default function LOIHelpCardLowLevel(): React.ReactElement {
  const classes = useStyles();
  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.lowLevelSubtitle}>
              Teacher Asks Low-Level Question
            </TableCell>
            <TableCell className={classes.lowLevelSubtitle}>
              Child Answers Low-Level Question
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <strong>
                Teacher asks a question with a predetermined answer.
              </strong>
              <br />
              The goal of low-level questions is for children to
              learn or recite the correct response. Low-level questions
              occur during academic instruction and/or conversations
              about social-emotional topics.
              <br />
              <br />
              Questions about behaviors are <i>not</i> counted (e.g.,
              <i>Has everybody answered the question of the day?</i>)
            </TableCell>
            <TableCell className={classes.example}>
              <strong>
                A child or children respond to the teacher&apos;s
                low-level question.
              </strong>
              <br />
              Each child&apos;s response is counted.
              <br />
              Incorrect responses are counted.
              <br />
              <br />
              <div style={{verticalAlign: 'bottom'}}>
              Questions that teachers ask and answer themselves
              without providing children an opportunity to
              respond are <i>not</i> counted.
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className={classes.example}>
              <Typography variant="h6" align="center">
                EXAMPLES
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className={classes.example}>
              Teacher: <i><b>Which</b> one of these is a triangle?</i>
              <br />
              Child: <i>That one!</i>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className={classes.example}>
              Teacher: <i>I hear a /w/...</i>
              <br />
              Children in choral response: <i>W!</i>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className={classes.example}>
              Teacher: <i><b>Show me</b> the letter B.</i>
              <br />
              Child: Points to the B on the book page.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className={classes.example}>
              Teacher: <i><b>Do</b> we have more boys or girls here today?</i>
              <br />
              Child: <i>Boys!</i>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}