export const GET_TRAINING = "get_training";

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
  /* .conceptsFoundational,
  literacyTraining.conceptsWriting,
  literacyTraining.conceptsReading,
  literacyTraining.conceptsLanguage,
  literacyTraining.definitionsFoundational,
  literacyTraining.definitionsWriting,
  literacyTraining.definitionsReading,
  literacyTraining.definitionsLanguage,
  literacyTraining.demoFoundational,
  literacyTraining.demoWriting,
  literacyTraining.demoReading,
  literacyTraining.demoLanguage,
  literacyTraining.knowledgeCheckFoundational,
  literacyTraining.knowledgeCheckWriting,
  literacyTraining.knowledgeCheckReading,
  literacyTraining.knowledgeCheckLanguage */
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

export type TrainingLiteracyTypes =
  GetTraining;