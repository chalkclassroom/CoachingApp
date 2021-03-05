import {
  ADD_TRANSITION_SUMMARY,
  ADD_TRANSITION_DETAILS,
  ADD_TRANSITION_TRENDS,
  ResultsTypes
} from "../actions/transition-results";
import * as Types from '../../constants/Types';

interface TransitionResultsState {
  transitionResults: Array<{
    teacherId: string,
    sessionId: string,
    sessionDate: Date | undefined,
    summary: Types.TransitionData['summary'] | undefined,
    details: Types.TransitionData['details']  | undefined
  }>,
  transitionTrends: Array<{
    teacherId: string,
    trends: Types.TransitionData['trends']  | undefined
  }>
}

const initialState: TransitionResultsState = {transitionResults: [], transitionTrends: []};

export default (state = initialState, action: ResultsTypes): TransitionResultsState => {
  switch (action.type) {
    case ADD_TRANSITION_SUMMARY:
      let thisResult = state.transitionResults.slice();
      const index = state.transitionResults.map(e => e.sessionId).indexOf(action.entry.sessionId);

      if (index > -1) {
        const updated = thisResult.filter(e => e.sessionId === action.entry.sessionId);
        thisResult = thisResult.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].summary = {
          total: 0,
          sessionTotal: 0,
          startDate: {value: ''}
        }
        if (action.entry.summary) {
          updated[0].summary.total = action.entry.summary.total;
          updated[0].summary.sessionTotal = action.entry.summary.sessionTotal;
          updated[0].summary.startDate = action.entry.summary.startDate;
        }
        thisResult.push(updated[0]);
      }     
      else {
        thisResult.push({
          sessionId: action.entry.sessionId, 
          sessionDate: undefined,
          teacherId: action.entry.teacherId,
          summary: {
            total: action.entry.summary ? action.entry.summary.total : 0,
            sessionTotal: action.entry.summary ? action.entry.summary.sessionTotal : 0,
            startDate: action.entry.summary ? action.entry.summary.startDate : {value: ''}
          },
          details: undefined
        });            
      }      

      return {
        ...state,
        transitionResults: [...thisResult]
      };
    case ADD_TRANSITION_DETAILS:
      let detailsResult = state.transitionResults.slice();
      const detailsIndex = state.transitionResults.map(e => e.sessionId).indexOf(action.entry.sessionId);
      if (detailsIndex > -1) {
          const updated = detailsResult.filter(e => e.sessionId === action.entry.sessionId);
          detailsResult = detailsResult.filter(e => e.sessionId !== action.entry.sessionId);
          const detailsObject: Types.TransitionData['details'][0] = {
            line: 0,
            traveling: 0,
            waiting: 0,
            routines: 0,
            behaviorManagement: 0,
            other: 0,
            total: 0
          };
          updated[0].details = [];
          if (action.entry.details) {
            detailsObject.line = action.entry.details[0].line;
            detailsObject.traveling = action.entry.details[0].traveling;
            detailsObject.waiting = action.entry.details[0].waiting;
            detailsObject.routines = action.entry.details[0].routines;
            detailsObject.behaviorManagement = action.entry.details[0].behaviorManagement;
            detailsObject.other = action.entry.details[0].other;
            detailsObject.total = action.entry.details[0].total;
          }
          updated[0].details = [detailsObject];
          detailsResult.push(updated[0]);
      }     
      else {
        detailsResult.push({
          sessionId: action.entry.sessionId, 
          sessionDate: undefined,
          teacherId: action.entry.teacherId,
          details: [{
            line: action.entry.details ? action.entry.details[0].line : 0,
            traveling: action.entry.details ? action.entry.details[0].traveling : 0,
            waiting: action.entry.details ? action.entry.details[0].waiting : 0,
            routines: action.entry.details ? action.entry.details[0].routines : 0,
            behaviorManagement: action.entry.details ? action.entry.details[0].behaviorManagement : 0,
            other: action.entry.details ? action.entry.details[0].other : 0,
            total: action.entry.details ? action.entry.details[0].total : 0,
          }],
          summary: undefined
        });            
      }
      return {
        ...state,
        transitionResults: [...detailsResult]
      };
    case ADD_TRANSITION_TRENDS:
      const trendsResult = state.transitionTrends.slice();
      trendsResult.push({
        teacherId: action.entry.teacherId,
        trends: action.entry.trends
      });
      return {
        ...state,
        transitionTrends: trendsResult
      }
    default:
      return state;
  }
};