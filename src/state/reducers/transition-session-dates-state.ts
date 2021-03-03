import {
  GET_SESSION_DATES,
  SessionDatesTypes
} from "../actions/session-dates";
import * as Types from '../../constants/Types';

interface SessionDatesState {
  sessions: Array<{
    teacherId: string,
    dates: Array<{id: string, sessionStart: {value: string}}>
  }>
}

const initialState: SessionDatesState = {sessions: []};

export default (state = initialState, action: SessionDatesTypes): SessionDatesState => {
  switch (action.type) {
    case GET_SESSION_DATES:
      return {
        ...state,
        sessions: [...state.sessions, action.sessions]
      };
    default:
      return state;
  }
};