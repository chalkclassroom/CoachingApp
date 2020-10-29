export const ADD_NEW_CENTER = "add_new_sa_center";
export const UPDATE_CENTER_COUNT = "update_sa_center_count";
export const DELETE_SA_CENTERS = "delete_all_sa_centers";
export const UPDATE_SEQUENTIAL_COUNT = "update_sequential_count";
export const CLEAR_SEQUENTIAL_COUNT = "clear_sequential_count";

export const addNewCenter = (centerName: string): AddNewCenter => ({
  type: ADD_NEW_CENTER,
  centerName
});

export const incrementCenterCount = (centerName: string): IncrementCenterCount => ({
  type: UPDATE_CENTER_COUNT,
  centerName
});


export const deleteSACenters = (): DeleteSACenters => ({
  type: DELETE_SA_CENTERS
});

export const updateSequentialCount = (behavior: string): UpdateSequentialCount => ({
  type: UPDATE_SEQUENTIAL_COUNT,
  behavior
})

export const clearSequentialCount = (): ClearSequentialCount => ({
  type: CLEAR_SEQUENTIAL_COUNT
})

interface AddNewCenter {
  type: typeof ADD_NEW_CENTER,
  centerName: string
}

interface IncrementCenterCount {
  type: typeof UPDATE_CENTER_COUNT,
  centerName: string
}

interface DeleteSACenters {
  type: typeof DELETE_SA_CENTERS
}

interface UpdateSequentialCount {
  type: typeof UPDATE_SEQUENTIAL_COUNT,
  behavior: string
}

interface ClearSequentialCount {
  type: typeof CLEAR_SEQUENTIAL_COUNT
}

export type SequentialActivitiesTypes = 
  AddNewCenter |
  IncrementCenterCount |
  DeleteSACenters |
  UpdateSequentialCount |
  ClearSequentialCount;