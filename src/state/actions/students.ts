export const STUDENTS_ADD = "add_student";
export const STUDENTS_EDIT = "edit_student";
export const STUDENTS_REMOVE = "remove_student";
export const RESET_STUDENTS = "reset_students"

export type StudentsActionType =
  | { type: typeof STUDENTS_ADD, name: string }
  | { type: typeof STUDENTS_EDIT, name: string, id: string }
  | { type: typeof STUDENTS_REMOVE, id: string }
  | { type: typeof RESET_STUDENTS }

export const addStudent = (name: string): StudentsActionType => ({
  type: STUDENTS_ADD,
  name
});

export const editStudent = (name: string, id: string): StudentsActionType => ({
  type: STUDENTS_EDIT,
  name,
  id
});

export const removeStudent = (id: string): StudentsActionType => ({
  type: STUDENTS_REMOVE,
  id
});

export const resetStudents = (): StudentsActionType => ({
  type: RESET_STUDENTS,
});