import {
  COACH_LOADED,
  CLEAR_COACH,
  CoachTypes
} from "../actions/coach";

interface CoachState {
  coachName: string,
  role: string
}

const initialState: CoachState = { coachName: null, role: '' };

export default (state = initialState, action: CoachTypes): CoachState => {
  switch (action.type) {
    case COACH_LOADED:
      return {
        ...state,
        coachName: action.coachName,
        role: action.role
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