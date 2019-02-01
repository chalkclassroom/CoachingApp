import { combineReducers } from "redux";
import climateTypeState from "./reducers/climate-type-state";
import climateStackState from "./reducers/climate-stack-state";

export default combineReducers({
    climateTypeState,
    climateStackState
});
