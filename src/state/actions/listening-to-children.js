export const UPDATE_LISTENING_COUNT = "update_listening_count";
export const CLEAR_LISTENING_COUNT = "clear_listening_count";

export const updateListeningCount = behavior => ({
  type: UPDATE_LISTENING_COUNT,
  behavior
});

export const clearListeningCount = () => ({
  type: CLEAR_LISTENING_COUNT
});