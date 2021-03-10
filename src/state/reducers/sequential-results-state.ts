import {
  ADD_SEQUENTIAL_CHILD_SUMMARY,
  ADD_SEQUENTIAL_TEACHER_SUMMARY,
  ADD_SEQUENTIAL_DETAILS,
  ADD_SEQUENTIAL_CHILD_TRENDS,
  ADD_SEQUENTIAL_TEACHER_TRENDS,
  ResultsTypes
} from "../actions/sequential-results";
import * as Types from '../../constants/Types';

interface SequentialResultsState {
  sequentialResults: Array<{
    teacherId: string,
    sessionId: string,
    childSummary: Types.SequentialData['childSummary'] | undefined,
    teacherSummary: Types.SequentialData['teacherSummary'] | undefined,
    details: Types.SequentialData['childDetails'] & Types.SequentialData['teacherDetails'] | undefined,
  }>,
  sequentialChildTrends: Array<{
    teacherId: string,
    childTrends: Types.SequentialData['childTrends']  | undefined
  }>,
  sequentialTeacherTrends: Array<{
    teacherId: string,
    teacherTrends: Types.SequentialData['teacherTrends'] | undefined
  }>
}

const initialState: SequentialResultsState = {sequentialResults: [], sequentialChildTrends: [], sequentialTeacherTrends: []};

export default (state = initialState, action: ResultsTypes): SequentialResultsState => {
  switch (action.type) {
    case ADD_SEQUENTIAL_CHILD_SUMMARY:
      let childSummary = state.sequentialResults.slice();
      if (state.sequentialResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = childSummary.filter(e => e.sessionId === action.entry.sessionId);
        childSummary = childSummary.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].childSummary = {
          sequential: 0,
          notSequential: 0
        }
        if (action.entry.childSummary) {
          updated[0].childSummary.sequential = action.entry.childSummary.sequential;
          updated[0].childSummary.notSequential = action.entry.childSummary.notSequential;
        }
        childSummary.push(updated[0]);
      }     
      else {
        childSummary.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          childSummary: {
            sequential: action.entry.childSummary ? action.entry.childSummary.sequential : 0,
            notSequential: action.entry.childSummary ? action.entry.childSummary.notSequential : 0
          },
          teacherSummary: undefined,
          details: undefined
        });            
      }
      return {
        ...state,
        sequentialResults: [...childSummary]
      };
    case ADD_SEQUENTIAL_TEACHER_SUMMARY:
      let teacherSummary = state.sequentialResults.slice();
      if (state.sequentialResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = teacherSummary.filter(e => e.sessionId === action.entry.sessionId);
        teacherSummary = teacherSummary.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].teacherSummary = {
          support: 0,
          noSupport: 0,
          noOpportunity: 0
        }
        if (action.entry.teacherSummary) {
          updated[0].teacherSummary.support = action.entry.teacherSummary.support;
          updated[0].teacherSummary.noSupport = action.entry.teacherSummary.noSupport;
          updated[0].teacherSummary.noOpportunity = action.entry.teacherSummary.noOpportunity;
        }
        teacherSummary.push(updated[0]);
      }     
      else {
        teacherSummary.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          childSummary: undefined,
          teacherSummary: {
            support: action.entry.teacherSummary ? action.entry.teacherSummary.support : 0,
            noSupport: action.entry.teacherSummary ? action.entry.teacherSummary.noSupport : 0,
            noOpportunity: action.entry.teacherSummary ? action.entry.teacherSummary.noOpportunity : 0
          },
          details: undefined
        });            
      }
      return {
        ...state,
        sequentialResults: [...teacherSummary]
      };
    case ADD_SEQUENTIAL_DETAILS:
      let details = state.sequentialResults.slice();
      if (state.sequentialResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = details.filter(e => e.sessionId === action.entry.sessionId);
        details = details.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].details = {
          sequential1: 0,
          sequential2: 0,
          sequential3: 0,
          sequential4: 0,
          teacher1: 0,
          teacher2: 0,
          teacher3: 0,
          teacher4: 0
        }
        if (action.entry.details) {
          updated[0].details.sequential1 = action.entry.details.sequential1;
          updated[0].details.sequential2 = action.entry.details.sequential2;
          updated[0].details.sequential3 = action.entry.details.sequential3;
          updated[0].details.sequential4 = action.entry.details.sequential4;
          updated[0].details.teacher1 = action.entry.details.teacher1;
          updated[0].details.teacher2 = action.entry.details.teacher2;
          updated[0].details.teacher3 = action.entry.details.teacher3;
          updated[0].details.teacher4 = action.entry.details.teacher4;
        }
        details.push(updated[0]);
      }     
      else {
        details.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          childSummary: undefined,
          teacherSummary: undefined,
          details: {
            sequential1: action.entry.details ? action.entry.details.sequential1 : 0,
            sequential2: action.entry.details ? action.entry.details.sequential2 : 0,
            sequential3: action.entry.details ? action.entry.details.sequential3 : 0,
            sequential4: action.entry.details ? action.entry.details.sequential4 : 0,
            teacher1: action.entry.details ? action.entry.details.teacher1 : 0,
            teacher2: action.entry.details ? action.entry.details.teacher2 : 0,
            teacher3: action.entry.details ? action.entry.details.teacher3 : 0,
            teacher4: action.entry.details ? action.entry.details.teacher4 : 0
          }
        });            
      }
      return {
        ...state,
        sequentialResults: [...details]
      };
    case ADD_SEQUENTIAL_CHILD_TRENDS:
      const childTrends = state.sequentialChildTrends.slice();
      childTrends.push({
        teacherId: action.entry.teacherId,
        childTrends: action.entry.childTrends
      });
      return {
        ...state,
        sequentialChildTrends: childTrends
      }
    case ADD_SEQUENTIAL_TEACHER_TRENDS:
      const teacherTrends = state.sequentialTeacherTrends.slice();
      teacherTrends.push({
        teacherId: action.entry.teacherId,
        teacherTrends: action.entry.teacherTrends
      });
      return {
        ...state,
        sequentialTeacherTrends: teacherTrends
      }
    default:
      return state;
  }
};