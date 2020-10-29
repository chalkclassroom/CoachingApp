import {
  UPDATE_SEQUENTIAL_COUNT,
  CLEAR_SEQUENTIAL_COUNT,
  SequentialActivitiesTypes
} from "../actions/sequential-activities";

interface SequentialCountState {
  sequentialCount: number,
  noSequentialCount: number
}

const initialState: SequentialCountState = { sequentialCount: 0, noSequentialCount: 0 };

export default (state = initialState, action: SequentialActivitiesTypes): SequentialCountState => {
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
