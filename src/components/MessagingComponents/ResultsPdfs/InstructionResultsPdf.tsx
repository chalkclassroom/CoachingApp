import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LevelOfInstructionSummaryChart from '../../LevelOfInstructionComponents/ResultsComponents/LevelOfInstructionSummaryChart';
import InstructionTypeDetailsChart from '../../LevelOfInstructionComponents/ResultsComponents/InstructionTypeDetailsChart';
import LevelOfInstructionTrendsGraph from '../../LevelOfInstructionComponents/ResultsComponents/LevelOfInstructionTrendsGraph';
import LevelofInstructionImage from '../../../assets/images/LevelofInstructionImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import * as moment from 'moment';
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
  teacher: Types.Teacher | undefined,
  id: string,
  printDocument(practice: string | undefined, date: Date, elementId: string, addToAttachmentList: unknown, id: string): void,
  addToAttachmentList(base64string: string, id: string): void
}

const InstructionResultsPdf: React.FC<Props> = (props: Props) => {

  const {printDocument, id, addToAttachmentList, data, date, teacher} = props;

  // graphs are true if they have not been selected for PDF, otherwise false until animation onComplete
  const [summary, setSummary] = useState(data && data.summary ? false : true);
  const [details, setDetails] = useState(data && data.details ? false : true);
  const [trends, setTrends] = useState(data && data.trends ? false : true);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    // generate PDF once all graphs have rendered
    if (summary && details && trends && !attached) {
      printDocument('Level of Instruction', new Date(), id, addToAttachmentList, id);
      setAttached(true);
    }
  })
  
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
    if (data) {
      return {
        labels: data.trends ? data.trends.map(observation => moment(observation.dayOfEvent.value).format("MMM Do")) : [],
        datasets: [
          {
            label: "High-Level Question",
            data: data.trends ? data.trends.map(observation => Math.round((observation.hlq / (observation.hlq + observation.hlqResponse + observation.llq + observation.llqResponse)) * 100)) : [],
            backgroundColor: "#6aa84fff",
            borderColor: "#6aa84fff",
            fill: false,
            lineTension: 0,
          },
          {
            label: "Response to High-Level Question",
            data: data.trends ? data.trends.map(observation => Math.round((observation.hlqResponse / (observation.hlq + observation.hlqResponse + observation.llq + observation.llqResponse)) * 100)) : [],
            backgroundColor: "#6aa84fff",
            borderColor: "#6aa84fff",
            fill: false,
            lineTension: 0,
            borderDash: [5, 5]
          },
          {
            label: "Low-Level Question",
            data: data.trends ? data.trends.map(observation => Math.round((observation.llq / (observation.hlq + observation.hlqResponse + observation.llq + observation.llqResponse)) * 100)) : [],
            backgroundColor: "#6d9eeb",
            borderColor: "#6d9eeb",
            fill: false,
            lineTension: 0,
          },
          {
            label: "Response to Low-Level Question",
            data: data.trends ? data.trends.map(observation => Math.round((observation.llqResponse / (observation.hlq + observation.hlqResponse + observation.llq + observation.llqResponse)) * 100)) : [],
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
    <div style={{width: '100%'}}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{width: '100%'}}
      >
        <Grid item style={{width: '100%',
          height: '148px'
        }}>
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
              {data && data.summary && data.details ? (
                <LevelOfInstructionSummaryChart
                  lowLevel={data.summary.lowLevelQuestion + data.summary.lowLevelResponse}
                  highLevel={data.summary.highLevelQuestion + data.summary.highLevelResponse}
                  completed={(): void => {setSummary(true)}}
                  title={true}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '8em'}}>
              {data && data.details ? (
                <InstructionTypeDetailsChart
                  hlqCount={data.details.highLevelQuestion}
                  hlqResponseCount={data.details.highLevelResponse}
                  llqCount={data.details.lowLevelQuestion}
                  llqResponseCount={data.details.lowLevelResponse}
                  completed={(): void => {setDetails(true)}}
                  title={true}
                />
              ) : (null)}
            </Grid>
            {data && data.trends ? (
              <div>
                {(data.summary && data.details) ? (<Grid item style={{height: '148px'}} />) : null}
                <Grid item style={{paddingTop: (data.summary && data.details) ? '1em' : '8em'}}>
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

InstructionResultsPdf.propTypes = {
  printDocument: PropTypes.func.isRequired,
  addToAttachmentList: PropTypes.func.isRequired
}

export default (InstructionResultsPdf);