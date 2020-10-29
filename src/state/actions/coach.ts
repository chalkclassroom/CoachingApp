export const GET_COACH = "get_coach";
export const CLEAR_COACH = "clear_coach";


export const getCoach = (coachName: string): GetCoach => ({
  type: GET_COACH,
  coachName
});

export const clearCoach = (): ClearCoach => ({
  type: CLEAR_COACH
});

interface GetCoach {
  type: typeof GET_COACH,
  coachName: string
}

interface ClearCoach {
  type: typeof CLEAR_COACH
}

export type CoachTypes =
  GetCoach |
  ClearCoach;