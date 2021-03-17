import * as Types from '../../constants/Types';

export const ADD_LISTENING_SUMMARY = "add_listening_summary";
export const ADD_LISTENING_DETAILS = "add_listening_details";
export const ADD_LISTENING_TRENDS = "add_listening_trends";

export const addListeningSummary = (entry: {
  sessionId: string,
  teacherId: string,
  summary: Types.ListeningData['summary'] | undefined
}): AddListeningSummary => ({
  type: ADD_LISTENING_SUMMARY,
  entry
});

export const addListeningDetails = (entry: {
  sessionId: string,
  teacherId: string,
  details: Types.ListeningData['details']
}): AddListeningDetails => ({
  type: ADD_LISTENING_DETAILS,
  entry
})

export const addListeningTrends = (entry: {
  teacherId: string,
  trends: Types.ListeningData['trends'] | undefined
}): AddListeningTrends => ({
  type: ADD_LISTENING_TRENDS,
  entry
});

interface AddListeningSummary {
  type: typeof ADD_LISTENING_SUMMARY,
  entry: {
    sessionId: string,
    teacherId: string,
    summary: Types.ListeningData['summary'] | undefined
  }
}

interface AddListeningDetails {
  type: typeof ADD_LISTENING_DETAILS,
  entry: {
    sessionId: string,
    teacherId: string,
    details: Types.ListeningData['details']
  }
}

interface AddListeningTrends {
  type: typeof ADD_LISTENING_TRENDS,
  entry: {
    teacherId: string,
    trends: Types.ListeningData['trends'] | undefined
  }
}

export type ResultsTypes =
  AddListeningSummary |
  AddListeningDetails |
  AddListeningTrends