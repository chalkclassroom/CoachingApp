export const UPDATE_ENGAGEMENT_COUNT = "update_engagement_count";
export const CLEAR_ENGAGEMENT_COUNT = "clear_engagement_count";

export const updateEngagementCount = (engaged: boolean): {type: string, engaged: boolean} => ({
  type: UPDATE_ENGAGEMENT_COUNT,
  engaged
});

export const clearEngagementCount = (): {type: string} => ({
  type: CLEAR_ENGAGEMENT_COUNT
});