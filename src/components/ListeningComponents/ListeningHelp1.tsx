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
    backgroundColor: '#4fd9b3',
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
function ListeningHelp1(props: Props): React.ReactElement {
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
            At <strong>eye-level</strong> with children
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Teacher positions body at eye-level with children.
            <ul>
              <li>
                Sits on the floor next to children.
              </li>
              <li>
                Sits at a table near children sitting at the table.
              </li>
              <li>
                While standing, bends down in order to see a child&apos;s face
                during an interaction.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong>Looks at children</strong> with a {" "}
            <strong>positive expression</strong> to encourage child talk
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Teacher looks at children with curiosity and
            tries to make eye contact. The teacher&apos;s body language
            shows interest in what children say.
            <ul>
              <li>
                Nods head and smiles.
              </li>
              <li>
                Widens eyes to show suprise or curiosity.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong>Repeats</strong> or <strong>clarifies</strong> children&apos;s comments
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Teacher imitates, or repeats, the child&apos;s verbalization without adding content.
            <ul>
              <li>
                Child: <i>Giraffe!</i>
                <br />
                Teacher: <i>Giraffe!</i> or <i>Wow, a giraffe!</i>
              </li>
            </ul>
            Teacher asks questions that clarify the meaning of the child&apos;s previous comment.
            <ul>
              <li>
                Child: <i>Cah.</i>
                <br />
                Teacher: <i>Is that your car?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

ListeningHelp1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListeningHelp1);