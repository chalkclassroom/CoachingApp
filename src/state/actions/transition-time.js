export const CHANGE_TRANSITION_TYPE = "toggle_transition_type";
export const TRANSITION_APPEND_LOG = "push_entry_onto_transition_time_stack";

export const toggleNewTransitionType = transitionType => ({
  type: CHANGE_TRANSITION_TYPE,
  transitionType
});

export const pushOntoTransitionStack = entry => ({
  type: TRANSITION_APPEND_LOG,
  entry
});
