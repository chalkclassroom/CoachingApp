import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
  inferentialTitle: {
    backgroundColor: "#38761d",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    width: "100%"
  },
  inferentialSubtitle: {
    backgroundColor: "#6aa84f",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: '50%'
  },
  basicTitle: {
    backgroundColor: "#1155cc",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    width: "100%"
  },
  basicSubtitle: {
    backgroundColor: "#c9daf8",
    color: "black",
    fontSize: 18,
    textAlign: "center",
    width: '50%'
  },
  example: {
    backgroundColor: "#f3f3f3",
    color: 'black',
    padding: "1%",
    width: '50%'
  }
};

interface Props {
  classes: {
    paper: string,
    inferentialTitle: string,
    inferentialSubtitle: string,
    basicTitle: string,
    basicSubtitle: string,
    example: string
  }
}

/**
 * 
 * @param {Props} props 
 * @return {ReactElement}
 */
function LevelOfInstructionHelpCard(props: Props): React.ReactElement {
  const { classes } = props;
  return (
    <div>
       <Table padding="checkbox">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} className={classes.inferentialTitle}>
              Inferential Instruction
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.inferentialSubtitle}>
              Ask High-Level Questions
            </TableCell>
            <TableCell className={classes.inferentialSubtitle}>
              Follow up on Children&apos;s Responses
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <strong>
                Questions that have more than one possible answer
              </strong>
            </TableCell>
            <TableCell className={classes.example}>
              <strong>
                Teacher builds on children&apos;s responses to deepen their
                understanding
              </strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              Ask children to <b>explain</b> their thought process:
              <br/>
              <i>How do you know...?</i>
              <br/>
              <i>What makes you say...?</i>
              <br/>
              <i>Why did you...?</i>
            </TableCell>
            <TableCell className={classes.example}>
              Ask <b>follow-up questions:</b>
              <br/>
              Teacher: <i>This week we have been talking about the word</i> {" "}
              timid<i>. When have you felt timid?</i>
              <br/>
              Child: <i>Yesterday!</i>
              <br/>
              Teacher: <i>Why did you feel timid yesterday? What happened?</i>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              Ask children to make a <b>prediction</b> based on context clues
              or prior knowledge:
              <br/>
              <i>What would happen if...?</i>
              <br/>
              <i>How could we...?</i>
            </TableCell>
            <TableCell className={classes.example}>
              <b>Expand</b> on children&apos;s ideas:
              <br/>
              Teacher: Timid <i>is our new word today. When have you felt timid?</i>
              <br/>
              Child: <i>Yesterday when I was scared.</i>
              Teacher: <i>Yes, I remember when you were timid yesterday during the
              thunderstorm. That means you were scared or frightened by the loud noises!</i>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              Ask children to <b>connect</b> academic content with personal experience:
              <br/>
              <i>Tell your friend about a time when...</i>
              <br/>
              <i>How is this character&apos;s problem similar to your...?</i>
              <br/>
              <i>How are ______ and ______ alike?</i>
            </TableCell>
            <TableCell className={classes.example}>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              Ask children to <b>reflect</b> back on parts of activities or lessons:
              <br/>
              <i>What do you remember about...?</i>
              <br/>
              <i>What was your favorite part of...?</i>
            </TableCell>
            <TableCell className={classes.example} />
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} className={classes.basicTitle}>
              Basic Skills Instruction
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.basicSubtitle}>
              Ask Low-Level Questions
            </TableCell>
            <TableCell className={classes.basicSubtitle}>
              Teach Specific Skills
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <strong>
                Teacher asks questions with predetermined answers, with the goal
                of having children learn or recite the correct response.
              </strong>
            </TableCell>
            <TableCell className={classes.example}>
              <strong>
                Teacher gives information about specific, concrete skills
              </strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <b>What</b> sound does 'g' make?
            </TableCell>
            <TableCell className={classes.example}>
              A triangle has 3 sides.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <b>Show me</b> the number 2.
            </TableCell>
            <TableCell className={classes.example}>
              Run rhymes with fun.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.example}>
              <b>Do</b> we have more girls or boys here today?
            </TableCell>
            <TableCell className={classes.example}>
              A tree gets water and food from its roots.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

LevelOfInstructionHelpCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LevelOfInstructionHelpCard);
