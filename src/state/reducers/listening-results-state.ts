import {
  ADD_LISTENING_SUMMARY,
  ADD_LISTENING_DETAILS,
  ADD_LISTENING_TRENDS,
  ResultsTypes
} from "../actions/listening-results";
import * as Types from '../../constants/Types';

interface ListeningResultsState {
  listeningResults: Array<{
    teacherId: string,
    sessionId: string,
    summary: Types.ListeningData['summary'] | undefined,
    details: Types.ListeningData['details'] | undefined,
  }>,
  listeningTrends: Array<{
    teacherId: string,
    trends: Types.ListeningData['trends']  | undefined
  }>
}

const initialState: ListeningResultsState = {listeningResults: [], listeningTrends: []};

export default (state = initialState, action: ResultsTypes): ListeningResultsState => {
  switch (action.type) {
    case ADD_LISTENING_SUMMARY:
      let summary = state.listeningResults.slice();
      if (state.listeningResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = summary.filter(e => e.sessionId === action.entry.sessionId);
        summary = summary.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].summary = {
          listening: 0,
          notListening: 0
        }
        if (action.entry.summary) {
          updated[0].summary.listening = action.entry.summary.listening;
          updated[0].summary.notListening = action.entry.summary.notListening;
        }
        summary.push(updated[0]);
      }     
      else {
        summary.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          summary: {
            listening: action.entry.summary ? action.entry.summary.listening : 0,
            notListening: action.entry.summary ? action.entry.summary.notListening : 0
          },
          details: undefined
        });            
      }
      return {
        ...state,
        listeningResults: [...summary]
      };
    case ADD_LISTENING_DETAILS:
      let details = state.listeningResults.slice();
      if (state.listeningResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = details.filter(e => e.sessionId === action.entry.sessionId);
        details = details.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].details = {
          listening1: 0,
          listening2: 0,
          listening3: 0,
          listening4: 0,
          listening5: 0,
          listening6: 0
        }
        if (action.entry.details) {
          updated[0].details.listening1 = action.entry.details.listening1;
          updated[0].details.listening2 = action.entry.details.listening2;
          updated[0].details.listening3 = action.entry.details.listening3;
          updated[0].details.listening4 = action.entry.details.listening4;
          updated[0].details.listening5 = action.entry.details.listening5;
          updated[0].details.listening6 = action.entry.details.listening6;
        }
        details.push(updated[0]);
      }     
      else {
        details.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          summary: undefined,
          details: {
            listening1: action.entry.details ? action.entry.details.listening1 : 0,
            listening2: action.entry.details ? action.entry.details.listening2 : 0,
            listening3: action.entry.details ? action.entry.details.listening3 : 0,
            listening4: action.entry.details ? action.entry.details.listening4 : 0,
            listening5: action.entry.details ? action.entry.details.listening5 : 0,
            listening6: action.entry.details ? action.entry.details.listening6 : 0,
          }
        });            
      }
      return {
        ...state,
        listeningResults: [...details]
      };
    case ADD_LISTENING_TRENDS:
      const trends = state.listeningTrends.slice();
      trends.push({
        teacherId: action.entry.teacherId,
        trends: action.entry.trends
      });
      return {
        ...state,
        listeningTrends: trends
      }
    default:
      return state;
  }
};