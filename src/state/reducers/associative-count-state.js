import {
  UPDATE_AC_COUNT,
  CLEAR_AC_COUNT
} from "../actions/associative-cooperative.ts";

const initialState = { acCount: 0, noACCount: 0, noOppCount: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AC_COUNT:
      if (action.behavior==="true") {
        return {
          acCount: state.acCount + 1,
          noACCount: state.noACCount,
          noOppCount: state.noOppCount
        }
      } else if (action.behavior==="false") {
        return {
          acCount: state.acCount,
          noACCount: state.noACCount + 1,
          noOppCount: state.noOppCount
        };
      } else {
        return {
          acCount: state.acCount,
          noACCount: state.noACCount,
          noOppCount: state.noOppCount + 1
        };
      }
    case CLEAR_AC_COUNT:
      return {
        acCount: 0,
        noACCount: 0,
        noOppCount: 0
      }
    default:
      return state;
  }
};
