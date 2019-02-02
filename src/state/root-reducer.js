import { combineReducers } from "redux";
import climateRatingsState from "./reducers/climate-ratings-state";
import climateStackState from "./reducers/climate-stack-state";
import climateTypeState from "./reducers/climate-type-state";
import transitionLogState from "./reducers/transition-log-state";
import transitionTypeState from "./reducers/transition-type-state";

export default combineReducers({
    climateRatingsState,
    climateStackState,
    climateTypeState,
    transitionLogState,
    transitionTypeState
});
