import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell, TableHead, Typography } from '@material-ui/core';
import * as Constants from '../../constants/Constants';

const useStyles = makeStyles({
  title: {
    color: "white",
    fontSize: '1.1em',
    textAlign: "center",
    fontFamily: 'Arimo',
    padding: '0.5em'
  },
  content: {
    backgroundColor: "#f3f3f3",
    verticalAlign: 'top',
    padding: '0.5em',
    width: '33%'
  },
});

/**
 * @return {ReactElement}
 */
export default function BehaviorResponsesHelp(): React.ReactElement {
  const classes = useStyles();
  return(
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.disapproval}}>
            <strong>
              DISAPPROVAL
            </strong>
          </TableCell>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.disapproval}}>
            <strong>
              EXAMPLES
            </strong>
          </TableCell>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.disapproval}}>
            <strong>
              NON-EXAMPLES
            </strong>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>Teacher discourages behavior without providing an alternative.</strong>
              <br/>
              The intent of the disapproval is to stop the child&apos;s behavior.
              A disapproval can be given with a pleasant tone of voice.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>&quot;Please stop.&quot;</strong>
              <br />
              No alternative behavior suggested.
              <br />
              <br />
              <strong>&quot;I don&apos;t understand why you&apos;re doing that.&quot;</strong>
              <br />
              The intent of the teacher&apos;s comment is to stop the child&apos;s behavior.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>&quot;Come here, please.&quot;</strong>
              <br />
              The teacher provides the child with a different behavior.
              This example is a redirection.
              <br />
              <br />
              <strong>&quot;No, it&apos;s not a four, try again!&quot;</strong>
              <br />
              The teacher responds to a child&apos;s answer during a number
              guessing game. Feedback during instruction does not count as a disapproval. 
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.redirection}}>
            <strong>
              REDIRECTION
            </strong>
          </TableCell>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.redirection}}>
            <strong>
              EXAMPLES
            </strong>
          </TableCell>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.redirection}}>
            <strong>
              NON-EXAMPLES
            </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>Teacher suggests an alternative to the child&apos;s current behavior.</strong>
              <br/>
              Redirections are different from giving directions. A redirection happens when
              a teacher reacts to a child&apos;s current behavior. The intent of the redirection
              is to stop the child&apos;s behavior.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>&quot;Do you want to sit on a letter or a number?&quot;</strong>
              <br />
              A child is not sitting on the carpet for circle time.
              <br />
              <br />
              <strong>&quot;Count them, you&apos;re not counting them.&quot;</strong>
              <br />
              A child is off task during a math lesson.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>&quot;Today you can sit on a letter or a number.&quot;</strong>
              <br />
              The teacher is explaining the directions for circle time.
              <br />
              <br />
              <strong>&quot;Let&apos;s try counting them with your finger.&quot;</strong>
              <br />
              The teacher is suggesting another method for counting.
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.nonSpecificApproval}}>
            <strong>
              NON-SPECIFIC APPROVAL
            </strong>
          </TableCell>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.nonSpecificApproval}}>
            <strong>
              EXAMPLES
            </strong>
          </TableCell>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.nonSpecificApproval}}>
            <strong>
              NON-EXAMPLES
            </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>Teacher gives a general comment of approval.</strong>
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>&quot;Kiss your brain!&quot;</strong>
              <br />
              Teacher does not mention a specific behvaior.
              <br />
              <br />
              <strong>&quot;Good job!&quot;</strong>
              <br />
              Teacher does not mention a specific behavior.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>&quot;You found your letter--kiss your brain!&quot;</strong>
              <br />
              Teacher explains the reason for praising the child.
              <br />
              <br />
              <strong>&quot;Good job, you shared those blocks.&quot;</strong>
              <br />
              Teacher describes the behavior being praised.
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.specificApproval}}>
            <strong>
              SPECIFIC APPROVAL
            </strong>
          </TableCell>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.specificApproval}}>
            <strong>
              EXAMPLES
            </strong>
          </TableCell>
          <TableCell className={classes.title} style={{backgroundColor: Constants.ClimateTypeColors.specificApproval}}>
            <strong>
              NON-EXAMPLES
            </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>Teacher gives a positive comment on a specific behavior.</strong>
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>&quot;I like the way you&apos;re using your finger to count the cubes.&quot;</strong>
              <br />
              Teacher points out a specific behavior.
              <br />
              <br />
              <strong>&quot;Nice job waiting in line!&quot;</strong>
              <br />
              Teacher provides reason for praise.
            </Typography>
          </TableCell>
          <TableCell className={classes.content}>
            <Typography variant="body2" align="left" style={{fontFamily: 'Arimo'}}>
              <strong>&quot;That’s correct, it’s a 4!&quot;</strong>
              <br />
              Confirming a correct answer during instruction is not a behavior approval.
              <br />
              <br />
              <strong>&quot;Nice job!&quot;</strong>
              <br />
              No reason provided. 
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}