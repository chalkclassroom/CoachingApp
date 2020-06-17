export const ADD_NEW_CENTER = "add_new_ac_center";
export const UPDATE_CENTER_COUNT = "update_ac_center_count";
export const DELETE_AC_CENTERS = "delete_all_ac_centers";
export const UPDATE_AC_COUNT = "update_ac_count";
export const CLEAR_AC_COUNT = "clear_ac_count";

export const addNewCenter = (centerName: string): AddNewCenter => ({
  type: ADD_NEW_CENTER,
  centerName
});

export const incrementCenterCount = (centerName: string): IncrementCenterCount => ({
  type: UPDATE_CENTER_COUNT,
  centerName
});

export const deleteACCenters = (): DeleteACCenters => ({
  type: DELETE_AC_CENTERS
});

export const updateACCount = (behavior: string): UpdateACCount => ({
  type: UPDATE_AC_COUNT,
  behavior
})

export const clearACCount = (): ClearACCount => ({
  type: CLEAR_AC_COUNT
})

interface AddNewCenter {
  type: typeof ADD_NEW_CENTER,
  centerName: string
}

interface IncrementCenterCount {
  type: typeof UPDATE_CENTER_COUNT,
  centerName: string
}

interface DeleteACCenters {
  type: typeof DELETE_AC_CENTERS
}

interface UpdateACCount {
  type: typeof UPDATE_AC_COUNT,
  behavior: string
}

interface ClearACCount {
  type: typeof CLEAR_AC_COUNT
}

export type AssociativeCooperativeTypes = 
  AddNewCenter |
  IncrementCenterCount |
  DeleteACCenters |
  UpdateACCount |
  ClearACCount;