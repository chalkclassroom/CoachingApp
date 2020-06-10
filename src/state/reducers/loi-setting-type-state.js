import {SELECT_LOI_SETTING} from '../actions/level-of-instruction';

const initialState = {settingType: null};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_LOI_SETTING:
            return {
                ...state,
                settingType: action.settingType
            };
        default:
            return state;
    }
};
