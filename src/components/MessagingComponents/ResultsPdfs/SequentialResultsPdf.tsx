import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChildPieSummary from '../../SequentialActivitiesComponents/ResultsComponents/ChildPieSummary';
import TeacherPieSummary from '../../SequentialActivitiesComponents/ResultsComponents/TeacherPieSummary';
import ChildBarDetails from '../../SequentialActivitiesComponents/ResultsComponents/ChildBarDetails';
import TeacherBarDetails from '../../SequentialActivitiesComponents/ResultsComponents/TeacherBarDetails';
import ChildLineTrends from './ChildLineTrends';
import TeacherLineTrends from './TeacherLineTrends';
import SequentialActivitiesImage from '../../../assets/images/SequentialActivitiesImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import * as moment from 'moment';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

interface Props {
  data: {
    childSummary: {
      sequential: number,
      notSequential: number
    },
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
  date: Date,
  teacher: Types.Teacher | undefined,
  id: string,
  printDocument(practice: string | undefined, date: Date, elementId: string, addToAttachmentList: unknown, id: string): void,
  addToAttachmentList(base64string: string, id: string): void
}

const SequentialResultsPdf: React.FC<Props> = (props: Props) => {

  const {printDocument, id, addToAttachmentList, data, date, teacher} = props;

  // graphs are true if they have not been selected for PDF, otherwise false until animation onComplete
  const [childSummary, setChildSummary] = useState(data && data.childSummary && data.teacherSummary ? false : true);
  const [teacherSummary, setTeacherSummary] = useState(data && data.teacherSummary ? false : true);
  const [childDetails, setChildDetails] = useState(data && data.childDetails ? false : true);
  const [teacherDetails, setTeacherDetails] = useState(data && data.teacherDetails ? false : true);
  const [childTrends, setChildTrends] = useState(data && data.childTrends ? false : true);
  const [teacherTrends, setTeacherTrends] = useState(data && data.teacherTrends ? false : true);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    // generate PDF once all graphs have rendered
    if (childSummary && teacherSummary && childDetails && teacherDetails && childTrends && teacherTrends && !attached) {
      printDocument('Sequential Activities', date, id, addToAttachmentList, id);
      setAttached(true);
    }
  })
  
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
    if (data) {
      return {
        labels: data.childTrends ? data.childTrends.map(observation => moment(observation.startDate.value).format("MMM Do")) : [],
        datasets: [
          {
            label: "Non-Sequential Activities",
            data: data.childTrends ? data.childTrends.map(observation => Math.round((observation.notSequential / (observation.sequential + observation.notSequential)) * 100)) : [],
            backgroundColor: '#ec2409',
            borderColor: '#ec2409',
            fill: false,
            lineTension: 0
          },
          {
            label: "Sequential Activities",
            data: data.childTrends ? data.childTrends.map(observation => Math.round((observation.sequential / (observation.sequential + observation.notSequential)) * 100)) : [],
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
    if (data) {
      return {
        labels: data.teacherTrends ? data.teacherTrends.map(observation => moment(observation.startDate.value).format("MMM Do")) : [],
        datasets: [
          {
            label: "Teacher Not at Center",
            backgroundColor: Constants.Colors.NotPresent,
            borderColor: Constants.Colors.NotPresent,
            fill: false,
            lineTension: 0,
            data: data.teacherTrends ? data.teacherTrends.map(observation => Math.round((observation.noOpportunity / (observation.noOpportunity + observation.noSupport + observation.support)) * 100)) : [],
          },
          {
            label: "No Support",
            backgroundColor: Constants.Colors.RedGraph,
            borderColor: Constants.Colors.RedGraph,
            fill: false,
            lineTension: 0,
            data: data.teacherTrends ? data.teacherTrends.map(observation => Math.round((observation.noSupport / (observation.noOpportunity + observation.noSupport + observation.support)) * 100)) : [],
          },
          {
            label: "Teacher Support",
            backgroundColor: Constants.Colors.AppBar,
            borderColor: Constants.Colors.AppBar,
            fill: false,
            lineTension: 0,
            data: data.teacherTrends ? data.teacherTrends.map(observation => Math.round((observation.support / (observation.noOpportunity + observation.noSupport + observation.support)) * 100)) : [],
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
            {data && data.childSummary && data.teacherSummary ? (
              <Grid item style={{paddingTop: '1em'}}>
                <ChildPieSummary
                  sequential={data.childSummary.sequential}
                  notSequential={data.childSummary.notSequential}
                  completed={(): void => {setChildSummary(true)}}
                  title={true}
                />
              </Grid>
            ) : (null)}
            {data && data.teacherSummary ? (
              <Grid item style={{paddingTop: '8em'}}>
                <TeacherPieSummary
                  support={data.teacherSummary.support}
                  noSupport={data.teacherSummary.noSupport}
                  noTeacherOpp={data.teacherSummary.noOpportunity}
                  completed={(): void => {setTeacherSummary(true)}}
                  title={true}
                />
              </Grid>
            ) : (null)}
            {data && data.childDetails ? (
              <div>
                {data.teacherSummary ? (<Grid item style={{height: '148px'}} />) : null}
                <Grid item style={{paddingTop: '1em'}}>
                  <ChildBarDetails
                    sequential1={data.childDetails.sequential1}
                    sequential2={data.childDetails.sequential2}
                    sequential3={data.childDetails.sequential3}
                    sequential4={data.childDetails.sequential4}
                    totalVisits={data.childSummary.sequential + data.childSummary.notSequential}
                    completed={(): void => {setChildDetails(true)}}
                    title={true}
                  />
                </Grid>
              </div>
            ) : (null)}
            {data && data.teacherDetails ? (
              <Grid item style={{paddingTop: '8em'}}>
                <TeacherBarDetails
                  teacher1={data.teacherDetails.teacher1}
                  teacher2={data.teacherDetails.teacher2}
                  teacher3={data.teacherDetails.teacher3}
                  teacher4={data.teacherDetails.teacher4}
                  totalVisits={data.childSummary.sequential + data.childSummary.notSequential}
                  completed={(): void => {setTeacherDetails(true)}}
                  title={true}
                />
              </Grid>
            ) : (null)}
            {data && data.childTrends ? (
              <div>
                {(data.teacherSummary || data.childDetails) ? (<Grid item style={{height: '148px'}} />) : null}
                <Grid item style={{paddingTop: '1em'}}>
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
                    completed={(): void => {setChildTrends(true)}}
                    title={true}
                  />
                </Grid>
              </div>
            ) : (null)}
            {data && data.teacherTrends ? (
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
                  completed={(): void => {setTeacherTrends(true)}}
                  title={true}
                />
              </Grid>
            ) : (null)}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

SequentialResultsPdf.propTypes = {
  printDocument: PropTypes.func.isRequired,
  addToAttachmentList: PropTypes.func.isRequired
}

export default (SequentialResultsPdf);