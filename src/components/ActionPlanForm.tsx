import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import AddCircleIcon from "@material-ui/icons/AddCircle";

interface Props {
  location: {state: {teacher: {firstName: string}}},
  teacherFirstName: string,
  teacherLastName: string
}

interface State {
  goal: string,
  benefit: string,
  actionSteps: string,
  goalError: string,
  benefitError: string,
  actionStepsError: string,
  actionStepsArray: Array<{number: number, text: string, materials: string, person: string, timeline: string}>,
  errors: boolean
}

class ActionPlanForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      goal: '',
      goalError: '',
      benefit: '',
      benefitError: '',
      actionSteps: '',
      actionStepsError: '',
      actionStepsArray: [{number: 1, text: '', materials: '', person: '', timeline: ''}],
      errors: false
    }
  }

  handleAddActionStep = () => {
    this.setState({
      actionStepsArray: [...this.state.actionStepsArray, {number: 2, text: '', materials: '', person: '', timeline: ''}]
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

  render() {
    return (
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
          >
            <Grid item>
              <Typography style={{fontFamily: "Arimo"}}>
                ACTION PLAN
              </Typography>
            </Grid>
            <Grid item>
              edit
            </Grid>
            <Grid item>
              delete
            </Grid>
            <Grid item>
              close
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
          >
            <Grid item>
{/*               {this.props.location.state.teacher.firstName} */}
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
        <Grid item xs={12} style={{width: '100%'}}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} style={{width: '100%'}}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{width: '40%', padding: '0.3em'}}>
                      <TextField
                        id="actionSteps"
                        name="actionSteps"
                        type="text"
                        label="Action Steps"
                        value={this.state.actionStepsArray[0].text}
                        onChange={this.handleChangeActionStep(0)}
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
                    </TableCell>
                    <TableCell style={{width: '20%', padding: '0.3em'}}>
                      <TextField
                        id="materials"
                        name="materials"
                        type="text"
                        label="Materials/Resources"
                        value={this.state.actionStepsArray[0].materials}
                        onChange={this.handleChangeMaterials(0)}
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
                    </TableCell>
                    <TableCell style={{width: '20%', padding: '0.3em'}}>
                      <TextField
                        id="person"
                        name="person"
                        type="text"
                        label="Person Responsible"
                        value={this.state.actionStepsArray[0].person}
                        onChange={this.handleChangePerson(0)}
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
                    </TableCell>
                    <TableCell style={{width: '20%', padding: '0.3em'}}>
                      <TextField
                        id="timeline"
                        name="timeline"
                        type="date"
                        label="Timeline"
                        value={this.state.actionStepsArray[0].timeline}
                        onChange={this.handleChangeTimeline(0)}
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
                    </TableCell>
                  </TableRow>
                  { 
                      this.state.actionStepsArray.length > 1 ? 
                        (
                          this.state.actionStepsArray.slice(1,).map((value, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell  style={{width: '40%', padding: '0.3em'}}>
                                  <TextField
                                    id={"actionSteps" + index.toString()}
                                    name={"actionSteps" + index.toString()}
                                    type="text"
                                    value={value.text}
                                    onChange={this.handleChangeActionStep(index+1)}
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
                                </TableCell>
                                <TableCell  style={{width: '20%', padding: '0.3em'}}>
                                  <TextField
                                    id={"materials" + index.toString()}
                                    name={"materials" + index.toString()}
                                    type="text"
                                    value={value.materials}
                                    onChange={this.handleChangeMaterials(index+1)}
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
                                </TableCell>
                                <TableCell style={{width: '20%', padding: '0.3em'}}>
                                  <TextField
                                    id={"person" + index.toString()}
                                    name={"person" + index.toString()}
                                    type="text"
                                    value={value.person}
                                    onChange={this.handleChangePerson(index+1)}
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
                                </TableCell>
                                <TableCell  style={{width: '20%', padding: '0.3em'}}>
                                  <TextField
                                    id={"timeline" + index.toString()}
                                    name={"timeline" + index.toString()}
                                    type="date"
                                    value={value.timeline}
                                    onChange={this.handleChangeTimeline(index+1)}
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
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )
                      : null
                    }


                        <Button onClick={this.handleAddActionStep}>
                          <AddCircleIcon />
                        </Button>
                      

                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default ActionPlanForm;