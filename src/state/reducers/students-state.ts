import { nanoid } from 'nanoid'

import {
  STUDENTS_ADD,
  STUDENTS_EDIT,
  STUDENTS_REMOVE,
  RESET_STUDENTS,
  StudentsActionType
} from "../actions/students";

interface StudentsState {
  students: Array<{
    name: string,
    id: string,
    count: number
  }>
}

const initialState: StudentsState = { students: [] };

export default (state = initialState, action: StudentsActionType): StudentsState => {
  switch (action.type) {
    case STUDENTS_ADD:
      return {
        ...state,
        students: [...state.students, {name: action.name, id: nanoid(), count: 0}]
      };

    case STUDENTS_EDIT:
      {
        const updatedStudents = state.students.map(student => {
          return student.id === action.id ? {...student, name: action.name} : student
        })

        return {
          ...state,
          students: updatedStudents
        };
      }

      case STUDENTS_REMOVE:
      {
        const updatedStudents = state.students.filter(student => student.id !== action.id)
        return {
        ...state,
        students: updatedStudents
      };
      }
      case RESET_STUDENTS:
      {
        return {
        ...state,
        students: []
      };
      }
    
    default:
      return state;
  }
};