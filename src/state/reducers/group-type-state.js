import {
  SELECT_LOI_TYPE
} from "../actions/level-of-instruction";

const initialState = { groupType: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_LOI_TYPE:
      return {
        ...state,
        groupType: action.groupType
      };
    default:
      return state;
  }
};
