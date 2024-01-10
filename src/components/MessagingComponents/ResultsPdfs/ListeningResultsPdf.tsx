import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListeningSummaryChart from '../../ListeningComponents/ResultsComponents/ListeningSummaryChart';
import ListeningDetailsChart from '../../ListeningComponents/ResultsComponents/ListeningDetailsChart';
import ListeningTrendsGraph from '../../ListeningComponents/ResultsComponents/ListeningTrendsGraph';
import ListeningtoChildrenImage from '../../../assets/images/ListeningtoChildrenImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import * as moment from 'moment';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

interface ListeningResultsProps {
  data: {
    summary: {listening: number, notListening: number} | undefined,
    details: {
      listening1: number,
      listening2: number,
      listening3: number,
      listening4: number,
      listening5: number,
      listening6: number
    } | undefined,
    trends: Array<{
      startDate: {value: string},
      listening: number,
      notListening: number
    }> | undefined
  } | undefined,
  date: Date,
  teacher: Types.Teacher | undefined,
  id: string,
  printDocument(practice: string | undefined, date: Date, elementId: string, id: string): void
}

const ListeningResultsPdf: React.FC<ListeningResultsProps> = (props: ListeningResultsProps) => {
  
  const {printDocument, id, data, date, teacher} = props;

  // graphs are true if they have not been selected for PDF, otherwise false until animation onComplete
  const [summary, setSummary] = useState(data && data.summary ? false : true);
  const [details, setDetails] = useState(data && data.details ? false : true);
  const [trends, setTrends] = useState(data && data.trends ? false : true);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    // generate PDF once all graphs have rendered
    if (summary && details && trends && !attached) {
      printDocument('Listening to Children', date, id, id);
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
      data.trends.map(observation => dateArray.push([moment(observation.startDate.value).format("MMM Do YYYY")]))
      return {
        labels: dateArray,
        datasets: [
          {
            label: "Teacher Listening",
            backgroundColor: Constants.Colors.LC,
            borderColor: Constants.Colors.LC,
            fill: false,
            lineTension: 0,
            data: data.trends ? data.trends.map(observation => Math.round((observation.listening / (observation.listening + observation.notListening)) * 100)) : []
          },
          {
            label: "Other Tasks or Behaviors",
            backgroundColor: Constants.Colors.RedGraph,
            borderColor: Constants.Colors.RedGraph,
            fill: false,
            lineTension: 0,
            data: data.trends ? data.trends.map(observation => Math.round((observation.notListening / (observation.listening + observation.notListening)) * 100)) : []
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
                  LISTENING TO CHILDREN RESULTS
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <img
                  src={ListeningtoChildrenImage}
                  alt="Listening to Children"
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
            <Grid item style={{paddingTop: '4em', width: '100%', height: '450px'}}>
              {data && data.summary ? (
                <ListeningSummaryChart
                  listening={data.summary.listening}
                  notListening={data.summary.notListening}
                  completed={(): void => {setSummary(true)}}
                  title={true}
                />
              ) : (null)}
            </Grid>
            {data && data.details ? (
              <Grid item style={{paddingTop: data.summary ? '4em' : '1em', width: '100%', height: '450px'}}>
                <ListeningDetailsChart
                  listening1={data.details.listening1}
                  listening2={data.details.listening2}
                  listening3={data.details.listening3}
                  listening4={data.details.listening4}
                  listening5={data.details.listening5}
                  listening6={data.details.listening6}
                  completed={(): void => {setDetails(true)}}
                  title={true}
                />
              </Grid>
            ) : (null)}
            {data && data.trends ? (
              <div style={{width: '100%'}}>
                {(data.summary && data.details) ? (<Grid item style={{height: '148px'}} />) : null}
                <Grid item style={{width: '100%', minHeight: '450px', paddingTop: ((data.summary && data.details) || (!data.summary && !data.details)) ? '1em' : '8em'}}>
                  <ListeningTrendsGraph
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

ListeningResultsPdf.propTypes = {
  printDocument: PropTypes.func.isRequired
}

export default (ListeningResultsPdf);