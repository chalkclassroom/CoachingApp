import {
  ADD_CLIMATE_SUMMARY,
  ADD_CLIMATE_DETAILS,
  ADD_CLIMATE_TRENDS,
  ResultsTypes
} from "../actions/climate-results";
import * as Types from '../../constants/Types';

interface ClimateResultsState {
  climateResults: Array<{
    teacherId: string,
    sessionId: string,
    summary: Types.ClimateData['summary'] | undefined,
    details: Array<Types.ClimateData['details']>  | undefined,
  }>,
  climateTrends: Array<{
    teacherId: string,
    trends: Types.ClimateData['trends']  | undefined
  }>
}

const initialState: ClimateResultsState = {climateResults: [], climateTrends: []};

export default (state = initialState, action: ResultsTypes): ClimateResultsState => {
  switch (action.type) {
    case ADD_CLIMATE_SUMMARY:
      let thisResult = state.climateResults.slice();
      const index = state.climateResults.map(e => e.sessionId).indexOf(action.entry.sessionId);
      if (index > -1) {
        const updated = thisResult.filter(e => e.sessionId === action.entry.sessionId);
        thisResult = thisResult.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].summary = {
          toneRating: 0,
        }
        if (action.entry.summary) {
          updated[0].summary.toneRating = action.entry.summary.toneRating;
        }
        thisResult.push(updated[0]);
      }     
      else {
        thisResult.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          summary: {
            toneRating: action.entry.summary ? action.entry.summary.toneRating : 0
          },
          details: undefined
        });            
      }
      return {
        ...state,
        climateResults: [...thisResult]
      };
    case ADD_CLIMATE_DETAILS:
      let detailsResult = state.climateResults.slice();
      const detailsIndex = state.climateResults.map(e => e.sessionId).indexOf(action.entry.sessionId);
      if (detailsIndex > -1) {
        const updated = detailsResult.filter(e => e.sessionId === action.entry.sessionId);
        detailsResult = detailsResult.filter(e => e.sessionId !== action.entry.sessionId);
        const detailsObject: Types.ClimateData['details'] = {
          specificCount: 0,
          nonspecificCount: 0,
          disapprovalCount: 0,
          redirectionCount: 0
        };
        updated[0].details = [];
        if (action.entry.details) {
          detailsObject.specificCount = action.entry.details[0].specificCount;
          detailsObject.nonspecificCount = action.entry.details[0].nonspecificCount;
          detailsObject.disapprovalCount = action.entry.details[0].disapprovalCount;
          detailsObject.redirectionCount = action.entry.details[0].redirectionCount;
        }
        updated[0].details = [detailsObject];
        detailsResult.push(updated[0]);
      }     
      else {
        detailsResult.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          details: [{
            specificCount: action.entry.details ? action.entry.details[0].specificCount : 0,
            nonspecificCount: action.entry.details ? action.entry.details[0].nonspecificCount : 0,
            disapprovalCount: action.entry.details ? action.entry.details[0].disapprovalCount : 0,
            redirectionCount: action.entry.details ? action.entry.details[0].redirectionCount : 0
          }],
          summary: undefined
        });            
      }
      return {
        ...state,
        climateResults: [...detailsResult]
      };
    case ADD_CLIMATE_TRENDS:
      const teacherIndex = state.climateTrends.map(e => e.teacherId).indexOf(action.entry.teacherId);
      let trendsResult = state.climateTrends.slice();
      if (teacherIndex > -1) {
        const updated = trendsResult.filter(e => e.teacherId === action.entry.teacherId);
        trendsResult = trendsResult.filter(e => e.teacherId !== action.entry.teacherId);
        updated[0].trends.push(action.entry.trends[0])
        trendsResult.push(updated[0]);
      } else {
        trendsResult.push({
          teacherId: action.entry.teacherId,
          trends: action.entry.trends
        });
      }
      return {
        ...state,
        climateTrends: trendsResult
      }
    default:
      return state;
  }
};