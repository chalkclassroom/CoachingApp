export const PUSH_LOI_STACK = 'push_entry_onto_loi_stack';
export const POP_LOI_STACK = 'pop_entry_off_loi_stack';
export const EMPTY_LOI_STACK = 'empty_loi_stack';

export const pushOntoLoiStack = (entry: string): PushOntoLoiStack => ({
  type: PUSH_LOI_STACK,
  entry: {
    timestamp: Date.now(),
    observation: entry
  }
});

export const popOffLoiStack = (): PopOffLoiStack => ({
  type: POP_LOI_STACK
});

export const emptyLoiStack = (): EmptyLoiStack => ({
  type: EMPTY_LOI_STACK
});

interface PushOntoLoiStack {
  type: typeof PUSH_LOI_STACK,
  entry: {
    timestamp: number,
    observation: string
  }
}

interface PopOffLoiStack {
  type: typeof POP_LOI_STACK
}

interface EmptyLoiStack {
  type: typeof EMPTY_LOI_STACK
}

export type LevelOfInstructionTypes =
  PushOntoLoiStack |
  PopOffLoiStack |
  EmptyLoiStack;
