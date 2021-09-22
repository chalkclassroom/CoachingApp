import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Types from '../../constants/Types';
import { Grid, TextField, Paper, MenuList, MenuItem, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import TransitionTimeIconImage from "../../assets/images/TransitionTimeIconImage.svg";
import EngagementIconImage from "../../assets/images/EngagementIconImage.svg";
import SequentialIconImage from "../../assets/images/SequentialIconImage.svg";
import ListeningIconImage from "../../assets/images/ListeningIconImage.svg";
import MathIconImage from "../../assets/images/MathIconImage.svg";
import InstructionIconImage from "../../assets/images/InstructionIconImage.svg";
import ClassroomClimateIconImage from "../../assets/images/ClassroomClimateIconImage.svg";
import LiteracyIconImage from "../../assets/images/LiteracyIconImage.svg";
import AssocCoopIconImage from "../../assets/images/AssocCoopIconImage.svg";
import moment from 'moment';

interface Props {
  id: string | undefined,
  date: Date | null,
  teacher: Types.Teacher | null,
  tool: Types.ToolNamesKey | null,
  type: string,
  setDate(date: Date | null): void,
  setTeacher(teacher: Types.Teacher): void,
  setTool(tool: Types.ToolNamesKey): void,
  setType(type: string): void,
  teacherList: Array<Types.Teacher>,
  closeModal(): void,
  createAppointment(
    teacherId: string,
    date: Date,
    tool: string,
    type: string
  ): void,
  saveAppointment(
    id: string,
    teacherId: string,
    date: Date,
    tool: string,
    type: string
  ): void,
  closeAppointmentModal(): void
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  listItemText: {
    fontFamily: 'Arimo',
    paddingLeft: '0.3em',
    maxHeight: '3em',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

/**
 * returns titles for steps
 * @return {Array<string>}
 */
function getSteps(): Array<string> {
  return ['Date', 'Teacher', 'Tool', 'Type'];
}

/**
 * New Event Stepper for My Teachers Calendar
 * @param {Props} props
 * @return {ReactElement}
 */
export default function NewEventStepper(props: Props): React.ReactElement {
  const classes = useStyles();
  const { id, date, teacher, tool, type, setDate, setTeacher, setTool, setType, teacherList, closeModal, createAppointment, saveAppointment, closeAppointmentModal } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [hours, setHours] = React.useState('00');
  const [minutes, setMinutes] = React.useState('00');
  const steps = getSteps();

  /* const isStepOptional = (step: number): boolean => {
    return step === 1;
  }; */

  const isStepSkipped = (step: number): boolean => {
    return skipped.has(step);
  };

  const handleNext = (): void => {
    if (activeStep === 0) {
      const dateWithTime = date ? new Date(date.getTime()) : new Date();
      dateWithTime.setHours(parseInt(hours));
      dateWithTime.setMinutes(parseInt(minutes));
      setDate(dateWithTime)
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleUpdate = (): void => {
    saveAppointment(id ? id : '', teacher ? teacher.id : '', date ? date : new Date(), tool ? tool : '', type);
    closeModal();
    closeAppointmentModal();
  }

  const handleFinish = (): void => {
    createAppointment(teacher ? teacher.id : '', date ? date : new Date(), tool ? tool : '', type);
    closeModal()
  }

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /* const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = (): void => {
    setActiveStep(0);
  }; */

  const getStepContent = (step: number): React.ReactElement => {
    switch (step) {
      case 0:
        return (
          <Grid container direction="row" justify="space-around" alignItems="center">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                label="Day"
                format="MM/dd/yy"
                margin="normal"
                id="date-picker-inline"
                autoOk={true} // closes date picker on selection
                value={date ? date : new Date()}
                onChange={(date: Date | null): void => {
                  setDate(date);
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              id="time"
              label="Time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 900, // 15 min
              }}
              value={moment(date).format('HH:mm')}
              onChange={(time): void => {
                time.persist();
                const splitTime = time.target.value.split(':');
                setHours(splitTime[0]);
                setMinutes(splitTime[1]);
                setDate(moment(date).set({h: splitTime[0], m: splitTime[1]}).toDate())
              }}
            />
          </Grid>
        );
      case 1:
        return (
          <Paper style={{width: '50%', maxHeight: '100%', overflowY: 'auto'}}>
            <MenuList>
              {teacherList.map((value, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={(): void => {
                      setTeacher(value)
                    }}
                    selected={teacher === value}
                  >
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", fontFamily: 'Arimo' }}>
                      {value.firstName + " " + value.lastName}
                    </div>
                  </MenuItem>
                )
              })}
            </MenuList>
          </Paper>
        );
      case 2:
        return (
          <Paper style={{maxHeight: '100%', overflowY: 'auto', overflowX: 'auto'}}>
            <Grid container direction="row" justify="center" alignItems="flex-start">
              <Grid item xs={4}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <List>
                    <ListItem button selected={tool === 'TT'} onClick={(): void => setTool('TT')}>
                      <ListItemIcon>
                        <img src={TransitionTimeIconImage} />
                      </ListItemIcon>
                      <ListItemText primary="Transition Time" classes={{primary: classes.listItemText}} />
                    </ListItem>
                    <ListItem button selected={tool === 'IN'} onClick={(): void => setTool('IN')}>
                      <ListItemIcon>
                        <img src={InstructionIconImage} />
                      </ListItemIcon>
                      <ListItemText primary="Level of Instruction" classes={{primary: classes.listItemText}} />
                    </ListItem>
                    <ListItem button selected={tool === 'SA'} onClick={(): void => setTool('SA')}>
                      <ListItemIcon>
                        <img src={SequentialIconImage} />
                      </ListItemIcon>
                      <ListItemText primary="Sequential Activities" classes={{primary: classes.listItemText}} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <List>
                    <ListItem button selected={tool === 'CC'} onClick={(): void => setTool('CC')}>
                      <ListItemIcon>
                        <img src={ClassroomClimateIconImage} />
                      </ListItemIcon>
                      <ListItemText primary="Classroom Climate" classes={{primary: classes.listItemText}} />
                    </ListItem>
                    <ListItem button selected={tool === 'SE'} onClick={(): void => setTool('SE')}>
                      <ListItemIcon>
                        <img src={EngagementIconImage} />
                      </ListItemIcon>
                      <ListItemText primary="Student Engagement" classes={{primary: classes.listItemText}} />
                    </ListItem>
                    <ListItem button selected={tool === 'LI'} onClick={(): void => setTool('LI')}>
                      <ListItemIcon>
                        <img src={LiteracyIconImage} />
                      </ListItemIcon>
                      <ListItemText primary="Literacy Instruction" classes={{primary: classes.listItemText}} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                  <List>
                    <ListItem button selected={tool === 'MI'} onClick={(): void => setTool('MI')}>
                      <ListItemIcon>
                        <img src={MathIconImage} />
                      </ListItemIcon>
                      <ListItemText primary="Math Instruction" classes={{primary: classes.listItemText}} />
                    </ListItem>
                    <ListItem button selected={tool === 'LC'} onClick={(): void => setTool('LC')}>
                      <ListItemIcon>
                        <img src={ListeningIconImage} />
                      </ListItemIcon>
                      <ListItemText primary="Listening to Children" classes={{primary: classes.listItemText}} />
                    </ListItem>
                    <ListItem button selected={tool === 'AC'} onClick={(): void => setTool('AC')}>
                      <ListItemIcon>
                        <img src={AssocCoopIconImage} />
                      </ListItemIcon>
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                      <ListItemText primary="Associative Cooperative Interactions" classes={{primary: classes.listItemText}} />
                      </div>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        );
      default:
        return (
          <Paper style={{width: '50%', maxHeight: '100%'}}>
            <MenuList>
              <MenuItem
                onClick={(): void => {
                  setType('Observation')
                }}
                selected={type === 'Observation'}
              >
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", fontFamily: 'Arimo' }}>
                  Observation
                </div>
              </MenuItem>
              <MenuItem
                onClick={(): void => {
                  setType('Action Plan')
                }}
                selected={type === 'Action Plan'}
              >
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", fontFamily: 'Arimo' }}>
                  Action Plan
                </div>
              </MenuItem>
              <MenuItem
                onClick={(): void => {
                  setType('Conference Plan')
                }}
                selected={type === 'Conference Plan'}
              >
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", fontFamily: 'Arimo' }}>
                  Conference Plan
                </div>
              </MenuItem>
            </MenuList>
          </Paper>
        );
    }
  }

  return (
    <Grid container direction="column" justify="space-between" alignItems="stretch" className={classes.root}>
      <Grid item>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step
                key={index}
              >
                <StepLabel>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
      <Grid item style={{overflowY: 'auto', height:'60%', display: 'flex', flexDirection: 'column', flex: 3}}>
        <Grid container direction="row" justify="center" alignItems="flex-start" style={{height: '70%'}}>
          {getStepContent(activeStep)}
        </Grid>
        <Grid container direction="row" justify="space-between" alignItems="center" style={{paddingTop: '1em'}}>
          <Button variant="contained" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={
              (activeStep === 0 && date === null)
              || (activeStep === 1 && teacher === null)
              || (activeStep === 2 && tool === null)
              || (activeStep === 3 && type === '')
            }
            onClick={activeStep === steps.length - 1 ? (id ? handleUpdate : handleFinish) : handleNext}
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? (id ? 'Update' : 'Finish') : 'Next'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

NewEventStepper.propTypes = {
  date: PropTypes.object,
  teacher: PropTypes.object,
  tool: PropTypes.string,
  type: PropTypes.string,
  setDate: PropTypes.func,
  setTeacher: PropTypes.func,
  setTool: PropTypes.func,
  setType: PropTypes.func,
  teacherList: PropTypes.array,
  closeModal: PropTypes.func,
  createAppointment: PropTypes.func
}
