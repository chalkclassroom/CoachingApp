import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell } from '@material-ui/core';
import * as Constants from '../../constants/Constants';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#4fd9b3',
    fontFamily: "Arimo",
    fontWeight: 'bold',
    fontSize: '1.1em',
    color: 'black',
    padding: '0.5em'
  },
  checklistItem : {
    backgroundColor: '#f3f3f3',
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    width: '25%',
    padding: '0.5em',
    verticalAlign: 'top'
  },
  example: {
    backgroundColor: "#f3f3f3",
    fontSize: '0.9em',
    fontFamily: "Arimo",
    width: '75%',
    padding: '0.5em',
    verticalAlign: 'top'
  }
});

/**
 * @return {ReactElement}
 */
export default function ListeningHelp1(): React.ReactElement {
  const classes = useStyles();
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align="center" className={classes.header} style={{backgroundColor: Constants.Colors.AppBar}}>
            Teacher Behaviors
          </TableCell>
          <TableCell align="center" className={classes.header} style={{backgroundColor: '#b4d6f7'}}>
            Definitions and Examples
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            At <strong>eye-level</strong> with children
          </TableCell>
          <TableCell className={classes.example}>
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
          <TableCell className={classes.checklistItem}>
            Looks at children with a {" "}
            <strong>positive </strong>or <strong>interested expression</strong> to encourage child talk
          </TableCell>
          <TableCell className={classes.example}>
            Teacher looks at children with curiosity and
            tries to make eye contact. The teacher&apos;s expression
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
          <TableCell className={classes.checklistItem}>
            <strong>Repeats</strong> or <strong>clarifies</strong> children&apos;s comments
          </TableCell>
          <TableCell className={classes.example}>
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