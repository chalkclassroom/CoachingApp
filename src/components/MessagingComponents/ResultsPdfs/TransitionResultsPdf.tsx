import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TransitionTimePie from '../../TransitionComponents/ResultsComponents/TransitionTimePie';
import TransitionBarChart from '../../TransitionComponents/ResultsComponents/TransitionBarChart';
import TransitionTrendsGraph from '../../TransitionComponents/ResultsComponents/TransitionTrendsGraph';
import TransitionTimeImage from '../../../assets/images/TransitionTimeImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import * as moment from 'moment';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

interface Props {
  data: {
    summary: Array<{
      total: number,
      sessionTotal: number,
      startDate: {value: string}
    }> | undefined,
    details: Array<{
      line: number,
      traveling: number,
      waiting: number,
      routines: number,
      behaviorManagement: number,
      other: number,
      total: number
    }> | undefined,
    trends: Array<{
      id: string,
      line: number,
      traveling: number,
      waiting: number,
      routines: number,
      behaviorManagement: number,
      other: number,
      total: number,
      sessionTotal: number,
      startDate: {value: string}
    }> | undefined
  } | undefined,
  date: Date | undefined,
  teacher: Types.Teacher | undefined,
  id: string,
  printDocument(practice: string | undefined, date: Date, elementId: string, addToAttachmentList: unknown, id: string): void,
  addToAttachmentList(base64string: string, id: string): void
}

const TransitionResultsPdf: React.FC<Props> = (props: Props) => {

  const { data, date, teacher, id, printDocument, addToAttachmentList } = props;
  
  // graphs are true if they have not been selected for PDF, otherwise false until animation onComplete
  const [summary, setSummary] = useState(data && data.summary ? false : true);
  const [details, setDetails] = useState(data && data.details ? false : true);
  const [trends, setTrends] = useState(data && data.trends ? false : true);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    // generate PDF once all graphs have rendered
    if (summary && details && trends && !attached) {
      printDocument('Transition Time', new Date(), id, addToAttachmentList, id);
      setAttached(true);
    }
  })

  /**
   * specifies formatting for child trends
   * @return {object}
   */
  const handleTrendsFormatData = (): {
    labels: Array<Array<string>>,
    datasets: Array<{
      label: string,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number,
      data: Array<number>
    }>
  } | undefined => {
    if (data) {
      return {
        labels: data.trends ? [data.trends.map(observation => moment(observation.startDate.value).format("MMM Do"))] : [],
        datasets: [
          {
            label: 'TOTAL',
            backgroundColor: Constants.Colors.TT,
            borderColor: Constants.Colors.TT,
            fill: false,
            lineTension: 0,
            data: data.trends ? data.trends.map(observation => Math.round((observation.total / observation.sessionTotal) * 100)) : [],
          },
          {
            label: 'WAITING IN LINE',
            backgroundColor: Constants.TransitionTypeColors.lineColor,
            borderColor: Constants.TransitionTypeColors.lineColor,
            fill: false,
            lineTension: 0,
            data: data.trends ? data.trends.map(observation => Math.round(observation.line / observation.sessionTotal * 100)) : [],
          },
          {
            label: 'TRAVELING',
            backgroundColor: Constants.TransitionTypeColors.travelingColor,
            borderColor: Constants.TransitionTypeColors.travelingColor,
            fill: false,
            lineTension: 0,
            data: data.trends ? data.trends.map(observation => Math.round(observation.traveling / observation.sessionTotal * 100)) : [],
          },
          {
            label: 'CHILD WAITING',
            backgroundColor: Constants.TransitionTypeColors.waitingColor,
            borderColor: Constants.TransitionTypeColors.waitingColor,
            fill: false,
            lineTension: 0,
            data: data.trends ? data.trends.map(observation => Math.round(observation.waiting / observation.sessionTotal * 100)) : [],
          },
          {
            label: 'ROUTINES',
            backgroundColor: Constants.TransitionTypeColors.routinesColor,
            borderColor: Constants.TransitionTypeColors.routinesColor,
            fill: false,
            lineTension: 0,
            data: data.trends ? data.trends.map(observation => Math.round(observation.routines / observation.sessionTotal * 100)) : [],
          },
          {
            label: 'BEHAVIOR MANAGEMENT',
            backgroundColor: Constants.TransitionTypeColors.behaviorManagementColor,
            borderColor: Constants.TransitionTypeColors.behaviorManagementColor,
            fill: false,
            lineTension: 0,
            data: data.trends ? data.trends.map(observation => Math.round(observation.behaviorManagement / observation.sessionTotal * 100)) : [],
          },
          {
            label: 'OTHER',
            backgroundColor: Constants.TransitionTypeColors.otherColor,
            borderColor: Constants.TransitionTypeColors.otherColor,
            fill: false,
            lineTension: 0,
            data: data.trends ? data.trends.map(observation => Math.round(observation.other / observation.sessionTotal * 100)) : [],
          }
        ]
      }
    } else {
      return
    };
  };

  return (
    <div style={{width: '100%'}} id='ap'>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{width: '100%'}}
      >
        <Grid item style={{width: '100%', height: '148px'}}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{width: '100%', paddingTop: '0.5em', paddingBottom: '1em'}}
          >
            <Grid item xs={2}>
              <img
                src={LogoImage}
                alt='CHALK'
                width='50%'
              />
            </Grid>
            <Grid item xs={8}>
              <Grid container direction="row" justify="center" alignItems="center" style={{width: '100%'}}>
                <Typography variant="h4" align="center" style={{fontFamily: "Arimo"}}>
                  TRANSITION TIME RESULTS
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <img
                  src={TransitionTimeImage}
                  alt="Transition Time"
                  width='50%'
                />
              </Grid>
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
              {teacher ? (teacher.firstName + " " + teacher.lastName) : (null)}
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Grid container direction="row" justify="flex-end">
                {moment(date).format('MM/DD/YYYY')}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="center" alignItems="center" style={{width: '100%'}}>
            <Grid item style={{paddingTop: '1em'}}>
              {data && data.summary ? (
                <TransitionTimePie
                  transitionTime={data.summary[0].total}
                  learningActivityTime={data.summary[0].sessionTotal - data.summary[0].total}
                  completed={(): void => {setSummary(true)}}
                  title={true}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '8em'}}>
              {data && data.details ? (
                <TransitionBarChart
                  line={data.details[0].line}
                  traveling={data.details[0].traveling}
                  waiting={data.details[0].waiting}
                  routines={data.details[0].routines}
                  behaviorManagement={data.details[0].behaviorManagement}
                  other={data.details[0].other}
                  completed={(): void => {setDetails(true)}}
                  title={true}
                />
              ) : (null)}
            </Grid>
            {data && data.trends ? (
              <div>
                {(data.summary && data.details) ? (<Grid item style={{height: '148px'}} />) : null}
                <Grid item style={{paddingTop: (data.summary && data.details) ? '1em' : '8em'}}>
                  <TransitionTrendsGraph
                    data={(): {
                      labels: Array<Array<string>>;
                      datasets: Array<{
                          label: string;
                          backgroundColor: string;
                          borderColor: string;
                          fill: boolean;
                          lineTension: number;
                          data: Array<number>;
                      }>
                    } | undefined => handleTrendsFormatData()}
                    completed={(): void => {setTrends(true)}}
                    title={true}
                  />
                </Grid>
              </div>
            ) : (null)}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

TransitionResultsPdf.propTypes = {
  printDocument: PropTypes.func.isRequired,
  addToAttachmentList: PropTypes.func.isRequired
}

export default (TransitionResultsPdf);