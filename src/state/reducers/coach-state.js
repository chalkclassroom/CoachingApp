import {
  GET_COACH,
  CLEAR_COACH
} from "../actions/coach.ts";

const initialState = { coachName: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COACH:
      return {
        ...state,
        coachName: action.coachName
      };
    case CLEAR_COACH:
      return {
        ...state,
        coachName: null
      };
    default:
      return state;
  }
};