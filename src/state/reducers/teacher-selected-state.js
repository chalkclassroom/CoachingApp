import {CHANGE_TEACHER, CLEAR_TEACHER} from "../actions/teacher";

const initialState = {teacher: null};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TEACHER:
            return {
                ...state,
                teacher: action.teacher
            };
        case CLEAR_TEACHER:
            return {
                ...state,
                teacher: null
            };
        default:
            return state;
    }
};