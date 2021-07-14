import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell } from '@material-ui/core';
import * as Constants from '../../constants/Constants';

const useStyles = makeStyles({
  header: {
    fontFamily: "Arimo",
    fontWeight: 'bold',
    fontSize: '1.1em',
    color: 'white',
    padding: '0.5em',
    backgroundColor: Constants.Colors.LI
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
export default function LiteracyWritingTeacher(): React.ReactElement {
  const classes = useStyles();
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align="center" className={classes.header} style={{borderRight: '1px solid white'}}>
            Child Behaviors
          </TableCell>
          <TableCell align="center" className={classes.header}>
            Definitions and Examples
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingTeacher[0]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher has conversations with groups of children or individual children about
            their ideas for writing projects or talks to children about the content, or
            meaning, of their drawing/writing as it develops. Instead of focusing on the
            writing marks, the teacher has a conversation with children about what the
            message conveys or how children can expand on their ideas.
            <ul>
              <li>
                Teacher and children brainstorm ideas for writing as a group before journal time.
              </li>
              <li>
                Teacher talks to one child at the science table about what they observe as
                the child prepares to draw/write in their science log.
              </li>
              <li>
                Teacher and children generate ideas while composing a story together;
                the teacher writes their shared story on chart paper
              </li>
              <li>
                Teacher says, “I notice you&apos;re drawing a bird! What else do you know
                about birds?”
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingTeacher[1]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher encourages children to write a message or part of a message.
            For some children a message may be scribbles. Other children may produce
            letter-like forms or conventional letters.
            <ul>
              <li>
                Teacher says, “Why don’t you draw your dog and then you can write
                the words on it.”
              </li>
              <li>
                Teacher watches a child drawing and says, “You should write the words
                on that. What would ‘dog’ start with?”
              </li>
              <li>
                Teacher says, “Why don&apos;t you write about that on your picture.”
              </li>
              <li>
                Teacher invites various children to write a few letters or words in
                a group or shared writing piece (e.g., morning message, class list,
                book, letter, idea web, etc.)
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingTeacher[2]}
          </TableCell>
          <TableCell className={classes.example}>
            The teacher shows children how to compose or generate writing that
            conveys meaning (e.g., brainstorming ideas, identifying the purpose
            for writing, drawing, rereading to remember the message, etc.).
            Teacher thinks aloud about the purpose for writing as they create a
            note: “I want to remember to bring tomatoes from my garden to show you
            tomorrow. I think I&apos;ll write a note and put it on the door.”
            <ul>
              <li>
                Teacher starts drawing on their own paper at the writing center and
                says, “I think I&apos;ll draw a ball like the one I throw with my son.”
              </li>
              <li>
                Teacher thinks aloud as they add print to their drawing: “I hear a /b/
                at the beginning of ‘ball,’ so I’m going to write a ‘b’ here.”
              </li>
              <li>
                Teacher draws a line for each word in the message on the child&apos;s
                paper or their own paper if the teacher is writing alongside children.
              </li>
              <li>
                Teacher rereads the child&apos;s message to help them remember the next word
                to write
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingTeacher[3]}
          </TableCell>
          <TableCell className={classes.example}>
            The teacher shows or models for children the procedures for writing, or
            the mechanics of writing (e.g., directionality, forming letters, punctuation).
            Teacher demonstrations or modeling may occur in whole group, small group,
            and/or learning center settings.
            <ul>
              <li>
                Teacher shows a child how to write the letter ‘B’.
              </li>
              <li>
                Teacher shows children how to start writing on the top left of the
                chart paper during the morning message.
              </li>
              <li>
                Teacher explains why they wrote a question mark at the end of their sentence.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingTeacher[4]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher encourages children to write their name or the letters in
            their name that children know so far.
            <ul>
              <li>
                “Let’s write your name on that!”
              </li>
              <li>
                “Do you want to write your name so your mom knows the card is from you?”
              </li>
              <li>
                “I see the ‘S’ for Sharonda! What other letters are in your name?”
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingTeacher[5]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher accepts and celebrates all children’s writing even if it doesn’t look
            like correctly formed letters or is not spelled correctly.
            <ul>
              <li>
                Teacher looks at child’s letter-like forms and says,
                “You are really a fabulous writer!”
              </li>
              <li>
                Teacher points to child’s scribble marks next to their drawing and says,
                “I see you wrote a message. Tell me about it!”
              </li>
              <li>
                "I see you made a lower-case ‘h’!"
              </li>
              <li>
                Non-example: “Your ‘M’ is upside down! Let me help you.”
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingTeacher[6]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher supports children as they use phonological awareness, alphabet
            knowledge, and letter-sound correspondence skills to write labels and/or
            messages.
            <ul>
              <li>
                Teacher stretches out the word “mom” then asks the child, "What letter do you need?"
              </li>
              <li>
                Teacher says, "Yes, C can make the 's' sound at the beginning of the word ‘sun.’
                We’ll be able to read that!"
              </li>
              <li>
                Teacher says, "Now you say the word and listen for the sounds you hear!"
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingTeacher[7]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher asks children to “read” the message, which can be scribbles,
            letter-like forms, or invented spellings. The teacher may also ask children
            to read a message that the class composed together.
            <ul>
              <li>
                “What did you write?”
              </li>
              <li>
                “Read that to me?”
              </li>
              <li>
                “Read it to me and point with your finger.”
              </li>
              <li>
                “Let’s read the morning message together.”
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}