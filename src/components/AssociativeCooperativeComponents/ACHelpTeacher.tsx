import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles: object = {
  checklistItem: {
    backgroundColor: "#f3f3f3",
    color: "black",
    fontSize: '0.9em',
    textAlign: "center",
    width: "20%",
    fontFamily: 'Arimo',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    verticalAlign: 'top'
  },
  example: {
    backgroundColor: "#f3f3f3",
    width: "20%",
    fontSize: '0.9em',
    fontFamily: 'Arimo',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    verticalAlign: 'top',
  },
};

interface Props {
  classes: {
    checklistItem: string,
    example: string,
  }
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function ACHelpTeacher(props: Props): React.ReactElement {
  const { classes } = props;
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong>Participating in children’s play </strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong> Asking questions to extend children’s thinking about a shared activity </strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong> Encouraging children to share, work, or interact with each other  </strong>
          </TableCell>
          <TableCell padding="checkbox" className={classes.checklistItem}>
            <strong>Helping children find the words to communicate </strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.example}>
            Talking to children about their play-doh creations
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Asking children what will happen next during dramatic play
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Demonstrating how to play a new game
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Prompting children to ask peers to play or share a material
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.example}>
            Co-writing a label with a child for his drawing
          </TableCell>
          <TableCell padding="checkbox" className={classes.example} >
            Asking children what shape of blocks they will need to keep their building from falling
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Modeling the steps for sharing
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Helping children solve problems during games or other shared activities (Say, “It’s my turn.”)
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox" className={classes.example}>
            Taking on a role in dramatic play
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Asking children what they think a character will do next while reading a book together
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
            Giving positive feedback when children share or interact
          </TableCell>
          <TableCell padding="checkbox" className={classes.example}>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

ACHelpTeacher.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ACHelpTeacher);