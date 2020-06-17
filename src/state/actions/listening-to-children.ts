export const UPDATE_LISTENING_COUNT = "update_listening_count";
export const CLEAR_LISTENING_COUNT = "clear_listening_count";

export const updateListeningCount = (behavior: boolean): {type: string, behavior: boolean} => ({
  type: UPDATE_LISTENING_COUNT,
  behavior
});

export const clearListeningCount = (): {type: string} => ({
  type: CLEAR_LISTENING_COUNT
});