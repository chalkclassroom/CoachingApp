import {
  CHANGE_TEACHER,
  CLEAR_TEACHER,
  TeacherTypes
} from "../actions/teacher";

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
}

interface TeacherSelectedState {
  teacher: Teacher
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