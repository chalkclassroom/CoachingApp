import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  highLevelSubtitle: {
    backgroundColor: "#38761d",
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
export default function LOIHelpCardHighLevel(): React.ReactElement {
  const classes = useStyles();
  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.highLevelSubtitle}>
              Teacher Asks High-Level Question
            </TableCell>
            <TableCell className={classes.highLevelSubtitle}>
              Child Answers High-Level Question
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <strong>
                Teacher asks a question that does not have a
                predetermined answer or set of choices presented.
              </strong>
              <br />
              High-level questions occur during academic instruction
              and/or conversations about social-emotional topics.
            </TableCell>
            <TableCell className={classes.example}>
              <strong>
                A child or children respond to the teacher&apos;s
                high-level question.
              </strong>
              <br />
              Children&apos;s responses may vary in length and complexity.
              Each child&apos;s response is counted.
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
            <TableCell className={classes.example}>
              Ask children to <b>explain</b> their thought process:
              <br/>
              <div style={{paddingLeft: '1em'}}>
                <i>How do you know...?</i>
                <br/>
                <i>What makes you say...?</i>
                <br/>
                <i>Why did you...?</i>
              </div>
            </TableCell>
            <TableCell className={classes.example}>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Teacher:</strong> {" "}
                <i>Why did you pick that solution card to solve your problem?</i>
              </div>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Child:</strong> {" "}
                <i>Because with taking turns we can both play.</i>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              Ask children to make a <b>prediction</b> based on context clues
              or prior knowledge:
              <br/>
              <div style={{paddingLeft: '1em'}}>
                <i>What would happen if...?</i>
                <br/>
                <i>How could we...?</i>
              </div>
            </TableCell>
            <TableCell className={classes.example}>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Teacher:</strong> {" "}
                <i>What do you think will happen when Luke goes up to bat?</i>
              </div>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Child:</strong> {" "}
                <i>He&apos;s gonna miss!</i>
              </div>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Teacher:</strong> {" "}
                <i>Robert?</i> (This would count as a question.)
              </div>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Child:</strong> {" "}
                <i>I think he&apos;s going to hit a home run.</i>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              Ask children to <b>connect</b> academic or social-emotional
              content with personal experience:
              <div style={{paddingLeft: '1em'}}>
                <i>Tell your friend about a time when...</i>
                <br/>
                <i>How is this character&apos;s problem similar to your...?</i>
                <br/>
                <i>How are ______ and ______ alike?</i>
              </div>
            </TableCell>
            <TableCell className={classes.example}>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Teacher:</strong> {" "}
                <i>Tell me about a time when you used belly breathing at home?</i>
              </div>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Child 1:</strong> {" "}
                <i>When I was mad at my brother.</i>
              </div>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Child 2:</strong> {" "}
                <i>I never did.</i> (This type of response would also be counted.)
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              Ask children to <b>reflect</b> back on parts of activities or lessons:
              <br/>
              <div style={{paddingLeft: '1em'}}>
                <i>What do you remember about...?</i>
                <br/>
                <i>What was your favorite part of...?</i>
              </div>
            </TableCell>
            <TableCell className={classes.example}>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Teacher:</strong> {" "}
                <i>
                  Think about the rivers and lakes we have been talking about.
                  How are they different from the ocean?
                </i>
              </div>
              <div style={{textIndent: '-1em', paddingLeft: '1em'}}>
                <strong>Child:</strong> {" "}
                <i>The ocean is bigger and very salty.</i>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}