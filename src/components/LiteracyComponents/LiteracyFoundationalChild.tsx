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
export default function LiteracyFoundationalChild(): React.ReactElement {
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
            {Constants.Checklist.LI.FoundationalChild[0]}
          </TableCell>
          <TableCell className={classes.example}>
            Children do an activity/task alone or with a teacher and/or peers
            that requires knowledge of rhyming, alliteration, and or/syllables.
            <ul>
              <li>
                Has a conversation about rhyming words with a teacher (<i>house/mouse- they rhyme!</i>)
                while looking at books in the library center.
              </li>
              <li>
                <i>Kendrick and Kevin, our names start the same!</i>
              </li>
              <li>
                Claps the syllables in words during a whole group lesson.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalChild[1]}
          </TableCell>
          <TableCell className={classes.example}>
            Children do an activity/task alone or with a teacher and/or peers
            that requires knowledge of individual sounds, or phonemes.
            <ul>
              <li>
              Children put their thumbs up whenever they hear the /m/ sound in words that the teacher says.
              </li>
              <li>
                <strong>Teacher:</strong> <i>If you replace the /c/ in cat with /b/ what word do you have?</i>
                <br />
                <strong>Child:</strong> <i>bat!</i>
              </li>
              <li>
                Children use fly swatters to tap picture cards that begin
                with specific sounds during a game. 
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalChild[2]}
          </TableCell>
          <TableCell className={classes.example}>
            Children do an activity/task alone or with a teacher and/or peers
            that requires knowledge of the alphabet and/or word identification skills.
            <ul>
              <li>
                Children do an alphabet puzzle together. One child says, <i>I have the “K.”</i>
              </li>
              <li>
                <strong>Teacher:</strong> Pointing to text in a big book, says,
                    <i>What is this letter?</i>
                <br />
                <strong>Child:</strong> <i>D!</i>
              </li>
              <li>
                <strong>Teacher:</strong> <i>Who can come circle our new word “the”?</i>
                <br />
                <strong>Child:</strong> circles “the” on the board
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalChild[3]}
          </TableCell>
          <TableCell className={classes.example}>
            Children do an activity/task alone or with a teacher and/or peers that requires
            knowledge of letter-sound correspondence.
            <ul>
              <li>
                <strong>Teacher:</strong> <i>Hmm, this day of the week in our morning message
                    starts with the letter “W.” What sound does “W” make?</i>
                <br />
                <strong>Child:</strong> <i>/w/</i>
              </li>
              <li>
                Children work together to sort objects into alphabet tubs by initial sound.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalChild[4]}
          </TableCell>
          <TableCell className={classes.example}>
            Children segment the sounds in the target word, select a letter to represent
            the sound, and write the selected letter(s) to represent the word.
            <ul>
              <li>
                With teacher prompting, a child isolates the first sound in the target word,
                then writes the corresponding letter.
              </li>
              <li>
                Child independently says the target word, “cat,” then produces letters to
                match the speech sounds, such as writing“ct” for “cat.”
              </li>
              <li>
                Child writes “the” on their paper.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalChild[5]}
          </TableCell>
          <TableCell className={classes.example}>
            Children do an activity/task alone or with a teacher and/or peers
            that requires knowledge of the following print concepts:
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
            {Constants.Checklist.LI.FoundationalChild[6]}
          </TableCell>
          <TableCell className={classes.example}>
            Children show an understanding that print represents spoken language,
            or that writing can record our speech.
            <ul>
              <li>
                Children “read” the morning message with the teacher.
              </li>
              <li>
                Child looks at their grocery list made of several letter-like forms
                and points to one of the marks as they say, <i>Banana, cheetos.</i>
              </li>
              <li>
                Teacher looks at a child’s invented spelling/marks and says, <i>Read it to me.</i>
                The child responds while using gesture, <i>This is my family.</i>
              </li>
              <li>
                Child points to each word as they say or “read” the morning message.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalChild[7]}
          </TableCell>
          <TableCell className={classes.example}>
            Children use foundational skills during a realistic and meaningful
            reading and/or writing task. Children use skills such as inventive
            spelling and alphabet knowledge, but the main focus of the activity
            is to read and/or write for a real-world purpose, such as:
            <ul>
              <li>
                Discussing aspects of a shared reading text that is meaningful to children
              </li>
              <li>
                Writing a list of materials to take to recess
              </li>
              <li>
                Writing a letter to a family member
              </li>
              <li>
                Writing their name to show ownership
              </li>
              <li>
                Reading their writing in front of an audience
              </li>
              <li>
                “Reading” a book or text (flipping through pages, telling the story,
                describing pictures, following an instruction manual)
              </li>
              <li>
                Reading environmental print in the classroom (e.g., labels in dramatic play center)
              </li>
              <li>
                <strong>Non-examples:</strong> matching uppercase and lowercase letters on
                a worksheet; writing letters/words in isolation; handwriting practice
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.FoundationalChild[8]}
          </TableCell>
          <TableCell className={classes.example}>
          Children respond to an open-ended question or prompt about a foundational skill. Open-ended questions or prompts have more than one correct answer.
            <ul>
              <li>
                <strong>Teacher:</strong> <i>What rhymes with hat?</i>
                <br />
                <strong>Child:</strong> <i>mat!</i>
              </li>
              <li>
                <strong>Teacher:</strong> <i>I’m thinking of a word that begins with /s/...</i>
                <br />
                <strong>Child:</strong> <i>snake!</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}