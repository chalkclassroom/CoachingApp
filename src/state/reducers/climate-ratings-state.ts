import { CLIMATE_APPEND_RATING, ClassroomClimateTypes } from "../actions/classroom-climate";

interface ClassroomClimateState {
  climateRatings: Array<{
    timestamp: number,
    rating: number
  }>
}

const initialState: ClassroomClimateState = { climateRatings: [] };

export default (state = initialState, action: ClassroomClimateTypes): ClassroomClimateState => {
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
