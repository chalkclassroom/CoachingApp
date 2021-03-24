import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
import * as moment from 'moment';
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
  date: Date,
  teacher: Types.Teacher | undefined,
  id: string,
  printDocument(practice: string | undefined, date: Date, elementId: string, addToAttachmentList: unknown, id: string): void,
  addToAttachmentList(base64string: string, id: string): void
}

const ACResultsPdf: React.FC<Props> = (props: Props) => {
  
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
      printDocument('Associative and Cooperative', date, id, addToAttachmentList, id);
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
            label: "No Opportunity",
            backgroundColor: Constants.Colors.NotPresent,
            borderColor: Constants.Colors.NotPresent,
            fill: false,
            lineTension: 0,
            data: data.childTrends ? data.childTrends.map(observation => Math.round((observation.noOpportunity / (observation.noOpportunity + observation.noac + observation.ac)) * 100)) : []
          },
          {
            label: "No Assoc./Coop. Interaction",
            backgroundColor: '#ec2409',
            borderColor: '#ec2409',
            fill: false,
            lineTension: 0,
            data: data.childTrends ? data.childTrends.map(observation => Math.round((observation.noac / (observation.noOpportunity + observation.noac + observation.ac)) * 100)) : []
          },
          {
            label: "Associative and/or Cooperative",
            backgroundColor: Constants.Colors.AC,
            borderColor: Constants.Colors.AC,
            fill: false,
            lineTension: 0,
            data: data.childTrends ? data.childTrends.map(observation => Math.round((observation.ac / (observation.noOpportunity + observation.noac + observation.ac)) * 100)) : []
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
            data: data.teacherTrends ? data.teacherTrends.map(observation => Math.round((observation.noOpportunity / (observation.noOpportunity + observation.nosupport + observation.support)) * 100)) : [],
          },
          {
            label: "No Support",
            backgroundColor: Constants.Colors.RedGraph,
            borderColor: Constants.Colors.RedGraph,
            fill: false,
            lineTension: 0,
            data: data.teacherTrends ? data.teacherTrends.map(observation => Math.round((observation.nosupport / (observation.noOpportunity + observation.nosupport + observation.support)) * 100)) : [],
          },
          {
            label: "Teacher Support",
            backgroundColor: Constants.Colors.AppBar,
            borderColor: Constants.Colors.AppBar,
            fill: false,
            lineTension: 0,
            data: data.teacherTrends ? data.teacherTrends.map(observation => Math.round((observation.support / (observation.noOpportunity + observation.nosupport + observation.support)) * 100)) : [],
          },
        ]
      };
    } else {
      return;
    }
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
        <Grid item style={{width: '100%'}} id="hello">
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
                <ChildBehaviorsPie
                  ac={data.childSummary.ac}
                  noAc={data.childSummary.noac}
                  noChildOpp={data.childSummary.noOpportunity}
                  completed={(): void => {setChildSummary(true)}}
                  title={true}
                />
              </Grid>
            ) : (null)}
            {data && data.teacherSummary ? (
              <Grid item style={{paddingTop: '8em'}}>
                <TeacherBehaviorsPie
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
                  <ChildBehaviorsDetailsHorizontalBar
                    ac1={data.childDetails.ac1}
                    ac2={data.childDetails.ac2}
                    ac3={data.childDetails.ac3}
                    ac4={data.childDetails.ac4}
                    totalVisits={
                      data.childSummary.ac +
                      data.childSummary.noac +
                      data.childSummary.noOpportunity
                    }
                    completed={(): void => {setChildDetails(true)}}
                    title={true}
                  />
                </Grid>
              </div>
            ) : (null)}
            {data && data.teacherDetails ? (
              <Grid item style={{paddingTop: '8em'}}>
                <TeacherBehaviorsDetailsHorizontalBar
                  teacher1={data.teacherDetails.teacher1}
                  teacher2={data.teacherDetails.teacher2}
                  teacher3={data.teacherDetails.teacher3}
                  teacher4={data.teacherDetails.teacher4}
                  totalVisits={
                    data.childSummary.ac +
                    data.childSummary.noac +
                    data.childSummary.noOpportunity
                  }
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

ACResultsPdf.propTypes = {
  printDocument: PropTypes.func.isRequired,
  addToAttachmentList: PropTypes.func.isRequired
}

export default (ACResultsPdf);