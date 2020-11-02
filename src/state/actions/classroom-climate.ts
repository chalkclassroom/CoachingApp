export const PUSH_CLIMATE_STACK = "push_entry_onto_classroom_climate_stack";
export const POP_CLIMATE_STACK = "pop_entry_off_classroom_climate_stack";
export const CLIMATE_APPEND_RATING = "append_classroom_climate_rating";
export const EMPTY_CLIMATE_RATING = "empty_climate_rating_array";
export const EMPTY_CLIMATE_STACK = "empty_classroom_climate_stack";

export const pushOntoClimateStack = (entry: {
  BehaviorResponse: string,
  Type: string
}): PushOntoClimateStack => ({
  type: PUSH_CLIMATE_STACK,
  entry: {
    timestamp: Date.now(),
    observation: entry.BehaviorResponse
  }
});

export const popOffClimateStack = (): PopOffClimateStack => ({
  type: POP_CLIMATE_STACK
});

export const appendClimateRating = (rating: number): AppendClimateRating => ({
  type: CLIMATE_APPEND_RATING,
  entry: {
    timestamp: Date.now(),
    rating
  }
});

export const emptyClimateRating = (): EmptyClimateRating => ({
  type: EMPTY_CLIMATE_RATING,
});

export const emptyClimateStack = (): EmptyClimateStack => ({
  type: EMPTY_CLIMATE_STACK
});

interface PushOntoClimateStack {
  type: typeof PUSH_CLIMATE_STACK,
  entry: {
    timestamp: number,
    observation: string
  }
}

interface PopOffClimateStack {
  type: typeof POP_CLIMATE_STACK
}

interface AppendClimateRating {
  type: typeof CLIMATE_APPEND_RATING,
  entry: {
    timestamp: number,
    rating: number
  }
}

interface EmptyClimateRating {
  type: typeof EMPTY_CLIMATE_RATING
}

interface EmptyClimateStack {
  type: typeof EMPTY_CLIMATE_STACK
}

export type ClassroomClimateTypes = 
  PushOntoClimateStack |
  PopOffClimateStack |
  AppendClimateRating |
  EmptyClimateRating |
  EmptyClimateStack;