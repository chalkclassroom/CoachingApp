import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { Table, TableRow, TableBody, TableCell } from '@material-ui/core';
import * as Constants from '../../constants/Constants';

const useStyles = makeStyles({
  header: {
    // backgroundColor: '#4fd9b3',
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
export default function LiteracyFoundationalTeacher(): React.ReactElement {
  const classes = useStyles();
  return(
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align="center" className={classes.header} style={{borderRight: '1px solid white'}}>
            Teacher Behaviors
          </TableCell>
          <TableCell align="center" className={classes.header}>
            Definitions and Examples
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalTeacher[0]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher facilitates an activity or interacts with children
            in order to strengthen children’s understanding of rhyming,
            alliteration, and/or syllables.
            <ul>
              <li>
                <i>Do rug and mug rhyme?</i>
              </li>
              <li>
                <i>I heard three words in our poem that begin with the same sound. What sound is it?</i>
              </li>
              <li>
                <i>Let's count the syllables in "birthday," ready?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalTeacher[1]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher facilitates an activity or interacts with children
            in order to strengthen children’s understanding of
            individual sounds, or phonemes.
            <ul>
              <li>
                <i>Give me a thumbs up if you hear the /m/ sound in these words.</i>
              </li>
              <li>
                <i>If you replace the /c/ in cat with /b/ what word do you have?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalTeacher[2]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher facilitates an activity or interacts with children
            in order to strengthen children’s understanding of the
            alphabet and/or word knowledge.
            <ul>
              <li>
                <i>Who can find the letter “T” in our morning message?</i>
              </li>
              <li>
                <i>What letter is at the beginning of your name?</i>
              </li>
              <li>
                <i>When I say our magic word, walk around the room and find the letter “S.”</i>
              </li>
              <li>
                <i>How do we spell “the”?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalTeacher[3]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher facilitates an activity or interacts with children
            in order to strengthen children’s knowledge of letter-sound
            correspondences.
            <ul>
              <li>
                <i>I see you’re holding the “T” puzzle piece, what does “T” say?</i>
              </li>
              <li>
                <i>
                    Today we’re visiting the library. I want to write that in our
                    morning message! What letter should I write here for /l/…. “Library?”
                </i>
              </li>
              <li>
                <i>
                    Are you ready to take my pizza order? Okay, I would like a pepperoni
                    pizza. What letter are you going to write on my order?
                </i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalTeacher[4]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher supports children as they use phonological awareness,
            alphabet knowledge, and letter-sound correspondence skills
            to write labels and/or messages.
            <ul>
              <li>
                Teacher stretches out the word “mom” then asks the child,
                <i>What letter do you need?</i>
              </li>
              <li>
                <i>Yes, C can make the “s” sound at the beginning of the word ‘sun.’  We’ll be able to read that!</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalTeacher[5]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher facilitates an activity or interacts with children
            in order to strengthen children’s knowledge of the
            following print concepts:
            <ul>
              <li>
                Print directionality (i.e., knowing we read left to right
                and top to bottom)
              </li>
              <li>
                Punctuation
              </li>
              <li>
                Capital letters
              </li>
              <li>
                The difference between letters and words; notices spaces
                between words
              </li>
              <li>
                Book handling (e.g., holding the book correctly while
                “reading” or looking at pictures)
              </li>
              <li>
                Title, author, and illustrator of book
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalTeacher[6]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher demonstrates that print represents spoken language,
            or that writing can record our speech.
            <ul>
              <li>
                Teacher reads the morning message while pointing to each word.
              </li>
              <li>
                Teacher says each word as they write a list on the board.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalTeacher[7]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher uses foundational skills during a realistic,
            or authentic, reading and/or writing task. The teacher
            may draw children’s attention to concepts or skills
            (e.g., talks about where to start reading) or involve
            children in using skills within the context of a
            real-world reading and/or writing activity.
            <ul>
              <li>
                Teacher demonstrates writing a list of materials the
                class wants to bring to recess.
              </li>
              <li>
                Teacher reads the class rules before playing a new game
                with children and talks about two words that begin with
                the same sound.
              </li>
              <li>
                Teacher writes the morning message about the day’s events
                or children’s news and invites children to write part of
                the message.
              </li>
              <li>
                <strong>Non-examples:</strong> Teacher demonstrates how to
                write the letter G in isolation; asks children to copy
                letters or words; starts a letter hunt in the classroom
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalTeacher[8]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher asks children an open-ended question or prompt about
            a foundational skill. Open-ended questions or prompts have
            more than one correct answer.
            <ul>
              <li>
                <strong>Teacher:</strong> <i>What rhymes with hat?</i>
                <br />
                <strong>Child:</strong> <i>mat!</i>
              </li>
              <li>
                <strong>Teacher:</strong> <i>Let’s think of words that begin with /m/...</i>
                <br />
                <strong>Child:</strong> <i>marker!</i>
              </li>
              <li>
                <strong>Teacher:</strong> <i>When I say our magic word, go
                    stand next to a friend or object in the classroom who
                    has the same beginning sound as your name.</i>
                <br />
                <strong>Child:</strong> Searches the room for an object
                    that begins with /m/ because his name is Martin.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalTeacher[9]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher uses different methods to communicate content to
            children, such as visuals/pictures, objects, gestures/actions,
            and sounds.
            <ul>
              <li>
                Teacher invites children to make letters with clay or
                trace letters in sand.
              </li>
              <li>
                Teacher passes around three objects that all begin with
                /s/ to teach that sound.
              </li>
              <li>
                Teacher asks a small group of children to sort picture cards
                based on whether or not they rhyme.
              </li>
              <li>
                Teacher has children stomp their feet as they count syllables. 
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}