import { CHANGE_CLIMATE_TYPE } from "../actions/classroom-climate";

const initialState = { climateType: "instruction" };

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CLIMATE_TYPE:
            return {
                ...state,
                climateType: action.climateType
            };
        default:
            return state;
    }
};
