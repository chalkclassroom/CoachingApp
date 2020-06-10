import {ADD_NEW_CENTER, DELETE_MI_CENTERS, UPDATE_CENTER_COUNT} from "../actions/math-instruction";

const initialState = {mathCenters: []};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_CENTER:
            if (
                action.centerName === "" ||
                state.mathCenters.some(
                    center => center.name === action.centerName.toLowerCase()
                )
            ) {
                return {
                    ...state
                };
            }
            return {
                ...state,
                mathCenters: [
                    ...state.mathCenters,
                    {name: action.centerName.toLowerCase(), count: 0}
                ]
            };
        case UPDATE_CENTER_COUNT:
            const newCenters = [...state.mathCenters];
            newCenters.some(center => {
                if (center.name === action.centerName.toLowerCase()) {
                    ++center.count;
                    return true;
                }
                return false;
            });

            return {
                ...state,
                mathCenters: newCenters
            };
        case DELETE_MI_CENTERS:
            return {
                ...state,
                mathCenters: []
            };
        default:
            return state;
    }
};
  