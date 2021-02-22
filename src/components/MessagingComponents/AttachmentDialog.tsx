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
import ListeningResultsPdf from './ResultsPdfs/ListeningResultsPdf';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as Types from '../../constants/Types';
import { connect } from 'react-redux';

interface AttachmentDialogProps {
  recipientId: string;
  open: boolean;
  handleDelete: (value: string) => void;
  actionPlans: Array<{id: string, date: {seconds: number, nanoseconds: number}, practice: string, achieveBy: firebase.firestore.Timestamp}>;
  results: Array<{
    id: string,
    date: firebase.firestore.Timestamp,
    practice: string
  }>,
  checkedResults: {[id: string]: {summary: boolean, details: boolean, trends: boolean}} | undefined,
  addResult(id: string, type: ResultTypeKey): void,
  removeResult(id: string, type: ResultTypeKey): void,
  attachmentList: Array<{id: string, date: {seconds: number, nanoseconds: number}, practice: string, achieveBy: firebase.firestore.Timestamp}>;
  handleClose: () => void;
  recipientName: string;
  firebase: any;
  teacherList: Array<Types.Teacher>;
  addAttachment(content: string, practice: string, date: Date): void;
  setIncludeAttachments(value: boolean): void;
  addActionPlanAttachment(actionPlanId: string, teacherId: string, title: string): void;
  addResultsAttachment(
    sessionId: string,
    teacherId: string,
    title: string,
    graphType: 'summary' | 'details' | 'trends',
    practice: string
  ): void;
  noActionPlansMessage: string;
  noResultsMessage: string;
  attachAll(): void;
}

interface ResultType {
  summary: boolean,
  details: boolean,
  trends: boolean
}

