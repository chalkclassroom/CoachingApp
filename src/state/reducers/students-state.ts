import { nanoid } from 'nanoid'

import {
  STUDENTS_ADD,
  STUDENTS_EDIT,
  STUDENTS_REMOVE
} from "../actions/students";

interface StudentsState {
  students: Array<{
    name: string,
    id: number
  }>
}

const initialState: StudentsState = { students: [] };

export default (state = initialState, action: StudentsTypes): StudentsState => {
  switch (action.type) {
    case STUDENTS_ADD:
      return {
        ...state,
        students: [...state.students, {name: action.name, id: nanoid()}]
      };
    
    default:
      return state;
  }
};
