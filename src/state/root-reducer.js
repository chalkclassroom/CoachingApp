import { combineReducers } from "redux";
import associativeCenterState from "./reducers/associative-center-state";
import climateRatingsState from "./reducers/climate-ratings-state";
import climateStackState from "./reducers/climate-stack-state";
import climateTypeState from "./reducers/climate-type-state";
import sequentialCenterState from "./reducers/sequential-center-state";
import transitionLogState from "./reducers/transition-log-state";
import transitionTypeState from "./reducers/transition-type-state";
import mathCentersState from "./reducers/math-instruction-state";

export default combineReducers({
  associativeCenterState,
  climateRatingsState,
  climateStackState,
  climateTypeState,
  sequentialCenterState,
  transitionLogState,
  transitionTypeState,
  mathCentersState

});
