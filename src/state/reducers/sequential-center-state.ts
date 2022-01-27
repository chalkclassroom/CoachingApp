import {
  ADD_NEW_CENTER,
  UPDATE_CENTER_COUNT,
  DELETE_SA_CENTERS,
  SequentialActivitiesTypes
} from "../actions/sequential-activities";

interface SequentialCenterState {
  sequentialCenters: Array<{
    name: string,
    count: number
  }>
}

const initialState: SequentialCenterState = { sequentialCenters: [] };

export default (state = initialState, action: SequentialActivitiesTypes): SequentialCenterState => {
  switch (action.type) {
    case ADD_NEW_CENTER:
      if (
        action.centerName === "" ||
        state.sequentialCenters.some(
          center => center.name === action.centerName.toLowerCase()
        )
      ) {
        return {
          ...state
        };
      }
      return {
        ...state,
        sequentialCenters: [
          ...state.sequentialCenters,
          {
            name: action.centerName.toLowerCase(),
            count: 0,
          }
        ]
      };
    case UPDATE_CENTER_COUNT:
      const newCenters = [...state.sequentialCenters];
      newCenters.some(center => {
        if (center.name === action.centerName.toLowerCase()) {
          ++center.count;
          return true;
        }
        return false;
      });

      return {
        ...state,
        sequentialCenters: newCenters
      };
    case DELETE_SA_CENTERS:
      return {
        ...state,
        sequentialCenters: []
      };
    default:
      return state;
  }
};
