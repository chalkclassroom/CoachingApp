import { combineReducers } from "redux";
import associativeCenterState from "./reducers/associative-center-state";
import associativeCountState from "./reducers/associative-count-state";
import acResultsState from "./reducers/ac-results-state";
import climateRatingsState from "./reducers/climate-ratings-state";
import climateResultsState from "./reducers/climate-results-state";
import climateStackState from "./reducers/climate-stack-state";
import sequentialCenterState from "./reducers/sequential-center-state";
import sequentialCountState from "./reducers/sequential-count-state";
import sequentialResultsState from "./reducers/sequential-results-state";
import transitionLogState from "./reducers/transition-log-state";
import transitionTimeState from "./reducers/transition-time-state";
import sessionTimeState from "./reducers/session-time-state";
import transitionTypeState from "./reducers/transition-type-state";
import mathCentersState from "./reducers/math-instruction-state";
import mathCountState from "./reducers/math-count-state";
import mathResultsState from "./reducers/math-results-state";
import engagementCountState from "./reducers/engagement-count-state";
import instructionStackState from "./reducers/instruction-stack-state";
import instructionResultsState from "./reducers/instruction-results-state";
import listeningCountState from "./reducers/listening-count-state";
import listeningResultsState from "./reducers/listening-results-state";
import teacherSelectedState from "./reducers/teacher-selected-state";
import teacherListState from "./reducers/teacher-list-state";
import coachState from './reducers/coach-state';
import unlockedState from './reducers/unlocked-state';
import sessionDatesState from './reducers/session-dates-state';
import transitionResultsState from './reducers/transition-results-state';

export default combineReducers({
  associativeCenterState,
  associativeCountState,
  acResultsState,
  climateRatingsState,
  climateResultsState,
  climateStackState,
  sequentialCenterState,
  sequentialCountState,
  sequentialResultsState,
  transitionLogState,
  transitionTimeState,
  sessionTimeState,
  transitionTypeState,
  mathCentersState,
  mathCountState,
  mathResultsState,
  engagementCountState,
  instructionStackState,
  instructionResultsState,
  listeningCountState,
  listeningResultsState,
  teacherSelectedState,
  teacherListState,
  coachState,
  unlockedState,
  sessionDatesState,
  transitionResultsState
});
