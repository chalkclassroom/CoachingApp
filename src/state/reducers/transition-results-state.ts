import {
  TRANSITION_APPEND_LOG,
  RESET_TRANSITION_TIME,
  TransitionTimeTypes
} from "../actions/transition-time";

interface TransitionResultsState {
  transitionResults: Array<{
    summary: {
      total: number,
      sessionTotal: number,
      startDate: {value: string}
    } | undefined,
    details: Array<{
      line: number,
      traveling: number,
      waiting: number,
      routines: number,
      behaviorManagement: number,
      other: number,
      total: number
    }> | undefined,
    trends: Array<{
      id: string,
      line: number,
      traveling: number,
      waiting: number,
      routines: number,
      behaviorManagement: number,
      other: number,
      total: number,
      sessionTotal: number,
      startDate: {value: string}
    }> | undefined
  }>
}

const initialState: TransitionResultsState = { transitionResults: [] };

export default (state = initialState, action: TransitionTimeTypes): TransitionResultsState => {
  switch (action.type) {
    case TRANSITION_APPEND_LOG:
      return {
        ...state,
        transitionStack: [...state.transitionStack, action.entry]
      };
    case RESET_TRANSITION_TIME:
      return {
        ...state,
        transitionStack: []
      };
    default:
      return state;
  }
};
