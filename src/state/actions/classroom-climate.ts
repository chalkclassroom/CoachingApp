export const PUSH_CLIMATE_STACK = "push_entry_onto_classroom_climate_stack";
export const POP_CLIMATE_STACK = "pop_entry_off_classroom_climate_stack";
export const CLIMATE_APPEND_RATING = "append_classroom_climate_rating";
export const EMPTY_CLIMATE_STACK = "empty_classroom_climate_stack";

export const pushOntoClimateStack = (entry: {
  BehaviorResponse: string,
  Type: string
}): {type: string, entry: {timestamp: number, observation: string}} => ({
  type: PUSH_CLIMATE_STACK,
  entry: {
    timestamp: Date.now(),
    observation: entry.BehaviorResponse
  }
});

export const popOffClimateStack = (): {type: string} => ({
  type: POP_CLIMATE_STACK
});

export const appendClimateRating = (rating: number): {
  type: string,
  entry: {
    timestamp: number,
    rating: number
  }
} => ({
  type: CLIMATE_APPEND_RATING,
  entry: {
    timestamp: Date.now(),
    rating
  }
});

export const emptyClimateStack = (): {type: string} => ({
  type: EMPTY_CLIMATE_STACK
});
