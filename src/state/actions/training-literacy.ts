export const GET_TRAINING = "get_training";
export const UNLOCK_LITERACY_KNOWLEDGE_CHECK = "unlock_foundational";

export const getTraining = (literacyTraining: {
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
}): GetTraining => ({
  type: GET_TRAINING,
  literacyTraining
});

export const unlockLiteracyKnowledgeCheck = (checklistType: string): UnlockLiteracyKnowledgeCheck => ({
  type: UNLOCK_LITERACY_KNOWLEDGE_CHECK,
  checklistType
});

interface GetTraining {
  type: typeof GET_TRAINING,
  literacyTraining: {  conceptsFoundational: boolean,
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
}

interface UnlockLiteracyKnowledgeCheck {
  type: typeof UNLOCK_LITERACY_KNOWLEDGE_CHECK,
  checklistType: string
}

export type TrainingLiteracyTypes =
  GetTraining | UnlockLiteracyKnowledgeCheck;