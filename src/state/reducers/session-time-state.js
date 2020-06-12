import {
  UPDATE_SESSION_TIME,
  CLEAR_SESSION_TIME
} from "../actions/transition-time";

const initialState = { startTime: 0, endTime: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SESSION_TIME:
      if (state.startTime === 0) {
        return {
          startTime: action.time,
          endTime: 0
        }
      } else {
        return {
          startTime: state.startTime,
          endTime: action.time
        }
      }
    case CLEAR_SESSION_TIME:
      return {
        startTime: 0,
        endTime: 0
      }
    default:
      return state;
  }
};