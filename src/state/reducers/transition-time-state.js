import {
  UPDATE_TRANSITION_TIME,
  CLEAR_TRANSITION_TIME
} from "../actions/transition-time.ts";

const initialState = { transitionTime: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TRANSITION_TIME:
      return {
        transitionTime: state.transitionTime + action.time
      }
    case CLEAR_TRANSITION_TIME:
      return {
        transitionTime: 0
      }
    default:
      return state;
  }
};
