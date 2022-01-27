import * as Types from '../../constants/Types';
import { GET_TEACHER_LIST, UPDATE_TEACHER_INFO, ADD_TEACHER, REMOVE_TEACHER, TeacherTypes } from "../actions/teacher";

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
    case ADD_TEACHER:
      const newTeacherList = [...state.teachers, action.teacher]
      return {
        ...state,
        teachers: newTeacherList
      }
    case REMOVE_TEACHER:
      const updatedTeacherList = [...state.teachers];
      const index = updatedTeacherList.findIndex(x => x.id === action.id);
      if (index > -1) {
        updatedTeacherList.splice(index, 1)
      }
      return {
        ...state,
        teachers: updatedTeacherList
      }
    default:
      return state;
  }
};