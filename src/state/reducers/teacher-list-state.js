import { GET_TEACHER_LIST } from "../actions/teacher.ts";

const initialState = { teachers: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHER_LIST:
      return {
        ...state,
        teachers: action.teachers
      };
    default:
      return state;
  }
};