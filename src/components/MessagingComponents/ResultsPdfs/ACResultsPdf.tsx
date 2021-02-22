import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChildBehaviorsPie from '../../AssociativeCooperativeComponents/ResultsComponents/ChildBehaviorsPie';
import TeacherBehaviorsPie from '../../AssociativeCooperativeComponents/ResultsComponents/TeacherBehaviorsPie';
import ChildBehaviorsDetailsHorizontalBar from '../../AssociativeCooperativeComponents/ResultsComponents/ChildBehaviorsDetailsHorizontalBar';
import TeacherBehaviorsDetailsHorizontalBar from '../../AssociativeCooperativeComponents/ResultsComponents/TeacherBehaviorsDetailsHorizontalBar';
import ChildLineTrends from './ChildLineTrends';
import TeacherLineTrends from './TeacherLineTrends';
import AssocCoopInteractionsImage from '../../../assets/images/AssocCoopInteractionsImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import moment from 'moment';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

interface Props {
  data: {
    childSummary: {
      ac: number,
      noac: number,
      noOpportunity: number
    },
    teacherSummary: {
      support: number,
      noSupport: number,
      noOpportunity: number
    } | undefined,
    childDetails: {
      ac1: number,
      ac2: number,
      ac3: number,
      ac4: number
    } | undefined,
    teacherDetails: {
      teacher1: number,
      teacher2: number,
      teacher3: number,
      teacher4: number
    } | undefined,
    childTrends: Array<{
      startDate: {value: string},
      noOpportunity: number,
      noac: number,
      ac: number
    }> | undefined,
    teacherTrends: Array<{
      startDate: {value: string},
      noOpportunity: number,
      support: number,
      nosupport: number
    }> | undefined,
  } | undefined,
  date: Date | undefined,
  teacher: Types.Teacher | undefined
}

const ACResultsPdf: React.FC<Props> = (props: Props) => {
  
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
            label: "No Opportunity",
            backgroundColor: Constants.Colors.NotPresent,
            borderColor: Constants.Colors.NotPresent,
            fill: false,
            lineTension: 0,
            data: props.data.childTrends ? props.data.childTrends.map(observation => Math.round((observation.noOpportunity / (observation.noOpportunity + observation.noac + observation.ac)) * 100)) : []
          },
          {
            label: "No Assoc./Coop. Interaction",
            backgroundColor: '#ec2409',
            borderColor: '#ec2409',
            fill: false,
            lineTension: 0,
            data: props.data.childTrends ? props.data.childTrends.map(observation => Math.round((observation.noac / (observation.noOpportunity + observation.noac + observation.ac)) * 100)) : []
          },
          {
            label: "Associative and/or Cooperative",
            backgroundColor: Constants.Colors.AC,
            borderColor: Constants.Colors.AC,
            fill: false,
            lineTension: 0,
            data: props.data.childTrends ? props.data.childTrends.map(observation => Math.round((observation.ac / (observation.noOpportunity + observation.noac + observation.ac)) * 100)) : []
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
            data: props.data.teacherTrends ? props.data.teacherTrends.map(observation => Math.round((observation.noOpportunity / (observation.noOpportunity + observation.nosupport + observation.support)) * 100)) : [],
          },
          {
            label: "No Support",
            backgroundColor: Constants.Colors.RedGraph,
            borderColor: Constants.Colors.RedGraph,
            fill: false,
            lineTension: 0,
            data: props.data.teacherTrends ? props.data.teacherTrends.map(observation => Math.round((observation.nosupport / (observation.noOpportunity + observation.nosupport + observation.support)) * 100)) : [],
          },
          {
            label: "Teacher Support",
            backgroundColor: Constants.Colors.AppBar,
            borderColor: Constants.Colors.AppBar,
            fill: false,
            lineTension: 0,
            data: props.data.teacherTrends ? props.data.teacherTrends.map(observation => Math.round((observation.support / (observation.noOpportunity + observation.nosupport + observation.support)) * 100)) : [],
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
                  ASSOCIATIVE AND COOPERATIVE INTERACTIONS RESULTS
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <img
                  src={AssocCoopInteractionsImage}
                  alt="Associative and Cooperative"
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
            {props.data && props.data.childSummary && props.data.teacherSummary ? (
              <Grid item style={{paddingTop: '1em'}}>
                <ChildBehaviorsPie
                  ac={props.data.childSummary.ac}
                  noAc={props.data.childSummary.noac}
                  noChildOpp={props.data.childSummary.noOpportunity}
                />
              </Grid>
            ) : (null)}
            {props.data && props.data.teacherSummary ? (
              <Grid item style={{paddingTop: '8em'}}>
                <TeacherBehaviorsPie
                  support={props.data.teacherSummary.support}
                  noSupport={props.data.teacherSummary.noSupport}
                  noTeacherOpp={props.data.teacherSummary.noOpportunity}
                />
              </Grid>
            ) : (null)}
            {props.data && props.data.childDetails ? (
              <Grid item style={{paddingTop: '8em'}}>
                <ChildBehaviorsDetailsHorizontalBar
                  ac1={props.data.childDetails.ac1}
                  ac2={props.data.childDetails.ac2}
                  ac3={props.data.childDetails.ac3}
                  ac4={props.data.childDetails.ac4}
                  totalVisits={
                    props.data.childSummary.ac +
                    props.data.childSummary.noac +
                    props.data.childSummary.noOpportunity
                  }
                />
              </Grid>
            ) : (null)}
            {props.data && props.data.teacherDetails ? (
              <Grid item style={{paddingTop: '8em'}}>
                <TeacherBehaviorsDetailsHorizontalBar
                  teacher1={props.data.teacherDetails.teacher1}
                  teacher2={props.data.teacherDetails.teacher2}
                  teacher3={props.data.teacherDetails.teacher3}
                  teacher4={props.data.teacherDetails.teacher4}
                  totalVisits={
                    props.data.childSummary.ac +
                    props.data.childSummary.noac +
                    props.data.childSummary.noOpportunity
                  }
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
            {props.data && props.data.teacherTrends ? (
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

export default (ACResultsPdf);