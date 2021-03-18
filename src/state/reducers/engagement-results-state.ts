import {
  ADD_ENGAGEMENT_SUMMARY,
  ADD_ENGAGEMENT_DETAILS,
  ADD_ENGAGEMENT_TRENDS,
  ResultsTypes
} from "../actions/engagement-results";
import * as Types from '../../constants/Types';

interface EngagementResultsState {
  engagementResults: Array<{
    teacherId: string,
    sessionId: string,
    summary: Types.EngagementData['summary'] | undefined,
    details: Types.EngagementData['details'] | undefined,
  }>,
  engagementTrends: Array<{
    teacherId: string,
    trends: Types.EngagementData['trends']  | undefined
  }>
}

const initialState: EngagementResultsState = {engagementResults: [], engagementTrends: []};

export default (state = initialState, action: ResultsTypes): EngagementResultsState => {
  switch (action.type) {
    case ADD_ENGAGEMENT_SUMMARY:
      let summary = state.engagementResults.slice();
      if (state.engagementResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = summary.filter(e => e.sessionId === action.entry.sessionId);
        summary = summary.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].summary = {
          offTask: 0,
          engaged: 0,
          avgRating: 0
        }
        if (action.entry.summary) {
          updated[0].summary.offTask = action.entry.summary.offTask;
          updated[0].summary.engaged = action.entry.summary.engaged;
          updated[0].summary.avgRating = action.entry.summary.avgRating;
        }
        summary.push(updated[0]);
      }     
      else {
        summary.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          summary: {
            offTask: action.entry.summary ? action.entry.summary.offTask : 0,
            engaged: action.entry.summary ? action.entry.summary.engaged : 0,
            avgRating: action.entry.summary ? action.entry.summary.avgRating : 0
          },
          details: undefined
        });            
      }
      return {
        ...state,
        engagementResults: [...summary]
      };
    case ADD_ENGAGEMENT_DETAILS:
      let details = state.engagementResults.slice();
      if (state.engagementResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = details.filter(e => e.sessionId === action.entry.sessionId);
        details = details.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].details = {
          offTask0: 0,
          offTask1: 0,
          offTask2: 0,
          mildlyEngaged0: 0,
          mildlyEngaged1: 0,
          mildlyEngaged2: 0,
          engaged0: 0,
          engaged1: 0,
          engaged2: 0,
          highlyEngaged0: 0,
          highlyEngaged1: 0,
          highlyEngaged2: 0
        }
        if (action.entry.details) {
          updated[0].details.offTask0 = action.entry.details.offTask0;
          updated[0].details.offTask1 = action.entry.details.offTask1;
          updated[0].details.offTask2 = action.entry.details.offTask2;
          updated[0].details.mildlyEngaged0 = action.entry.details.mildlyEngaged0;
          updated[0].details.mildlyEngaged1 = action.entry.details.mildlyEngaged1;
          updated[0].details.mildlyEngaged2 = action.entry.details.mildlyEngaged2;
          updated[0].details.engaged0 = action.entry.details.engaged0;
          updated[0].details.engaged1 = action.entry.details.engaged1;
          updated[0].details.engaged2 = action.entry.details.engaged2;
          updated[0].details.highlyEngaged0 = action.entry.details.highlyEngaged0;
          updated[0].details.highlyEngaged1 = action.entry.details.highlyEngaged1;
          updated[0].details.highlyEngaged2 = action.entry.details.highlyEngaged2;
        }
        details.push(updated[0]);
      }     
      else {
        details.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          summary: undefined,
          details: {
            offTask0: action.entry.details ? action.entry.details.offTask0 : 0,
            offTask1: action.entry.details ? action.entry.details.offTask1 : 0,
            offTask2: action.entry.details ? action.entry.details.offTask2 : 0,
            mildlyEngaged0: action.entry.details ? action.entry.details.mildlyEngaged0 : 0,
            mildlyEngaged1: action.entry.details ? action.entry.details.mildlyEngaged1 : 0,
            mildlyEngaged2: action.entry.details ? action.entry.details.mildlyEngaged2 : 0,
            engaged0: action.entry.details ? action.entry.details.engaged0 : 0,
            engaged1: action.entry.details ? action.entry.details.engaged1 : 0,
            engaged2: action.entry.details ? action.entry.details.engaged2 : 0,
            highlyEngaged0: action.entry.details ? action.entry.details.highlyEngaged0 : 0,
            highlyEngaged1: action.entry.details ? action.entry.details.highlyEngaged1 : 0,
            highlyEngaged2: action.entry.details ? action.entry.details.highlyEngaged2 : 0,
          }
        });            
      }
      return {
        ...state,
        engagementResults: [...details]
      };
    case ADD_ENGAGEMENT_TRENDS:
      const trends = state.engagementTrends.slice();
      trends.push({
        teacherId: action.entry.teacherId,
        trends: action.entry.trends
      });
      return {
        ...state,
        engagementTrends: trends
      }
    default:
      return state;
  }
};