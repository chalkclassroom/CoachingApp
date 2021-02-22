import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChildPieSummary from '../../SequentialActivitiesComponents/ResultsComponents/ChildPieSummary';
import TeacherPieSummary from '../../SequentialActivitiesComponents/ResultsComponents/TeacherPieSummary';
import ChildBarDetails from '../../SequentialActivitiesComponents/ResultsComponents/ChildBarDetails';
import TeacherBarDetails from '../../SequentialActivitiesComponents/ResultsComponents/TeacherBarDetails';
import ChildLineTrends from '../../MathInstructionComponents/ResultsComponents/ChildLineTrends';
import TeacherLineTrends from '../../MathInstructionComponents/ResultsComponents/TeacherLineTrends';
import SequentialActivitiesImage from '../../../assets/images/SequentialActivitiesImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import moment from 'moment';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

interface Props {
  data: {
    childSummary: {
      sequential: number,
      notSequential: number
    } | undefined,
    teacherSummary: {
      support: number,
      noSupport: number,
      noOpportunity: number
    } | undefined,
    childDetails: {
      sequential1: number,
      sequential2: number,
      sequential3: number,
      sequential4: number
    } | undefined,
    teacherDetails: {
      teacher1: number,
      teacher2: number,
      teacher3: number,
      teacher4: number
    } | undefined,
    childTrends: Array<{
      startDate: {value: string},
      sequential: number,
      notSequential: number
    }> | undefined,
    teacherTrends: Array<{
      startDate: {value: string},
      noOpportunity: number,
      support: number,
      noSupport: number
    }> | undefined,
  } | undefined,
  date: Date | undefined,
  teacher: Types.Teacher | undefined
}

const SequentialResultsPdf: React.FC<Props> = (props: Props) => {
  
  /**
   * specifies formatting for child trends
   * @return {object}
   */
  const handleTrendsChildFormatData = (): {
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
        labels: props.data.childTrends ? props.data.childTrends.map(observation => moment(observation.startDate.value).format("MMM Do")) : [],
        datasets: [
          {
            label: "Non-Sequential Activities",
            data: props.data.childTrends ? props.data.childTrends.map(observation => Math.round((observation.notSequential / (observation.sequential + observation.notSequential)) * 100)) : [],
            backgroundColor: '#ec2409',
            borderColor: '#ec2409',
            fill: false,
            lineTension: 0
          },
          {
            label: "Sequential Activities",
            data: props.data.childTrends ? props.data.childTrends.map(observation => Math.round((observation.sequential / (observation.sequential + observation.notSequential)) * 100)) : [],
            backgroundColor: Constants.Colors.SA,
            borderColor: Constants.Colors.SA,
            fill: false,
            lineTension: 0
          }
        ]
      }
    } else {
      return
    };
  };

  /**
   * specifies formatting for teacher trends
   * @return {object}
   */
  const handleTrendsTeacherFormatData = (): {
    labels: Array<string>,
    datasets: Array<{
      label: string,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number,
      data: Array<number>
    }>,
  } | undefined => {
    if (props.data) {
      return {
        labels: props.data.teacherTrends ? props.data.teacherTrends.map(observation => moment(observation.startDate.value).format("MMM Do")) : [],
        datasets: [
          {
            label: "Teacher Not at Center",
            backgroundColor: Constants.Colors.NotPresent,
            borderColor: Constants.Colors.NotPresent,
            fill: false,
            lineTension: 0,
            data: props.data.teacherTrends ? props.data.teacherTrends.map(observation => Math.round((observation.noOpportunity / (observation.noOpportunity + observation.noSupport + observation.support)) * 100)) : [],
          },
          {
            label: "No Support",
            backgroundColor: Constants.Colors.RedGraph,
            borderColor: Constants.Colors.RedGraph,
            fill: false,
            lineTension: 0,
            data: props.data.teacherTrends ? props.data.teacherTrends.map(observation => Math.round((observation.noSupport / (observation.noOpportunity + observation.noSupport + observation.support)) * 100)) : [],
          },
          {
            label: "Teacher Support",
            backgroundColor: Constants.Colors.AppBar,
            borderColor: Constants.Colors.AppBar,
            fill: false,
            lineTension: 0,
            data: props.data.teacherTrends ? props.data.teacherTrends.map(observation => Math.round((observation.support / (observation.noOpportunity + observation.noSupport + observation.support)) * 100)) : [],
          },
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
                  SEQUENTIAL ACTIVITIES RESULTS
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <img
                  src={SequentialActivitiesImage}
                  alt="Sequential Activities"
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
            {props.data && props.data.childSummary ? (
              <Grid item style={{paddingTop: '1em'}}>
                <ChildPieSummary
                  sequential={props.data.childSummary.sequential}
                  notSequential={props.data.childSummary.notSequential}
                />
              </Grid>
            ) : (null)}
            {props.data && props.data.teacherSummary ? (
              <Grid item style={{paddingTop: '8em'}}>
                <TeacherPieSummary
                  support={props.data.teacherSummary.support}
                  noSupport={props.data.teacherSummary.noSupport}
                  noTeacherOpp={props.data.teacherSummary.noOpportunity}
                />
              </Grid>
            ) : (null)}
            {props.data && props.data.childDetails ? (
              <Grid item style={{paddingTop: '8em'}}>
                <ChildBarDetails
                  sequential1={props.data.childDetails.sequential1}
                  sequential2={props.data.childDetails.sequential2}
                  sequential3={props.data.childDetails.sequential3}
                  sequential4={props.data.childDetails.sequential4}
                />
              </Grid>
            ) : (null)}
            {props.data && props.data.teacherDetails ? (
              <Grid item style={{paddingTop: '8em'}}>
                <TeacherBarDetails
                  teacher1={props.data.teacherDetails.teacher1}
                  teacher2={props.data.teacherDetails.teacher2}
                  teacher3={props.data.teacherDetails.teacher3}
                  teacher4={props.data.teacherDetails.teacher4}
                />
              </Grid>
            ) : (null)}
            {props.data && props.data.childTrends ? (
              <Grid item style={{paddingTop: '8em'}}>
                <ChildLineTrends
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
                  } | undefined => handleTrendsChildFormatData()}
                />
              </Grid>
            ) : (null)}
            {props.data && props.data.childTrends ? (
              <Grid item style={{paddingTop: '8em'}}>
                <TeacherLineTrends
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
                  } | undefined => handleTrendsTeacherFormatData()}
                />
              </Grid>
            ) : (null)}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default (SequentialResultsPdf);