import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LiteracySummaryChart from '../../LiteracyComponents/ResultsComponents/LiteracySummaryChart';
import LiteracyDetailsFoundationalChart from '../../LiteracyComponents/ResultsComponents/LiteracyDetailsFoundationalChart';
import LiteracyDetailsWritingChart from '../../LiteracyComponents/ResultsComponents/LiteracyDetailsWritingChart';
import LiteracyDetailsReadingChart from '../../LiteracyComponents/ResultsComponents/LiteracyDetailsReadingChart';
import LiteracyDetailsLanguageChart from '../../LiteracyComponents/ResultsComponents/LiteracyDetailsLanguageChart';
import LiteracyIconImage from '../../../assets/images/LiteracyIconImage.png';
import LogoImage from '../../../assets/images/LogoImage.png';
import moment from 'moment';
import * as Types from '../../../constants/Types';
import * as Constants from '../../../constants/Constants';

interface Props {
  data: {
    summary: {
      literacy: number,
      noLiteracy: number
    },
    details: {
      literacy1: number,
      literacy2: number,
      literacy3: number,
      literacy4: number,
      literacy5: number,
      literacy6: number,
      literacy7: number,
      literacy8: number,
      literacy9?: number,
      literacy10?: number,
    } | undefined,
    type: string
    /* childTrends: Array<{
      startDate: {value: string},
      math: number,
      notMath: number
    }> | undefined,
    teacherTrends: Array<{
      startDate: {value: string},
      noOpportunity: number,
      support: number,
      noSupport: number
    }> | undefined, */
  } | undefined,
  who: string,
  date: Date,
  teacher: Types.Teacher | undefined,
  id: string,
  printDocument(practice: string | undefined, date: Date, elementId: string, id: string): void
}

const LiteracyResultsPdf: React.FC<Props> = (props: Props) => {

  const {printDocument, id, data, date, teacher, who} = props;
  
  // graphs are true if they have not been selected for PDF, otherwise false until animation onComplete
  const [summary, setSummary] = useState(data && data.summary ? false : true);
  // const [teacherSummary, setTeacherSummary] = useState(data && data.teacherSummary ? false : true);
  const [details, setDetails] = useState(data && data.details ? false : true);
  // const [teacherDetails, setTeacherDetails] = useState(data && data.teacherDetails ? false : true);
  // const [childTrends, setChildTrends] = useState(data && data.childTrends ? false : true);
  // const [teacherTrends, setTeacherTrends] = useState(data && data.teacherTrends ? false : true);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    // generate PDF once all graphs have rendered
    if (summary && details && !attached) {
      printDocument('Literacy Instruction', date, id, id);
      setAttached(true);
    }
  })

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
                  LITERACY INSTRUCTION RESULTS
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <img
                  src={LiteracyIconImage}
                  alt="Literacy Instruction"
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
            {data && data.summary ? (
              <Grid item style={{paddingTop: '1em'}}>
                <LiteracySummaryChart
                  literacy={data.summary.literacy}
                  noLiteracy={data.summary.noLiteracy}
                  type={data.type}
                  completed={(): void => {setSummary(true)}}
                  title={true}
                />
              </Grid>
            ) : (null)}
            {data && data.details ? (
              <div>
                {data.summary ? (<Grid item style={{height: '50px'}} />) : null}
                <Grid item style={{paddingTop: '1em'}}>
                  {(data.type === 'FoundationalTeacher' || data.type === 'FoundationalChild') ? (
                    <LiteracyDetailsFoundationalChart
                      literacy1={data.details.literacy1}
                      literacy2={data.details.literacy2}
                      literacy3={data.details.literacy3}
                      literacy4={data.details.literacy4}
                      literacy5={data.details.literacy5}
                      literacy6={data.details.literacy6}
                      literacy7={data.details.literacy7}
                      literacy8={data.details.literacy8}
                      literacy9={data.details.literacy9 ? data.details.literacy9 : 0}
                      literacy10={data.details.literacy10 ? data.details.literacy10 : 0}
                      who={who}
                      completed={(): void => {setDetails(true)}}
                      title={true}
                    />
                  ) : (data.type === 'WritingTeacher' || data.type === 'WritingChild') ? (
                    <LiteracyDetailsWritingChart
                      literacy1={data.details.literacy1}
                      literacy2={data.details.literacy2}
                      literacy3={data.details.literacy3}
                      literacy4={data.details.literacy4}
                      literacy5={data.details.literacy5}
                      literacy6={data.details.literacy6}
                      literacy7={data.details.literacy7}
                      literacy8={data.details.literacy8}
                      who={who}
                      completed={(): void => {setDetails(true)}}
                      title={true}
                    />
                  ) : (data.type === 'ReadingTeacher' || data.type === 'ReadingChild') ? (
                    <LiteracyDetailsReadingChart
                      literacy1={data.details.literacy1}
                      literacy2={data.details.literacy2}
                      literacy3={data.details.literacy3}
                      literacy4={data.details.literacy4}
                      literacy5={data.details.literacy5}
                      literacy6={data.details.literacy6}
                      literacy7={data.details.literacy7}
                      literacy8={data.details.literacy8}
                      literacy9={data.details.literacy9 ? data.details.literacy9 : 0}
                      literacy10={data.details.literacy10 ? data.details.literacy10 : 0}
                      who={who}
                      completed={(): void => {setDetails(true)}}
                      title={true}
                    />
                  ) : (
                    <LiteracyDetailsLanguageChart
                      literacy1={data.details.literacy1}
                      literacy2={data.details.literacy2}
                      literacy3={data.details.literacy3}
                      literacy4={data.details.literacy4}
                      literacy5={data.details.literacy5}
                      literacy6={data.details.literacy6}
                      literacy7={data.details.literacy7}
                      literacy8={data.details.literacy8}
                      who={who}
                      completed={(): void => {setDetails(true)}}
                      title={true}
                    />
                  )}
                </Grid>
              </div>
            ) : (null)}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

LiteracyResultsPdf.propTypes = {
  printDocument: PropTypes.func.isRequired
}

export default (LiteracyResultsPdf);