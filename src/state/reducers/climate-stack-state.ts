import {
  EMPTY_CLIMATE_STACK,
  POP_CLIMATE_STACK,
  PUSH_CLIMATE_STACK,
  ClassroomClimateTypes
} from "../actions/classroom-climate";

interface ClassroomClimateState {
  climateStack: Array<{
    observation: string,
    timestamp: number
  }>
}

const initialState: ClassroomClimateState = { climateStack: [] };

export default (state = initialState, action: ClassroomClimateTypes): ClassroomClimateState => {
  switch (action.type) {
    case PUSH_CLIMATE_STACK:
      return {
        ...state,
        climateStack: [...state.climateStack, action.entry]
      };
    case POP_CLIMATE_STACK:
      return {
        ...state,
        climateStack: state.climateStack.slice(0, state.climateStack.length - 1)
      };
    case EMPTY_CLIMATE_STACK:
      return {
        ...state,
        climateStack: []
      };
    default:
      return state;
  }
};
