import * as React from 'react';
import * as PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BehaviorResponsesSummaryChart from './ResultsComponents/BehaviorResponsesSummaryChart';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { emptyClimateStack, emptyClimateRating } from "../../state/actions/classroom-climate";
import { addClimateSummary, addClimateDetails, addClimateTrends } from "../../state/actions/climate-results";
import { addTeacher, addTool } from "../../state/actions/session-dates";
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';

interface Props {
  open: boolean,
  history: H.History,
  clearTeacher(): void,
  climateStack: Array<{timestamp: number, observation: string}>,
  climateRatings: Array<{
    timestamp: number,
    rating: number
  }>,
  emptyClimateStack(): void,
  emptyClimateRating(): void,
  addClimateSummary(summary: {
    sessionId: string,
    teacherId: string,
    summary: Types.ClimateData['summary']
  }): void,
  addClimateDetails(details: {
    sessionId: string,
    teacherId: string,
    details: Array<Types.ClimateData['details']>
  }): void,
  addClimateTrends(trends: {
    teacherId: string,
    trends: Types.ClimateData['trends']
  }): void,
  addTeacher(dates: {
    teacherId: string,
    data: [{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }]
  }): void,
  addTool(dates: [{
    teacherId: string,
    data: [{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }]
  }]): void,
  sessionDates: Array<{
    teacherId: string,
    data: Array<{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }>
  }>,
  climateResults: Array<{
    teacherId: string,
    sessionId: string,
    summary: Types.ClimateData['summary'],
    details: Array<Types.ClimateData['details']>
  }>,
  climateTrends: Array<{
    teacherId: string,
    trends: Types.ClimateData['trends']
  }>,
  sessionId: string,
  sessionStart: string,
  teacherId: string
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function ClimateResultsDialog(props: Props): React.ReactElement {
  const {
    open,
    history,
    clearTeacher,
    climateStack,
    climateRatings,
    emptyClimateStack,
    emptyClimateRating,
    addClimateSummary,
    addClimateDetails,
    addClimateTrends,
    addTeacher,
    addTool,
    sessionDates,
    climateResults,
    climateTrends,
    sessionId,
    sessionStart,
    teacherId
  } = props;

  const updateRedux = (): Promise<void> => new Promise((resolve) => {
    addClimateSummary({
      sessionId: sessionId,
      teacherId: teacherId,
      summary: {
        toneRating: (climateRatings.map(a => a.rating)).reduce((a,b) => a + b, 0) / climateRatings.map(a => a.rating).length
      }
    });
    addClimateDetails({
      sessionId: sessionId,
      teacherId: teacherId,
      details: [{
        specificCount: climateStack.filter(e => e.observation === 'specificapproval').length,
        nonspecificCount: climateStack.filter(e => e.observation === 'nonspecificapproval').length,
        disapprovalCount: climateStack.filter(e => e.observation === 'disapproval').length,
        redirectionCount: climateStack.filter(e => e.observation === 'redirection').length,
      }]
    });
    addClimateTrends({
      teacherId: teacherId,
      trends: [{
        dayOfEvent: {value: sessionStart},
        positive: climateStack.filter(e => (e.observation === 'specificapproval' || e.observation === 'nonspecificapproval')).length,
        negative: climateStack.filter(e => (e.observation === 'redirection' || e.observation === 'disapproval')).length
      }]
    });
    resolve()
  });

  let positiveResponses = 0;
  let negativeResponses = 0;
  let i = 0;
  for (i; i<climateStack.length; i++) {
    if (climateStack[i].observation === 'redirection' || climateStack[i].observation === 'disapproval'){
      negativeResponses++;
    } else {
      positiveResponses++;
    }
  }
  return (
    <div>
      <Dialog
        open={open}
        disableBackdropClick
      >
        <DialogTitle style={{fontFamily: 'Arimo'}}>
          Results Preview
        </DialogTitle>
        <DialogContent>
          <BehaviorResponsesSummaryChart
            positiveResponses={positiveResponses}
            negativeResponses={negativeResponses}
          />
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={Constants.ClimateTheme}>
              <Button
                id="returnHome"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  updateRedux().then(() => {
                    clearTeacher();
                    emptyClimateStack();
                    emptyClimateRating();
                    history.push('/Home');
                  })
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={Constants.ClimateTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  updateRedux().then(() => {
                    history.push("/ClassroomClimateResults");
                    emptyClimateStack();
                  })
                }}
              >
                View Results
              </Button>
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state: Types.ReduxState): {
  climateStack: Array<{timestamp: number, observation: string}>,
  climateRatings: Array<{
    timestamp: number,
    rating: number
  }>,
  sessionDates: Array<{
    teacherId: string,
    data: Array<{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }>
  }>,
  climateResults: Array<{
    teacherId: string,
    sessionId: string,
    summary: Types.ClimateData['summary'],
    details: Array<Types.ClimateData['details']>
  }>,
  climateTrends: Array<{
    teacherId: string,
    trends: Types.ClimateData['trends']
  }>
} => {
  return {
    climateStack: state.climateStackState.climateStack,
    climateRatings: state.climateRatingsState.climateRatings,
    sessionDates: state.sessionDatesState.dates,
    climateResults: state.climateResultsState.climateResults,
    climateTrends: state.climateResultsState.climateTrends
  };
};

ClimateResultsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  clearTeacher: PropTypes.func.isRequired,
  climateStack: PropTypes.array.isRequired,
  emptyClimateStack: PropTypes.func.isRequired,
  emptyClimateRating: PropTypes.func.isRequired,
  addClimateSummary: PropTypes.func.isRequired,
  addClimateDetails: PropTypes.func.isRequired,
  addClimateTrends: PropTypes.func.isRequired,
  addTeacher: PropTypes.func.isRequired,
  addTool: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
  clearTeacher,
  emptyClimateStack,
  emptyClimateRating,
  addClimateSummary,
  addClimateDetails,
  addClimateTrends,
  addTeacher,
  addTool
})(ClimateResultsDialog);