import {
  ADD_MATH_CHILD_SUMMARY,
  ADD_MATH_TEACHER_SUMMARY,
  ADD_MATH_DETAILS,
  ADD_MATH_CHILD_TRENDS,
  ADD_MATH_TEACHER_TRENDS,
  ResultsTypes
} from "../actions/math-results";
import * as Types from '../../constants/Types';

interface MathResultsState {
  mathResults: Array<{
    teacherId: string,
    sessionId: string,
    childSummary: Types.MathData['childSummary'] | undefined,
    teacherSummary: Types.MathData['teacherSummary'] | undefined,
    details: Types.MathData['childDetails'] & Types.MathData['teacherDetails'] | undefined,
  }>,
  mathChildTrends: Array<{
    teacherId: string,
    childTrends: Types.MathData['childTrends']  | undefined
  }>,
  mathTeacherTrends: Array<{
    teacherId: string,
    teacherTrends: Types.MathData['teacherTrends'] | undefined
  }>
}

const initialState: MathResultsState = {mathResults: [], mathChildTrends: [], mathTeacherTrends: []};

export default (state = initialState, action: ResultsTypes): MathResultsState => {
  switch (action.type) {
    case ADD_MATH_CHILD_SUMMARY:
      let childSummary = state.mathResults.slice();
      if (state.mathResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = childSummary.filter(e => e.sessionId === action.entry.sessionId);
        childSummary = childSummary.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].childSummary = {
          math: 0,
          notMath: 0
        }
        if (action.entry.childSummary) {
          updated[0].childSummary.math = action.entry.childSummary.math;
          updated[0].childSummary.notMath = action.entry.childSummary.notMath;
        }
        childSummary.push(updated[0]);
      }     
      else {
        childSummary.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          childSummary: {
            math: action.entry.childSummary ? action.entry.childSummary.math : 0,
            notMath: action.entry.childSummary ? action.entry.childSummary.notMath : 0
          },
          teacherSummary: undefined,
          details: undefined
        });            
      }
      return {
        ...state,
        mathResults: [...childSummary]
      };
    case ADD_MATH_TEACHER_SUMMARY:
      let teacherSummary = state.mathResults.slice();
      if (state.mathResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
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
        mathResults: [...teacherSummary]
      };
    case ADD_MATH_DETAILS:
      let details = state.mathResults.slice();
      if (state.mathResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = details.filter(e => e.sessionId === action.entry.sessionId);
        details = details.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].details = {
          math1: 0,
          math2: 0,
          math3: 0,
          math4: 0,
          teacher1: 0,
          teacher2: 0,
          teacher3: 0,
          teacher4: 0
        }
        if (action.entry.details) {
          updated[0].details.math1 = action.entry.details.math1;
          updated[0].details.math2 = action.entry.details.math2;
          updated[0].details.math3 = action.entry.details.math3;
          updated[0].details.math4 = action.entry.details.math4;
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
            math1: action.entry.details ? action.entry.details.math1 : 0,
            math2: action.entry.details ? action.entry.details.math2 : 0,
            math3: action.entry.details ? action.entry.details.math3 : 0,
            math4: action.entry.details ? action.entry.details.math4 : 0,
            teacher1: action.entry.details ? action.entry.details.teacher1 : 0,
            teacher2: action.entry.details ? action.entry.details.teacher2 : 0,
            teacher3: action.entry.details ? action.entry.details.teacher3 : 0,
            teacher4: action.entry.details ? action.entry.details.teacher4 : 0
          }
        });            
      }
      return {
        ...state,
        mathResults: [...details]
      };
    case ADD_MATH_CHILD_TRENDS:
      const childTrends = state.mathChildTrends.slice();
      childTrends.push({
        teacherId: action.entry.teacherId,
        childTrends: action.entry.childTrends
      });
      return {
        ...state,
        mathChildTrends: childTrends
      }
    case ADD_MATH_TEACHER_TRENDS:
      const teacherTrends = state.mathTeacherTrends.slice();
      teacherTrends.push({
        teacherId: action.entry.teacherId,
        teacherTrends: action.entry.teacherTrends
      });
      return {
        ...state,
        mathTeacherTrends: teacherTrends
      }
    default:
      return state;
  }
};