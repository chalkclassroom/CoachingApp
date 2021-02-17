import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListeningSummaryChart from '../ListeningComponents/ResultsComponents/ListeningSummaryChart';
import ListeningDetailsChart from '../ListeningComponents/ResultsComponents/ListeningDetailsChart';
import ListeningTrendsGraph from '../ListeningComponents/ResultsComponents/ListeningTrendsGraph';
import ListeningtoChildrenImage from '../../assets/images/ListeningtoChildrenImage.png';
import LogoImage from '../../assets/images/LogoImage.png';
import moment from 'moment';
import * as Types from '../../constants/Types';
import * as Constants from '../../constants/Constants';

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
  date: Date | undefined,
  teacher: Types.Teacher | undefined
}

const ListeningResultsPdf: React.FC<ListeningResultsProps> = (props: ListeningResultsProps) => {
  
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
  } => {
    return {
      labels: props.data.trends ? [props.data.trends.map(observation => moment(observation.startDate.value).format("MMM Do"))] : [],
      datasets: [
        {
          label: "Teacher Listening",
          backgroundColor: Constants.Colors.LC,
          borderColor: Constants.Colors.LC,
          fill: false,
          lineTension: 0,
          data: props.data.trends ? props.data.trends.map(observation => Math.round((observation.listening / (observation.listening + observation.notListening)) * 100)) : []
        },
        {
          label: "Other Tasks or Behaviors",
          backgroundColor: Constants.Colors.RedGraph,
          borderColor: Constants.Colors.RedGraph,
          fill: false,
          lineTension: 0,
          data: props.data.trends ? props.data.trends.map(observation => Math.round((observation.notListening / (observation.listening + observation.notListening)) * 100)) : []
        }
      ]
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
              {props.teacher.firstName + " " + props.teacher.lastName}
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
              {props.data.summary ? (
                <ListeningSummaryChart
                  listening={props.data.summary.listening}
                  notListening={props.data.summary.notListening}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '8em'}}>
              {props.data.details ? (
                <ListeningDetailsChart
                  listening1={props.data.details.listening1}
                  listening2={props.data.details.listening2}
                  listening3={props.data.details.listening3}
                  listening4={props.data.details.listening4}
                  listening5={props.data.details.listening5}
                  listening6={props.data.details.listening6}
                />
              ) : (null)}
            </Grid>
            <Grid item style={{paddingTop: '8em'}}>
              {props.data.trends ? (
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
                    }>} => handleTrendsFormatData()}
                />
              ) : (null)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default (ListeningResultsPdf);