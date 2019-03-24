import {
  ADD_NEW_CENTER,
  UPDATE_CENTER_COUNT
} from "../actions/associative-cooperative";

const initialState = { associativeCenters: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_CENTER:
      if (
        action.centerName === "" ||
        state.associativeCenters.some(
          center => center.name === action.centerName.toLowerCase()
        )
      ) {
        return {
          ...state
        };
      }
      return {
        ...state,
        associativeCenters: [
          ...state.associativeCenters,
          { name: action.centerName.toLowerCase(), count: 0 }
        ]
      };
    case UPDATE_CENTER_COUNT:
      let newCenters = [...state.associativeCenters];
      newCenters.some(center => {
        if (center.name === action.centerName.toLowerCase()) {
          ++center.count;
          return true;
        }
        return false;
      });

      return {
        ...state,
        associativeCenters: newCenters
      };
    default:
      return state;
  }
};
