import {
  GET_TEACHER_LIST_FOR_RESULTS,
  ADD_TRANSITION_RESULT,
  ResultsTypes
} from "../actions/results";

interface ResultsState {

      transitionResults: Array<{
        teacherId: string,
        sessionId: string,
        sessionDate: Date | undefined,
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

}

const initialState: ResultsState = {transitionResults: []};

export default (state = initialState, action: ResultsTypes): ResultsState => {
  switch (action.type) {
    /* case GET_TEACHER_LIST_FOR_RESULTS:
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
      }) 
      return {
        ...state,
        // teacherId: action.teachers
        // results: [...state.results, action.teachers]
        results: action.teachers
      }; */
    case ADD_TRANSITION_RESULT:
      console.log('transition result', state.transitionResults, action.entry);
            // make a copy of the existing array
            let thisResult = state.transitionResults.slice();
            console.log('this is this result', thisResult);
            const index = state.transitionResults.map(e => e.sessionId).indexOf(action.entry.sessionId);
            console.log('INDEX', index);
            if (index > -1) {
              console.log('LETS SEE', state.transitionResults[index], state.transitionResults[index].summary);
            }

            if (
              // (state.transitionResults.filter(e => e.sessionId === action.entry.sessionId).length > 0)
              index > -1
              // &&
              // state.transitionResults[index].summary
              ) {
              console.log('entry already exists');
                const updated = thisResult.filter(e => e.sessionId === action.entry.sessionId);
                thisResult = thisResult.filter(e => e.sessionId !== action.entry.sessionId);
                console.log('THIS RESULT IN IF', thisResult);  
                // const updated = thisResult.filter(e => e.sessionId === action.entry.sessionId);
                console.log('initial updated', updated);
                // updated[0].summary = {};
                updated[0].summary.total = action.entry.total;
                updated[0].summary.sessionTotal = action.entry.sessionTotal;
                updated[0].summary.startDate = action.entry.startDate;
                console.log('UPDATED', updated);
                thisResult.push(updated[0]);
                console.log('now length of this results is', thisResult.length);
            }     
            else {
              console.log('entry does not exist')
                // modify the COPY, not the original
                thisResult.push({
                  sessionId: action.entry.sessionId, 
                  sessionDate: undefined,
                  teacherId: '',
                  summary: {
                    total: action.entry.total,
                    sessionTotal: action.entry.sessionTotal,
                    startDate: action.entry.startDate
                  },
                  details: undefined,
                  trends: undefined
                });            
            }      

            return {
                // "spread" the original state object
                ...state,
                // but replace the "chosenIds" field
                transitionResults: [
                  // ...state.transitionResults,
                  ...thisResult
                ]
            };
      /* return {
        ...state,
        transitionResults: [...state.transitionResults, action.entry]
      }; */
      /* return state.transitionResults.map((item: {
        teacherId: string,
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
      }) => {
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
      }) */
    default:
      return state;
  }
};
