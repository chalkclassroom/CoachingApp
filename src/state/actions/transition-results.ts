import * as Types from '../../constants/Types';

export const GET_TEACHER_LIST_FOR_RESULTS = "get_teacher_list";
export const ADD_TRANSITION_SUMMARY = "add_transition_summary";
export const ADD_TRANSITION_DETAILS = "add_transition_details";
export const ADD_TRANSITION_TRENDS = "add_transition_trends";

export const getTeacherListForResults = (teachers: Array<string>): GetTeacherListForResults => ({
  type: GET_TEACHER_LIST_FOR_RESULTS,
  teachers
});

export const addTransitionSummary = (entry: {
  sessionId: string,
  teacherId: string,
  summary: Types.TransitionData['summary'] | undefined
}): AddTransitionSummary => ({
  type: ADD_TRANSITION_SUMMARY,
  entry
});

export const addTransitionDetails = (entry: {
  sessionId: string,
  teacherId: string,
  details: Types.TransitionData['details'] | undefined
}): AddTransitionDetails => ({
  type: ADD_TRANSITION_DETAILS,
  entry
});

export const addTransitionTrends = (entry: {
  teacherId: string,
  trends: Types.TransitionData['trends'] | undefined
}): AddTransitionTrends => ({
  type: ADD_TRANSITION_TRENDS,
  entry
});

interface GetTeacherListForResults {
  type: typeof GET_TEACHER_LIST_FOR_RESULTS,
  teachers: Array<string>
}

interface AddTransitionSummary {
  type: typeof ADD_TRANSITION_SUMMARY,
  entry: {
    sessionId: string,
    teacherId: string,
    summary: Types.TransitionData['summary'] | undefined
  }
}

interface AddTransitionDetails {
  type: typeof ADD_TRANSITION_DETAILS,
  entry: {
    sessionId: string,
    teacherId: string,
    details: Types.TransitionData['details'] | undefined
  }
}

interface AddTransitionTrends {
  type: typeof ADD_TRANSITION_TRENDS,
  entry: {
    teacherId: string,
    trends: Types.TransitionData['trends'] | undefined
  }
}

export type ResultsTypes =
  GetTeacherListForResults |
  AddTransitionSummary |
  AddTransitionDetails |
  AddTransitionTrends