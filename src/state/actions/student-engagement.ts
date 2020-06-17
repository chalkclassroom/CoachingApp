export const UPDATE_ENGAGEMENT_COUNT = "update_engagement_count";
export const CLEAR_ENGAGEMENT_COUNT = "clear_engagement_count";

export const updateEngagementCount = (engaged: boolean): UpdateEngagementCount => ({
  type: UPDATE_ENGAGEMENT_COUNT,
  engaged
});

export const clearEngagementCount = (): ClearEngagementCount => ({
  type: CLEAR_ENGAGEMENT_COUNT
});

interface UpdateEngagementCount {
  type: typeof UPDATE_ENGAGEMENT_COUNT,
  engaged: boolean
}

interface ClearEngagementCount {
  type: typeof CLEAR_ENGAGEMENT_COUNT
}

export type StudentEngagementTypes =
  UpdateEngagementCount |
  ClearEngagementCount