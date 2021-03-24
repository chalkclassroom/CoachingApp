import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PieSummary from '../../StudentEngagementComponents/ResultsComponents/PieSummary';
import AvgBarSummary from '../../StudentEngagementComponents/ResultsComponents/AvgBarSummary';
import EngagementBarDetails from '../../StudentEngagementComponents/ResultsComponents/EngagementBarDetails';
import TrendsSlider from '../../StudentEngagementComponents/ResultsComponents/TrendsSlider';
import EngagementIconImage from '../../../assets/images/EngagementIconImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import * as moment from 'moment';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

interface Props {
  data: {
    summary: {
      offTask: number,
      engaged: number,
      avgRating: number
    } | undefined,
    details: {
      offTask0: number,
      offTask1: number,
      offTask2: number,
      mildlyEngaged0: number,
      mildlyEngaged1: number,
      mildlyEngaged2: number,
      engaged0: number,
      engaged1: number,
      engaged2: number,
      highlyEngaged0: number,
      highlyEngaged1: number,
      highlyEngaged2: number,
    } | undefined,
    trends: Array<{
      startDate: {value: string},
      average: number
    }> | undefined
  } | undefined,
  date: Date,
  teacher: Types.Teacher | undefined,
  id: string,
  printDocument(practice: string | undefined, date: Date, elementId: string, addToAttachmentList: unknown, id: string): void,
  addToAttachmentList(base64string: string, id: string): void
}

const EngagementResultsPdf: React.FC<Props> = (props: Props) => {

  const {printDocument, id, addToAttachmentList, data, date, teacher} = props;

  // graphs are true if they have not been selected for PDF, otherwise false until animation onComplete
  const [summary, setSummary] = useState(data && data.summary ? false : true);
  const [avgRating, setAvgRating] = useState(data && data.summary ? false : true);
  const [details, setDetails] = useState(data && data.details ? false : true);
  const [trends, setTrends] = useState(data && data.trends ? false : true);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    // generate PDF once all graphs have rendered
    if (summary && avgRating && details && trends && !attached) {
      printDocument('Student Engagement', date, id, addToAttachmentList, id);
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
    if (data && data.trends) {
      const dateArray: Array<Array<string>> = [];
      data.trends.map(observation => dateArray.push([moment(observation.startDate.value).format("MMM Do")]))
      return {
        labels: dateArray,
        datasets: [
          {
            label: "Average",
            backgroundColor: Constants.Colors.SE,
            borderColor: Constants.Colors.SE,
            fill: false,
            lineTension: 0,
            data: data.trends ? data.trends.map(observation => Math.round((observation.average + Number.EPSILON) * 100) / 100) : []
          }
        ]
      };
    } else {
      return;
    }
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
                  STUDENT ENGAGEMENT RESULTS
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <img
                  src={EngagementIconImage}
                  alt="Student Engagement"
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
                <PieSummary
                  offTask={data.summary.offTask}
                  engaged={data.summary.engaged}
                  completed={(): void => {setSummary(true)}}
                  title={true}
                />
              ) : (null)}
            </Grid>
            {data && data.summary ? (
              <Grid item style={{paddingTop: '8em', height: 500, paddingBottom: '4em'}}>
                <AvgBarSummary
                  avgRating={data.summary.avgRating}
                  completed={(): void => {setAvgRating(true)}}
                  title={true}
                />
              </Grid>
            ) : (null)}
            {data && data.details ? (
              <div>
                {data.summary ? (<Grid item style={{height: '148px'}} />) : null}
                <Grid item style={{paddingTop: '1em'}}>
                  <EngagementBarDetails
                    offTaskDetailSplit={[data.details.offTask0, data.details.offTask1, data.details.offTask2]}
                    mildlyEngagedDetailSplit={[data.details.mildlyEngaged0, data.details.mildlyEngaged1, data.details.mildlyEngaged2]}
                    engagedDetailSplit={[data.details.engaged0, data.details.engaged1, data.details.engaged2]}
                    highlyEngagedDetailSplit={[data.details.highlyEngaged0, data.details.highlyEngaged1, data.details.highlyEngaged2]}
                    completed={(): void => {setDetails(true)}}
                    title={true}
                  />
                </Grid>
              </div>
            ) : (null)}
            {data && data.trends ? (
              <div>
                {(data.summary && !data.details) ? (<Grid item style={{height: '148px'}} />) : null}
                <Grid item style={{paddingTop: ((data.summary && !data.details) || (!data.summary && !data.details)) ? '1em' : '8em'}}>
                  <TrendsSlider
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

EngagementResultsPdf.propTypes = {
  printDocument: PropTypes.func.isRequired,
  addToAttachmentList: PropTypes.func.isRequired
}

export default (EngagementResultsPdf);