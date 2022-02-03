import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell, TableHead } from '@material-ui/core';
import * as Constants from "../../constants/Constants";


const styles: object = {
  definitionTitle: {
    backgroundColor: Constants.Colors.TT,
    color: "white",
    fontSize: '1.1em',
    textAlign: "center",
    width: "50%",
    fontFamily: 'Arimo',
    padding: '0.5em'
  },
  definitionText: {
    backgroundColor: "#F3F3F3",
    width: "50%",
    fontFamily: 'Arimo',
    padding: '0.5em'
  },
  lineTitle: {
    backgroundColor: "#AED581",
    color: "white",
    fontSize: '0.9em',
    textAlign: "center", 
    width: "20%",
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    padding: '0.5em'
  },
  routinesTitle: {
    backgroundColor: "#64B5F6",
    color: "white",
    fontSize: '0.9em',
    textAlign: "center", 
    width: "20%",
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    padding: '0.5em'
  },
  travelingTitle: {
    backgroundColor: "#FFA726",
    color: "white",
    fontSize: '0.9em',
    textAlign: "center", 
    width: "20%",
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    padding: '0.5em'
  },
  behaviorTitle: {
    backgroundColor: "#FF5252",
    color: "white",
    fontSize: '0.9em',
    textAlign: "center", 
    width: "20%",
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    padding: '0.5em'
  },
  waitingTitle: {
    backgroundColor: "#FF7043",
    color: "white",
    fontSize: '0.9em',
    textAlign: "center", 
    width: "20%",
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    padding: '0.5em'
  },
  lineExamples: {
    backgroundColor: "#F3F3F3",
    width:"20%",
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    padding: '0.5em',
    verticalAlign: 'top'
  },
  travelingExamples: {
    backgroundColor: "#F3F3F3",
    width:"20%",
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    padding: '0.5em',
    verticalAlign: 'top'
  },
  waitingExamples: {
    backgroundColor: "#F3F3F3",
    width:"20%",
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    padding: '0.5em',
    verticalAlign: 'top'
  },
  routinesExamples: {
    backgroundColor: "#F3F3F3",
    width:"20%",
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    padding: '0.5em',
    verticalAlign: 'top'
  },
  behaviorExamples: {
    backgroundColor: "#F3F3F3",
    width:"20%",
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    padding: '0.5em',
    verticalAlign: 'top'
  }
};

interface Props {
  classes: {
    definitionTitle: string,
    definitionText: string,
    buttonTitle: string,
    lineTitle: string,
    travelingTitle: string,
    waitingTitle: string,
    routinesTitle: string,
    behaviorTitle: string
    lineExamples: string,
    travelingExamples: string,
    waitingExamples: string,
    routinesExamples: string,
    behaviorExamples: string
  }
}

/**
 * @param {Props} props 
 * @return {ReactElement}
 */
function TransitionHelpCard(props: Props): React.ReactElement {
  const { classes } = props;
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.definitionTitle}>
              TRANSITIONS BEGIN WHEN:
            </TableCell>
            <TableCell className={classes.definitionTitle}>
              TRANSITIONS END WHEN:
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.definitionText}>
              <strong>
                A majority (more than half) of the children are in transition
              </strong>
            </TableCell>
            <TableCell className={classes.definitionText}>
              <strong>
                A majority (more than half) of the children have started the next
                activity
              </strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div style={{paddingTop: '1em'}} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.lineTitle}>
              Waiting in line/lining up
            </TableCell>
            <TableCell className={classes.travelingTitle}>
              Traveling outside the classroom
            </TableCell>
            <TableCell className={classes.waitingTitle}>
              Children waiting on teacher/materials
            </TableCell>
            <TableCell className={classes.routinesTitle}>
              Classroom Routines
            </TableCell>
            <TableCell className={classes.behaviorTitle}>
              Behavior Management Disruption
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.lineExamples}>
              <strong>Lining up or waiting in line</strong>
            </TableCell>
            <TableCell className={classes.travelingExamples}>
              <strong>Walking from one part of the school to another</strong>
            </TableCell>
            <TableCell className={classes.waitingExamples}>
              <strong>
                Delays or interruptions because teacher or materials are not ready
              </strong>
            </TableCell>
            <TableCell className={classes.routinesExamples}>
              <strong>Participating in routine, non-learning activities</strong>
            </TableCell>
            <TableCell className={classes.behaviorExamples}>
              <strong>Delays or interruptions due to behavior management</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.lineExamples}>
              Lining up to leave the classroom, playground, etc.
            </TableCell>
            <TableCell className={classes.travelingExamples}>
              Walking to the playground, library, music room, etc.
            </TableCell>
            <TableCell className={classes.waitingExamples}>
              Teacher stops an activity or delays the start of a new activity to
              gather or prepare materials
            </TableCell>
            <TableCell className={classes.routinesExamples}>
              Cleaning up, hand-washing, getting out cots or meal trays, etc.
            </TableCell>
            <TableCell className={classes.behaviorExamples}>
              Teacher stops a learning activity to address behavior
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.lineExamples}>
              Children are lined up but are waiting to go to the next place
            </TableCell>
            <TableCell className={classes.travelingExamples} />
            <TableCell className={classes.waitingExamples}>
              Teacher stops an activity or delays the start of a new activity to do
              something unrelated to activity
            </TableCell>
            <TableCell className={classes.routinesExamples}>
              Bathroom and/or water break in the classroom or hallway
            </TableCell>
            <TableCell className={classes.behaviorExamples} />
          </TableRow>
          <TableRow>
            <TableCell className={classes.lineExamples}>
              Waiting in line for lunch
            </TableCell>
            <TableCell className={classes.travelingExamples} />
            <TableCell className={classes.waitingExamples} />
            <TableCell className={classes.routinesExamples}>
              Moving from one activity to another (e.g., whole group to centers)
            </TableCell>
            <TableCell className={classes.behaviorExamples} />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

TransitionHelpCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionHelpCard);
