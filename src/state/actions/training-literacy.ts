export const SET_TRAINING = "set_training_state";
export const UNLOCK_LITERACY_KNOWLEDGE_CHECK = "unlock_foundational";

export const setLiteracyTraining = (literacyTraining: LiteracyTrainingFlags): GetTraining => ({
  type: SET_TRAINING,
  literacyTraining
});

export const unlockLiteracyKnowledgeCheck = (checklistType: string): UnlockLiteracyKnowledgeCheck => ({
  type: UNLOCK_LITERACY_KNOWLEDGE_CHECK,
  checklistType
});

export interface LiteracyTrainingFlags {
  conceptsFoundational: boolean,
  conceptsWriting: boolean,
  conceptsReading: boolean,
  conceptsLanguage: boolean,
  definitionsFoundational: boolean,
  definitionsWriting: boolean,
  definitionsReading: boolean,
  definitionsLanguage: boolean,
  demoFoundational: boolean,
  demoWriting: boolean,
  demoReading: boolean,
  demoLanguage: boolean,
  knowledgeCheckFoundational: boolean,
  knowledgeCheckWriting: boolean,
  knowledgeCheckReading: boolean,
  knowledgeCheckLanguage: boolean
}

interface GetTraining {
  type: typeof SET_TRAINING,
  literacyTraining: LiteracyTrainingFlags
}

interface UnlockLiteracyKnowledgeCheck {
  type: typeof UNLOCK_LITERACY_KNOWLEDGE_CHECK,
  checklistType: string
}

export type TrainingLiteracyTypes =
  GetTraining | UnlockLiteracyKnowledgeCheck;