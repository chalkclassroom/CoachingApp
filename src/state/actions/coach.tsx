export const GET_COACH = "get_coach";
export const CLEAR_COACH = "clear_coach";


export const getCoach = (coachName: string): {type: string, coachName: string} => ({
  type: GET_COACH,
  coachName
});

export const clearCoach = (): {type: string} => ({
  type: CLEAR_COACH
});

