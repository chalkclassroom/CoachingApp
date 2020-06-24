export const CHANGE_TEACHER = "change_selected_teacher";
export const CLEAR_TEACHER = "clear_selected_teacher";
export const GET_TEACHER_LIST = "get_teacher_list";

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
}

export const changeTeacher = (teacher: Teacher): ChangeTeacher => ({
  type: CHANGE_TEACHER,
  teacher
});

export const clearTeacher = (): ClearTeacher => ({
  type: CLEAR_TEACHER
});

export const getTeacherList = (teachers: Array<Teacher>): GetTeacherList => ({
  type: GET_TEACHER_LIST,
  teachers
})

interface ChangeTeacher {
  type: typeof CHANGE_TEACHER,
  teacher: Teacher
}

interface ClearTeacher {
  type: typeof CLEAR_TEACHER
}

interface GetTeacherList {
  type: typeof GET_TEACHER_LIST,
  teachers: Array<Teacher>
}

export type TeacherTypes =
  ChangeTeacher |
  ClearTeacher |
  GetTeacherList
