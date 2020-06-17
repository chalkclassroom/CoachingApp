import {
  UPDATE_LISTENING_COUNT,
  CLEAR_LISTENING_COUNT
} from "../actions/listening-to-children.ts";

const initialState = { listeningCount: 0, noListeningCount: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LISTENING_COUNT:
      if (action.behavior) {
        return {
          listeningCount: state.listeningCount + 1,
          noListeningCount: state.noListeningCount
        }
      } else {
        return {
          listeningCount: state.listeningCount,
          noListeningCount: state.noListeningCount + 1
        }
      }
    case CLEAR_LISTENING_COUNT:
      return {
        listeningCount: 0,
        noListeningCount: 0
      }
    default:
      return state;
  }
};
