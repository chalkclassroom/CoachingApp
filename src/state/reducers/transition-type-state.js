import { CHANGE_TRANSITION_TYPE } from "../actions/transition-time";

const initialState = { transitionType: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TRANSITION_TYPE:
      return {
        ...state,
        transitionType: action.transitionType
      };
    default:
      return state;
  }
};
