import * as Types from '../../constants/Types';

export const ADD_MATH_CHILD_SUMMARY = "add_math_child_summary";
export const ADD_MATH_TEACHER_SUMMARY = "add_math_teacher_summary";
export const ADD_MATH_DETAILS = "add_math_details";
export const ADD_MATH_CHILD_TRENDS = "add_math_child_trends";
export const ADD_MATH_TEACHER_TRENDS = "add_math_teacher_trends";


export const addMathChildSummary = (entry: {
  sessionId: string,
  teacherId: string,
  childSummary: Types.MathData['childSummary'] | undefined
}): AddMathChildSummary => ({
  type: ADD_MATH_CHILD_SUMMARY,
  entry
});

export const addMathTeacherSummary = (entry: {
  sessionId: string,
  teacherId: string,
  teacherSummary: Types.MathData['teacherSummary'] | undefined
}): AddMathTeacherSummary => ({
  type: ADD_MATH_TEACHER_SUMMARY,
  entry
});

export const addMathDetails = (entry: {
  sessionId: string,
  teacherId: string,
  details: Types.MathData['childDetails'] & Types.MathData['teacherDetails'] | undefined
}): AddMathDetails => ({
  type: ADD_MATH_DETAILS,
  entry
})

export const addMathChildTrends = (entry: {
  teacherId: string,
  childTrends: Types.MathData['childTrends'] | undefined
}): AddMathChildTrends => ({
  type: ADD_MATH_CHILD_TRENDS,
  entry
});

export const addMathTeacherTrends = (entry: {
  teacherId: string,
  teacherTrends: Types.MathData['teacherTrends'] | undefined
}): AddMathTeacherTrends => ({
  type: ADD_MATH_TEACHER_TRENDS,
  entry
});

interface AddMathChildSummary {
  type: typeof ADD_MATH_CHILD_SUMMARY,
  entry: {
    sessionId: string,
    teacherId: string,
    childSummary: Types.MathData['childSummary'] | undefined
  }
}

interface AddMathTeacherSummary {
  type: typeof ADD_MATH_TEACHER_SUMMARY,
  entry: {
    sessionId: string,
    teacherId: string,
    teacherSummary: Types.MathData['teacherSummary'] | undefined
  }
}

interface AddMathDetails {
  type: typeof ADD_MATH_DETAILS,
  entry: {
    sessionId: string,
    teacherId: string,
    details: Types.MathData['childDetails'] & Types.MathData['teacherDetails'] | undefined
  }
}

interface AddMathChildTrends {
  type: typeof ADD_MATH_CHILD_TRENDS,
  entry: {
    teacherId: string,
    childTrends: Types.MathData['childTrends'] | undefined
  }
}

interface AddMathTeacherTrends {
  type: typeof ADD_MATH_TEACHER_TRENDS,
  entry: {
    teacherId: string,
    teacherTrends: Types.MathData['teacherTrends'] | undefined
  }
}

export type ResultsTypes =
  AddMathChildSummary |
  AddMathTeacherSummary |
  AddMathDetails |
  AddMathChildTrends |
  AddMathTeacherTrends