import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddCircleIcon from "@material-ui/icons/AddCircle";

interface Props {
  teacherFirstName: string,
  teacherLastName: string,
  firebase: {
    createActionPlan(teacherId: string, sessionId: string): Promise<void>,
    getActionPlan(sessionId: string): Promise<Array<{id: string, goal: string, benefit: string}>>,
    getActionSteps(actionPlanId: string): Promise<Array<{step: string, materials: string, person: string, timeline: string}>>,
    saveActionPlan(actionPlanId: string, goal: string, benefit: string): Promise<void>,
    saveActionStep(actionPlanId: string, index: string, step: string, materials: string, person: string, timeline: string): Promise<void>,
    createActionStep(actionPlanId: string, index: string): Promise<void>
  },
  teacherId: string,
  sessionId: string,
  disabled: boolean,
  handleEditActionPlan(): void,
  actionPlanExists: boolean
}

interface State {
  goal: string,
  benefit: string,
  actionSteps: string,
  actionStepsArray: Array<{step: string, materials: string, person: string, timeline: string}>,
  editMode: boolean,
  actionPlanExists: boolean,
  actionPlanId: string
}


/**
 * Form for user to complete action plan
 * @class ActionPlanForm
 */
class ActionPlanForm extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      goal: '',
      benefit: '',
      actionSteps: '',
      actionStepsArray: [{step: '', materials: '', person: '', timeline: ''}],
      editMode: false,
      actionPlanExists: false,
      actionPlanId: ''
    }
  }

  handleAddActionStep = (): void => {
    this.setState({
      actionStepsArray: [...this.state.actionStepsArray, {step: '', materials: '', person: '', timeline: ''}]
    }, () => {
      this.props.firebase.createActionStep(this.state.actionPlanId, (this.state.actionStepsArray.length-1).toString());
    })
  }

  /**
   * responds to change in user-entered text
   * @param {string} name
   * @param {event} event
   * @return {void}
   */
  handleChange = (name: string) => (event): void => {
    this.setState({
      [name]: event.target.value,
    });
    // this.validateState(name, event.target.value);
    // console.log(this.state.goal);
  };

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeActionStep = (number: number) => (event): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].step = event.target.value;
    this.setState({
      actionStepsArray: newArray
    });
    console.log(this.state.actionStepsArray[0].step);
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeMaterials = (number: number) => (event): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].materials = event.target.value;
    this.setState({
      actionStepsArray: newArray
    });
    console.log(this.state.actionStepsArray[0].materials);
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangePerson = (number: number) => (event): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].person = event.target.value;
    this.setState({
      actionStepsArray: newArray
    });
    console.log(this.state.actionStepsArray[0].person);
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeTimeline = (number: number) => (event): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].timeline = event.target.value;
    this.setState({
      actionStepsArray: newArray
    });
    console.log(this.state.actionStepsArray[0].timeline);
  }

  handleCreate = (): void => {
    this.props.firebase.createActionPlan(this.props.teacherId, this.props.sessionId)
      .then(() => {
        this.setState({
          editMode: true
        });
        console.log('this.props.sessionId: ', this.props.sessionId);
        this.getActionPlan();
      })
      .catch(() => {
        console.log('error creating action plan')
      })
  }

  getActionPlan = (): void => {
    this.props.firebase.getActionPlan(this.props.sessionId).then((actionPlanData: Array<{id: string, goal: string, benefit: string}>) => {
      console.log('apf line 133', actionPlanData);
      if (actionPlanData[0]) {
        this.setState({
          actionPlanExists: true,
          actionPlanId: actionPlanData[0].id,
          goal: actionPlanData[0].goal,
          benefit: actionPlanData[0].benefit
        });
        const newActionStepsArray: Array<{step: string, materials: string, person: string, timeline: string}> = [];
        this.props.firebase.getActionSteps(actionPlanData[0].id).then((actionStepsData: Array<{step: string, materials: string, person: string, timeline: string}>) => {
          actionStepsData.forEach((value, index) => {
            newActionStepsArray[index] = {step: value.step, materials: value.materials, person: value.person, timeline: value.timeline};
          })
        }).then(() => {
          this.setState({
            actionStepsArray: newActionStepsArray
          }, () => {console.log('action steps array: ', this.state.actionStepsArray)});
        })
        .catch(() => {
          console.log('error retrieving action steps');
        });
      } else {
        this.setState({
          actionPlanExists: false,
          actionPlanId: '',
          goal: '',
          benefit: '',
          actionStepsArray: [{step: '', materials: '', person: '', timeline: ''}]
        }, () => {console.log('action plan exists? ', this.state.actionPlanExists)})
      }
     })
  }

  /**
   * saves action plan by updating Cloud Firestore records
   */
  handleSave = (): void => {
    console.log('was handle save even executed');
    this.props.firebase.saveActionPlan(this.state.actionPlanId, this.state.goal, this.state.benefit).then(() => {
      console.log("saving action plan worked");
    })
    .catch(() => {
      console.log("error with saving action plan");
    })
    this.state.actionStepsArray.forEach((value, index) => {
      this.props.firebase.saveActionStep(this.state.actionPlanId, index.toString(), value.step, value.materials, value.person, value.timeline)
        .then(() => {
          console.log("action step ", index, " saved");
        })
        .catch(() => {
          console.log("error in saving action step ", index);
        })
    })
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.getActionPlan();
    console.log('comp did mount executed');
  }

  static propTypes = {
    teacherFirstName: PropTypes.string.isRequired,
    teacherLastName: PropTypes.string.isRequired,
    firebase: PropTypes.exact({
      createActionPlan: PropTypes.func,
      getActionPlan: PropTypes.func,
      getActionSteps: PropTypes.func,
      saveActionPlan: PropTypes.func,
      saveActionStep: PropTypes.func,
      createActionStep: PropTypes.func,
    }).isRequired,
    teacherId: PropTypes.string.isRequired,
    sessionId: PropTypes.string.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div>
        {/* {this.props.actionPlanExists ?  */}
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-around"
                style={{width: '100%'}}
              >
                <Grid item xs={3}>
                  <Typography style={{fontFamily: "Arimo"}}>
                    ACTION PLAN {this.props.sessionId}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button disabled={!this.props.handleEditActionPlan} onClick={this.props.handleEditActionPlan}>
                    edit
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={this.handleSave}>
                    save
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  save & close
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
              >
                <Grid item>
                  {this.props.teacherFirstName + " " + this.props.teacherLastName}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{width: "100%", paddingBottom: '0.1em'}}>
              <TextField
                id="goal"
                name="goal"
                type="text"
                label="Goal"
                value={this.state.goal}
                onChange={this.handleChange('goal')}
                margin="normal"
                variant="standard"
                fullWidth
                disabled={this.props.disabled}
                multiline
                rowsMax={4}
                rows={4}
                InputProps={{disableUnderline: true, style: {fontFamily: "Arimo", marginLeft: '0.5em', marginRight: '0.5em'}}}
                InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                style={{border: '2px solid #094492', borderRadius: '0.5em', overflowY: 'scroll', overflowX: 'hidden', minHeight: '20%'}}
              />
            </Grid>
            <Grid item xs={12} style={{width: "100%", paddingBottom: '0.1em'}}>
              <TextField
                id="benefit"
                name="benefit"
                type="text"
                label="Benefit for Students"
                value={this.state.benefit}
                onChange={this.handleChange('benefit')}
                margin="normal"
                variant="standard"
                fullWidth
                disabled={this.props.disabled}
                multiline
                rowsMax={3}
                rows={3}
                InputProps={{disableUnderline: true, style: {fontFamily: "Arimo", width: '98%', height: '25%', maxHeight:'25%', marginLeft: '0.5em'}}}
                InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                style={{border: '2px solid #e99c2e', borderRadius: '0.5em', overflowY: 'scroll', overflowX: 'hidden', minHeight: '25%'}}
              />
            </Grid>
            {this.state.actionStepsArray.map((value, index) => {
              return (
                <Grid item xs={12} style={{width: '100%'}} key={index}>
                  <Grid container direction="row" justify="space-between"> 
                    <Grid item xs={5}>
                      <TextField
                        id={"actionSteps" + index.toString()}
                        name={"actionSteps" + index.toString()}
                        type="text"
                        label={index===0 ? "Action Steps" : null}
                        value={value.step}
                        onChange={this.handleChangeActionStep(index)}
                        margin="normal"
                        variant="standard"
                        fullWidth
                        disabled={this.props.disabled}
                        multiline
                        rowsMax={2}
                        rows={2}
                        InputProps={{disableUnderline: true, style: {fontFamily: "Arimo", width: '98%', height: '25%', maxHeight:'25%', marginLeft: '0.5em'}}}
                        InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                        style={{border: '2px solid #0988ec', borderRadius: '0.5em', overflowY: 'scroll', overflowX: 'hidden', minHeight: '25%'}}
                      />
                      </Grid>
                    <Grid item xs={2}>
                      <TextField
                        id={"materials" + index.toString()}
                        name={"materials" + index.toString()}
                        type="text"
                        label={index===0 ? "Materials" : null}
                        value={value.materials}
                        onChange={this.handleChangeMaterials(index)}
                        margin="normal"
                        variant="standard"
                        fullWidth
                        disabled={this.props.disabled}
                        multiline
                        rowsMax={2}
                        rows={2}
                        InputProps={{disableUnderline: true, style: {fontFamily: "Arimo", width: '98%', height: '25%', maxHeight:'25%', marginLeft: '0.5em'}}}
                        InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                        style={{border: '2px solid #009365', borderRadius: '0.5em', overflowY: 'scroll', overflowX: 'hidden', minHeight: '25%'}}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        id={"person" + index.toString()}
                        name={"person" + index.toString()}
                        type="text"
                        label={index===0 ? "Person Responsible" : null}
                        value={value.person}
                        onChange={this.handleChangePerson(index)}
                        margin="normal"
                        variant="standard"
                        fullWidth
                        disabled={this.props.disabled}
                        multiline
                        rowsMax={2}
                        rows={2}
                        InputProps={{disableUnderline: true, style: {fontFamily: "Arimo", width: '98%', height: '25%', maxHeight:'25%', marginLeft: '0.5em'}}}
                        InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                        style={{border: '2px solid #ffd300', borderRadius: '0.5em', overflowY: 'scroll', overflowX: 'hidden', minHeight: '25%'}}
                      />
                    </Grid>
                    <Grid item xs={2}  >
                      <TextField
                        id={"timeline" + index.toString()}
                        name={"timeline" + index.toString()}
                        type="date"
                        label={index===0 ? "Timeline" : null}
                        value={value.timeline}
                        onChange={this.handleChangeTimeline(index)}
                        margin="normal"
                        variant="standard"
                        fullWidth
                        disabled={this.props.disabled}
                        multiline
                        rowsMax={2}
                        rows={2}
                        InputProps={{disableUnderline: true, style: {fontFamily: "Arimo", width: '98%', height: '25%', maxHeight:'25%', marginLeft: '0.5em'}}}
                        InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                        style={{border: '2px solid #6f39c4', borderRadius: '0.5em', overflowY: 'scroll', overflowX: 'hidden', minHeight: '25%'}}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
            <Button onClick={this.handleAddActionStep}>
              <AddCircleIcon />
            </Button>
          </Grid>
          {/* : (
            <Button onClick={this.handleCreate}>
              Create Action Plan
            </Button>
          ) */}
        
      </div>
    );
  }
}

export default ActionPlanForm;