export const STUDENTS_ADD = "add_student";
export const STUDENTS_EDIT = "edit_student";
export const STUDENTS_REMOVE = "remove_student";
export const RESET_STUDENTS = "reset_students"

export const addStudent = (name: string): addStudent => ({
  type: STUDENTS_ADD,
  name
});

export const editStudent = (name: string, id: string): editStudent => ({
  type: STUDENTS_EDIT,
  name,
  id
});

export const removeStudent = (id: string): removeStudent => ({
  type: STUDENTS_REMOVE,
  id
});

export const resetStudents = (): removeStudent => ({
  type: RESET_STUDENTS,
});

export type addStudentTypes =
  addStudent | editStudent | removeStudent | resetStudents