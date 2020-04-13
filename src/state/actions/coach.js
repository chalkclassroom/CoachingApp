export const GET_COACH = "get_coach";
export const CLEAR_COACH = "clear_coach";


export const getCoach = coachName => ({
  type: GET_COACH,
  coachName
});

export const clearCoach = () => ({
  type: CLEAR_COACH
});

