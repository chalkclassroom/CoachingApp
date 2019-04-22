export const ADD_NEW_CENTER = "add_new_sa_center";
export const UPDATE_CENTER_COUNT = "update_sa_center_count";
export const TOGGLE_SEQUENTIAL_MATERIALS = "toggle_sa_materials";
export const DELETE_ALL_CENTERS = "delete_all_sa_centers";

export const addNewCenter = centerName => ({
  type: ADD_NEW_CENTER,
  centerName
});

export const incrementCenterCount = centerName => ({
  type: UPDATE_CENTER_COUNT,
  centerName
});

export const toggleSequentialMaterials = centerName => ({
  type: TOGGLE_SEQUENTIAL_MATERIALS,
  centerName
});

export const deleteAllCenters = () => ({
  type: DELETE_ALL_CENTERS
});
