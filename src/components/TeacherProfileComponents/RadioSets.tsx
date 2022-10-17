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
                  value="line"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Traveling"
                  value="traveling"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Children Waiting"
                  value="waiting"
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
                  value="routines"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Behavior Management"
                  value="behaviorManagement"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Other"
                  value="other"
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
                  value="nonspecificapproval"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Specific Approval"
                  value="specificapproval"
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
                  value="disapproval"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Redirection"
                  value="redirection"
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

                <FormControlLabel
                  control={<Radio />}
                  label="Using Math Vocabulary"
                  value="mathVocabulary"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Asking Questions About Math Concepts"
                  value="askingQuestions"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Demonstrating Math Concepts"
                  value="mathConcepts"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Helping Children Use Math to Problem Solve"
                  value="helpingChildren"
                />

              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Not at Center"
                  value="notAtCenter"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="No Support"
                  value="noSupport"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Support"
                  value="support"
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
                  value="hlq"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Child Answers High-Level Question"
                  value="hlqResponse"
                />


              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Asks High-Level Question"
                  value="llq"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Child Answers Low-Level Question"
                  value="llqResponse"
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
                  value="offTask"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Mildly Engaged"
                  value="mildlyEngaged"
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
                  value="engaged"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Highly Engaged"
                  value="highlyEngaged"
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
                  value="eyeLevel"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Uses positive or interested expression to encourage child talk"
                  value="positiveExpression"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Repeats or clarifies"
                  value="repeats"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Asks open-ended questions"
                  value="openEndedQuestions"
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
                  value="extendsPlay"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Encourages peer talk"
                  value="encouragesPeerTalk"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Listening/Encouraging"
                  value="encouraging"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="No Target Behaviors Observed"
                  value="noBehaviors"
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

                <FormControlLabel
                  control={<Radio />}
                  label="Helping children do sequential activities with manipulatives or toys"
                  value="sequentialActivities"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Supporting children as they draw images or write messages"
                  value="drawImages"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Demonstrating the steps to an activity or game"
                  value="demonstrateSteps"
                />


              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="Supporting children as they act out a dramatic play scenario or book"
                  value="actOut"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Support for Sequential Activities"
                  value="support"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Present, No Support"
                  value="noSupport"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Teacher Not at Center"
                  value="notAtCenter"
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
                  value="foundationalSkills"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Phonological awareness or the sounds of language"
                  value="phonological"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="The alphabetic principle and print concepts"
                  value="alphabetic"
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
                  value="openEndedQuestions"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Realistic reading and writing"
                  value="realisticReading"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Multimodal Instruction"
                  value="multimodalInstruction"
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
                  value="writingSkills"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="The content or meaning of the writing"
                  value="meaning"
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
                  value="printProcesses"
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
                  value="bookReading"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Focus on vocabulary, concepts, or comprehension"
                  value="vocabFocus"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Make connections to children's language, cultural backgrounds, and experiences"
                  value="languageConnections"
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
                  value="childrenSupport"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Facilitate discussions around equity and fairness"
                  value="fairnessDiscussions"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Use Multimodal Instruction"
                  value="multimodalInstruction"
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
                  value="languageEnvironment"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Talk with children about vocabulary or social-emotional topics"
                  value="talk"
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
                  value="encourageChildren"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Respond to children"
                  value="respondChildren"
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

                <FormControlLabel
                  control={<Radio />}
                  label="Participating in children's play"
                  value="childrensPlay"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Asking questions to extend children's thinking about their shared activity"
                  value="askingQuestions"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Encouraging children to share, work, or interact with each other"
                  value="encouragingChildren"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Helping children find the words to communicate"
                  value="helpingChildren"
                />


              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>

                <FormControlLabel
                  control={<Radio />}
                  label="Supported children's associative and cooperative interactions."
                  value="support"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Was present in the center but did not support associative and cooperative interactions."
                  value="noSupport"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Was not present in the centers observed."
                  value="notAtCenter"
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
