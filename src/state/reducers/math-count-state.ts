import {
  UPDATE_MATH_COUNT,
  CLEAR_MATH_COUNT,
  MathInstructionTypes
} from "../actions/math-instruction";

interface MathCountState {
  mathCount: number,
  noMathCount: number
}

const initialState: MathCountState = { mathCount: 0, noMathCount: 0 };

export default (state = initialState, action: MathInstructionTypes): MathCountState => {
  switch (action.type) {
    case UPDATE_MATH_COUNT:
      if (action.behavior==="true") {
        return {
          mathCount: state.mathCount + 1,
          noMathCount: state.noMathCount
        }
      } else {
        return {
          mathCount: state.mathCount,
          noMathCount: state.noMathCount + 1
        }
      }
    case CLEAR_MATH_COUNT:
      return {
        mathCount: 0,
        noMathCount: 0
      }
    default:
      return state;
  }
};
