import {
  GET_COACH,
  CLEAR_COACH,
  CoachTypes
} from "../actions/coach";

interface CoachState {
  coachName: string
}

const initialState: CoachState = { coachName: null };

export default (state = initialState, action: CoachTypes): CoachState => {
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