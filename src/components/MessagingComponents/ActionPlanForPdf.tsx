import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import moment from 'moment';
import * as Types from '../../constants/Types';

const styles: object = {
  textField: {
    borderRadius: '0.5em',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  }
}

interface Props {
  classes: Style,
  tool: string,
  apGoal: string,
  goalTimeline: Date | undefined,
  benefit: string,
  date: Date | undefined,
  actionSteps: Array<{
    step: string,
    materials: string,
    person: string,
    timeline: Date
  }> | undefined,
  teacher: Types.Teacher
}

interface Style {
  textField: string,
  backButton: string
}

/**
 * Form for user to complete action plan
 * @class ActionPlanForPdf
 */
class ActionPlanForPdf extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  /**
   * @param {Object} date
   * @return {Date}
   */
  changeDateType = (date: {seconds: number, nanoseconds: number}): Date => {
    const newDate = new Date(0);
    newDate.setUTCSeconds(date.seconds);
    return newDate
  }

  static propTypes = {
    teacher: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div style={{width: '100%'}} id='ap'>
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
              style={{width: '100%', paddingTop: '0.5em', paddingBottom: '1em'}}
            >
              <Grid item xs={2} />
              <Grid item xs={8}>
                <Grid container direction="row" justify="center" alignItems="center" style={{width: '100%'}}>
                  <Typography variant="h4" style={{fontFamily: "Arimo"}}>
                    ACTION PLAN
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={2} />
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
                {this.props.teacher.firstName + " " + this.props.teacher.lastName}
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="row" justify="center">
                  {/* CHANGE THIS */}
                  Clare Speer
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="row" justify="flex-end">
                  {moment(this.props.date).format('MM/DD/YYYY')}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{width: "100%", paddingTop: '0.4em', paddingBottom: '0.8em'}}>
            <Grid container direction="row" justify="space-between" alignItems="stretch" style={{height: '100%'}}>
              <Grid item style={{width: '77%', border: '2px solid #094492', borderRadius: '0.5em'}}>
                <Grid container direction="column" style={{width: '100%'}}>
                  <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                      <Grid item xs={11}>
                        <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.3em', marginTop: '0.3em', fontWeight: 'bold'}}>
                          Teacher Goal
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="goal"
                      name="goal"
                      type="text"
                      value={this.props.apGoal}
                      margin="normal"
                      variant="standard"
                      fullWidth
                      multiline
                      rowsMax={3}
                      rows={3}
                      className={classes.textField}
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                        style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                      }}
                      style={{marginTop: 0, paddingTop: '0em', marginBottom: 0}}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{width: '22%', border: '2px solid #4fd9b3', borderRadius: '0.5em'}}>
                <Grid container direction="column" style={{width: '100%'}}>
                  <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                      <Grid item xs={11}>
                        <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.3em', marginTop: '0.3em', fontWeight: 'bold'}}>
                          Achieve by:
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{paddingLeft: '0.5em'}}>
                    <TextField
                      id="goalTimeline"
                      name="goalTimeline"
                      type="text"
                      value={moment(this.props.goalTimeline).format('MM/DD/YYYY')}
                      margin="normal"
                      variant="standard"
                      fullWidth
                      multiline
                      rowsMax={3}
                      rows={3}
                      className={classes.textField}
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                        style: {fontFamily: "Arimo", width: '98%'}
                      }}
                      style={{marginTop: 0, paddingTop: '0em', marginBottom: 0}}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{width: "100%", paddingBottom: '0.8em'}}>
            <Grid container direction="row" justify="space-between" style={{height: '100%'}}>
              <Grid item xs={12} style={{border: '2px solid #e99c2e', borderRadius: '0.5em', height: '100%'}}>
                <Grid container direction="column" style={{width: '100%'}}>
                  <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                      <Grid item xs={11}>
                        <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                          Benefit for Students
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="benefit"
                      name="benefit"
                      type="text"
                      value={this.props.benefit}
                      margin="normal"
                      variant="standard"
                      fullWidth
                      multiline
                      rowsMax={2}
                      rows={2}
                      className={classes.textField}
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                        style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                      }}
                      style={{marginTop: 0, paddingTop: '0em', paddingBottom: '0.5em', marginBottom: 0}}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{width: '100%', height: '38vh'}}>
            <Grid container direction="row" justify="space-between" style={{height: '100%'}}>
              <Grid item style={{width: '38%', border: '2px solid #0988ec', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                <Grid container direction="column" justify="center" style={{width: '100%', border: '1px solid orange'}}>
                  <Grid item style={{border: '1px solid blue'}}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                      <Grid item xs={11} style={{border: '1px solid yellow'}}>
                        <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                          Action Steps
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{border: '1px solid red'}}>
                    {this.props.actionSteps ? this.props.actionSteps.map((value, index) => {
                      return(
                        <TextField
                          key={index}
                          id={"actionSteps" + index.toString()}
                          name={"actionSteps" + index.toString()}
                          type="text"
                          value={(index + 1) + '.  ' + value.step}
                          margin="normal"
                          variant="standard"
                          fullWidth
                          multiline
                          rowsMax={4}
                          rows={4}
                          className={classes.textField}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                            style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                          }}
                          style={{marginTop: '-0.25em', paddingBottom: '0.5em', marginBottom: 0 }}
                        />
                      );
                    }) : null}
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{width: '19%', border: '2px solid #009365', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                <Grid container direction="column" style={{width: '100%'}}>
                  <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                      <Grid item xs={11}>
                        <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                          Materials
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {this.props.actionSteps ? this.props.actionSteps.map((value, index) => {
                      return(
                        <TextField
                          key={index}
                          id={"materials" + index.toString()}
                          name={"materials" + index.toString()}
                          type="text"
                          value={(index + 1) + '.  ' + value.materials}
                          margin="normal"
                          variant="standard"
                          fullWidth
                          multiline
                          rowsMax={4}
                          rows={4}
                          className={classes.textField}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                            style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                          }}
                          style={{marginTop: '-0.25em', paddingBottom: '0.5em', marginBottom: 0}}
                        />
                      );
                    }) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{width: '19%', border: '2px solid #ffd300', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                <Grid container direction="column" style={{width: '100%'}}>
                  <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                      <Grid item xs={11}>
                        <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                          Persons
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {this.props.actionSteps ? this.props.actionSteps.map((value, index) => {
                      return(
                        <TextField
                          key={index}
                          id={"person" + index.toString()}
                          name={"person" + index.toString()}
                          type="text"
                          value={(index + 1) + '.  ' + value.person}
                          margin="normal"
                          variant="standard"
                          fullWidth
                          multiline
                          rowsMax={4}
                          rows={4}
                          className={classes.textField}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                            style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                          }}
                          style={{marginTop: '-0.25em', paddingBottom: '0.5em', marginBottom: 0}}
                        />
                      );
                    }) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{width: '21%', border: '2px solid #6f39c4', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                <Grid container direction="column" style={{width: '100%'}}>
                  <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                      <Grid item xs={11}>
                        <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                          Timeline
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {this.props.actionSteps ? this.props.actionSteps.map((value, index) => {
                      return(
                        <TextField
                          key={index}
                          id={"timeline" + index.toString()}
                          name={"timeline" + index.toString()}
                          type="text"
                          value={(index + 1) + '.  ' + moment(value.timeline).format('MM/DD/YYYY')}
                          margin="normal"
                          variant="standard"
                          fullWidth
                          multiline
                          rowsMax={4}
                          rows={4}
                          className={classes.textField}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                            style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                          }}
                          style={{marginTop: '-0.25em', paddingBottom: '0.5em', marginBottom: 0}}
                        />
                      );
                    }) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ActionPlanForPdf);