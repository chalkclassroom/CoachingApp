export const STUDENTS_ADD = "add_student";
export const STUDENTS_EDIT = "edit_student";
export const STUDENTS_REMOVE = "remove_student";

export const addStudent = (name: string): addStudent => ({
  type: STUDENTS_ADD,
  name
});

export type addStudentTypes =
  addStudent