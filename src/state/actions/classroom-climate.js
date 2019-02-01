export const CHANGE_CLIMATE_TYPE =
    "toggle_instruction_transition_for_classroom_climate";

export const toggleNewClimateType = climateType => ({
    type: CHANGE_CLIMATE_TYPE,
    climateType
});
