import * as Types from '../../constants/Types';

export const ADD_AC_CHILD_SUMMARY = "add_ac_child_summary";
export const ADD_AC_TEACHER_SUMMARY = "add_ac_teacher_summary";
export const ADD_AC_DETAILS = "add_ac_details";
export const ADD_AC_CHILD_TRENDS = "add_ac_child_trends";
export const ADD_AC_TEACHER_TRENDS = "add_ac_teacher_trends";

export const addACChildSummary = (entry: {
  sessionId: string,
  teacherId: string,
  childSummary: Types.ACData['childSummary'] | undefined
}): AddACChildSummary => ({
  type: ADD_AC_CHILD_SUMMARY,
  entry
});

export const addACTeacherSummary = (entry: {
  sessionId: string,
  teacherId: string,
  teacherSummary: Types.ACData['teacherSummary'] | undefined
}): AddACTeacherSummary => ({
  type: ADD_AC_TEACHER_SUMMARY,
  entry
});

export const addACDetails = (entry: {
  sessionId: string,
  teacherId: string,
  details: Types.ACData['childDetails'] & Types.ACData['teacherDetails'] | undefined
}): AddACDetails => ({
  type: ADD_AC_DETAILS,
  entry
})

export const addACChildTrends = (entry: {
  teacherId: string,
  childTrends: Types.ACData['childTrends'] | undefined
}): AddACChildTrends => ({
  type: ADD_AC_CHILD_TRENDS,
  entry
});

export const addACTeacherTrends = (entry: {
  teacherId: string,
  teacherTrends: Types.ACData['teacherTrends'] | undefined
}): AddACTeacherTrends => ({
  type: ADD_AC_TEACHER_TRENDS,
  entry
});

interface AddACChildSummary {
  type: typeof ADD_AC_CHILD_SUMMARY,
  entry: {
    sessionId: string,
    teacherId: string,
    childSummary: Types.ACData['childSummary'] | undefined
  }
}

interface AddACTeacherSummary {
  type: typeof ADD_AC_TEACHER_SUMMARY,
  entry: {
    sessionId: string,
    teacherId: string,
    teacherSummary: Types.ACData['teacherSummary'] | undefined
  }
}

interface AddACDetails {
  type: typeof ADD_AC_DETAILS,
  entry: {
    sessionId: string,
    teacherId: string,
    details: Types.ACData['childDetails'] & Types.ACData['teacherDetails'] | undefined
  }
}

interface AddACChildTrends {
  type: typeof ADD_AC_CHILD_TRENDS,
  entry: {
    teacherId: string,
    childTrends: Types.ACData['childTrends'] | undefined
  }
}

interface AddACTeacherTrends {
  type: typeof ADD_AC_TEACHER_TRENDS,
  entry: {
    teacherId: string,
    teacherTrends: Types.ACData['teacherTrends'] | undefined
  }
}

export type ResultsTypes =
  AddACChildSummary |
  AddACTeacherSummary |
  AddACDetails |
  AddACChildTrends |
  AddACTeacherTrends