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
import * as Types from '../../constants/Types';
import { connect } from 'react-redux';

interface AttachmentDialogProps {
  recipientId: string | undefined;
  open: boolean;
  actionPlans: Array<{id: string, date: {seconds: number, nanoseconds: number}, practice: string, achieveBy: firebase.firestore.Timestamp}>;
  results: Array<{
    id: string,
    date: firebase.firestore.Timestamp,
    practice: string
  }>,
  checkedResults: {[id: string]: {summary: boolean, details: boolean, trends: boolean}} | undefined,
  checkedActionPlans: Array<string> | undefined,
  addResult(id: string, type: ResultTypeKey): void,
  removeResult(id: string, type: ResultTypeKey): void,
  addActionPlan(id: string): void,
  removeActionPlan(id: string): void,
  handleClose: () => void;
  recipientName: string | undefined;
  firebase: any;
  teacherList: Array<Types.Teacher>;
  addActionPlanAttachment(actionPlanId: string, teacherId: string, title: string): void;
  addResultsAttachment(
    sessionId: string,
    teacherId: string,
    title: string,
    graphType: 'summary' | 'details' | 'trends',
    practice: string,
    date: Date
  ): void;
  noActionPlansMessage: string;
  noResultsMessage: string;
  attachAll(): void;
  coachName: string
}

interface ResultType {
  summary: boolean,
  details: boolean,
  trends: boolean
}

type ResultTypeKey = keyof ResultType;

  /**
   * @return {ReactElement}
   * @param {AttachmentDialogProps} props
   */
  function AttachmentDialog(props: AttachmentDialogProps): React.ReactElement {
  const {
    recipientId,
    open,
    actionPlans,
    results,
    checkedResults,
    checkedActionPlans,
    addResult,
    removeResult,
    addActionPlan,
    removeActionPlan,
    handleClose,
    recipientName,
    firebase,
    teacherList,
    addActionPlanAttachment,
    addResultsAttachment,
    noActionPlansMessage,
    noResultsMessage,
    attachAll,
    coachName
  } = props;

  const [view, setView] = useState('options');
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
  const [checkedResultsState, setCheckedResultsState] = useState<{[id: string]: {
    summary: boolean,
    details: boolean,
    trends: boolean
  }}>({});

  /**
   * @param {string} id
   * @param {ResultTypeKey} resultType
   */
  const handleCheckResult = (id: string, resultType: ResultTypeKey): void => {
    const newCheckedResults = {...checkedResultsState};
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
    setCheckedResultsState(newCheckedResults);
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
  const handleViewActionPlan = (actionPlanId: string, teacherId: string): void => {
    const teacherData: Types.Teacher[] = teacherList.filter(obj => {
      return obj.id === teacherId
    });
    setTeacherObject(teacherData[0]);
    firebase.getAPInfo(actionPlanId).then((actionPlanData: {
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
      firebase.getActionSteps(actionPlanId).then((actionStepsData: Array<{
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
  };

  // add this back in after getting results stored in redux
  /* const handleViewResultPreview = (sessionId: string, teacherId: string, date: Date, tool: string): void => {
    const teacherData: Types.Teacher[] = teacherList.filter(obj => {
      return obj.id === teacherId
    });
    setTeacherObject(teacherData[0]);
    setSessionIdPreview(sessionId);
    setSelectionsPreview({
      summary: checkedResultsState[sessionId].summary,
      details: checkedResultsState[sessionId].details,
      trends: checkedResultsState[sessionId].trends,
    });
    setDatePreview(date);
    setView('resultPreview')
  } */

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='md'
      fullWidth={true}
      open={open}
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
                <IconButton 
                  onClick={(): void => {handleClose()}}
                  style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" justify="center" alignItems="center">
              {view === 'actionPlans' ? (
                recipientName ? (
                  <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                    {recipientName}&apos;s Action Plans
                  </Typography>
                ) : (
                  <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                    Please choose a recipient to select an Action Plan.
                  </Typography>
                )
              ) : view === 'results' ? (
                recipientName ? (
                  <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                    {recipientName}&apos;s Results
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
                  (recipientName && (actionPlans.length > 0)) ? (
                    <div>
                      <ActionPlanList
                        actionPlans={actionPlans}
                        teacherId={recipientId}
                        onClick={handleViewActionPlan}
                        checkedActionPlans={checkedActionPlans}
                        addActionPlan={addActionPlan}
                        removeActionPlan={removeActionPlan}
                        addActionPlanAttachment={addActionPlanAttachment}
                      />
                    </div>
                  ) : (
                    <Typography variant="h5" align="center" style={{fontFamily: 'Arimo'}}>
                      {noActionPlansMessage}
                    </Typography>
                  )
                ) : view === 'apPreview' && teacherObject ? (
                  <div
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
                      coachName={coachName}
                    />
                  </div>
                ) : (
                  (recipientName && (results.length > 0)) ? (
                    <div>
                    <ResultsList
                      results={results}
                      teacherId={recipientId}
                      // onClick={handleViewResultPreview}
                      checkedResults={checkedResults}
                      addResult={addResult}
                      removeResult={removeResult}
                      handleCheckResult={handleCheckResult}
                      addResultsAttachment={addResultsAttachment}
                    />
                    </div>
                  ) : (
                    <Typography variant="h5" align="center" style={{fontFamily: 'Arimo'}}>
                      {noResultsMessage}
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
            onClick={(): void => {
              attachAll();
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
  addResult: PropTypes.func.isRequired,
  removeResult: PropTypes.func.isRequired,
  addActionPlan: PropTypes.func.isRequired,
  removeActionPlan: PropTypes.func.isRequired,
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