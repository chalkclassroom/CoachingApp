import {
  GET_COACH,
  CLEAR_COACH,
  CoachTypes
} from "../actions/coach";
import { UserDocument } from '../../components/Firebase/Firebase'

interface CoachState {
  coachName: string | null,
  role: string,
  user: UserDocument | null
}

const initialState: CoachState = { coachName: null, role: '', user: null };

export default (state = initialState, action: CoachTypes): CoachState => {
  switch (action.type) {
    case GET_COACH:
      return {
        ...state,
        coachName: action.coachName,
        role: action.role,
        user: action.userDoc
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