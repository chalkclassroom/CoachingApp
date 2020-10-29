export const UPDATE_LISTENING_COUNT = "update_listening_count";
export const CLEAR_LISTENING_COUNT = "clear_listening_count";

export const updateListeningCount = (behavior: boolean): UpdateListeningCount => ({
  type: UPDATE_LISTENING_COUNT,
  behavior
});

export const clearListeningCount = (): ClearListeningCount => ({
  type: CLEAR_LISTENING_COUNT
});

interface UpdateListeningCount {
  type: typeof UPDATE_LISTENING_COUNT,
  behavior: boolean
}

interface ClearListeningCount {
  type: typeof CLEAR_LISTENING_COUNT
}

export type ListeningToChildrenTypes = 
  UpdateListeningCount |
  ClearListeningCount;