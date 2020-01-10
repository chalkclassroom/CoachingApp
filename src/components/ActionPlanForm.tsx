import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';

interface Props {
  location: {state: {teacher: {firstName: string}}},
  teacherFirstName: string,
  teacherLastName: string
}

interface State {
  goal: string,
  benefit: string,
  goalError: string,
  benefitError: string,
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
      errors: false
    }
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
    this.validateState(name, event.target.value);
  };

  /**
   * validates user-entered text
   * @param {string} name
   * @param {value} value
   */
  validateState = (name: string, value: string) => {
    console.log('name: ', name, ' value: ', value)
    switch (name) {
      case 'goal':
        if (value.length < 1) {
          this.setState({
            'goalError': 'Cannot be empty or contain numbers',
            'errors': true,
          });
        } else {
          this.setState({
            'goalError': '',
            'errors': false
          });
        }
        break;
      case 'benefit':
        if (value.length < 1) {
          this.setState({
            'benefitError': 'Cannot be empty or contain numbers',
            'errors': true,
          });
        } else {
          this.setState({
            'benefitError': '',
            'errors': false,
          });
        }
        break;
      default:
        this.validateState('goal', this.state.goal);
        this.validateState('benefit', this.state.benefit);
        break;
    }
  };

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
        <Grid item xs={11} >
          <TextField
            id="goal"
            name="goal"
            type="goal"
            label="Goal"
            value={this.state.goal}
            onChange={this.handleChange('goal')}
            margin="normal"
            variant="standard"
            fullWidth
            multiline
            InputProps={{disableUnderline: true, style: {fontFamily: "Arimo", marginLeft: '0.5em', marginRight: '0.5em'}}}
            InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
            style={{border: '2px solid #094492', borderRadius: '0.5em', paddingBottom: '2em', overflow: 'auto'}}
          />
        </Grid>
        <Grid item xs={11} >
          <TextField
            id="benefit"
            name="benefit"
            type="benefit"
            label="Benefit for Students"
            value={this.state.benefit}
            onChange={this.handleChange('benefit')}
            margin="normal"
            variant="standard"
            fullWidth
            multiline
            InputProps={{disableUnderline: true, style: {fontFamily: "Arimo", width: '98%', height: '25%', maxHeight:'25%', marginLeft: '0.5em'}}}
            InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
            style={{border: '2px solid #e99c2e', borderRadius: '0.5em', paddingBottom: '2em', overflow: 'auto'}}
          />
        </Grid>
        <Grid item>
          <Table>

          </Table>
        </Grid>
      </Grid>
    );
  }
}

export default ActionPlanForm;