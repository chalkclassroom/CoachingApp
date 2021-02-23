import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PieSummary from '../../StudentEngagementComponents/ResultsComponents/PieSummary';
import AvgBarSummary from '../../StudentEngagementComponents/ResultsComponents/AvgBarSummary';
import EngagementBarDetails from '../../StudentEngagementComponents/ResultsComponents/EngagementBarDetails';
import TrendsSlider from '../../StudentEngagementComponents/ResultsComponents/TrendsSlider';
import EngagementIconImage from '../../../assets/images/EngagementIconImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import moment from 'moment';
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
  date: Date | undefined,
  teacher: Types.Teacher | undefined
}

const EngagementResultsPdf: React.FC<Props> = (props: Props) => {
  
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
            label: "Average",
            backgroundColor: Constants.Colors.SE,
            borderColor: Constants.Colors.SE,
            fill: false,
            lineTension: 0,
            data: props.data.trends ? props.data.trends.map(observation => Math.round((observation.average + Number.EPSILON) * 100) / 100) : []
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
                <PieSummary
                  offTask={props.data.summary.offTask}
                  engaged={props.data.summary.engaged}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '8em'}}>
              {props.data && props.data.summary ? (
                <AvgBarSummary
                  avgRating={props.data.summary.avgRating}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '8em'}}>
              {props.data && props.data.details ? (
                <EngagementBarDetails
                  offTaskDetailSplit={[props.data.details.offTask0, props.data.details.offTask1, props.data.details.offTask2]}
                  mildlyEngagedDetailSplit={[props.data.details.mildlyEngaged0, props.data.details.mildlyEngaged1, props.data.details.mildlyEngaged2]}
                  engagedDetailSplit={[props.data.details.engaged0, props.data.details.engaged1, props.data.details.engaged2]}
                  highlyEngagedDetailSplit={[props.data.details.highlyEngaged0, props.data.details.highlyEngaged1, props.data.details.highlyEngaged2]}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '8em'}}>
              {props.data && props.data.trends ? (
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
                />
              ) : (null)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default (EngagementResultsPdf);