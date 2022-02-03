import {
  UPDATE_SESSION_TIME,
  CLEAR_SESSION_TIME,
  TransitionTimeTypes
} from "../actions/transition-time";

interface SessionTimeState {
  startTime: number,
  endTime: number
}

const initialState: SessionTimeState = { startTime: 0, endTime: 0 };

export default (state = initialState, action: TransitionTimeTypes): SessionTimeState => {
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