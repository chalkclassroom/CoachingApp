export const ADD_NEW_CENTER = "add_new_ac_center";
export const UPDATE_CENTER_COUNT = "update_ac_center_count";
export const DELETE_ALL_CENTERS = "delete_all_ac_centers";

export const addNewCenter = centerName => ({
  type: ADD_NEW_CENTER,
  centerName
});

export const incrementCenterCount = centerName => ({
  type: UPDATE_CENTER_COUNT,
  centerName
});

export const deleteAllCenters = () => ({
  type: DELETE_ALL_CENTERS
});
