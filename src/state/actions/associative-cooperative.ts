export const ADD_NEW_CENTER = "add_new_ac_center";
export const UPDATE_CENTER_COUNT = "update_ac_center_count";
export const DELETE_AC_CENTERS = "delete_all_ac_centers";
export const UPDATE_AC_COUNT = "update_ac_count";
export const CLEAR_AC_COUNT = "clear_ac_count";

export const addNewCenter = (centerName: string): {type: string, centerName: string} => ({
  type: ADD_NEW_CENTER,
  centerName
});

export const incrementCenterCount = (centerName: string): {type: string, centerName: string} => ({
  type: UPDATE_CENTER_COUNT,
  centerName
});

export const deleteACCenters = (): {type: string} => ({
  type: DELETE_AC_CENTERS
});

export const updateACCount = (behavior: string): {type: string, behavior: string} => ({
  type: UPDATE_AC_COUNT,
  behavior
})

export const clearACCount = (): {type: string} => ({
  type: CLEAR_AC_COUNT
})
