import {CHANGE_TRANSITION_TYPE, RESET_TRANSITION_TIME} from "../actions/transition-time";

const initialState = {transitionType: null};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TRANSITION_TYPE:
            return {
                ...state,
                transitionType: action.transitionType
            };
        case RESET_TRANSITION_TIME:
            return {
                ...state,
                transitionType: null
            };
        default:
            return state;
    }
};
