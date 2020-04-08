import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import * as Constants from '../../constants';

const styles: object = {
  header: {
    fontFamily: "Arimo",
    fontWeight: 'bold',
    fontSize: '1.1em',
    color: 'black',
    paddingRight: '12px'
  },
  checklistItem : {
    backgroundColor: '#f3f3f3',
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    width: '25%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    verticalAlign: 'top'
  },
  example: {
    backgroundColor: "#f3f3f3",
    fontSize: '0.9em',
    fontFamily: "Arimo",
    width: '75%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    verticalAlign: 'top'
  }
};

interface Props {
  classes: {
    header: string,
    checklistItem: string,
    example: string,
  }
}

/**
 * @param {Props} props 
 * @return {ReactElement}
 */
function ListeningHelp2(props: Props): React.ReactElement {
  const { classes } = props;
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align="center" padding="checkbox" className={classes.header} style={{backgroundColor: Constants.AppBarColor}}>
            Teacher Behaviors
          </TableCell>
          <TableCell align="center" padding="checkbox" className={classes.header} style={{backgroundColor: '#b4d6f7'}}>
            Definitions and Examples
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            Asks <strong>open-ended questions</strong> to encourage conversation
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Teacher asks questions or makes statements that invite multi-word
            responses. The child&apos;s answer is not constrained. These questions
            often involve a <i>wh-</i> word (i.e., what, why, where, how).
            <ul>
              <li>
                <i>What did you do with Grandma yesterday?</i>
              </li>
              <li>
                <i>Tell me about your drawing.</i>
              </li>
              <li>
                <i>Why do you think the blocks fell down?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong>Expands on children&apos;s play or talk</strong> {" "}
            using questions or comments
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            First, the teacher notices what children are talking about or doing.
            Then, the teacher uses comments or questions to enrich
            or add to children&apos;s play or talk.
            <ul>
              <li>
                Watching a child build with blocks, the teacher says, {" "}
                <i>You created a race track! Tell me more about what you&apos;re building.</i>
              </li>
              <li>
                Child in the art center points to his paint marks and says, {" "}
                <i>My scooter!</i>
                <br />
                The teacher responds, {" "}
                <i>What is your favorite thing about riding your scooter?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            Encourages children to <strong>talk to peers</strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Teacher prompts children to talk to each other or solve problems
            together during activities.
            <ul>
              <li>
                <i>Why don&apos;t you ask Darius what he wants to play?</i>
              </li>
              <li>
                <i>Maria looks upset. What could you say to help her?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

ListeningHelp2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListeningHelp2);