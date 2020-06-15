import {
  UPDATE_ENGAGEMENT_COUNT,
  CLEAR_ENGAGEMENT_COUNT
} from "../actions/student-engagement";

const initialState = { engagedCount: 0, notEngagedCount: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ENGAGEMENT_COUNT:
      if (action.engaged) {
        return {
          engagedCount: state.engagedCount + 1,
          notEngagedCount: state.notEngagedCount
        }
      } else {
        return {
          engagedCount: state.engagedCount,
          notEngagedCount: state.notEngagedCount + 1
        }
      }
    case CLEAR_ENGAGEMENT_COUNT:
      return {
        engagedCount: 0,
        notEngagedCount: 0
      }
    default:
      return state;
  }
};
