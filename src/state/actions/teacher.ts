import * as Types from '../../constants/Types';

export const CHANGE_TEACHER = "change_selected_teacher";
export const CLEAR_TEACHER = "clear_selected_teacher";
export const GET_TEACHER_LIST = "get_teacher_list";
export const UPDATE_TEACHER_INFO="update_teacher_info";

export const changeTeacher = (teacher: Types.Teacher): ChangeTeacher => ({
  type: CHANGE_TEACHER,
  teacher
});

export const clearTeacher = (): ClearTeacher => ({
  type: CLEAR_TEACHER
});

export const getTeacherList = (teachers: Array<Types.Teacher>): GetTeacherList => ({
  type: GET_TEACHER_LIST,
  teachers
})

export const updateTeacherInfo = (teacher: Types.Teacher): UpdateTeacherInfo => ({
  type: UPDATE_TEACHER_INFO,
  teacher
})

interface ChangeTeacher {
  type: typeof CHANGE_TEACHER,
  teacher: Types.Teacher
}

interface ClearTeacher {
  type: typeof CLEAR_TEACHER
}

interface GetTeacherList {
  type: typeof GET_TEACHER_LIST,
  teachers: Array<Types.Teacher>
}

interface UpdateTeacherInfo {
  type: typeof UPDATE_TEACHER_INFO,
  teacher: Types.Teacher
}

export type TeacherTypes =
  ChangeTeacher |
  ClearTeacher |
  GetTeacherList |
  UpdateTeacherInfo
