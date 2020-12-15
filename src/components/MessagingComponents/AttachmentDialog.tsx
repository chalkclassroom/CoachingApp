import * as React from 'react';
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ResultsIcon from "@material-ui/icons/PieChart";
import ActionPlansIcon from "@material-ui/icons/CastForEducation";
import {
  Typography,
  IconButton,
  Grid,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import ActionPlanList from '../ActionPlanList';
import ActionPlanForPdf from './ActionPlanForPdf';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as Types from '../../constants/Types';
import { connect } from 'react-redux';

interface AttachmentDialogProps {
  recipientId: string;
  open: boolean;
  handleAdd: (value: string) => void;
  handleDelete: (value: string) => void;
  actionPlans: Array<{id: string, date: {seconds: number, nanoseconds: number}, practice: string, achieveBy: firebase.firestore.Timestamp}>;
  attachmentList: Array<{id: string, date: {seconds: number, nanoseconds: number}, practice: string, achieveBy: firebase.firestore.Timestamp}>;
  handleClose: () => void;
  recipientName: string;
  firebase: any;
  teacherList: Array<Types.Teacher>;
}  

const AttachmentDialog: React.FC<AttachmentDialogProps> = (props: AttachmentDialogProps) => {
  const [view, setView] = useState('options');
  const [ap, setAP] = useState('');
  const [teacher, setTeacher] = useState('');
  const [teacherObject, setTeacherObject] = useState<Types.Teacher>();
  const [tool, setTool] = useState('');
  const [apGoal, setApGoal] = useState('');
  const [goalTimeline, setGoalTimeline] = useState<Date>();
  const [benefit, setBenefit] = useState('');
  const [date, setDate] = useState<Date>();
  const [actionSteps, setActionSteps] = useState<Array<{
    step: string,
    materials: string,
    person: string,
    timeline: Date
  }>>();

  /**
   * @param {Object} date
   * @return {Date}
   */
  const changeDateType = (date: {seconds: number, nanoseconds: number}): Date => {
    const newDate = new Date(0);
    newDate.setUTCSeconds(date.seconds);
    return newDate
  }

  /**
   * @param {string} actionPlanId
   * @param {string} teacherId
   */
  const handleChooseActionPlan = (actionPlanId: string, teacherId: string): void => {
    setAP(actionPlanId);
    setTeacher(teacherId);
    const teacherData: Types.Teacher[] = props.teacherList.filter(obj => {
      return obj.id === teacherId
    });
    setTeacherObject(teacherData[0]);
    console.log('teacherData', teacherData, typeof teacherData);
    props.firebase.getAPInfo(actionPlanId).then((actionPlanData: {
      sessionId: string,
      goal: string,
      goalTimeline: firebase.firestore.Timestamp,
      benefit: string,
      dateModified: {seconds: number, nanoseconds: number},
      dateCreated: {seconds: number, nanoseconds: number},
      coach: string,
      teacher: string,
      tool: string
    }) => {
      const newDate = changeDateType(actionPlanData.dateModified);
      setTool(actionPlanData.tool);
      setApGoal(actionPlanData.goal);
      if (actionPlanData.goalTimeline && (typeof actionPlanData.goalTimeline !== 'string')) {
        setGoalTimeline(actionPlanData.goalTimeline.toDate());
      } else {
        setGoalTimeline(new Date());
      }
      setBenefit(actionPlanData.benefit);
      setDate(newDate);
      const newActionStepsArray: Array<{
        step: string,
        materials: string,
        person: string,
        timeline: Date
      }> = [];
      props.firebase.getActionSteps(actionPlanId).then((actionStepsData: Array<{
        step: string,
        materials: string,
        person: string,
        timeline: firebase.firestore.Timestamp
      }>) => {
        actionStepsData.forEach((value, index) => {
          newActionStepsArray[index] = {
            step: value.step,
            materials: value.materials,
            person: value.person,
            timeline: (value.timeline && (typeof value.timeline !== 'string')) ?
              value.timeline.toDate() :
              new Date(),
          };
        })
      }).then(() => {
        setActionSteps(newActionStepsArray);
      }).then(() => {
        setView('pdfPreview');
      })
      .catch(() => {
        console.log('error retrieving action steps');
      });
    })
    console.log('handled choose action plan');
  };

  const printDocument = (): void => {
    console.log('teacher selected', teacherObject);
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 15, 40, 180, 180);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='md'
      fullWidth={true}
      open={props.open}
    >
      <div style={{minHeight: '90vh', maxHeight: '90vh'}}>
        <DialogContent>
          <Grid container direction="column" justify="center" alignItems="stretch">
            <Grid item>
              <Grid container direction="row" justify={view === 'options' ? "flex-end" : "space-between"} alignItems="center">
                {view !== 'options' ? (
                  <Grid item xs={3}>
                    <IconButton
                      onClick={(): void => {
                        if (view === 'pdfPreview') {
                          setView('actionPlans')
                        } else {
                          setView('options')
                        }
                      }}
                      style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                  </Grid>
                ) : (null)}
                <Grid item>
                  <IconButton onClick={props.handleClose} style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="center" alignItems="center">
                <div style={{width: '100%'}}>
                  {view === 'options' ? (
                    <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingTop: '3em'}}>
                      <Grid item xs={5}>
                        <Card onClick={(): void => { setView('actionPlans'); }}>
                          <CardContent>
                            <Grid
                              container
                              alignItems="center"
                              direction="column"
                              justify="flex-start"
                            >
                              <Grid item>
                                <ActionPlansIcon style={{ fill: "#e55529", width: '12vw', height: '12vh' }} />
                              </Grid>
                              <Grid item>
                                <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                                  Action Plans
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={5}>
                        <Card onClick={(): void => { setView('results'); }}>
                          <CardContent>
                            <Grid
                              container
                              alignItems="center"
                              direction="column"
                              justify="flex-start"
                            >
                              <Grid item>
                                <ResultsIcon style={{ fill: "#4fd9b3", width: '12vw', height: '12vh' }} />
                              </Grid>
                              <Grid item>
                                <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                                  Results
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  ) : view === 'actionPlans' ? (
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                      <Grid item>
                        <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                          {props.recipientName}&apos;s Action Plans
                        </Typography>
                      </Grid>
                      <Grid item style={{paddingTop: '1em'}}>
                        <ActionPlanList
                          actionPlans={props.actionPlans}
                          teacherId={props.recipientId}
                          // need to add onClick function
                          onClick={handleChooseActionPlan}
                        />
                      </Grid>
                    </Grid>
                  ) : view === 'pdfPreview' && teacherObject ? (
                    <div>
                      <button onClick={(): void => printDocument()}>Download</button>
                      <div
                        id="divToPrint"
                        style={{
                          backgroundColor: '#ffffff',
                          width: '210mm',
                          minHeight: '100mm',
                          marginLeft: 'auto',
                          marginRight: 'auto'
                        }}
                      >
                        <ActionPlanForPdf
                          tool={tool}
                          apGoal={apGoal}
                          goalTimeline={goalTimeline}
                          benefit={benefit}
                          date={date}
                          actionSteps={actionSteps}
                          teacher={teacherObject}
                        />
                      </div>
                    </div>
                  ) : (
                    <Typography>
                      Results options will be listed here.
                    </Typography>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {view !== 'options' ? (
            <Button
              variant='contained'
              color='primary'
            >
              Attach
            </Button>
          ) : (null)}
        </DialogActions>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state: Types.ReduxState): {
  teacherList: Array<Types.Teacher>
} => {
  return {
    teacherList: state.teacherListState.teachers
  };
};

export default connect(
  mapStateToProps,
  null
)(AttachmentDialog);