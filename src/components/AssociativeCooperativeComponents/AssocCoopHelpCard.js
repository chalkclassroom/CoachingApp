import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';

const styles = () => ({
  definitionTitle: {
    backgroundColor: "#6f39c4",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "50%",
    fontFamily: 'Arimo'
  },
  definition2Title: {
    backgroundColor: "#459aeB",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "50%",
    fontFamily: 'Arimo'
  },
  definitionText: {
    backgroundColor: "#a481d9",
    color: "white",
    width: "50%",
    fontSize: 14,
    textAlign: "center",
    fontFamily: 'Arimo'
  },
  definition2Text: {
    backgroundColor: "#8b5fd1",
    color: "white",
    width: "50%",
    fontSize: 14,
    textAlign: "center",
    fontFamily: 'Arimo'
  },
  buttonTitle: {
    backgroundColor: "#f6f6f1",
    color: "black",
    fontSize: 14,
    textAlign: "center",
    width: "20%",
    fontFamily: 'Arimo'
  },
  lineExamples: {
    backgroundColor: "#f6f6f1",
    width: "20%",
    fontFamily: 'Arimo'
  }
});

function AssocCoopHelpCard(props) {
  const { classes } = props;
  return (
    <div>
      <Table>
        <TableHead  >
          <TableRow>
            <TableCell colSpan={4} className={classes.definitionTitle}>
              Child Behaviors
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} className={classes.definitionText}>
              <strong>
                Associative Interactions </strong>
            </TableCell>
            <TableCell colSpan={2} className={classes.definition2Text}>
              <strong>
                Cooperative Interactions
              </strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell padding="checkbox" className={classes.buttonTitle}>
              <strong> Participating in a conversation about a shared activity</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.buttonTitle}>
              <strong>Engaging in an open-ended activity without clear roles or order</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.buttonTitle}>
              <strong> Following formal rules of a game and/or taking turns</strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.buttonTitle}>
              <strong>Doing an activity together that has a predetermined sequence </strong>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Talking about what kind of structure to build at blocks
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Pretending to be a family but it’s unclear who is the parent and who is the child; no defined storyline
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Following the rules for a memory card game
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Pretending to be a customer and server at a restaurant while using role speech (“What would you like to eat?”)
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Talking while making pretend potions together at the sand table
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples} >
              Drawing together at the dry erase board
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Following a set of rules for an invented game
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Completing a pattern block design together
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Talking to a teacher about a book character
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Moving cars around the blocks center together
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={4} className={classes.definition2Title}>
              Teacher Behaviors
            </TableCell>
          </TableRow>
        </TableHead>

        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" className={classes.buttonTitle}>
              <strong>Participating in children’s play </strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.buttonTitle}>
              <strong> Asking questions to extend children’s thinking about a shared activity </strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.buttonTitle}>
              <strong> Encouraging children to share, work, or interact with each other  </strong>
            </TableCell>
            <TableCell padding="checkbox" className={classes.buttonTitle}>
              <strong>Helping children find the words to communicate </strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Talking to children about their play-doh creations
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Asking children what will happen next during dramatic play
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Demonstrating how to play a new game
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Prompting children to ask peers to play or share a material
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Co-writing a label with a child for his drawing
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples} >
              Asking children what shape of blocks they will need to keep their building from falling
             </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Modeling the steps for sharing
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Helping children solve problems during games or other shared activities (Say, “It’s my turn.”)
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Taking on a role in dramatic play
           </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Asking children what they think a character will do next while reading a book together
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
              Giving positive feedback when children share or interact
            </TableCell>
            <TableCell padding="checkbox" className={classes.lineExamples}>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

AssocCoopHelpCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssocCoopHelpCard);
