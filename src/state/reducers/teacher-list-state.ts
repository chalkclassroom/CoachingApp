import * as Types from '../../constants/Types';
import { GET_TEACHER_LIST, TeacherTypes } from "../actions/teacher";

interface TeacherListState {
  teachers: Array<Types.Teacher>
}

const initialState: TeacherListState = { teachers: [] };

export default (state = initialState, action: TeacherTypes): TeacherListState => {
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