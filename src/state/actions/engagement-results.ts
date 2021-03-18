import * as Types from '../../constants/Types';

export const ADD_ENGAGEMENT_SUMMARY = "add_engagement_summary";
export const ADD_ENGAGEMENT_DETAILS = "add_engagement_details";
export const ADD_ENGAGEMENT_TRENDS = "add_engagement_trends";

export const addEngagementSummary = (entry: {
  sessionId: string,
  teacherId: string,
  summary: Types.EngagementData['summary'] | undefined
}): AddEngagementSummary => ({
  type: ADD_ENGAGEMENT_SUMMARY,
  entry
});

export const addEngagementDetails = (entry: {
  sessionId: string,
  teacherId: string,
  details: Types.EngagementData['details']
}): AddEngagementDetails => ({
  type: ADD_ENGAGEMENT_DETAILS,
  entry
})

export const addEngagementTrends = (entry: {
  teacherId: string,
  trends: Types.EngagementData['trends'] | undefined
}): AddEngagementTrends => ({
  type: ADD_ENGAGEMENT_TRENDS,
  entry
});

interface AddEngagementSummary {
  type: typeof ADD_ENGAGEMENT_SUMMARY,
  entry: {
    sessionId: string,
    teacherId: string,
    summary: Types.EngagementData['summary'] | undefined
  }
}

interface AddEngagementDetails {
  type: typeof ADD_ENGAGEMENT_DETAILS,
  entry: {
    sessionId: string,
    teacherId: string,
    details: Types.EngagementData['details']
  }
}

interface AddEngagementTrends {
  type: typeof ADD_ENGAGEMENT_TRENDS,
  entry: {
    teacherId: string,
    trends: Types.EngagementData['trends'] | undefined
  }
}

export type ResultsTypes =
  AddEngagementSummary |
  AddEngagementDetails |
  AddEngagementTrends