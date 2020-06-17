export const ADD_NEW_CENTER       = "add_new_mathcenter";
export const UPDATE_CENTER_COUNT  = "update_mathcenter_count";
export const DELETE_MI_CENTERS   = "delete_all_mathcenters";
export const UPDATE_MATH_COUNT = "update_math_count";
export const CLEAR_MATH_COUNT = "clear_math_count";

export const addNewCenter = (centerName: string): AddNewCenter => ({
  type: ADD_NEW_CENTER,
  centerName
});

export const incrementCenterCount = (centerName: string): IncrementCenterCount => ({
  type: UPDATE_CENTER_COUNT,
  centerName
});

export const deleteMICenters = (): DeleteMathCenters => ({
  type: DELETE_MI_CENTERS
});

export const updateMathCount = (behavior: string): UpdateMathCount => ({
  type: UPDATE_MATH_COUNT,
  behavior
})

export const clearMathCount = (): ClearMathCount => ({
  type: CLEAR_MATH_COUNT
})

interface AddNewCenter {
  type: typeof ADD_NEW_CENTER,
  centerName: string
}

interface IncrementCenterCount {
  type: typeof UPDATE_CENTER_COUNT,
  centerName: string
}

interface DeleteMathCenters {
  type: typeof DELETE_MI_CENTERS
}

interface UpdateMathCount {
  type: typeof UPDATE_MATH_COUNT,
  behavior: string
}

interface ClearMathCount {
  type: typeof CLEAR_MATH_COUNT
}

export type MathInstructionTypes = 
  AddNewCenter |
  IncrementCenterCount |
  DeleteMathCenters |
  UpdateMathCount |
  ClearMathCount;