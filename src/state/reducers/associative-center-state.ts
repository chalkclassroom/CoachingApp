import {
  ADD_NEW_CENTER,
  UPDATE_CENTER_COUNT,
  DELETE_AC_CENTERS,
  AssociativeCooperativeTypes
} from "../actions/associative-cooperative";

interface AssociativeCentersState {
  associativeCenters: Array<{
    name: string,
    count: number
  }>
}

const initialState: AssociativeCentersState = { associativeCenters: [] };

export default (state = initialState, action: AssociativeCooperativeTypes): AssociativeCentersState => {
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
      const newCenters = [...state.associativeCenters];
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
    case DELETE_AC_CENTERS:
      return {
        ...state,
        associativeCenters: []
      };
    default:
      return state;
  }
};
