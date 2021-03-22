import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BehaviorResponsesSummaryChart from '../../ClassroomClimateComponent/ResultsComponents/BehaviorResponsesSummaryChart';
import AverageTone from '../../ClassroomClimateComponent/ResultsComponents/AverageTone';
import BehaviorResponsesDetailsChart from '../../ClassroomClimateComponent/ResultsComponents/BehaviorResponsesDetailsChart';
import ClimateTrendsGraph from '../../ClassroomClimateComponent/ResultsComponents/ClimateTrendsGraph';
import ClassroomClimateIconImage from '../../../assets/images/ClassroomClimateIconImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import * as moment from 'moment';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

interface Props {
  data: {
    summary: {
      toneRating: number
    } | undefined,
    details: {
      specificCount: number,
      nonspecificCount: number,
      disapprovalCount: number,
      redirectionCount: number
    } | undefined,
    trends: Array<{
      dayOfEvent: {value: string},
      positive: number,
      negative: number
    }> | undefined
  } | undefined,
  date: Date | undefined,
  teacher: Types.Teacher | undefined,
  id: string,
  printDocument(practice: string | undefined, date: Date, elementId: string, addToAttachmentList: unknown, id: string): void,
  addToAttachmentList(base64string: string, id: string): void
}

const ClimateResultsPdf: React.FC<Props> = (props: Props) => {
  
  // graphs are true if they have not been selected for PDF, otherwise false until animation onComplete
  const [summary, setSummary] = useState(props.data && props.data.summary ? false : true);
  const [details, setDetails] = useState(props.data && props.data.details ? false : true);
  const [trends, setTrends] = useState(props.data && props.data.trends ? false : true);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    // generate PDF once all graphs have rendered
    if (summary && details && trends && !attached) {
      props.printDocument('Classroom Climate', new Date(), props.id, props.addToAttachmentList, props.id);
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
      data: Array<number>
    }>
  } | undefined => {
    if (props.data) {
      return {
        labels: props.data.trends ? props.data.trends.map(observation => moment(observation.dayOfEvent.value).format("MMM Do")) : [],
        datasets: [
          {
            label: "Redirection/Disapproval",
            data: props.data.trends ? props.data.trends.map(observation => Math.round((observation.negative / (observation.positive + observation.negative)) * 100)) : [],
            backgroundColor: Constants.ClimateTypeColors.negativeBar,
            borderColor: Constants.ClimateTypeColors.negativeBar,
            fill: false,
            lineTension: 0,
          },
          {
            label: "Specific/General Approval",
            data: props.data.trends ? props.data.trends.map(observation => Math.round((observation.positive / (observation.positive + observation.negative)) * 100)) : [],
            backgroundColor: Constants.ClimateTypeColors.positiveBar,
            borderColor: Constants.ClimateTypeColors.positiveBar,
            fill: false,
            lineTension: 0,
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
                  CLASSROOM CLIMATE RESULTS
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <img
                  src={ClassroomClimateIconImage}
                  alt="Classroom Climate"
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
                <BehaviorResponsesSummaryChart
                  positiveResponses={props.data.details.specificCount + props.data.details.nonspecificCount}
                  negativeResponses={props.data.details.disapprovalCount + props.data.details.redirectionCount}
                  completed={(): void => {setSummary(true)}}
                  title={true}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '8em'}}>
              {props.data && props.data.summary && props.data.summary.toneRating ? (
                <AverageTone
                  averageToneRating={props.data.summary.toneRating}
                  pdf={true}
                />
              ) : (null)}
            </Grid>
            {props.data && props.data.details ? (
            <div>
              {(props.data.summary && props.data.summary.toneRating) ? (<Grid item style={{height: '148px'}} />) : null}
              <Grid item style={{paddingTop: (props.data.summary && props.data.summary.toneRating) ? '1em' : '8em'}}>
                <BehaviorResponsesDetailsChart
                  specificBehaviorCount={props.data.details.specificCount}
                  nonspecificBehaviorCount={props.data.details.nonspecificCount}
                  disapprovalBehaviorCount={props.data.details.disapprovalCount}
                  redirectionsBehaviorCount={props.data.details.redirectionCount}
                  completed={(): void => {setDetails(true)}}
                  title={true}
                />
              </Grid>
            </div>
            ) : (null)}
            {props.data && props.data.trends ? (
              <div>
                {((props.data.summary && props.data.summary.toneRating && !props.data.details) || (props.data.summary && !props.data.summary.toneRating && props.data.details)) ? (<Grid item style={{height: '148px'}} />) : null}
                <Grid item style={{paddingTop: ((props.data.summary && props.data.summary.toneRating && !props.data.details) || (props.data.summary && !props.data.summary.toneRating && props.data.details)) ? '1em' : '8em'}}>
                  <ClimateTrendsGraph
                    data={(): {
                      labels: Array<string>;
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

ClimateResultsPdf.propTypes = {
  printDocument: PropTypes.func.isRequired,
  addToAttachmentList: PropTypes.func.isRequired
}

export default (ClimateResultsPdf);