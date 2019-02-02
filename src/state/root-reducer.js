import { combineReducers } from "redux";
import climateStackState from "./reducers/climate-stack-state";
import climateTypeState from "./reducers/climate-type-state";
import transitionLogState from "./reducers/transition-log-state";
import transitionTypeState from "./reducers/transition-type-state";

export default combineReducers({
    climateStackState,
    climateTypeState,
    transitionLogState,
    transitionTypeState
});
