export const ADD_NEW_CENTER       = "add_new_mathcenter";
export const UPDATE_CENTER_COUNT  = "update_mathcenter_count";
export const DELETE_MI_CENTERS   = "delete_all_mathcenters";
export const UPDATE_MATH_COUNT = "update_math_count";
export const CLEAR_MATH_COUNT = "clear_math_count";

export const addNewCenter = centerName => ({
    type: ADD_NEW_CENTER,
    centerName
  });
  
  export const incrementCenterCount = centerName => ({
    type: UPDATE_CENTER_COUNT,
    centerName
  });
  
  export const deleteMICenters = () => ({
    type: DELETE_MI_CENTERS
  });

  export const updateMathCount = math => ({
    type: UPDATE_MATH_COUNT,
    math
  })

  export const clearMathCount = () => ({
    type: CLEAR_MATH_COUNT
  })
  
  



