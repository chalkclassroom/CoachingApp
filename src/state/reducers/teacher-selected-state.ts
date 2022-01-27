import {
  CHANGE_TEACHER,
  CLEAR_TEACHER,
  TeacherTypes
} from "../actions/teacher";
import * as Types from '../../constants/Types';

interface TeacherSelectedState {
  teacher: Types.Teacher
}

const initialState: TeacherSelectedState = { teacher: null };

export default (state = initialState, action: TeacherTypes): TeacherSelectedState => {
  switch (action.type) {
    case CHANGE_TEACHER:
      return {
        ...state,
        teacher: action.teacher
      };
    case CLEAR_TEACHER:
      return {
        ...state,
        teacher: null
      };
    default:
      return state;
  }
};