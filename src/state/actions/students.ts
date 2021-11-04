export const STUDENTS_ADD = "add_student";
export const STUDENTS_EDIT = "edit_student";
export const STUDENTS_REMOVE = "remove_student";
export const RESET_STUDENTS = "reset_students"

import { nanoid } from 'nanoid'

import type { EditedStudent, NewStudent, Student } from '../reducers/students-state'

export type StudentsActionType =
  | { type: typeof STUDENTS_ADD, student: Student }
  | { type: typeof STUDENTS_EDIT, student: EditedStudent }
  | { type: typeof STUDENTS_REMOVE, student: Student }
  | { type: typeof RESET_STUDENTS }

export const addStudent = ({ student, teacherId } : { student: NewStudent, teacherId: string }): StudentsActionType => ({
  type: STUDENTS_ADD,
  student: {
    ...student,
    id: nanoid(),
    teacherId
  },
});

export const editStudent = (student: EditedStudent): StudentsActionType => ({
  type: STUDENTS_EDIT,
  student
});

export const removeStudent = (student: Student): StudentsActionType => ({
  type: STUDENTS_REMOVE,
  student
});

export const resetStudents = (): StudentsActionType => ({
  type: RESET_STUDENTS,
});
