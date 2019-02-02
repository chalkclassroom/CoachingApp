import { PUSH_TRANSITION_STACK } from "../actions/transition-time";

const initialState = { transitionStack: [] };

export default (state = initialState, action) => {
    switch (action.type) {
        case PUSH_TRANSITION_STACK:
            return {
                ...state,
                transitionStack: [...state.transitionStack, action.entry]
            };
        default:
            return state;
    }
};
