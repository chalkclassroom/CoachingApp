import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListeningSummaryChart from '../ListeningComponents/ResultsComponents/ListeningSummaryChart';
import ListeningDetailsChart from '../ListeningComponents/ResultsComponents/ListeningDetailsChart';
import ListeningTrendsGraph from '../ListeningComponents/ResultsComponents/ListeningTrendsGraph';
import ListeningtoChildrenImage from '../../assets/images/ListeningtoChildrenImage.png';
import LogoImage from '../../assets/images/LogoImage.png';
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif';
import moment from 'moment';
import * as Types from '../../constants/Types';
import * as Constants from '../../constants/Constants';

interface ListeningResultsProps {
  sessionId: string,
  selections: {
    summary: boolean,
    details: boolean,
    trends: boolean
  },
  firebase: {
    fetchListeningSummary(sessionId: string): Promise<{listening: number, notListening: number}>,
    fetchListeningDetails(sessionId: string): Promise<{
      listening1: number,
      listening2: number,
      listening3: number,
      listening4: number,
      listening5: number,
      listening6: number
    }>,
    fetchListeningTrend(teacherId: string): Promise<Array<{
      startDate: {value: string},
      listening: number,
      notListening: number
    }>>
  },
  date: Date,
  teacher: Types.Teacher
}

const ListeningResultsPdf: React.FC<ListeningResultsProps> = (props: ListeningResultsProps) => {
  const [listening, setListening] = useState(0);
  const [notListening, setNotListening] = useState(0);
  const [listeningDetails, setListeningDetails] = useState({
    listening1: 0,
    listening2: 0,
    listening3: 0,
    listening4: 0,
    listening5: 0,
    listening6: 0
  });
  const [trendsDates, setTrendsDates] = useState<Array<Array<string>>>([]);
  const [trendsListening, setTrendsListening] = useState<Array<number>>([]);
  const [trendsNotListening, setTrendsNotListening] = useState<Array<number>>([]);
  const [summaryDone, setSummaryDone] = useState(false);
  const [detailsDone, setDetailsDone] = useState(false);
  const [trendsDone, setTrendsDone] = useState(false);

  useEffect(() => {
    if (!summaryDone && props.selections.summary) {
      props.firebase.fetchListeningSummary(props.sessionId)
        .then((summary: {listening: number, notListening: number}) => {
          setListening(summary.listening);
          setNotListening(summary.notListening);
          setSummaryDone(true)
        });
    } else if (!summaryDone && !props.selections.summary) {
      setSummaryDone(true)
    }
    if (!detailsDone && props.selections.details) {
      props.firebase.fetchListeningDetails(props.sessionId)
      .then((details: {
        listening1: number,
        listening2: number,
        listening3: number,
        listening4: number,
        listening5: number,
        listening6: number,
      }) => {
        setListeningDetails({
          listening1: details.listening1,
          listening2: details.listening2,
          listening3: details.listening3,
          listening4: details.listening4,
          listening5: details.listening5,
          listening6: details.listening6
        })
        setDetailsDone(true)
      })
    } else if (!detailsDone && !props.selections.details) {
      setDetailsDone(true)
    }
    if (!trendsDone && props.selections.trends) {
      const dateArray: Array<Array<string>> = [];
      const listeningArray: Array<number> = [];
      const notListeningArray: Array<number> = [];
      props.firebase.fetchListeningTrend(props.teacher.id)
      .then((dataSet: Array<{
        startDate: { value: string },
        listening: number,
        notListening: number
      }>) => {
        dataSet.forEach(data => {          
          dateArray.push([
            moment(data.startDate.value).format("MMM Do"),
          ]);
          listeningArray.push(Math.round((data.listening / (data.listening + data.notListening)) * 100));
          notListeningArray.push(Math.round((data.notListening / (data.listening + data.notListening)) * 100));
        });
        setTrendsDates(dateArray);
        setTrendsListening(listeningArray);
        setTrendsNotListening(notListeningArray);
      });
      setTrendsDone(true);
    } else if (!trendsDone && !props.selections.trends) {
      setTrendsDone(true)
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
  } => {
    return {
      labels: trendsDates,
      datasets: [
        {
          label: "Teacher Listening",
          backgroundColor: Constants.Colors.LC,
          borderColor: Constants.Colors.LC,
          fill: false,
          lineTension: 0,
          data: trendsListening
        },
        {
          label: "Other Tasks or Behaviors",
          backgroundColor: Constants.Colors.RedGraph,
          borderColor: Constants.Colors.RedGraph,
          fill: false,
          lineTension: 0,
          data: trendsNotListening
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
        {summaryDone && detailsDone ? (
          <div>
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
                {props.selections.summary ? (
                  <ListeningSummaryChart
                    listening={listening}
                    notListening={notListening}
                  />
                ) : (null)}
              </Grid>
              <Grid item style={{paddingTop: '1em'}}>
                {props.selections.details ? (
                  <ListeningDetailsChart
                    listening1={listeningDetails.listening1}
                    listening2={listeningDetails.listening2}
                    listening3={listeningDetails.listening3}
                    listening4={listeningDetails.listening4}
                    listening5={listeningDetails.listening5}
                    listening6={listeningDetails.listening6}
                  />
                ) : (null)}
              </Grid>
              <Grid item style={{paddingTop: '2em'}}>
                {props.selections.trends ? (
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
        </div>
        ) : (
          <Grid item>
            <img src={CHALKLogoGIF} alt="Generating preview..." />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default (ListeningResultsPdf);