type ResultTypeKey = keyof ResultType;

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
    person: string,
    timeline: Date
  }>>();
  const [checkedActionPlans, setCheckedActionPlans] = useState<Array<string>>([]);
  const [checkedResults, setCheckedResults] = useState<{[id: string]: {
    summary: boolean,
    details: boolean,
    trends: boolean
  }}>({});
  const [sessionIdPreview, setSessionIdPreview] = useState<string>();
  const [selectionsPreview, setSelectionsPreview] = useState<{
    summary: boolean,
    details: boolean,
    trends: boolean
  }>();
  const [datePreview, setDatePreview] = useState<Date>();
  const [selectedActionPlanIds, setSelectedActionPlanIds] = useState<Array<string>>([]);

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

  /**
   * @param {string} id
   * @param {ResultTypeKey} resultType
   */
  const handleCheckResult = (id: string, resultType: ResultTypeKey): void => {
    const newCheckedResults = checkedResults;
    console.log('what are new checked results', checkedResults);
    if (newCheckedResults[id]) {
      if (newCheckedResults[id][resultType]) {
        newCheckedResults[id][resultType] = false;
      } else {
        newCheckedResults[id][resultType] = true;
      }
    } else {
      newCheckedResults[id] = {
        summary: false,
        details: false,
        trends: false
      };
      newCheckedResults[id][resultType] = true;
    }
    // newCheckedActionPlans.push(id);
    setCheckedResults(newCheckedResults);
    console.log('new checked results', newCheckedResults)
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

  /* const saveAs = (uri, filename) => {
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      // Firefox requires the link to be in the body
      document.body.appendChild(link);

      // simulate click
      link.click();

      // remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  } */

  const printDocument = async (practice: string, date: Date, id: string): Promise<string | void> => {
    // console.log('teacher selected', teacherObject);
    const input: HTMLElement = document.getElementById(id);
    // const input = document.createElement('div');
    // document.body.appendChild(actionPlanDocument);
    // const input = document.appendChild(actionPlanDocument);
    let base64data: string | ArrayBuffer | null = null;
    html2canvas(input, {
      onclone: function (clonedDoc) {
          clonedDoc.getElementById(id).style.visibility = 'visible';
      },
      // logging: true,
      // letterRendering: 1,
      // allowTaint: false,
      // useCORS: true
    }).then((canvas) => {
      console.log('canvas');
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "html_image.png";
        const imgData = canvas.toDataURL('image/png');
        // saveAs(imgData, 'canvas.png');
        const pdf = new jsPDF('p', 'mm', 'a4', true); // true compresses the pdf
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth*0.9, pdfHeight);
        pdf.save("download.pdf");
        const blobPDF = new Blob([ pdf.output('blob') ], { type: 'application/pdf'});
        const reader = new FileReader();
        reader.readAsDataURL(blobPDF);
        reader.onloadend = function(): void {
          base64data = reader.result;
          let newBase64Data = '';
          if (base64data) {
            newBase64Data = (base64data as string).replace('data:application/pdf;base64,', '');
          }
          console.log('data is', newBase64Data);
          console.log('practice is', practice);
          console.log('date is', date);
          props.addAttachment(newBase64Data, practice, date);
        }
        // return base64data
      })
      /* .then(() => {
        return base64data
      }); */
  }

  const handleAttach = (practice: string, date: Date, id: string): void => {
    printDocument(practice, date, id)
  }

  /**
   * @param {string} actionPlanId
   * @param {string} teacherId
   * @param {string} practice
   */
  const handleChooseActionPlan = (actionPlanId: string, teacherId: string, practice: string): void => {
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
        person: string,
        timeline: Date
      }> = [];
      props.firebase.getActionSteps(actionPlanId).then((actionStepsData: Array<{
        step: string,
        person: string,
        timeline: firebase.firestore.Timestamp
      }>) => {
        actionStepsData.forEach((value, index) => {
          newActionStepsArray[index] = {
            step: value.step,
            person: value.person,
            timeline: (value.timeline && (typeof value.timeline !== 'string')) ?
              value.timeline.toDate() :
              new Date(),
          };
        })
      }).then(() => {
        setActionSteps(newActionStepsArray);
      }).then(() => {
        console.log('tool', tool);
        console.log('practice', practice);
        console.log('new date', newDate);
        handleAttach(practice, newDate, 'apPdf');
        // setView('apPreview');
      })
      .catch(() => {
        console.log('error retrieving action steps');
      });
    })
    // console.log('handled choose action plan');
  };

  /**
   * @param {string} actionPlanId
   * @param {string} teacherId
   * @param {string} practice
   */
  const handleAttachResults = (actionPlanId: string, teacherId: string, practice: string): void => {
    const resultsKeys = Object.keys(checkedResults);
    const loop = new Promise<void>((resolve, reject) => {
      resultsKeys.forEach((id: string, index: number) => {
        const teacherData: Types.Teacher[] = props.teacherList.filter(obj => {
          return obj.id === teacherId
        });
        setTeacherObject(teacherData[0]);
        setSessionIdPreview(id);
        setSelectionsPreview({
          summary: checkedResults[id].summary,
          details: checkedResults[id].details,
          trends: checkedResults[id].trends,
        });
        setDatePreview(new Date())
        if (index === resultsKeys.length -1) {
          resolve();
        }
      })
    });
    loop.then(() => {
      handleAttach(practice, datePreview, 'resultsPdf');
    })
  };

  /**
   * @param {string} actionPlanId
   * @param {string} teacherId
   */
  const handleViewActionPlan = (actionPlanId: string, teacherId: string): void => {
    setAP(actionPlanId);
    setTeacher(teacherId);
    const teacherData: Types.Teacher[] = props.teacherList.filter(obj => {
      return obj.id === teacherId
    });
    setTeacherObject(teacherData[0]);
    // console.log('teacherData', teacherData, typeof teacherData);
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
        person: string,
        timeline: Date
      }> = [];
      props.firebase.getActionSteps(actionPlanId).then((actionStepsData: Array<{
        step: string,
        person: string,
        timeline: firebase.firestore.Timestamp
      }>) => {
        actionStepsData.forEach((value, index) => {
          newActionStepsArray[index] = {
            step: value.step,
            person: value.person,
            timeline: (value.timeline && (typeof value.timeline !== 'string')) ?
              value.timeline.toDate() :
              new Date(),
          };
        })
      }).then(() => {
        setActionSteps(newActionStepsArray);
      }).then(() => {
        setView('apPreview');
      })
      .catch(() => {
        console.log('error retrieving action step');
      });
    })
    // console.log('handled choose action plan');
  };

  const handleViewResultPreview = (sessionId: string, teacherId: string, date: Date, tool: string): void => {
    const teacherData: Types.Teacher[] = props.teacherList.filter(obj => {
      return obj.id === teacherId
    });
    console.log('checked results', checkedResults[sessionId]);
    setTeacherObject(teacherData[0]);
    setSessionIdPreview(sessionId);
    setSelectionsPreview({
      summary: checkedResults[sessionId].summary,
      details: checkedResults[sessionId].details,
      trends: checkedResults[sessionId].trends,
    });
    setDatePreview(date);
    setView('resultPreview')
  }

  /**
   * @param {string} sessionId
   * @param {string} teacherId
   */
  /* const handleViewListeningResults = (sessionId: string, teacherId: string): void => {
    const teacherData: Types.Teacher[] = props.teacherList.filter(obj => {
      return obj.id === teacherId
    });
    let listening = 0;
    let notListening = 0;
    setTeacherObject(teacherData[0]);
    if (checkedResults[sessionId].summary === true) {
      props.firebase.fetchListeningSummary(sessionId)
      .then((summary: {listening: number, notListening: number}) => {
        listening = summary.listening;
        notListening = summary.notListening;
      });
    }
    if (checkedResults[sessionId].summary === true) {
      props.firebase.fetchListeningSummary(sessionId)
      .then((summary: {listening: number, notListening: number}) => {
        listening = summary.listening;
        notListening = summary.notListening;
      });
    }
  }; */

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
                      if (view === 'apPreview') {
                        setView('actionPlans')
                      } else if (view === 'resultPreview') {
                        setView('results')
                      } else {
                        setView('options')
                      }
                    }}
                    style={{boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)'}}
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
                  (props.recipientName && (props.actionPlans.length > 0)) ? (
                    <div>
                    <ActionPlanList
                      actionPlans={props.actionPlans}
                      teacherId={props.recipientId}
                      onClick={handleViewActionPlan}
                      checkedActionPlans={checkedActionPlans}
                      addActionPlan={addActionPlan}
                      removeActionPlan={removeActionPlan}
                      handleChooseActionPlan={handleChooseActionPlan}
                      addActionPlanAttachment={props.addActionPlanAttachment}
                    />
                    {teacherObject ? (
                      <div
                      id="apPdf"
                      style={{
                        backgroundColor: '#ffffff',
                        width: '210mm',
                        minHeight: '100mm',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        // display: "none"
                        visibility: 'hidden'
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
                    ) : (null)}
                      
                    </div>
                  ) : (
                    <Typography variant="h5" align="center" style={{fontFamily: 'Arimo'}}>
                      {props.noActionPlansMessage}
                    </Typography>
                  )
                ) : view === 'apPreview' && teacherObject ? (
                  <div>
                    <button onClick={(): void => handleAttach()}>Download</button>
                    <div
                      // id="divToPrint"
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
                ) : view === 'resultPreview' && teacherObject ? (
                  <div>
                    <button onClick={(): void => handleAttach()}>Download</button>
                    <div
                      // id="divToPrint2"
                      id="resultsPdf"
                      style={{
                        backgroundColor: '#ffffff',
                        width: '210mm',
                        minHeight: '100mm',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                      }}
                    >
                      <ListeningResultsPdf
                        sessionId={sessionIdPreview}
                        selections={selectionsPreview}
                        date={datePreview}
                        firebase={props.firebase}
                        teacher={teacherObject}
                      />
                    </div>
                  </div>
                ) : (
                  (props.recipientName && (props.results.length > 0)) ? (
                    <div>
                    <ResultsList
                      results={props.results}
                      teacherId={props.recipientId}
                      onClick={handleViewResultPreview}
                      checkedResults={props.checkedResults}
                      addResult={props.addResult}
                      removeResult={props.removeResult}
                      handleCheckResult={handleCheckResult}
                      addResultsAttachment={props.addResultsAttachment}
                    />
                    {teacherObject && sessionIdPreview && selectionsPreview && datePreview ? (
                      <div
                      id="resultsPdf"
                      style={{
                        backgroundColor: '#ffffff',
                        width: '210mm',
                        minHeight: '101mm',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        // display: "none"
                        visibility: 'hidden'
                      }}
                    >
                      <ListeningResultsPdf
                        sessionId={sessionIdPreview}
                        selections={selectionsPreview}
                        date={datePreview}
                        firebase={props.firebase}
                        teacher={teacherObject}
                      />
                    </div>
                    ) : (null)}
                    </div>
                  ) : (
                    <Typography variant="h5" align="center" style={{fontFamily: 'Arimo'}}>
                      {props.noResultsMessage}
                    </Typography>
                  )
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
            // disabled={!props.attachmentList}
            onClick={(): void => {
              props.attachAll();
            }}
          >
            Attach
          </Button>
        ) : (null)}
      </DialogActions>
    </Dialog>
  );
};

AttachmentDialog.propTypes = {
  addAttachment: PropTypes.func.isRequired,
  addResult: PropTypes.func.isRequired,
  removeResult: PropTypes.func.isRequired,
  setIncludeAttachments: PropTypes.func.isRequired,
  addActionPlanAttachment: PropTypes.func.isRequired,
  addResultsAttachment: PropTypes.func.isRequired,
  attachAll: PropTypes.func.isRequired
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