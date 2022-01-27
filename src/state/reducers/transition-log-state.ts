import {
  TRANSITION_APPEND_LOG,
  RESET_TRANSITION_TIME,
  TransitionTimeTypes
} from "../actions/transition-time";

interface TransitionLogState {
  transitionStack: Array<{
    duration: string,
    end: string,
    start: string,
    transitionType: string
  }>
}

const initialState: TransitionLogState = { transitionStack: [] };

export default (state = initialState, action: TransitionTimeTypes): TransitionLogState => {
  switch (action.type) {
    case TRANSITION_APPEND_LOG:
      return {
        ...state,
        transitionStack: [...state.transitionStack, action.entry]
      };
    case RESET_TRANSITION_TIME:
      return {
        ...state,
        transitionStack: []
      };
    default:
      return state;
  }
};
