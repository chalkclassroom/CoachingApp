export const UPDATE_LITERACY_COUNT = "update_literacy_count";
export const CLEAR_LITERACY_COUNT = "clear_literacy_count";

export const updateLiteracyCount = (behavior: boolean): UpdateLiteracyCount => ({
  type: UPDATE_LITERACY_COUNT,
  behavior
});

export const clearLiteracyCount = (): ClearLiteracyCount => ({
  type: CLEAR_LITERACY_COUNT
});

interface UpdateLiteracyCount {
  type: typeof UPDATE_LITERACY_COUNT,
  behavior: boolean
}

interface ClearLiteracyCount {
  type: typeof CLEAR_LITERACY_COUNT
}

export type LiteracyTypes = 
  UpdateLiteracyCount |
  ClearLiteracyCount;