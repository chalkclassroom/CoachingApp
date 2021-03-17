import {
  ADD_INSTRUCTION_DETAILS,
  ADD_INSTRUCTION_TRENDS,
  ResultsTypes
} from "../actions/instruction-results";
import * as Types from '../../constants/Types';

interface InstructionResultsState {
  instructionResults: Array<{
    teacherId: string,
    sessionId: string,
    details: Types.InstructionData['details']  | undefined,
  }>,
  instructionTrends: Array<{
    teacherId: string,
    trends: Types.InstructionData['trends']  | undefined
  }>
}

const initialState: InstructionResultsState = {instructionResults: [], instructionTrends: []};

export default (state = initialState, action: ResultsTypes): InstructionResultsState => {
  switch (action.type) {
    case ADD_INSTRUCTION_DETAILS:
      let thisResult = state.instructionResults.slice();
      const index = state.instructionResults.map(e => e.sessionId).indexOf(action.entry.sessionId);
      if (index > -1) {
        const updated = thisResult.filter(e => e.sessionId === action.entry.sessionId);
        thisResult = thisResult.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].details = {
          highLevelQuestion: 0,
          lowLevelQuestion: 0,
          highLevelResponse: 0,
          lowLevelResponse: 0
        }
        if (action.entry.details) {
          updated[0].details.highLevelQuestion = action.entry.details.highLevelQuestion;
          updated[0].details.lowLevelQuestion = action.entry.details.lowLevelQuestion;
          updated[0].details.highLevelResponse = action.entry.details.highLevelResponse;
          updated[0].details.lowLevelResponse = action.entry.details.lowLevelResponse;
        }
        thisResult.push(updated[0]);
      }     
      else {
        thisResult.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          details: {
            highLevelQuestion: action.entry.details ? action.entry.details.highLevelQuestion : 0,
            lowLevelQuestion: action.entry.details ? action.entry.details.lowLevelQuestion : 0,
            highLevelResponse: action.entry.details ? action.entry.details.highLevelResponse : 0,
            lowLevelResponse: action.entry.details ? action.entry.details.lowLevelResponse : 0
          }
        });            
      }
      return {
        ...state,
        instructionResults: [...thisResult]
      };
    case ADD_INSTRUCTION_TRENDS:
      const teacherIndex = state.instructionTrends.map(e => e.teacherId).indexOf(action.entry.teacherId);
      let trendsResult = state.instructionTrends.slice();
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
        instructionTrends: trendsResult
      }
    default:
      return state;
  }
};