export const CHANGE_TRANSITION_TYPE = "toggle_transition_type";
export const PUSH_TRANSITION_STACK = "push_entry_onto_transition_time_stack";

export const toggleNewTransitionType = transitionType => ({
    type: CHANGE_TRANSITION_TYPE,
    transitionType
});

export const pushOntoTransitionStack = entry => ({
    type: PUSH_TRANSITION_STACK,
    entry
});
