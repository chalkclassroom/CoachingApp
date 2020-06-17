import {
  CHANGE_TRANSITION_TYPE,
  RESET_TRANSITION_TIME,
  TransitionTimeTypes
} from "../actions/transition-time";

interface TransitionTypeState {
  transitionType: string
}

const initialState: TransitionTypeState = { transitionType: null };

export default (state = initialState, action: TransitionTimeTypes): TransitionTypeState => {
  switch (action.type) {
    case CHANGE_TRANSITION_TYPE:
      return {
        ...state,
        transitionType: action.transitionType
      };
    case RESET_TRANSITION_TIME:
      return {
        ...state,
        transitionType: null
      };
    default:
      return state;
  }
};
