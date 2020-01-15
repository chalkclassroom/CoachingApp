import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FirebaseContext from "./Firebase/FirebaseContext.js";

interface Props {
  // location: {state: {teacher: {firstName: string}}},
  teacherFirstName: string,
  teacherLastName: string,
  firebase: {
    createActionPlan(teacherId: string): Promise<void>,
    getActionPlan(teacherId: string): any
  },
  // firebase: object,
  teacherId: string
}

interface State {
  goal: string,
  benefit: string,
  actionSteps: string,
  actionStepsArray: Array<{text: string, materials: string, person: string, timeline: string}>,
  editMode: boolean,
  actionPlanId: string
}

class ActionPlanForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      goal: '',
      benefit: '',
      actionSteps: '',
      actionStepsArray: [{text: '', materials: '', person: '', timeline: ''}],
      editMode: false,
      actionPlanId: ''
    }
  }

  handleAddActionStep = () => {
    this.setState({
      actionStepsArray: [...this.state.actionStepsArray, {text: '', materials: '', person: '', timeline: ''}]
    })
  }

  /**
   * responds to change in user-entered text
   * @param {string} name
   * @param {event} event
   * @return {void}
   */
  handleChange = (name: string) => event => {
    this.setState({
      [name]: event.target.value,
    });
    // this.validateState(name, event.target.value);
  };

  handleChangeActionStep = (number: number) => event => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].text = event.target.value;
    this.setState({
      actionStepsArray: newArray
    });
    console.log(this.state.actionStepsArray[0].text);
  }

  handleChangeMaterials = (number: number) => event => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].materials = event.target.value;
    this.setState({
      actionStepsArray: newArray
    });
    console.log(this.state.actionStepsArray[0].materials);
  }

  handleChangePerson = (number: number) => event => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].person = event.target.value;
    this.setState({
      actionStepsArray: newArray
    });
    console.log(this.state.actionStepsArray[0].person);
  }

  handleChangeTimeline = (number: number) => event => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].timeline = event.target.value;
    this.setState({
      actionStepsArray: newArray
    });
    console.log(this.state.actionStepsArray[0].timeline);
  }

  handleCreate = () => {
    this.props.firebase.createActionPlan(this.props.teacherId)
      .then(() => {
        this.setState({
          editMode: true
        });
        this.getActionPlan();
      })
      .catch(() => {
        console.log('error creating action plan')
      })
  }

  getActionPlan = () => {
    this.props.firebase.getActionPlan(this.props.teacherId).then((actionPlanData: Array<{id: string}>) => {
      console.log('apf line 133', actionPlanData);
      this.setState({
        actionPlanId: actionPlanData[0].id
      }, () => console.log(this.state.actionPlanId))
     })
  }

  componentDidMount = () => {
    this.getActionPlan();
  }

  render() {
    return (
      <div>
        {this.state.actionPlanId ? 
          (<Grid
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
                    ACTION PLAN
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  edit
                </Grid>
                <Grid item xs={2}>
                  <Button>
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
                        value={value.text}
                        onChange={this.handleChangeActionStep(index)}
                        margin="normal"
                        variant="standard"
                        fullWidth
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
                        label={index===0 ? "Materials/Resources" : null}
                        value={value.materials}
                        onChange={this.handleChangeMaterials(index)}
                        margin="normal"
                        variant="standard"
                        fullWidth
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
          </Grid>)
          : (
            <Button onClick={this.handleCreate}>
              Create Action Plan
            </Button>
          )
        }
      </div>
    );
  }
}

export default ActionPlanForm;