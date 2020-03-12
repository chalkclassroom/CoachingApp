import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import * as Constants from "../../constants";


const styles = {
  definitionTitle: {
    backgroundColor: Constants.TransitionColor,
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "50%",
    fontFamily: 'Arimo'
  },
  definitionText: {
    backgroundColor: "#F3F3F3",
    width: "50%",
    fontFamily: 'Arimo'
  },
  lineTitle: {
    backgroundColor: "#AED581",
    color: "white",
    fontSize: 14,
    textAlign: "center", 
    width: "20%",
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    letterSpacing: '0.05em'
  },
  routinesTitle: {
    backgroundColor: "#64B5F6",
    color: "white",
    fontSize: 14,
    textAlign: "center", 
    width: "20%",
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    letterSpacing: '0.05em'
  },
  travelingTitle: {
    backgroundColor: "#FFA726",
    color: "white",
    fontSize: 14,
    textAlign: "center", 
    width: "20%",
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    letterSpacing: '0.05em'
  },
  behaviorTitle: {
    backgroundColor: "#FF5252",
    color: "white",
    fontSize: 14,
    textAlign: "center", 
    width: "20%",
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    letterSpacing: '0.05em'
  },
  waitingTitle: {
    backgroundColor: "#FF7043",
    color: "white",
    fontSize: 14,
    textAlign: "center", 
    width: "20%",
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    letterSpacing: '0.05em'
  },
  lineExamples: {
    backgroundColor: "#F3F3F3",
    width:"20%",
    fontFamily: 'Arimo'
  },
  travelingExamples: {
    backgroundColor: "#F3F3F3",
    width:"20%",
    fontFamily: 'Arimo'
  },
  waitingExamples: {
    backgroundColor: "#F3F3F3",
    width:"20%",
    fontFamily: 'Arimo'
  },
  routinesExamples: {
    backgroundColor: "#F3F3F3",
    width:"20%",
    fontFamily: 'Arimo'
  },
  behaviorExamples: {
    backgroundColor: "#F3F3F3",
    width:"20%",
    fontFamily: 'Arimo'
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
      <div style={{paddingTop: '2em'}} />
      <Table padding="checkbox">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineTitle}>
              Waiting in line/lining up
            </TableCell>
            <TableCell padding="checkbox" className={classes.travelingTitle}>
              Traveling outside the classroom
            </TableCell>
            <TableCell padding="checkbox" className={classes.waitingTitle}>
              Children waiting on teacher/materials
            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesTitle}>
              Classroom Routines
            </TableCell>
            <TableCell padding="checkbox" className={classes.behaviorTitle}>
              Behavior Management Disruption
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              <strong>Lining up or waiting in line</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.travelingExamples}>
              <strong>Walking from one part of the school to another</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.waitingExamples}>
              <strong>
                Delays or interruptions because teacher or materials are not ready
              </strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>
              <strong>Participating in routine, non-learning activities</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.behaviorExamples}>
              <strong>Delays or interruptions due to behavior management</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Lining up to leave the classroom, playground, etc.
            </TableCell>
            <TableCell padding="checkbox" className={classes.travelingExamples}>
              Walking to the playground, library, music room, etc.
            </TableCell>
            <TableCell padding="checkbox" className={classes.waitingExamples}>
              Teacher stops an activity or delays the start of a new activity to
              gather or prepare materials
            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>
              Cleaning up, hand-washing, getting out cots or meal trays, etc.
            </TableCell>
            <TableCell padding="checkbox" className={classes.behaviorExamples}>
              Teacher stops a learning activity to address behavior
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Children are lined up but are waiting to go to the next place
            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.travelingExamples}
            ></TableCell>
            <TableCell padding="checkbox" className={classes.waitingExamples}>
              Teacher stops an activity or delays the start of a new activity to do
              something unrelated to activity
            </TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>
              Bathroom and/or water break in the classroom or hallway
            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.behaviorExamples}
            ></TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Waiting in line for lunch
            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.travelingExamples}
            ></TableCell>
            <TableCell
              padding="checkbox"
              className={classes.waitingExamples}
            ></TableCell>
            <TableCell padding="checkbox" className={classes.routinesExamples}>
              Moving from one activity to another (e.g., whole group to centers)
            </TableCell>
            <TableCell
              padding="checkbox"
              className={classes.behaviorExamples}
            ></TableCell>
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
