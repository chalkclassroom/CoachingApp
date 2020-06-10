import { combineReducers } from "redux";
import associativeCenterState from "./reducers/associative-center-state";
import climateRatingsState from "./reducers/climate-ratings-state";
import climateStackState from "./reducers/climate-stack-state";
import sequentialCenterState from "./reducers/sequential-center-state";
import transitionLogState from "./reducers/transition-log-state";
import transitionTypeState from "./reducers/transition-type-state";
import mathCentersState from "./reducers/math-instruction-state";
import mathCountState from "./reducers/math-count-state";
import LOIsettingTypeState from "./reducers/loi-setting-type-state";
import instructionstackstate from "./reducers/instruction-stack-state";
import teacherSelectedState from "./reducers/teacher-selected-state";
import teacherListState from "./reducers/teacher-list-state";
import coachState from './reducers/coach-state';

export default combineReducers({
  associativeCenterState,
  climateRatingsState,
  climateStackState,
  sequentialCenterState,
  transitionLogState,
  transitionTypeState,
  mathCentersState,
  mathCountState,
  LOIsettingTypeState,
  instructionstackstate,
  teacherSelectedState,
  teacherListState,
  coachState
});
