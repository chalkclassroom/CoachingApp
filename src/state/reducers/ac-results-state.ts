import {
  ADD_AC_CHILD_SUMMARY,
  ADD_AC_TEACHER_SUMMARY,
  ADD_AC_DETAILS,
  ADD_AC_CHILD_TRENDS,
  ADD_AC_TEACHER_TRENDS,
  ResultsTypes
} from "../actions/ac-results";
import * as Types from '../../constants/Types';

interface ACResultsState {
  acResults: Array<{
    teacherId: string,
    sessionId: string,
    childSummary: Types.ACData['childSummary'] | undefined,
    teacherSummary: Types.ACData['teacherSummary'] | undefined,
    details: Types.ACData['childDetails'] & Types.ACData['teacherDetails'] | undefined,
  }>,
  acChildTrends: Array<{
    teacherId: string,
    childTrends: Types.ACData['childTrends']  | undefined
  }>,
  acTeacherTrends: Array<{
    teacherId: string,
    teacherTrends: Types.ACData['teacherTrends'] | undefined
  }>
}

const initialState: ACResultsState = {acResults: [], acChildTrends: [], acTeacherTrends: []};

export default (state = initialState, action: ResultsTypes): ACResultsState => {
  switch (action.type) {
    case ADD_AC_CHILD_SUMMARY:
      let childSummary = state.acResults.slice();
      if (state.acResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = childSummary.filter(e => e.sessionId === action.entry.sessionId);
        childSummary = childSummary.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].childSummary = {
          ac: 0,
          noac: 0,
          noOpportunity: 0
        }
        if (action.entry.childSummary) {
          updated[0].childSummary.ac = action.entry.childSummary.ac;
          updated[0].childSummary.noac = action.entry.childSummary.noac;
          updated[0].childSummary.noOpportunity = action.entry.childSummary.noOpportunity;
        }
        childSummary.push(updated[0]);
      }     
      else {
        childSummary.push({
          sessionId: action.entry.sessionId,
          teacherId: action.entry.teacherId,
          childSummary: {
            ac: action.entry.childSummary ? action.entry.childSummary.ac : 0,
            noac: action.entry.childSummary ? action.entry.childSummary.noac : 0,
            noOpportunity: action.entry.childSummary ? action.entry.childSummary.noOpportunity : 0
          },
          teacherSummary: undefined,
          details: undefined
        });            
      }
      return {
        ...state,
        acResults: [...childSummary]
      };
    case ADD_AC_TEACHER_SUMMARY:
      let teacherSummary = state.acResults.slice();
      if (state.acResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
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
        acResults: [...teacherSummary]
      };
    case ADD_AC_DETAILS:
      let details = state.acResults.slice();
      if (state.acResults.map(e => e.sessionId).includes(action.entry.sessionId)) {
        const updated = details.filter(e => e.sessionId === action.entry.sessionId);
        details = details.filter(e => e.sessionId !== action.entry.sessionId);
        updated[0].details = {
          ac1: 0,
          ac2: 0,
          ac3: 0,
          ac4: 0,
          teacher1: 0,
          teacher2: 0,
          teacher3: 0,
          teacher4: 0
        }
        if (action.entry.details) {
          updated[0].details.ac1 = action.entry.details.ac1;
          updated[0].details.ac2 = action.entry.details.ac2;
          updated[0].details.ac3 = action.entry.details.ac3;
          updated[0].details.ac4 = action.entry.details.ac4;
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
            ac1: action.entry.details ? action.entry.details.ac1 : 0,
            ac2: action.entry.details ? action.entry.details.ac2 : 0,
            ac3: action.entry.details ? action.entry.details.ac3 : 0,
            ac4: action.entry.details ? action.entry.details.ac4 : 0,
            teacher1: action.entry.details ? action.entry.details.teacher1 : 0,
            teacher2: action.entry.details ? action.entry.details.teacher2 : 0,
            teacher3: action.entry.details ? action.entry.details.teacher3 : 0,
            teacher4: action.entry.details ? action.entry.details.teacher4 : 0
          }
        });            
      }
      return {
        ...state,
        acResults: [...details]
      };
    case ADD_AC_CHILD_TRENDS:
      const childTrends = state.acChildTrends.slice();
      childTrends.push({
        teacherId: action.entry.teacherId,
        childTrends: action.entry.childTrends
      });
      return {
        ...state,
        acChildTrends: childTrends
      }
    case ADD_AC_TEACHER_TRENDS:
      const teacherTrends = state.acTeacherTrends.slice();
      teacherTrends.push({
        teacherId: action.entry.teacherId,
        teacherTrends: action.entry.teacherTrends
      });
      return {
        ...state,
        acTeacherTrends: teacherTrends
      }
    default:
      return state;
  }
};