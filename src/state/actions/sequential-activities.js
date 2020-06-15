export const ADD_NEW_CENTER = "add_new_sa_center";
export const UPDATE_CENTER_COUNT = "update_sa_center_count";
export const TOGGLE_SEQUENTIAL_MATERIALS = "toggle_sa_materials";
export const DELETE_SA_CENTERS = "delete_all_sa_centers";
export const UPDATE_SEQUENTIAL_COUNT = "update_sequential_count";
export const CLEAR_SEQUENTIAL_COUNT = "clear_sequential_count";

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

export const deleteSACenters = () => ({
  type: DELETE_SA_CENTERS
});

export const updateSequentialCount = behavior => ({
  type: UPDATE_SEQUENTIAL_COUNT,
  behavior
})

export const clearSequentialCount = () => ({
  type: CLEAR_SEQUENTIAL_COUNT
})
