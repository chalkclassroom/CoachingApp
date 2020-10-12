import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableRow, TableBody, TableCell, TableHead, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    color: "black",
    backgroundColor: '#84C3F5',
    fontSize: '1.1em',
    textAlign: "center",
    fontFamily: 'Arimo',
    padding: '0.5em'
  },
  content: {
    backgroundColor: "#f3f3f3",
    verticalAlign: 'top',
    padding: '0.5em',
    width: '20%'
  },
});

/**
 * @return {ReactElement}
 */
export default function TeacherToneHelp(): React.ReactElement {
  const classes = useStyles();
  return(
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.title}>
            <strong>
              ANGER
            </strong>
            <br />
            (yelling, sarcasm)
          </TableCell>
          <TableCell className={classes.title}>
            <strong>
              IRRITATION
            </strong>
            <br />
            (frowning, eye-rolling)
          </TableCell>
          <TableCell className={classes.title}>
            <strong>
              NEUTRAL
            </strong>
            <br />
            (neutral facial expression)
          </TableCell>
          <TableCell className={classes.title}>
            <strong>
              POSITIVE INTEREST
            </strong>
            <br />
            (smiling, nodding)
          </TableCell>
          <TableCell className={classes.title}>
            <strong>
              EXCITEMENT
            </strong>
            <br />
            (laughing, enthusiastic voice)
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Shows strong negativity with their verbal and/or physical approach to children.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Shows signs of irritation by looking displeased or showing annoyance.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Shows neutral emotion and expression is neither positive nor negative/flat affect.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Has a positive interaction with children.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Has a strong positive interaction with children.
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Uses sarcasm toward a child, yells at children, or insults them.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Exhibits frowning, headshaking, negative gestures, and/or sighing.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Involved in the activity but does not show a positive or negative
              response regarding the activity.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Shows a genuine interest and attention to the child and/or activity.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Expresses a warm, positive connection with children by smiling and/or laughing.
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Physically moves children from place to place by dragging or
              pulling (rather than guiding).
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Uses mild threats to establish control such as, &quot;quiet or you will
              lose recess,&quot; or “I&apos;ll put you in time out.&quot;
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Nonverbally communicates a positive acknowledgement or appreciation of the
              children&apos;s efforts like looking directly at the child and/or nodding.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              Shows genuine excitement about teaching or what children are doing.
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}