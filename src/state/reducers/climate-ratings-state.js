import { CLIMATE_APPEND_RATING } from "../actions/classroom-climate";

const initialState = { climateRatings: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case CLIMATE_APPEND_RATING:
      return {
        ...state,
        climateRatings: [...state.climateRatings, action.entry]
      };
    default:
      return state;
  }
};
