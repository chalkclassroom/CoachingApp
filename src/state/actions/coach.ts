export const COACH_LOADED = "coach_loaded";
export const CLEAR_COACH = "clear_coach";

export enum Role {
  TEACHER = "teacher",
  COACH = "coach",
  ADMIN = "admin",
  ANONYMOUS = "anonymous"
}


export const coachLoaded = (coachName: string, role: Role = Role.TEACHER): CoachLoadedAction => ({
  type: COACH_LOADED,
  coachName,
  role
});

export const clearCoach = (): ClearCoachAction => ({
  type: CLEAR_COACH
});

interface CoachLoadedAction {
  type: typeof COACH_LOADED,
  coachName: string,
  role: string
}

interface ClearCoachAction {
  type: typeof CLEAR_COACH
}

export type CoachTypes =
  CoachLoadedAction |
  ClearCoachAction;