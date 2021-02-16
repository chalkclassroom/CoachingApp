import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TransitionTimePie from '../../TransitionComponents/ResultsComponents/TransitionTimePie';
import TransitionBarChart from '../../TransitionComponents/ResultsComponents/TransitionBarChart';
import TransitionTrendsGraph from '../../TransitionComponents/ResultsComponents/TransitionTrendsGraph';
import TransitionTimeImage from '../../../assets/images/TransitionTimeImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import moment from 'moment';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

interface TransitionResultsProps {
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
  teacher: Types.Teacher | undefined
}

const TransitionResultsPdf: React.FC<TransitionResultsProps> = (props: TransitionResultsProps) => {
  
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
    if (props.data) {
      return {
        labels: props.data.trends ? [props.data.trends.map(observation => moment(observation.startDate.value).format("MMM Do"))] : [],
        datasets: [
          {
            label: 'TOTAL',
            backgroundColor: Constants.Colors.TT,
            borderColor: Constants.Colors.TT,
            fill: false,
            lineTension: 0,
            data: props.data.trends ? props.data.trends.map(observation => Math.round((observation.total / observation.sessionTotal) * 100)) : [],
          },
          {
            label: 'WAITING IN LINE',
            backgroundColor: Constants.TransitionTypeColors.lineColor,
            borderColor: Constants.TransitionTypeColors.lineColor,
            fill: false,
            lineTension: 0,
            data: props.data.trends ? props.data.trends.map(observation => Math.round(observation.line / observation.sessionTotal * 100)) : [],
          },
          {
            label: 'TRAVELING',
            backgroundColor: Constants.TransitionTypeColors.travelingColor,
            borderColor: Constants.TransitionTypeColors.travelingColor,
            fill: false,
            lineTension: 0,
            data: props.data.trends ? props.data.trends.map(observation => Math.round(observation.traveling / observation.sessionTotal * 100)) : [],
          },
          {
            label: 'CHILD WAITING',
            backgroundColor: Constants.TransitionTypeColors.waitingColor,
            borderColor: Constants.TransitionTypeColors.waitingColor,
            fill: false,
            lineTension: 0,
            data: props.data.trends ? props.data.trends.map(observation => Math.round(observation.waiting / observation.sessionTotal * 100)) : [],
          },
          {
            label: 'ROUTINES',
            backgroundColor: Constants.TransitionTypeColors.routinesColor,
            borderColor: Constants.TransitionTypeColors.routinesColor,
            fill: false,
            lineTension: 0,
            data: props.data.trends ? props.data.trends.map(observation => Math.round(observation.routines / observation.sessionTotal * 100)) : [],
          },
          {
            label: 'BEHAVIOR MANAGEMENT',
            backgroundColor: Constants.TransitionTypeColors.behaviorManagementColor,
            borderColor: Constants.TransitionTypeColors.behaviorManagementColor,
            fill: false,
            lineTension: 0,
            data: props.data.trends ? props.data.trends.map(observation => Math.round(observation.behaviorManagement / observation.sessionTotal * 100)) : [],
          },
          {
            label: 'OTHER',
            backgroundColor: Constants.TransitionTypeColors.otherColor,
            borderColor: Constants.TransitionTypeColors.otherColor,
            fill: false,
            lineTension: 0,
            data: props.data.trends ? props.data.trends.map(observation => Math.round(observation.other / observation.sessionTotal * 100)) : [],
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
        <Grid item style={{width: '100%'}}>
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
              {props.teacher ? (props.teacher.firstName + " " + props.teacher.lastName) : (null)}
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Grid container direction="row" justify="flex-end">
                {moment(props.date).format('MM/DD/YYYY')}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" justify="center" alignItems="center" style={{width: '100%'}}>
            <Grid item style={{paddingTop: '1em'}}>
              {props.data && props.data.summary ? (
                <TransitionTimePie
                  transitionTime={props.data.summary[0].total}
                  learningActivityTime={props.data.summary[0].sessionTotal - props.data.summary[0].total}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '1em'}}>
              {props.data && props.data.details ? (
                <TransitionBarChart
                  line={props.data.details[0].line}
                  traveling={props.data.details[0].traveling}
                  waiting={props.data.details[0].waiting}
                  routines={props.data.details[0].routines}
                  behaviorManagement={props.data.details[0].behaviorManagement}
                  other={props.data.details[0].other}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '2em'}}>
              {props.data && props.data.trends ? (
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
                />
              ) : (null)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default (TransitionResultsPdf);