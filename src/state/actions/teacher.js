export const CHANGE_TEACHER = "change_selected_teacher";
export const CLEAR_TEACHER = "clear_selected_teacher";
export const GET_TEACHER_LIST = "get_teacher_list";

export const changeTeacher = teacher => ({
  type: CHANGE_TEACHER,
  teacher
});

export const clearTeacher = () => ({
  type: CLEAR_TEACHER
});

export const getTeacherList = teachers => ({
  type: GET_TEACHER_LIST,
  teachers
})
