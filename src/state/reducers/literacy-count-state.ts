import {
  UPDATE_LITERACY_COUNT,
  CLEAR_LITERACY_COUNT,
  LiteracyTypes
} from "../actions/literacy-instruction";

interface LiteracyCountState {
  literacyCount: number,
  noLiteracyCount: number
}

const initialState: LiteracyCountState = { literacyCount: 0, noLiteracyCount: 0 };

export default (state = initialState, action: LiteracyTypes): LiteracyCountState => {
  switch (action.type) {
    case UPDATE_LITERACY_COUNT:
      if (action.behavior) {
        return {
          literacyCount: state.literacyCount + 1,
          noLiteracyCount: state.noLiteracyCount
        }
      } else {
        return {
          literacyCount: state.literacyCount,
          noLiteracyCount: state.noLiteracyCount + 1
        }
      }
    case CLEAR_LITERACY_COUNT:
      return {
        literacyCount: 0,
        noLiteracyCount: 0
      }
    default:
      return state;
  }
};
