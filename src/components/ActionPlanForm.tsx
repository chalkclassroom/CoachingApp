import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditImage from '../assets/images/EditImage.svg';
import SaveImage from '../assets/images/SaveImage.svg';
import CloseImage from '../assets/images/CloseImage.svg';

const styles: object = {
  textField: {
    borderRadius: '0.5em',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}

interface Props {
  classes: Style,
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
  readOnly: boolean,
  handleEditActionPlan(): void,
  handleClose?(): void,
  actionPlanExists: boolean,
  editMode: boolean,
}

interface State {
  goal: string,
  benefit: string,
  date: string,
  actionSteps: string,
  actionStepsArray: Array<{step: string, materials: string, person: string, timeline: string}>,
  editMode: boolean,
  actionPlanExists: boolean,
  actionPlanId: string,
  createMode: boolean
}

interface Style {
  textField: string
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
      date: '',
      actionSteps: '',
      actionStepsArray: [{step: '', materials: '', person: '', timeline: ''}],
      editMode: false,
      actionPlanExists: this.props.actionPlanExists,
      actionPlanId: '',
      createMode: false
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
  }

  handleCreate = (): void => {
    this.props.firebase.createActionPlan(this.props.teacherId, this.props.sessionId)
      .then(() => {
        this.setState({
          editMode: true,
          actionPlanExists: true,
          createMode: true
        });
        this.getActionPlan();
      })
      .catch(() => {
        console.log('error creating action plan')
      })
  }

  getActionPlan = (): void => {
    this.props.firebase.getActionPlan(this.props.sessionId)
    .then((actionPlanData: Array<{id: string, goal: string, benefit: string, date: string}>) => {
      if (actionPlanData[0]) {
        this.setState({
          actionPlanExists: true,
          actionPlanId: actionPlanData[0].id,
          goal: actionPlanData[0].goal,
          benefit: actionPlanData[0].benefit,
          date: actionPlanData[0].date
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
   * @return {void}
   */
  handleSave = (): void => {
    this.props.firebase.saveActionPlan(this.state.actionPlanId, this.state.goal, this.state.benefit).then(() => {
      console.log("action plan saved");
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

  /**
   * saves action plan, action steps, and closes the action plan modal
   * @return {void}
   */
  handleSaveAndClose = (): void => {
    this.handleSave();
    this.props.handleClose();
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.getActionPlan();
  }

  /** 
   * lifecycle method invoked after component updates 
   * @param {Props} prevProps
   * @param {State} prevState
   */
  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (this.props.sessionId !== prevProps.sessionId) {
      this.getActionPlan();
      this.setState({
        createMode: false
      })
    }
    if (this.props.editMode != prevProps.editMode) {
      this.getActionPlan();
    }
    if (this.state.actionPlanExists != prevState.actionPlanExists) {
      this.getActionPlan();
    }
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
    sessionId: PropTypes.string.isRequired,
    readOnly: PropTypes.bool.isRequired,
    handleEditActionPlan: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
    actionPlanExists: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        {this.props.actionPlanExists || this.state.createMode ? 
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{width: '100%'}}
          >
            <Grid item style={{width: '100%'}}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{width: '100%'}}
              >
                <Grid item xs={9}>
                  <Typography variant="h4" style={{fontFamily: "Arimo"}}>
                    ACTION PLAN
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button disabled={!this.props.handleEditActionPlan} onClick={this.props.handleEditActionPlan}>
                    <img alt="Edit" src={EditImage} style={{width: '100%'}}/>
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={this.handleSave}>
                    <img alt="Save" src={SaveImage} style={{width: '100%'}}/>
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={this.handleSaveAndClose}>
                    <img alt="Close" src={CloseImage} style={{width: '95%'}}/>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{width: '100%'}}>
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{fontFamily: 'Arimo'}}
              >
                <Grid item xs={4}>
                  {this.props.teacherFirstName + " " + this.props.teacherLastName}
                </Grid>
                <Grid item xs={4}>
                  {/* coach name */}
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row" justify="flex-end">
                    {this.state.date}
                  </Grid>
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
                multiline
                rowsMax={4}
                rows={4}
                className={classes.textField}
                InputProps={{
                  disableUnderline: true,
                  readOnly: this.props.readOnly,
                  style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                }}
                InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                style={{border: '2px solid #094492'}}
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
                multiline
                rowsMax={3}
                rows={3}
                className={classes.textField}
                InputProps={{
                  disableUnderline: true,
                  readOnly: this.props.readOnly,
                  style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                }}
                InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                style={{border: '2px solid #e99c2e'}}
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
                        multiline
                        rowsMax={2}
                        rows={2}
                        className={classes.textField}
                        InputProps={{
                          disableUnderline: true,
                          readOnly: this.props.readOnly,
                          style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                        }}
                        InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                        style={{border: '2px solid #0988ec'}}
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
                        multiline
                        rowsMax={2}
                        rows={2}
                        className={classes.textField}
                        InputProps={{
                          disableUnderline: true,
                          readOnly: this.props.readOnly,
                          style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                        }}
                        InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                        style={{border: '2px solid #009365'}}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        id={"person" + index.toString()}
                        name={"person" + index.toString()}
                        type="text"
                        label={index===0 ? "Person" : null}
                        value={value.person}
                        onChange={this.handleChangePerson(index)}
                        margin="normal"
                        variant="standard"
                        fullWidth
                        multiline
                        rowsMax={2}
                        rows={2}
                        className={classes.textField}
                        InputProps={{
                          disableUnderline: true,
                          readOnly: this.props.readOnly,
                          style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                        }}
                        InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                        style={{border: '2px solid #ffd300'}}
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
                        multiline
                        rowsMax={2}
                        rows={2}
                        className={classes.textField}
                        InputProps={{
                          disableUnderline: true,
                          readOnly: this.props.readOnly,
                          style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                        }}
                        InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                        style={{border: '2px solid #6f39c4'}}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
            <Button disabled={this.props.readOnly} onClick={this.handleAddActionStep}>
              <AddCircleIcon />
            </Button>
          </Grid>   
        : 
        <Button onClick={this.handleCreate}>
          Create Action Plan
        </Button>  
      }     
      </div>
    );
  }
}

export default withStyles(styles)(ActionPlanForm);