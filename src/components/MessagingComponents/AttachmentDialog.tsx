import * as React from 'react';
import * as PropTypes from 'prop-types';
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
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import ResultsList from './ResultsList';
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
  results: Array<{
    id: string,
    date: firebase.firestore.Timestamp,
    practice: string
  }>,
  attachmentList: Array<{id: string, date: {seconds: number, nanoseconds: number}, practice: string, achieveBy: firebase.firestore.Timestamp}>;
  handleClose: () => void;
  recipientName: string;
  firebase: any;
  teacherList: Array<Types.Teacher>;
  addAttachment(content: string): void;
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
  const [checkedActionPlans, setCheckedActionPlans] = useState<Array<string>>([]);
  const [checkedResults, setCheckedResults] = useState<Array<string>>([]);

  const removeActionPlan = (id: string): void => {
    const newCheckedActionPlans = checkedActionPlans;
    const index = newCheckedActionPlans.indexOf(id);
    newCheckedActionPlans.splice(index, 1);
    setCheckedActionPlans(newCheckedActionPlans);
  }

  const addActionPlan = (id: string): void => {
    const newCheckedActionPlans = checkedActionPlans;
    newCheckedActionPlans.push(id);
    setCheckedActionPlans(newCheckedActionPlans);
  }

  const removeResult = (id: string): void => {
    const newCheckedResults = checkedResults;
    const index = newCheckedResults.indexOf(id);
    newCheckedResults.splice(index, 1);
    setCheckedResults(newCheckedResults);
  }

  const addResult = (id: string): void => {
    const newCheckedResults = checkedResults;
    newCheckedResults.push(id);
    setCheckedResults(newCheckedResults);
  }

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

  const printDocument = async (): Promise<string | void> => {
    console.log('teacher selected', teacherObject);
    const input = document.getElementById('divToPrint');
    let base64data: string | ArrayBuffer | null = null;
    html2canvas(input)
      .then((canvas) => {
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "html_image.png";
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4', true); // true compresses the pdf
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth*0.9, pdfHeight);
        pdf.save("download.pdf");
        const blobPDF = new Blob([ pdf.output('blob') ], { type: 'application/pdf'});
        console.log('this is apparently the blob', blobPDF);
        const reader = new FileReader();
        reader.readAsDataURL(blobPDF);
        reader.onloadend = function() {
          base64data = reader.result;
          console.log('base64', base64data);
          // return base64data
          props.addAttachment(base64data);
        }
      }).then(() => {
        return base64data
      });
  }

  const handleAttach = (): void => {
    printDocument().then((data: string | void) => {
      console.log('here the data is', data);
      if (data) {
        console.log('at this point', data, 'type', typeof data);
        props.addAttachment(data);
      }
    })
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='md'
      fullWidth={true}
      open={props.open}
    >
      <DialogTitle>
        <Grid container direction="column">
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
              {view === 'actionPlans' ? (
                props.recipientName ? (
                  <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                    {props.recipientName}&apos;s Action Plans
                  </Typography>
                ) : (
                  <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                    Please choose a recipient to select an Action Plan.
                  </Typography>
                )
              ) : view === 'results' ? (
                props.recipientName ? (
                  <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                    {props.recipientName}&apos;s Results
                  </Typography>
                ) : (
                  <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                    Please choose a recipient to select results.
                  </Typography>
                )
              ) : view === 'options' ? (
                <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                  Attachments
                </Typography>
              ) : (null)}
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" justify="center" alignItems="stretch">
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
                  props.recipientName ? (
                    <ActionPlanList
                      actionPlans={props.actionPlans}
                      teacherId={props.recipientId}
                      onClick={handleChooseActionPlan}
                      checkedActionPlans={checkedActionPlans}
                      addActionPlan={addActionPlan}
                      removeActionPlan={removeActionPlan}
                    />
                  ) : (null)
                ) : view === 'pdfPreview' && teacherObject ? (
                  <div>
                    <button onClick={(): void => handleAttach()}>Download</button>
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
                  props.recipientName ? (
                    <ResultsList
                      results={props.results}
                      teacherId={props.recipientId}
                      checkedResults={checkedResults}
                      addResult={addResult}
                      removeResult={removeResult}
                    />
                  ) : (null)
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
    </Dialog>
  );
};

AttachmentDialog.propTypes = {
  addAttachment: PropTypes.func.isRequired
}

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