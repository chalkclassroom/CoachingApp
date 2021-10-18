import {
  STUDENTS_ADD,
  STUDENTS_EDIT,
  STUDENTS_REMOVE,
  RESET_STUDENTS,
  StudentsActionType,
} from '../actions/students'

export type Student = {
  count: number
  id: string
  name: string
}

export type NewStudent = Omit<Student, 'id'>

export type EditedStudent = Partial<Student> & Pick<Student, 'id'>

interface StudentsState {
  students: Array<Student>
}

const initialState: StudentsState = { students: [] }

export default (
  state = initialState,
  action: StudentsActionType
): StudentsState => {
  switch (action.type) {
    case STUDENTS_ADD:
      return {
        ...state,
        students: [...state.students, action.student],
      }

    case STUDENTS_EDIT: {
      const updatedStudents = state.students.map(student => {
        return student.id === action.student.id
          ? {
              ...student,
              ...action.student,
            }
          : student
      })

      return {
        ...state,
        students: updatedStudents,
      }
    }

    case STUDENTS_REMOVE: {
      const updatedStudents = state.students.filter(
        student => student.id !== action.student.id
      )

      return {
        ...state,
        students: updatedStudents,
      }
    }
    case RESET_STUDENTS: {
      return {
        ...state,
        students: [],
      }
    }

    default:
      return state
  }
}
