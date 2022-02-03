import {
  UPDATE_TRANSITION_TIME,
  CLEAR_TRANSITION_TIME,
  TransitionTimeTypes
} from "../actions/transition-time";

interface TransitionTimeState {
  transitionTime: number
}

const initialState: TransitionTimeState = { transitionTime: 0 };

export default (state = initialState, action: TransitionTimeTypes): TransitionTimeState => {
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
