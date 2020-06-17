export const PUSH_LOI_STACK = 'push_entry_onto_loi_stack';
export const POP_LOI_STACK = 'pop_entry_off_loi_stack';
export const EMPTY_LOI_STACK = 'empty_loi_stack';

export const pushOntoLoiStack = (entry: string): {
  type: string,
  entry: {
    timestamp: number,
    observation: string
  }
} => ({
  type: PUSH_LOI_STACK,
  entry: {
    timestamp: Date.now(),
    observation: entry
  }
});

export const popOffLoiStack = (): {type: string} => ({
  type: POP_LOI_STACK
});

export const emptyLoiStack = (): {type: string} => ({
  type: EMPTY_LOI_STACK
});
