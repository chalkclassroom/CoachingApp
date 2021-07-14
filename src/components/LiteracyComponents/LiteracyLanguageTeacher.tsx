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
export default function LiteracyLanguageTeacher(): React.ReactElement {
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
            {Constants.Checklist.LI.LanguageTeacher[0]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher discusses advanced vocabulary and related content that children don’t
            typically encounter in everyday conversation. The teacher intentionally draws
            children’s attention to vocabulary words that build children’s content knowledge.
            The teacher may use and discuss words or concepts when talking about topics of
            interest to children both within and outside of the curriculum or unit of study.
            <ul>
              <li>
                The teacher may provide more formal definitions of words being discussed
                (e.g., <i>a habitat is where animals live</i>). 
              </li>
              <li>
                The teacher may also provide implicit information about word meanings during
                interactions with children (e.g., a teacher observes a child making a tree
                with play dough and says, <i>I see you made a habitat for the owl!</i>).
              </li>
              <li>
                The teacher may draw children’s attention to cognates or provide both the
                English and home language version of words that relate to children’s ongoing
                activity (<i>I see you’re playing restaurant- restaurante. May I order some
                comida, some food?</i>)
              </li>
            </ul>
            The teacher may use one or more of the following methods for expanding children’s
            vocabulary knowledge:
            <ul>
              <li>
                Provide child-friendly explanation of the word’s meaning
              </li>
              <li>
                Use props, gestures and/or visuals to help children understand the word’s meaning
              </li>
              <li>
                Encourage children to use vocabulary words
              </li>
              <li>
                Ask children to generate definitions including synonyms and/or perceptual
                qualities, classify, and/or compare words
              </li>
              <li>
                Connect words with children’s home languages
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.LanguageTeacher[1]}
          </TableCell>
          <TableCell className={classes.example}>
            Teachers have a conversation with one child or multiple children that focuses on a
            social-emotional topic (e.g., how to solve problems, feelings, friendship).
            Conversations can occur between a teacher and one child or a teacher and several
            children at once.
            <ul>
              <li>
                <strong>Teacher: </strong> Remember, only two friends can visit the pet center
                today, Louisa. That may make you feel disappointed. What can you do if you feel
                disappointed?
              </li>
              <li>
                <strong>Child 1: </strong> Tell you.
              </li>
              <li>
                <strong>Child 2: </strong> Maybe next time.
              </li>
              <li>
                <strong>Teacher: </strong> Good idea! You can say, ‘Maybe next time’ and find
                another center or game to play.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.LanguageTeacher[2]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher encourages children to talk or tell stories about their lived experiences.
            Children may also act out themes, events or stories based on their personal
            experiences at home, in the community, or at school. Teachers encourage these
            language-building behaviors by listening to children and valuing any talk,
            story-telling, and/or re-enactments from their lives.
            <ul>
              <li>
                During centers, after reading the picture book Chrysanthemum earlier in the day,
                the teacher listens as a child talks about the many different names he is called
                outside of school. The teacher asks him to tell more about his names.
              </li>
              <li>
                The teacher knows that a child is spending time with their extended family and
                asks open-ended questions about what the child is doing with their cousins.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.LanguageTeacher[3]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher helps children listen, pay attention, and talk to their peers. Teachers may
            also intentionally plan activities that require children to listen and respond to
            each other. The children do not have to talk in response to the teacher’s strategy.
            This checklist item captures the teacher’s attempt to support peer communication.
            <ul>
              <li>
                Teacher prompts children to connect a book they are reading about construction
                sites to a building project in their neighborhood.
              </li>
              <li>
                The teacher notices that one child is trying unsuccessfully to engage a peer at
                the dramatic play center. The teacher provides a model, “Jonah, how about you ask
                Leo if he wants to play restaurant with you.”
              </li>
              <li>
                The teacher encourages two children to pause and look at each others’ block
                structures and talk to each other about what they notice or ask each other
                questions.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.LanguageTeacher[4]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher asks questions or makes statements that invite multi-word responses.
            The child’s answer is not constrained. These questions often involve a wh-word
            (i.e., what, why, where, how)
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
              <li>
                <i>Which one of these do you think will float? Why?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.LanguageTeacher[5]}
          </TableCell>
          <TableCell className={classes.example}>
            The teacher watches children or asks or an open-ended question/prompt to understand
            what children are doing before the teacher enters the activity or play scene. In
            contrast, teachers who begin interacting with children without taking time to observe
            or ask questions first may interrupt or disrupt children’s play. This can lead to
            more teacher directing and less child initiation of ideas and talk.
            <ul>
              <li>
                Teacher says, “What are you doing?” as she enters the blocks center and sits down
                next to children.
              </li>
              <li>
                Teacher sits right outside the dramatic play center to listen and watch as
                children move objects around and talk to each other. 
              </li>
              <li>
                Teacher watches a child select various materials (e.g., rocks with different
                textures) at the science center and bring them to the table, then asks a question
                about what the child is doing.
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.LanguageTeacher[6]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher imitates, or repeats, the child’s verbalization without adding content.
            <ul>
              <li>
                Child: <i>Giraffe! </i>
                <br />
                Teacher: <i>Giraffe! </i> or <i>Wow, a giraffe!</i>
              </li>
            </ul>
            Teacher asks questions that clarify the meaning of the child’s previous comment.
            <ul>
              <li>
                Child: <i>Cah</i>
                <br />
                Teacher: <i>Is that your car?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.checklistItem}>
            {Constants.Checklist.LI.LanguageTeacher[7]}
          </TableCell>
          <TableCell className={classes.example}>
            Teacher responds to children’s comments, questions, or actions in ways that extend
            the conversation or interaction. The teacher may respond with a follow-up question
            to elicit talk from the children or provide an informative comment to support
            children’s thinking.
            <ul>
              <li>
                During a conversation at the science center a child playing with a toy bear
                says, <i>The baby bear is going to hatch out of his egg- look out!</i> The
                teacher picks up the toy snake and says, <i>You know, baby bears don’t hatch
                out of eggs, but snakes do! What else do you know about bears?</i>
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}