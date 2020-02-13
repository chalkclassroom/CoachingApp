// export const CHANGE_LOI_TYPE =
//   "toggle_instruction_transition_for_loi";
export const PUSH_LOI_STACK = "push_entry_onto_loi_stack";
export const POP_LOI_STACK = "pop_entry_off_loi_stack";
export const LOI_APPEND_RATING = "append_loi_rating";
export const EMPTY_LOI_STACK = "empty_loi_stack";
export const SELECT_LOI_SETTING = "setting_type";


// export const toggleLoiType = loiType => ({
//   type: CHANGE_LOI_TYPE,
//   loiType
// });

export const toggleLOISettingType = settingType => ({
  type: SELECT_LOI_SETTING,
  settingType 
});

export const pushOntoLoiStack = entry => ({
  type: PUSH_LOI_STACK,
  entry: {
    timestamp: Date.now(),
    observation: entry.observation
  }
});

export const popOffLoiStack = () => ({
  type: POP_LOI_STACK
});

export const appendLoiRating = rating => ({
  type: LOI_APPEND_RATING,
  entry: {
    timestamp: Date.now(),
    rating
  }
});

export const emptyLoiStack = () => ({
  type: EMPTY_LOI_STACK
});
