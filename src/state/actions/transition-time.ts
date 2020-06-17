export const CHANGE_TRANSITION_TYPE = "toggle_transition_type";
export const TRANSITION_APPEND_LOG = "push_entry_onto_transition_time_stack";
export const RESET_TRANSITION_TIME = "reset_transition_type_and_log";
export const UPDATE_TRANSITION_TIME = "update_transition_time";
export const CLEAR_TRANSITION_TIME = "clear_transition_time";
export const UPDATE_SESSION_TIME = "update_session_time";
export const CLEAR_SESSION_TIME = "clear_session_time";

export const toggleNewTransitionType = (transitionType: string): ToggleNewTransitionType => ({
  type: CHANGE_TRANSITION_TYPE,
  transitionType
});

export const pushOntoTransitionStack = (entry: {
  start: string,
  end: string,
  duration: string,
  transitionType: string
}): PushOntoTransitionStack => ({
  type: TRANSITION_APPEND_LOG,
  entry
});

export const resetTransitionTime = (): ResetTransitionTime => ({
  type: RESET_TRANSITION_TIME
});

export const updateTransitionTime = (time: number): UpdateTransitionTime => ({
  type: UPDATE_TRANSITION_TIME,
  time
});

export const clearTransitionTime = (): ClearTransitionTime => ({
  type: CLEAR_TRANSITION_TIME
});

export const updateSessionTime = (time: number): UpdateSessionTime => ({
  type: UPDATE_SESSION_TIME,
  time
});

export const clearSessionTime = (): ClearSessionTime => ({
  type: CLEAR_SESSION_TIME
});

interface ToggleNewTransitionType {
  type: typeof CHANGE_TRANSITION_TYPE,
  transitionType: string
}

interface PushOntoTransitionStack {
  type: typeof TRANSITION_APPEND_LOG,
  entry: {
    start: string,
    end: string,
    duration: string,
    transitionType: string
  }
}

interface ResetTransitionTime {
  type: typeof RESET_TRANSITION_TIME
}

interface UpdateTransitionTime {
  type: typeof UPDATE_TRANSITION_TIME,
  time: number
}

interface ClearTransitionTime {
  type: typeof CLEAR_TRANSITION_TIME
}

interface UpdateSessionTime {
  type: typeof UPDATE_SESSION_TIME,
  time: number
}

interface ClearSessionTime {
  type: typeof CLEAR_SESSION_TIME
}

export type TransitionTimeTypes =
  ToggleNewTransitionType |
  PushOntoTransitionStack |
  ResetTransitionTime |
  UpdateTransitionTime |
  ClearTransitionTime |
  UpdateSessionTime |
  ClearSessionTime