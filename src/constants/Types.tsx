// import { Prompt } from "react-router-dom";

export type DashboardType = 'AppBar' | 'TT' | 'CC' | 'MI' | 'SE' | 'IN' | 'LC' | 'SA' | 'LI' | 'AC' | 'RedGraph' | 'NotPresent';

export type Selected = 'TransitionTime' | 'ClassroomClimate' | 'MathInstruction' | 'StudentEngagement' |
'LevelOfInstruction' | 'ListeningToChildren' | 'SequentialActivities' | 'LiteracyInstruction' | 'AssociativeCooperativeInteractions' | 'none';

export interface TransitionData {
  summary: {
    total: number,
    sessionTotal: number,
    startDate: {value: string}
  },
  details: Array<{
    line: number,
    traveling: number,
    waiting: number,
    routines: number,
    behaviorManagement: number,
    other: number,
    total: number
  }>,
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
  }>
}

export interface ReduxState {
  associativeCenterState: {
    associativeCenters: Array<{
      name: string,
      count: number
    }>
  },
  associativeCountState: {
    acCount: number,
    noACCount: number,
    noOppCount: number
  },
  climateRatingsState: {
    climateRatings: Array<{
      timestamp: number,
      rating: number
    }>
  },
  climateStackState: {
    climateStack: Array<{
      observation: string,
      timestamp: number
    }>
  },
  coachState: {
    coachName: string
  },
  engagementCountState: {
    engagedCount: number,
    notEngagedCount: number
  },
  instructionStackState: {
    instructionStack: Array<{
      timestamp: number,
      observation: string
    }>
  },
  listeningCountState: {
    listeningCount: number,
    noListeningCount: number
  },
  mathCountState: {
    mathCount: number,
    noMathCount: number
  },
  mathCentersState: {
    mathCenters: Array<{
      name: string,
      count: number
    }>
  },
  sequentialCenterState: {
    sequentialCenters: Array<{
      name: string,
      count: number
    }>
  },
  sequentialCountState: {
    noSequentialCount: number,
    sequentialCount: number
  },
  sessionTimeState: {
    endTime: number,
    startTime: number
  },
  teacherListState: {
    teachers: Array<Teacher>
  },
  teacherSelectedState: {
    teacher: Teacher
  },
  transitionLogState: {
    transitionStack: Array<{
      duration: string,
      end: string,
      start: string,
      transitionType: string
    }>
  },
  transitionResultsState: {
    transitionResults: Array<{
      teacherId: string,
      sessionId: string,
      sessionDate: Date | undefined,
      summary: TransitionData['summary'],
      details: TransitionData['details'],
      trends: TransitionData['trends']
    }>,
    transitionTrends: Array<{
      teacherId: string,
      trends: TransitionData['trends']
    }>
  },
  transitionTimeState: {
    transitionTime: number
  },
  transitionTypeState: {
    transitionType: string
  },
  unlockedState: {
    unlocked: Array<number>
  }
}

export interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
}

/* export interface History {
  length?: number,
  action?: string,
  location?: {
    pathname: string,
    search: string,
    hash: string,
    state: {
      type?: string,
      teacherId?: string,
      actionPlanId?: string,
      conferencePlanId?: string,
      sessionId?: string,
      teacher?: Teacher
    }
  },
  push?(
    param: (string | {
      pathname: string,
      state: {
        type?: string,
        teacherId?: string,
        actionPlanId?: string,
        conferencePlanId?: string,
        sessionId?: string,
        teacher?: Teacher
      }
    }),
  ): void,
  replace?(
    param: (string | {
      pathname: string,
      state: {
        type?: string,
        teacherId?: string,
        actionPlanId?: string,
        conferencePlanId?: string,
        sessionId?: string,
        teacher?: Teacher
      }
    }),
  ): void,
  go?(n: number): void,
  goBack?(): void,
  goForward?(): void,
  block?(prompt: Prompt): void,
  listen?(param: any): void,
  createHref?(param: any): void
} */

export interface UserCredential {
  credential: {
    providerId: string,
    signInMethod: string
  },
  user: {
    uid: string,
    displayName: string,
    email: string
  }
}

export interface FirebaseAppBar {
  auth: {
    currentUser: null | {
      uid: string
    },
    onAuthStateChanged(arg: any): firebase.User | null,
  },
  firebaseEmailSignIn(credentials: {email: string, password: string}): Promise<UserCredential>,
  firebaseEmailSignUp(
    info: {
      email: string,
      password: string,
      firstName: string,
      lastName: string
    },
    role: string
  ): Promise<void>,
  firebaseSignOut(): Promise<void>,
  getTeacherList(): Promise<Teacher[]>
}