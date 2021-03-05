import {
  ADD_TEACHER,
  ADD_TOOL,
  SessionDatesTypes
} from "../actions/session-dates";

interface SessionDatesState {
  dates: Array<{
    teacherId: string,
    data: Array<{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }>
  }>
}

const initialState: SessionDatesState = {dates: []};

export default (state = initialState, action: SessionDatesTypes): SessionDatesState => {
  switch (action.type) {
    case ADD_TEACHER:
      return {
        ...state,
        dates: [...state.dates, action.dates]
      };
    case ADD_TOOL:
      const copy = [...state.dates];
      const teacherIndex = state.dates.map(e => e.teacherId).indexOf(action.dates[0].teacherId);
      const teacherCopy = copy[teacherIndex].data;
      const teacherCopyData = teacherCopy.slice();
      teacherCopyData.push({
        tool: action.dates[0].data[0].tool,
        sessions: action.dates[0].data[0].sessions
      });
      const newTeacherObject = {
        teacherId: action.dates[0].teacherId,
        data: teacherCopyData
      };
      copy.splice(teacherIndex, 1);
      copy.push(newTeacherObject);
      return {
        ...state,
        dates: copy
      };
    default:
      return state;
  }
};