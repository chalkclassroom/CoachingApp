import { combineReducers } from "redux";
import associativeCenterState from "./reducers/associative-center-state";
import climateRatingsState from "./reducers/climate-ratings-state";
import climateStackState from "./reducers/climate-stack-state";
import climateTypeState from "./reducers/climate-type-state";
import transitionLogState from "./reducers/transition-log-state";
import transitionTypeState from "./reducers/transition-type-state";

export default combineReducers({
  associativeCenterState,
  climateRatingsState,
  climateStackState,
  climateTypeState,
  transitionLogState,
  transitionTypeState
});
