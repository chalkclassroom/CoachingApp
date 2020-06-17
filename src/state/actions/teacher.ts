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

export const changeTeacher = (teacher: Teacher): {type: string, teacher: Teacher} => ({
  type: CHANGE_TEACHER,
  teacher
});

export const clearTeacher = (): {type: string} => ({
  type: CLEAR_TEACHER
});

export const getTeacherList = (teachers: Array<Teacher>): {type: string, teachers: Array<Teacher>} => ({
  type: GET_TEACHER_LIST,
  teachers
})
