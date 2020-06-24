import { GET_TEACHER_LIST, TeacherTypes } from "../actions/teacher";

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

interface TeacherListState {
  teachers: Array<Teacher>
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