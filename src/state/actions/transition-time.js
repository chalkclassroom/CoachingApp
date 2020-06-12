export const CHANGE_TRANSITION_TYPE = "toggle_transition_type";
export const TRANSITION_APPEND_LOG = "push_entry_onto_transition_time_stack";
export const RESET_TRANSITION_TIME = "reset_transition_type_and_log";
export const UPDATE_TRANSITION_TIME = "update_transition_time";
export const CLEAR_TRANSITION_TIME = "clear_transition_time";
export const UPDATE_SESSION_TIME = "update_session_time";
export const CLEAR_SESSION_TIME = "clear_session_time";

export const toggleNewTransitionType = transitionType => ({
  type: CHANGE_TRANSITION_TYPE,
  transitionType
});

export const pushOntoTransitionStack = entry => ({
  type: TRANSITION_APPEND_LOG,
  entry
});

export const resetTransitionTime = () => ({
  type: RESET_TRANSITION_TIME
});

export const updateTransitionTime = time => ({
  type: UPDATE_TRANSITION_TIME,
  time
});

export const clearTransitionTime = () => ({
  type: CLEAR_TRANSITION_TIME
});

export const updateSessionTime = time => ({
  type: UPDATE_SESSION_TIME,
  time
});

export const clearSessionTime = () => ({
  type: CLEAR_SESSION_TIME
});
