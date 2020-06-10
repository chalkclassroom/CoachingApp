import {RESET_TRANSITION_TIME, TRANSITION_APPEND_LOG} from "../actions/transition-time";

const initialState = {transitionStack: []};

export default (state = initialState, action) => {
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
