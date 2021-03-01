import {
  GET_TEACHER_LIST_FOR_RESULTS,
  ADD_TRANSITION_RESULT,
  ResultsTypes
} from "../actions/results";

interface ResultsState {
  results: Array<{
    teacherId: string,
    /* sessions: Array<{
      sessionId: string,
      sessionDate: Date, */
      transitionResults: Array<{
        sessionId: string,
        sessionDate: Date,
        summary: {
          total: number,
          sessionTotal: number,
          startDate: {value: string}
        } | undefined,
        details: Array<{
          line: number,
          traveling: number,
          waiting: number,
          routines: number,
          behaviorManagement: number,
          other: number,
          total: number
        }> | undefined,
        trends: Array<{
          id: string,
          line: number,
          traveling: number,
          waiting: number,
          routines: number,
          behaviorManagement: number,
          other: number,
          total: number,
          sessionTotal: number,
          startDate: {value: string}
        }> | undefined
      }>
    // }>
  }>
}

const initialState: ResultsState = {results: []};

export default (state = initialState, action: ResultsTypes): ResultsState => {
  switch (action.type) {
    case GET_TEACHER_LIST_FOR_RESULTS:
      console.log('this is something', action.teachers);
      /* return array.map((item, index) => {
          if (index !== action.index) {
            // This isn't the item we care about - keep it as-is
            return item
          }
      
          // Otherwise, this is the one we want - return an updated value
          return {
            ...item,
            ...action.item
          }
        }) */
      /* action.teachers.forEach((teacher) => {
        return {
        ...state,
        teacherId: teacher.id
        }
      }) */
      return {
        ...state,
        // teacherId: action.teachers
        // results: [...state.results, action.teachers]
        results: action.teachers
      };
    case ADD_TRANSITION_RESULT:
      return state.results.transitionResults.map((item: any) => {
        console.log('this is what index means', action.entry.sessionId)
        if (item.sessionId !== action.entry.sessionId) {
          // This isn't the item we care about - keep it as-is
          return item
        }
    
        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          ...action.entry
        }
      })
    default:
      return state;
  }
};
