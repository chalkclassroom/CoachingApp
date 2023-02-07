import * as React from "react";
import * as PropTypes from "prop-types";
import {
    Grid,
    Typography,
    withStyles,
    FormLabel,
    FormGroup,
    FormControlLabel,
    FormControl,
    Radio,
    RadioGroup
} from '@material-ui/core'


const centerRow = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 8
}

class RadioSets extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){

    if(this.props.type === "transitionTime")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="Waiting in Line"
                  value="lineAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Traveling"
                  value="travelingAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Children Waiting"
                  value="waitingAverage"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Classroom Routines"
                  value="routinesAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Behavior Management"
                  value="behaviorManagementAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Other"
                  value="otherAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }

    if(this.props.type === "classroomClimate")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="General Approval"
                  value="nonspecificapprovalAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Specific Approval"
                  value="specificapprovalAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Disapproval"
                  value="disapprovalAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Redirection"
                  value="redirectionAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }


    if(this.props.type === "mathInstruction")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                {/*
                <FormControlLabel
                  control={<Radio />}
                  label="Using Math Vocabulary"
                  value="mathVocabularyAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Asking Questions About Math Concepts"
                  value="askingQuestionsAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Demonstrating Math Concepts"
                  value="mathConceptsAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Helping Children Use Math to Problem Solve"
                  value="helpingChildrenAverage"
                />
                */}
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Behaviors"
                  value="teacherAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
              {/*
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Not at Center"
                  value="notAtCenterAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="No Support"
                  value="noSupportAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Support"
                  value="supportAverage"
                />
              */}
                <FormControlLabel
                  control={<Radio />}
                  label="Child Behaviors"
                  value="childAverage"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }


    if(this.props.type === "levelOfInstruction")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Asks High-Level Question"
                  value="hlqAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Child Answers High-Level Question"
                  value="hlqResponseAverage"
                />


              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Asks Low-Level Question"
                  value="llqAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Child Answers Low-Level Question"
                  value="llqResponseAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }


    if(this.props.type === "studentEngagement")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="Off Task"
                  value="offTaskAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Mildly Engaged"
                  value="mildlyEngagedAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Engaged"
                  value="engagedAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Highly Engaged"
                  value="highlyEngagedAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }


    if(this.props.type === "listeningToChildren")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="At Eye Level"
                  value="eyeLevelAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Uses positive or interested expression to encourage child talk"
                  value="positiveExpressionAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Repeats or clarifies"
                  value="repeatsAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Asks open-ended questions"
                  value="openEndedQuestionsAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="Expands on children's play or talk"
                  value="extendsPlayAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Encourages peer talk"
                  value="encouragesPeerTalkAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Listening/Encouraging"
                  value="encouragingAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="No Target Behaviors Observed"
                  value="noBehaviorsAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }


    if(this.props.type === "sequentialActivities")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                {/*
                <FormControlLabel
                  control={<Radio />}
                  label="Helping children do sequential activities with manipulatives or toys"
                  value="sequentialActivitiesAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Supporting children as they draw images or write messages"
                  value="drawImagesAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Demonstrating the steps to an activity or game"
                  value="demonstrateStepsAverage"
                />
                */}
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Behaviors"
                  value="teacherAverage"
                />


              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                {/*
                <FormControlLabel
                  control={<Radio />}
                  label="Supporting children as they act out a dramatic play scenario or book"
                  value="actOutAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Support"
                  value="supportAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="No Support"
                  value="noSupportAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Not at Center"
                  value="notAtCenterAverage"
                />
                */}
                <FormControlLabel
                  control={<Radio />}
                  label="Child Behaviors"
                  value="childAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }


    if(this.props.type === "foundationSkills")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="Literacy Instruction - Total Instruction"
                  value="foundationalSkillsAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Phonological awareness or the sounds of language"
                  value="phonologicalAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="The alphabetic principle and print concepts"
                  value="alphabeticAverage"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Open-ended questions or prompts"
                  value="openEndedQuestionsAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Realistic reading and writing"
                  value="realisticReadingAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Multimodal Instruction"
                  value="multimodalInstructionAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }

    if(this.props.type === "writing")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="Writing Instruction - Total Instruction"
                  value="writingSkillsAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="The content or meaning of the writing"
                  value="meaningAverage"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Print processes (e.g., letter forms, demonstrations, sounds/spelling)"
                  value="printProcessesAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }

    if(this.props.type === "bookReading")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="Book Reading - Total Instruction"
                  value="bookReadingAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Focus on vocabulary, concepts, or comprehension"
                  value="vocabFocusAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Make connections to children's language, cultural backgrounds, and experiences"
                  value="languageConnectionsAverage"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Support children's speaking and listening skills"
                  value="childrenSupportAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Facilitate discussions around equity and fairness"
                  value="fairnessDiscussionsAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Use Multimodal Instruction"
                  value="multimodalInstructionAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }



    if(this.props.type === "languageEnvironment")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="Language Environment - Total Instruction"
                  value="languageEnvironmentAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Talk with children about vocabulary or social-emotional topics"
                  value="talkAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Encourage children to talk"
                  value="encourageChildrenAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Respond to children"
                  value="respondChildrenAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }




    if(this.props.type === "associativeAndCooperative")
    {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                {/*
                <FormControlLabel
                  control={<Radio />}
                  label="Participating in children's play"
                  value="childrensPlayAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Asking questions to extend children's thinking about their shared activity"
                  value="askingQuestionsAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Encouraging children to share, work, or interact with each other"
                  value="encouragingChildrenAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Helping children find the words to communicate"
                  value="helpingChildrenAverage"
                />
                */}
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Behaviors"
                  value="teacherAverage"
                />

              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                {/*
                <FormControlLabel
                  control={<Radio />}
                  label="Support"
                  value="supportAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="No Support"
                  value="noSupportAverage"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Not at Center"
                  value="notAtCenterAverage"
                />
                */}
                <FormControlLabel
                  control={<Radio />}
                  label="Child Behaviors"
                  value="childAverage"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }

  }

}

export default RadioSets;
