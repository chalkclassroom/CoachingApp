import {
  ADD_NEW_CENTER,
  UPDATE_CENTER_COUNT,
  TOGGLE_SEQUENTIAL_MATERIALS,
  DELETE_SA_CENTERS
} from "../actions/sequential-activities";

const initialState = { sequentialCenters: [] };

export default (state = initialState, action) => {
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
            sequentialMaterialsPresent: false
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
    case TOGGLE_SEQUENTIAL_MATERIALS:
      const new_centers = [...state.sequentialCenters];
      new_centers.some(center => {
        if (center.name === action.centerName.toLowerCase()) {
          center.sequentialMaterialsPresent = !center.sequentialMaterialsPresent;
          return true;
        }
        return false;
      });

      return {
        ...state,
        sequentialCenters: new_centers
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
