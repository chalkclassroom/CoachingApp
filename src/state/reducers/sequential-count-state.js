import {
  UPDATE_SEQUENTIAL_COUNT,
  CLEAR_SEQUENTIAL_COUNT
} from "../actions/sequential-activities";

const initialState = { sequentialCount: 0, noSequentialCount: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEQUENTIAL_COUNT:
      if (action.behavior==="true") {
        return {
          sequentialCount: state.sequentialCount + 1,
          noSequentialCount: state.noSequentialCount
        }
      } else {
        return {
          sequentialCount: state.sequentialCount,
          noSequentialCount: state.noSequentialCount + 1
        }
      }
    case CLEAR_SEQUENTIAL_COUNT:
      return {
        sequentialCount: 0,
        noSequentialCount: 0
      }
    default:
      return state;
  }
};
