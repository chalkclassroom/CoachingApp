import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Grid,
  Typography,
  withStyles,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
} from '@material-ui/core'

const centerRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 8,
}

class RadioSets extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (this.props.type === 'transitionTime') {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={'checkboxesform'}>
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
            <FormControl component="fieldset" className={'checkboxesform'}>
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

    if (this.props.type === 'classroomClimate') {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={'checkboxesform'}>
              <FormGroup>
                <FormControlLabel
                  control={<Radio />}
                  label="Nonspecific Approval"
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
            <FormControl component="fieldset" className={'checkboxesform'}>
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

    if (this.props.type === 'mathInstruction') {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={'checkboxesform'}>
              <FormGroup>
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
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={'checkboxesform'}>
              <FormGroup>
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
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }

    if (this.props.type === 'levelOfInstruction') {
      return ( <></>)
    }

    if (this.props.type === 'studentEngagement') {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={'checkboxesform'}>
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
            <FormControl component="fieldset" className={'checkboxesform'}>
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

    if (this.props.type === 'listeningToChildren') {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={'checkboxesform'}>
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
            <FormControl component="fieldset" className={'checkboxesform'}>
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

    if (this.props.type === 'sequentialActivities') {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={'checkboxesform'}>
              <FormGroup>
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
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={'checkboxesform'}>
              <FormGroup>
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
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }

    if (this.props.type === 'foundationSkills') {
      return (<></>)
    }

    if (this.props.type === 'writing') {
      return (<></>)
    }

    if (this.props.type === 'bookReading') {
      return (<></>)
    }

    if (this.props.type === 'languageEnvironment') {
      return (<></>)
    }

    if (this.props.type === 'associativeAndCooperative') {
      return (
        <Grid container style={centerRow}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={'checkboxesform'}>
              <FormGroup>
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
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={'checkboxesform'}>
              <FormGroup>
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
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    }
  }
}

export default RadioSets
