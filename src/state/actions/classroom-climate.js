export const CHANGE_CLIMATE_TYPE =
    "toggle_instruction_transition_for_classroom_climate";
export const PUSH_CLIMATE_STACK = "push_entry_onto_classroom_climate_stack";
export const POP_CLIMATE_STACK = "pop_entry_off_classroom_climate_stack";

export const toggleNewClimateType = climateType => ({
    type: CHANGE_CLIMATE_TYPE,
    climateType
});

export const pushOntoClimateStack = entry => ({
    type: PUSH_CLIMATE_STACK,
    entry: {
        timestamp: Date.now(),
        observation: entry.observation,
        climateType: entry.climateType
    }
});

export const popOffClimateStack = () => ({
    type: POP_CLIMATE_STACK
});
