import * as Types from '../../constants/Types';

export const ADD_SEQUENTIAL_CHILD_SUMMARY = "add_sequential_child_summary";
export const ADD_SEQUENTIAL_TEACHER_SUMMARY = "add_sequential_teacher_summary";
export const ADD_SEQUENTIAL_DETAILS = "add_sequential_details";
export const ADD_SEQUENTIAL_CHILD_TRENDS = "add_sequential_child_trends";
export const ADD_SEQUENTIAL_TEACHER_TRENDS = "add_sequential_teacher_trends";

export const addSequentialChildSummary = (entry: {
  sessionId: string,
  teacherId: string,
  childSummary: Types.SequentialData['childSummary'] | undefined
}): AddSequentialChildSummary => ({
  type: ADD_SEQUENTIAL_CHILD_SUMMARY,
  entry
});

export const addSequentialTeacherSummary = (entry: {
  sessionId: string,
  teacherId: string,
  teacherSummary: Types.SequentialData['teacherSummary'] | undefined
}): AddSequentialTeacherSummary => ({
  type: ADD_SEQUENTIAL_TEACHER_SUMMARY,
  entry
});

export const addSequentialDetails = (entry: {
  sessionId: string,
  teacherId: string,
  details: Types.SequentialData['childDetails'] & Types.SequentialData['teacherDetails'] | undefined
}): AddSequentialDetails => ({
  type: ADD_SEQUENTIAL_DETAILS,
  entry
})

export const addSequentialChildTrends = (entry: {
  teacherId: string,
  childTrends: Types.SequentialData['childTrends'] | undefined
}): AddSequentialChildTrends => ({
  type: ADD_SEQUENTIAL_CHILD_TRENDS,
  entry
});

export const addSequentialTeacherTrends = (entry: {
  teacherId: string,
  teacherTrends: Types.SequentialData['teacherTrends'] | undefined
}): AddSequentialTeacherTrends => ({
  type: ADD_SEQUENTIAL_TEACHER_TRENDS,
  entry
});

interface AddSequentialChildSummary {
  type: typeof ADD_SEQUENTIAL_CHILD_SUMMARY,
  entry: {
    sessionId: string,
    teacherId: string,
    childSummary: Types.SequentialData['childSummary'] | undefined
  }
}

interface AddSequentialTeacherSummary {
  type: typeof ADD_SEQUENTIAL_TEACHER_SUMMARY,
  entry: {
    sessionId: string,
    teacherId: string,
    teacherSummary: Types.SequentialData['teacherSummary'] | undefined
  }
}

interface AddSequentialDetails {
  type: typeof ADD_SEQUENTIAL_DETAILS,
  entry: {
    sessionId: string,
    teacherId: string,
    details: Types.SequentialData['childDetails'] & Types.SequentialData['teacherDetails'] | undefined
  }
}

interface AddSequentialChildTrends {
  type: typeof ADD_SEQUENTIAL_CHILD_TRENDS,
  entry: {
    teacherId: string,
    childTrends: Types.SequentialData['childTrends'] | undefined
  }
}

interface AddSequentialTeacherTrends {
  type: typeof ADD_SEQUENTIAL_TEACHER_TRENDS,
  entry: {
    teacherId: string,
    teacherTrends: Types.SequentialData['teacherTrends'] | undefined
  }
}

export type ResultsTypes =
  AddSequentialChildSummary |
  AddSequentialTeacherSummary |
  AddSequentialDetails |
  AddSequentialChildTrends |
  AddSequentialTeacherTrends