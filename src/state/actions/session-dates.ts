export const ADD_TEACHER = "add_teacher";
export const ADD_TOOL = "add_tool";

export const addTeacher = (dates: {
  teacherId: string,
  data: Array<{
    tool: string,
    sessions: Array<{id: string, sessionStart: {value: string}}>
  }>
}): AddTeacher => ({
  type: ADD_TEACHER,
  dates
});

export const addTool = (dates: Array<{
  teacherId: string,
  data: Array<{
    tool: string,
    sessions: Array<{id: string, sessionStart: {value: string}}>
  }>
}>): AddTool => ({
  type: ADD_TOOL,
  dates
});

interface AddTeacher {
  type: typeof ADD_TEACHER,
  dates: {
    teacherId: string,
    data: Array<{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }>
  }
}

interface AddTool {
  type: typeof ADD_TOOL,
  dates: Array<{
    teacherId: string,
    data: Array<{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }>
  }>
}

export type SessionDatesTypes =
  AddTeacher |
  AddTool