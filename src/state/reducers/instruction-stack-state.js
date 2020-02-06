import {
  EMPTY_LOI_STACK,
  POP_LOI_STACK,
  PUSH_LOI_STACK
} from "../actions/level-of-instruction";

const initialState = { instructionStack: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case PUSH_LOI_STACK:
      return {
        ...state,
        instructionStack: [...state.instructionStack, action.entry]
      };
    case POP_LOI_STACK:
      return {
        ...state,
        instructionStack: state.instructionStack.slice(0, state.instructionStack.length - 1)
      };
    case EMPTY_LOI_STACK:
      return {
        ...state,
        instructionStack: []
      };
    default:
      return state;
  }
};
