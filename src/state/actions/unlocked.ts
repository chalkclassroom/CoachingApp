export const GET_UNLOCKED = "get_unlocked";
export const ADD_UNLOCKED = "add_unlocked";
export const CLEAR_UNLOCKED = "clear_unlocked";


export const getUnlocked = (unlocked: Array<number>): GetUnlocked => ({
  type: GET_UNLOCKED,
  unlocked
});

export const addUnlocked = (unlocked: number): AddUnlocked => ({
  type: ADD_UNLOCKED,
  unlocked
});

export const clearUnlocked = (): ClearUnlocked => ({
  type: CLEAR_UNLOCKED
});

interface GetUnlocked {
  type: typeof GET_UNLOCKED,
  unlocked: Array<number>
}

interface AddUnlocked {
  type: typeof ADD_UNLOCKED,
  unlocked: number
}

interface ClearUnlocked {
  type: typeof CLEAR_UNLOCKED
}

export type UnlockedTypes =
  GetUnlocked |
  AddUnlocked |
  ClearUnlocked;