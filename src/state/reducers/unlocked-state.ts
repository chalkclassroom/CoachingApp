import {
  GET_UNLOCKED,
  ADD_UNLOCKED,
  CLEAR_UNLOCKED,
  UnlockedTypes
} from "../actions/unlocked";

interface UnlockedState {
  unlocked: Array<number>
}

const initialState: UnlockedState = { unlocked: null };

export default (state = initialState, action: UnlockedTypes): UnlockedState => {
  switch (action.type) {
    case GET_UNLOCKED:
      return {
        ...state,
        unlocked: action.unlocked
      };
    case ADD_UNLOCKED: 
      return {
        ...state,
        unlocked: [
          ...state.unlocked, action.unlocked
        ]
      };
    case CLEAR_UNLOCKED:
      return {
        ...state,
        unlocked: null
      };
    default:
      return state;
  }
};