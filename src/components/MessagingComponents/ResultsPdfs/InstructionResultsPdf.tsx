import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LevelOfInstructionSummaryChart from '../../LevelOfInstructionComponents/ResultsComponents/LevelOfInstructionSummaryChart';
import InstructionTypeDetailsChart from '../../LevelOfInstructionComponents/ResultsComponents/InstructionTypeDetailsChart';
import LevelOfInstructionTrendsGraph from '../../LevelOfInstructionComponents/ResultsComponents/LevelOfInstructionTrendsGraph';
import LevelofInstructionImage from '../../../assets/images/LevelofInstructionImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import moment from 'moment';
import * as Types from '../../../constants/Types';

interface Props {
  data: {
    summary: {
      highLevelQuestion: number,
      lowLevelQuestion: number,
      highLevelResponse: number,
      lowLevelResponse: number
    } | undefined,
    details: {
      highLevelQuestion: number,
      lowLevelQuestion: number,
      highLevelResponse: number,
      lowLevelResponse: number
    } | undefined,
    trends: Array<{
      dayOfEvent: {value: string},
      hlq: number,
      hlqResponse: number,
      llq: number,
      llqResponse: number
    }> | undefined
  } | undefined,
  date: Date | undefined,
  teacher: Types.Teacher | undefined
}

const InstructionResultsPdf: React.FC<Props> = (props: Props) => {
  
  /**
   * specifies formatting for child trends
   * @return {object}
   */
  const handleTrendsFormatData = (): {
    labels: Array<string>,
    datasets: Array<{
      label: string,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number,
      borderDash?: Array<number>,
      data: Array<number>
    }>
  } | undefined => {
    if (props.data) {
      return {
        labels: props.data.trends ? props.data.trends.map(observation => moment(observation.dayOfEvent.value).format("MMM Do")) : [],
        datasets: [
          {
            label: "High-Level Question",
            data: props.data.trends ? props.data.trends.map(observation => Math.round((observation.hlq / (observation.hlq + observation.hlqResponse + observation.llq + observation.llqResponse)) * 100)) : [],
            backgroundColor: "#6aa84fff",
            borderColor: "#6aa84fff",
            fill: false,
            lineTension: 0,
          },
          {
            label: "Response to High-Level Question",
            data: props.data.trends ? props.data.trends.map(observation => Math.round((observation.hlqResponse / (observation.hlq + observation.hlqResponse + observation.llq + observation.llqResponse)) * 100)) : [],
            backgroundColor: "#6aa84fff",
            borderColor: "#6aa84fff",
            fill: false,
            lineTension: 0,
            borderDash: [5, 5]
          },
          {
            label: "Low-Level Question",
            data: props.data.trends ? props.data.trends.map(observation => Math.round((observation.llq / (observation.hlq + observation.hlqResponse + observation.llq + observation.llqResponse)) * 100)) : [],
            backgroundColor: "#6d9eeb",
            borderColor: "#6d9eeb",
            fill: false,
            lineTension: 0,
          },
          {
            label: "Response to Low-Level Question",
            data: props.data.trends ? props.data.trends.map(observation => Math.round((observation.llqResponse / (observation.hlq + observation.hlqResponse + observation.llq + observation.llqResponse)) * 100)) : [],
            backgroundColor: "#6d9eeb",
            borderColor: "#6d9eeb",
            fill: false,
            lineTension: 0,
            borderDash: [5, 5]
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
                  LEVEL OF INSTRUCTION RESULTS
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <img
                  src={LevelofInstructionImage}
                  alt="Level of Instruction"
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
              {props.data && props.data.summary && props.data.details ? (
                <LevelOfInstructionSummaryChart
                  lowLevel={props.data.summary.lowLevelQuestion + props.data.summary.lowLevelResponse}
                  highLevel={props.data.summary.highLevelQuestion + props.data.summary.highLevelResponse}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '8em'}}>
              {props.data && props.data.details ? (
                <InstructionTypeDetailsChart
                  hlqCount={props.data.details.highLevelQuestion}
                  hlqResponseCount={props.data.details.highLevelResponse}
                  llqCount={props.data.details.lowLevelQuestion}
                  llqResponseCount={props.data.details.lowLevelResponse}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '8em'}}>
              {props.data && props.data.trends ? (
                <LevelOfInstructionTrendsGraph
                  data={(): {
                    labels: Array<string>;
                    datasets: Array<{
                      label: string;
                      backgroundColor: string;
                      borderColor: string;
                      fill: boolean;
                      lineTension: number;
                      borderDash?: Array<number>;
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

export default (InstructionResultsPdf);