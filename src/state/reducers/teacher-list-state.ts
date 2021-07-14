import * as Types from '../../constants/Types';
import { GET_TEACHER_LIST, UPDATE_TEACHER_INFO, TeacherTypes } from "../actions/teacher";

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
    case UPDATE_TEACHER_INFO:
      return { 
        ...state, 
        teachers: state.teachers.map(
            (teacher, i) => teacher.id === action.teacher.id ? {
              id: teacher.id,
              firstName: action.teacher.firstName,
              lastName: action.teacher.lastName,
              school: action.teacher.school,
              email: action.teacher.email,
              phone: action.teacher.phone,
              notes: action.teacher.notes,
              role: teacher.role,
              unlocked: teacher.unlocked
            }
            : teacher
        )
      }
    default:
      return state;
  }
};