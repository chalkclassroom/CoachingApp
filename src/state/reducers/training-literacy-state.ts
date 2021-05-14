import {
  GET_TRAINING,
  TrainingLiteracyTypes
} from "../actions/training-literacy";

interface TrainingLiteracyState {
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

const initialState: TrainingLiteracyState = {
  conceptsFoundational: false,
  conceptsWriting: false,
  conceptsReading: false,
  conceptsLanguage: false,
  definitionsFoundational: false,
  definitionsWriting: false,
  definitionsReading: false,
  definitionsLanguage: false,
  demoFoundational: false,
  demoWriting: false,
  demoReading: false,
  demoLanguage: false,
  knowledgeCheckFoundational: false,
  knowledgeCheckWriting: false,
  knowledgeCheckReading: false,
  knowledgeCheckLanguage: false
};

export default (state = initialState, action: TrainingLiteracyTypes): TrainingLiteracyState => {
  switch (action.type) {
    case GET_TRAINING:
      return {
        // ...state,
        conceptsFoundational: action.literacyTraining.conceptsFoundational,
        conceptsWriting: action.literacyTraining.conceptsWriting,
        conceptsReading: action.literacyTraining.conceptsReading,
        conceptsLanguage: action.literacyTraining.conceptsLanguage,
        definitionsFoundational: action.literacyTraining.definitionsFoundational,
        definitionsWriting: action.literacyTraining.definitionsWriting,
        definitionsReading: action.literacyTraining.definitionsReading,
        definitionsLanguage: action.literacyTraining.definitionsLanguage,
        demoFoundational: action.literacyTraining.demoFoundational,
        demoWriting: action.literacyTraining.demoWriting,
        demoReading: action.literacyTraining.demoReading,
        demoLanguage: action.literacyTraining.demoLanguage,
        knowledgeCheckFoundational: action.literacyTraining.knowledgeCheckFoundational,
        knowledgeCheckWriting: action.literacyTraining.knowledgeCheckWriting,
        knowledgeCheckReading: action.literacyTraining.knowledgeCheckReading,
        knowledgeCheckLanguage: action.literacyTraining.knowledgeCheckLanguage
      };
    default:
      return state;
  }
};