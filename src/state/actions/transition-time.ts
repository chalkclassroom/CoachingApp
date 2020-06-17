export const CHANGE_TRANSITION_TYPE = "toggle_transition_type";
export const TRANSITION_APPEND_LOG = "push_entry_onto_transition_time_stack";
export const RESET_TRANSITION_TIME = "reset_transition_type_and_log";
export const UPDATE_TRANSITION_TIME = "update_transition_time";
export const CLEAR_TRANSITION_TIME = "clear_transition_time";
export const UPDATE_SESSION_TIME = "update_session_time";
export const CLEAR_SESSION_TIME = "clear_session_time";

export const toggleNewTransitionType = (transitionType: string): {type: string, transitionType: string} => ({
  type: CHANGE_TRANSITION_TYPE,
  transitionType
});

export const pushOntoTransitionStack = (entry: {
  start: string,
  end: string,
  duration: string,
  transitionType: string
}): {
  type: string,
  entry: {
    start: string,
    end: string,
    duration: string,
    transitionType: string
  }
} => ({
  type: TRANSITION_APPEND_LOG,
  entry
});

export const resetTransitionTime = (): {type: string} => ({
  type: RESET_TRANSITION_TIME
});

export const updateTransitionTime = (time: number): {type: string, time: number} => ({
  type: UPDATE_TRANSITION_TIME,
  time
});

export const clearTransitionTime = (): {type: string} => ({
  type: CLEAR_TRANSITION_TIME
});

export const updateSessionTime = (time: number): {type: string, time: number} => ({
  type: UPDATE_SESSION_TIME,
  time
});

export const clearSessionTime = (): {type: string} => ({
  type: CLEAR_SESSION_TIME
});
