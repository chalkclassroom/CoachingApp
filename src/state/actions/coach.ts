import { UserDocument } from '../../components/Firebase/Firebase'

export const GET_COACH = "get_coach";
export const CLEAR_COACH = "clear_coach";


export const getCoach = (coachName: string, role: string = '', userInfo:UserDocument): GetCoach => ({
  type: GET_COACH,
  coachName,
  role,
  userDoc: userInfo
});

export const clearCoach = (): ClearCoach => ({
  type: CLEAR_COACH
});

interface GetCoach {
  type: typeof GET_COACH,
  coachName: string,
  role: string,
  userDoc: UserDocument
}

interface ClearCoach {
  type: typeof CLEAR_COACH
}

export type CoachTypes =
  GetCoach |
  ClearCoach;