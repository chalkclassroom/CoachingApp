import * as Types from '../../constants/Types';

export const ADD_INSTRUCTION_DETAILS = "add_instruction_details";
export const ADD_INSTRUCTION_TRENDS = "add_instruction_trends";

export const addInstructionDetails = (entry: {
  sessionId: string,
  teacherId: string,
  details: Types.InstructionData['details'] | undefined
}): AddInstructionDetails => ({
  type: ADD_INSTRUCTION_DETAILS,
  entry
});

export const addInstructionTrends = (entry: {
  teacherId: string,
  trends: Types.InstructionData['trends'] | undefined
}): AddInstructionTrends => ({
  type: ADD_INSTRUCTION_TRENDS,
  entry
});

interface AddInstructionDetails {
  type: typeof ADD_INSTRUCTION_DETAILS,
  entry: {
    sessionId: string,
    teacherId: string,
    details: Types.InstructionData['details'] | undefined
  }
}

interface AddInstructionTrends {
  type: typeof ADD_INSTRUCTION_TRENDS,
  entry: {
    teacherId: string,
    trends: Types.InstructionData['trends'] | undefined
  }
}

export type ResultsTypes =
  AddInstructionDetails |
  AddInstructionTrends