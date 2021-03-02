import * as Types from '../../constants/Types';

export const GET_TEACHER_LIST_FOR_RESULTS = "get_teacher_list";
export const ADD_TRANSITION_SUMMARY = "add_transition_summary";

export const getTeacherListForResults = (teachers: Array<string>): GetTeacherListForResults => ({
  type: GET_TEACHER_LIST_FOR_RESULTS,
  teachers
});

export const addTransitionSummary = (entry: {
  sessionId: string,
  summary: {
    total: number,
    sessionTotal: number,
    startDate: {value: string}
  } | undefined,
  details: Array<{
    line: number,
    traveling: number,
    waiting: number,
    routines: number,
    behaviorManagement: number,
    other: number,
    total: number
  }> | undefined,
  trends: Array<{
    id: string,
    line: number,
    traveling: number,
    waiting: number,
    routines: number,
    behaviorManagement: number,
    other: number,
    total: number,
    sessionTotal: number,
    startDate: {value: string}
  }> | undefined
}): AddTransitionResult => ({
  type: ADD_TRANSITION_SUMMARY,
  entry
});

interface GetTeacherListForResults {
  type: typeof GET_TEACHER_LIST_FOR_RESULTS,
  teachers: Array<string>
}

interface AddTransitionResult {
  index: number;
  type: typeof ADD_TRANSITION_SUMMARY,
  entry: {
    sessionId: string,
    sessionDate: Date,
    summary: {
      total: number,
      sessionTotal: number,
      startDate: {value: string}
    } | undefined,
    details: Array<{
      line: number,
      traveling: number,
      waiting: number,
      routines: number,
      behaviorManagement: number,
      other: number,
      total: number
    }> | undefined,
    trends: Array<{
      id: string,
      line: number,
      traveling: number,
      waiting: number,
      routines: number,
      behaviorManagement: number,
      other: number,
      total: number,
      sessionTotal: number,
      startDate: {value: string}
    }> | undefined
  }
}

export type ResultsTypes =
  GetTeacherListForResults |
  AddTransitionResult
