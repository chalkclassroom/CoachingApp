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
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
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
            <FormControl component="fieldset" className={"checkboxesform"}>
              <FormGroup>
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
          <FormControl component="fieldset" className={"checkboxesform"}>
            <FormGroup>
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

export default RadioSets
