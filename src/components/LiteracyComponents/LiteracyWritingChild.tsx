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
export default function LiteracyWritingChild(): React.ReactElement {
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
            {Constants.Checklist.LI.WritingChild[0]}
          </TableCell>
          <TableCell className={classes.example}>
            Children have conversations with teachers/peers before, during, or after
            drawing/writing activities. They may brainstorm topics they want to draw
            and/or write about or have a conversation that leads to a writing project.
            Children may also have ongoing conversations with teachers/peers about the
            meaning of their writing as they engage in the activity.
            <ul>
              <li>
                Child says, “I want to write about my abuela.” Teacher responds,
                “What a great idea. Tell me about your abuela.” Child says, “She makes
                bread. It’s warm!” The teacher continues asking questions like “Do you
                put anything on the bread?” or “Who helps your abuela make her bread?”
                to help the child explore this topic for drawing and writing.
              </li>
              <li>
                Children talk about their purpose or reason for writing (e.g.,
                “I’m making a card for my mom.”)
              </li>
              <li>
                Children talk to teachers and/or peers about the content of the
                writing/drawing project (e.g., adding details to the class book)
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingChild[1]}
          </TableCell>
          <TableCell className={classes.example}>
            Children create drawings or pictures that convey or communicate meaning
            (e.g., story, message, response to literature, list, etc).
            <ul>
              <li>
                Child draws their family.
              </li>
              <li>
                Children draw a menu of food items at the dramatic play center.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingChild[2]}
          </TableCell>
          <TableCell className={classes.example}>
            Children produce writing forms with any type of writing utensil
            (e.g., pencils, crayons, markers). Writing forms can include scribbles,
            zig zags, letter-like forms, and/or conventional letters. Children may
            also produce letters by tracing the letter shape in the air with their finger.
            <ul>
              <li>
                Scribbles or scribble units: Purposeful marks; large mass of scribbles
                or small patches of scribbles separated by spaces
              </li>
              <li>
                Wavy scribbles or mock handwriting: Horizontal loops or zig-zags
                that imitate writing; child pretends to write words
              </li>
              <li>
                Letter-like forms or mock letters: Marks that resemble letters
              </li>
              <li>
                Letter strings: Strings of letters grouped together; no letter-sound
                correspondence
              </li>
              <li>
                Transitional writing: Letters or strings of letters with spaces in
                between to resemble words; letters/words copied from environmental
                print; memorized words
              </li>
              <li>
                Invented or phonetic spelling: Different ways to represent the sounds
                in words; the first letter of the word or beginning and ending sounds
                represent the entire word
              </li>
              <li>
                Beginning word and phrase writing: Words with beginning, middle, and
                ending letter sounds; short phrases
              </li>
            </ul>
            Adapted from:
            <br/>
            Rowe, D. W. & Wilson, S. J. (2015). The development of a descriptive
            measure of early childhood writing: Results from the Write Start!
            writing assessment, <i>Journal of Literacy Research, 47</i>(2), 245-292.
            doi: 10.1177/1086296X15619723
            <br />
            <br />
            Byington, T.A. & Kim, Y. (2017). Promoting preschoolers’ emergent writing,
            <i>Young Children, 72</i>(5), 74-82.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingChild[3]}
          </TableCell>
          <TableCell className={classes.example}>
            Children verbalize the message that they are going to produce.
            Children may also say out loud the message that the teacher and
            children will write together during a group writing experience.
            <ul>
              <li>
                Child looks at their drawing and says, “My family.”
              </li>
              <li>
                Child says, “I’m going to write, ‘The frog is green with spots on it.’”
              </li>
              <li>
              Children say the sentence that the teacher is going to write in the shared
              writing activity (e.g., morning message).
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingChild[4]}
          </TableCell>
          <TableCell className={classes.example}>
            Children write their name on their drawing or writing activity.
            <ul>
              <li>
                Writes a few letters in their name
              </li>
              <li>
                Writes their full name
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingChild[5]}
          </TableCell>
          <TableCell className={classes.example}>
            Children demonstrate their knowledge of the alphabet and letter-sound
            correspondence, or the match between letters and sounds, during writing
            activities.
            <ul>
              <li>
                During a whole group interactive writing lesson, the teacher says,
                “The next letter makes the /b/ sound.” The children reply, “B!”
              </li>
              <li>
                Child says, “My name starts with ‘P’ just like Pablo!”
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingChild[6]}
          </TableCell>
          <TableCell className={classes.example}>
            Children segment the sounds in the target word, select a letter to represent
            the sound, and write the selected letter(s) to represent the word.
            <ul>
              <li>
                With teacher prompting, a child isolates the first sound in the target
                word, then writes the corresponding letter.
              </li>
              <li>
                Child independently says the target word, “cat,” then produces letters
                to match the speech sounds, such as writing “ct” for “cat.”
              </li>
              <li>
                Child writes “the” on their paper.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.WritingChild[7]}
          </TableCell>
          <TableCell className={classes.example}>
            Children “read” the message by matching their speech to the marks on the
            page. The message can be scribbles, letter-like forms, invented spellings,
            or words spelled conventionally.
            <ul>
              <li>
                Child points to each mark as they say, “My dog jumps on me.”
              </li>
              <li>
                Teacher says, “Read it to me,” and child responds, “This is my family.”
              </li>
              <li>
                Child rereads their message to remember the next word to write.
              </li>
              <li>
                Children read the morning message with their peers as the teacher points
                to the words.
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}