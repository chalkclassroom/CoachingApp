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
export default function LiteracyReadingTeacher(): React.ReactElement {
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
            {Constants.Checklist.LI.ReadingTeacher[0]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher defines and/or talks about vocabulary words from the text before, during,
            and/or after the book reading. The teacher may use one of more of these methods
            to expand children’s word knowledge:
            <ul>
              <li>
                <strong>Provide a child-friendly explanation of the word meaning </strong>
                (<i>A habitat is a place that an animal lives. An animal can find food and
                  water in its habitat.</i>)
              </li>
              <li>
                <strong>Encourage children to use words </strong>
                (<i>Can you say, 'habitat'? Turn and talk to a friend about the habitat of
                  your favorite animal. Where does it live?</i>)
              </li>
              <li>
                <strong>Use gestures and/or visuals to teach the word meaning </strong>
                (Teacher shows a photograph of a habitat like a pond that is different from
                the illustration of the pond in the book. The teacher can also share objects,
                like a bird’s nest.)
              </li>
              <li>
                <strong>Use sounds or music to teach word meaning </strong>
                (Teacher sings or plays a song about different habitats- from deserts to
                forests to the ocean)
              </li>
              <li>
                <strong>Ask children to generate definitions, classify, and/or compare words </strong>
                (<i>Let’s write/draw a list of all the different habitats we can think of!</i>)
              </li>
              <li>
                <strong>Connect words with children’s home languages</strong>
                (<i>We can say habitat in Spanish- el habitat! </i> The teacher can research common
                habitats in children’s home countries, if applicable)
              </li>
              <li>
                <strong>Ask questions about the word </strong>
                (<i>Let’s look at this picture of this habitat - a pond. How does this habitat
                help the frog live?</i>)
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.ReadingTeacher[1]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher draws children’s attention to concepts that will be featured in a
            text and/or activates children’s funds of knowledge that will help them
            engage in and comprehend the content of the text.
            <ul>
              <li>
                Teacher clarifies a concept that is important for understanding a story 
              </li>
              <li>
                Teacher does a picture walk with children (e.g., flips through the pages
                to think about what might occur based on the illustrations).
              </li>
              <li>
                Teacher creates a KWL chart (What do you Know? What do you Want to learn?
                and What have you Learned?) with children
              </li>
              <li>
                Teacher shows objects or a short video clip, or plays a song related to the text
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.ReadingTeacher[2]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher provides opportunities for children to engage with elements of a text
            through retelling, reenacting, sequencing or summarizing activities. A text
            could be a fiction or informational read aloud, poem, nursery rhyme, folktale,
            or any text that has been shared with children.
            <ul>
              <li>
                <strong>Retell- </strong>
                Encourage children to retell a text using their own words.
              </li>
              <li>
                <strong>Reenact- </strong>
                Encourage children to act out a text. They may use materials such as puppets
                or dramatic play props.
              </li>
              <li>
                <strong>Sequence- </strong>
                Encourage children to put events from a text into the correct order.
              </li>
              <li>
                <strong>Summarize- </strong>
                Encourage children to identify the main ideas of a text, such as talking about
                the plot or drawing/writing in response to a text.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.ReadingTeacher[3]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher encourages children to relate concepts from the book to their experiences
            in the classroom, at home, or in the community.
            <ul>
              <li>
                Teacher prompts children to connect a book they are reading about construction
                sites to a building project in their neighborhood.
              </li>
              <li>
                Teacher allows children to talk about their home life or activities, or tell
                personal stories that connect to themes or aspects of a book.
              </li>
              <li>
                Teacher hands out children’s nature walk journals from the previous day and
                asks children to share their observations before reading a book about trees.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.ReadingTeacher[4]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher selects books that reflect their students’ language and/or cultural
            backgrounds. The teacher intentionally facilitates discussions that link the
            book theme to children’s experiences.
            <ul>
              <li>
                Teacher reads a book that celebrates black nighttime hair routines and asks
                children if they want to share anything about their hair routines (e.g.,
                <i>Bedtime Bonnet</i> by Nancy Redd).
              </li>
              <li>
                Teacher reads and discusses folktales that reflect children’s cultural
                backgrounds (e.g., <i>Tales Our Abuelitas Told</i> by Alma Flor Ada).
              </li>
              <li>
                Teacher reads and discusses a bilingual book in Spanish and English.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.ReadingTeacher[5]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher asks questions or makes statements that invite multi-word responses and
            often  require children to use their reasoning skills. There is not one correct
            answer to these types of high-level questions, which often involve a wh-word
            (i.e., why, why, where, how). Common examples during book reading are asking
            children to make predictions or inferences.
            <br />
            <br />
            <strong>Predictions: </strong> Teacher asks children to predict future events
            that have not yet happened in a text.
            <ul>
              <li>
                <i>What do you think the girl is going to do with her toy?</i>
              </li>
              <li>
                <i>How do you think the animals will escape?</i>
              </li>
            </ul>
            <br />
            <strong>Inferences: </strong> Teacher asks children to draw conclusions about
            events or character emotions, intentions, and/or motivations based on information
            that has not been clearly stated in a text.
            <ul>
              <li>
                Making inferences within a text: <i>Do you think Luke really believes that
                  Jackie Robinson hit the ball on his roof? Why?</i>
              </li>
              <li>
                Making inferences based on children’s background knowledge: <i>Has anyone in
                  your family ever moved away? How did it make you feel? How do you think the
                  girl in the story feels?</i>
              </li>
              <li>
                Making inferences between texts: <i>How is the boy in this story different
                  from the boy in last week’s story?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.ReadingTeacher[6]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher responds to children’s comments, questions, or actions in ways that continue
            the conversation or interaction and extend children’s thinking. The teacher may
            respond with a follow-up question to elicit talk from the children or provide an
            informative comment to support children’s thinking.
            <ul>
              <li>
                During a book reading, the teacher asks, <i>What do you think happened to the
                  snowball in Peter’s pocket when he came inside? </i> A child answers, <i>His momma
                  took it! </i> The teacher values the child’s contribution to the discussion and
                  responds: <i>I bet Peter’s mom does NOT want him to bring a snowball inside! </i>
                  Then, the teacher asks a follow-up question to focus the children’s attention
                  on the illustration and the cause-and-effect relationship: <i>Let’s look at the
                  picture - what do you see on his jacket?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.ReadingTeacher[7]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher prompts children to listen, pay attention, and talk to their peers during
            conversations about a text. Teachers may also intentionally plan activities that
            require children to listen and respond to each other before, during, or after a book
            reading.
            <ul>
              <li>
                A child makes a comment during the book reading. The teacher asks the other
                children to respond if they agree or disagree, and to explain their reason
                (<i>Tell George why you think that</i>).
              </li>
              <li>
                The teacher asks a question about a character’s motivation, then asks children
                to turn to their neighbor and share their thoughts.
              </li>
              <li>
                A child asks a question. The teacher allows the child to call on a friend to answer.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.ReadingTeacher[8]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher uses fiction and non-fiction texts to discuss topics around power, equity,
            and/or fairness. Conversations and activities may include discussion of gender, race,
            religion, nationality, disability, the environment, or other social-political topics
            reflected in the children’s community.
            <ul>
              <li>
                During a read aloud about Jackie Robinson, the first African American to play for
                a Major League Baseball team, teacher asks questions like, 
                <ul>
                  <li>
                    <i>What problem do you see?</i>
                  </li>
                  <li>
                    <i>What is segregation? Is this fair?</i>
                  </li>
                  <li>
                    <i>How would you feel if you were Jackie Robinson or the teammate?</i>
                  </li>
                  <li>
                    <i>What are some things that could have been done differently?</i>
                  </li>
                  <li>
                    <i>What would you have done if you were Jackie Robinson?</i>
                  </li>
                </ul>
              </li>
              <li>
                Prompt children to act out or draw a more fair or equitable ending to a story
                (e.g, from a different character’s perspective)
              </li>
              <li>
                Encourage children to ask questions about differences they notice in a book or
                illustration.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.ReadingTeacher[9]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher uses different methods to communicate content to children, such as
            visuals/pictures, objects, gestures/actions, and sounds.
            <ul>
              <li>
                Acting out concepts and words; gestures that represent word meanings
              </li>
              <li>
                Hands-on learning experiences (e.g. planting seeds; science experiments;
                exploring cultural artifacts)
              </li>
              <li>
                Pictures, music, and/or video
              </li>
              <li>
                Explicitly drawing children's attention to book illustrations (e.g., pointing
                to a picture that helps teach vocabulary or supports children’s understanding
                of character motivations/actions)
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}