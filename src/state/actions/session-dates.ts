export const GET_SESSION_DATES = "get_session_dates";

export const getSessionDates = (sessions: {
  teacherId: string,
  dates: Array<{id: string, sessionStart: {value: string}}>
}): GetSessionDates => ({
  type: GET_SESSION_DATES,
  sessions
});

interface GetSessionDates {
  type: typeof GET_SESSION_DATES,
  sessions: {
    teacherId: string,
    dates: Array<{id: string, sessionStart: {value: string}}>
  }
}

export type SessionDatesTypes =
  GetSessionDates