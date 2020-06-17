export const ADD_NEW_CENTER = "add_new_sa_center";
export const UPDATE_CENTER_COUNT = "update_sa_center_count";
export const DELETE_SA_CENTERS = "delete_all_sa_centers";
export const UPDATE_SEQUENTIAL_COUNT = "update_sequential_count";
export const CLEAR_SEQUENTIAL_COUNT = "clear_sequential_count";

export const addNewCenter = (centerName: string): {type: string, centerName: string} => ({
  type: ADD_NEW_CENTER,
  centerName
});

export const incrementCenterCount = (centerName: string): {type: string, centerName: string} => ({
  type: UPDATE_CENTER_COUNT,
  centerName
});


export const deleteSACenters = (): {type: string} => ({
  type: DELETE_SA_CENTERS
});

export const updateSequentialCount = (behavior: string): {type: string, behavior: string} => ({
  type: UPDATE_SEQUENTIAL_COUNT,
  behavior
})

export const clearSequentialCount = (): {type: string} => ({
  type: CLEAR_SEQUENTIAL_COUNT
})
