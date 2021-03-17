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

export interface ClimateData {
  summary: {
    toneRating: number
  },
  details: {
    specificCount: number,
    nonspecificCount: number,
    disapprovalCount: number,
    redirectionCount: number
  },
  trends: Array<{
    dayOfEvent: {value: string},
    positive: number,
    negative: number
  }>
}

export interface MathData {
  childSummary: {
    math: number,
    notMath: number
  },
  teacherSummary: {
    support: number,
    noSupport: number,
    noOpportunity: number
  },
  childDetails: {
    math1: number,
    math2: number,
    math3: number,
    math4: number
  },
  teacherDetails: {
    teacher1: number,
    teacher2: number,
    teacher3: number,
    teacher4: number
  },
  childTrends: Array<{
    startDate: {value: string},
    math: number,
    notMath: number
  }>,
  teacherTrends: Array<{
    startDate: {value: string},
    noOpportunity: number,
    support: number,
    noSupport: number
  }>
}

export interface InstructionData {
  summary: {
    highLevelQuestion: number,
    lowLevelQuestion: number,
    highLevelResponse: number,
    lowLevelResponse: number
  },
  details: {
    highLevelQuestion: number,
    lowLevelQuestion: number,
    highLevelResponse: number,
    lowLevelResponse: number
  },
  trends: Array<{
    dayOfEvent: {value: string},
    hlq: number,
    hlqResponse: number,
    llq: number,
    llqResponse: number
  }>
}

export interface ListeningData {
  summary: {listening: number, notListening: number},
  details: {
    listening1: number,
    listening2: number,
    listening3: number,
    listening4: number,
    listening5: number,
    listening6: number
  },
  trends: Array<{
    startDate: {value: string},
    listening: number,
    notListening: number
  }>
}

export interface SequentialData {
  childSummary: {
    sequential: number,
    notSequential: number
  },
  teacherSummary: {
    support: number,
    noSupport: number,
    noOpportunity: number
  },
  childDetails: {
    sequential1: number,
    sequential2: number,
    sequential3: number,
    sequential4: number
  },
  teacherDetails: {
    teacher1: number,
    teacher2: number,
    teacher3: number,
    teacher4: number
  },
  childTrends: Array<{
    startDate: {value: string},
    sequential: number,
    notSequential: number
  }>,
  teacherTrends: Array<{
    startDate: {value: string},
    noOpportunity: number,
    support: number,
    noSupport: number
  }>
}

export interface ACData {
  childSummary: {
    ac: number,
    noac: number,
    noOpportunity: number
  },
  teacherSummary: {
    support: number,
    noSupport: number,
    noOpportunity: number
  },
  childDetails: {
    ac1: number,
    ac2: number,
    ac3: number,
    ac4: number
  },
  teacherDetails: {
    teacher1: number,
    teacher2: number,
    teacher3: number,
    teacher4: number
  },
  childTrends: Array<{
    startDate: {value: string},
    noOpportunity: number,
    noac: number,
    ac: number
  }>,
  teacherTrends: Array<{
    startDate: {value: string},
    noOpportunity: number,
    support: number,
    nosupport: number
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
  acResultsState: {
    acResults: Array<{
      teacherId: string,
      sessionId: string,
      childSummary: ACData['childSummary'],
      teacherSummary: ACData['teacherSummary'],
      details: ACData['childDetails'] & ACData['teacherDetails']
    }>,
    acChildTrends: Array<{
      teacherId: string,
      childTrends: ACData['childTrends']
    }>,
    acTeacherTrends: Array<{
      teacherId: string,
      teacherTrends: ACData['teacherTrends']
    }>
  },
  climateRatingsState: {
    climateRatings: Array<{
      timestamp: number,
      rating: number
    }>
  },
  climateResultsState: {
    climateResults: Array<{
      teacherId: string,
      sessionId: string,
      summary: ClimateData['summary'],
      details: Array<ClimateData['details']>,
    }>,
    climateTrends: Array<{
      teacherId: string,
      trends: ClimateData['trends']
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
  instructionResultsState: {
    instructionResults: Array<{
      teacherId: string,
      sessionId: string,
      details: InstructionData['details'],
    }>,
    instructionTrends: Array<{
      teacherId: string,
      trends: InstructionData['trends']
    }>
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
  listeningResultsState: {
    listeningResults: Array<{
      teacherId: string,
      sessionId: string,
      summary: ListeningData['summary'],
      details: ListeningData['details']
    }>,
    listeningTrends: Array<{
      teacherId: string,
      trends: ListeningData['trends']
    }>,
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
  mathResultsState: {
    mathResults: Array<{
      teacherId: string,
      sessionId: string,
      childSummary: MathData['childSummary'],
      teacherSummary: MathData['teacherSummary'],
      details: MathData['childDetails'] & MathData['teacherDetails']
      // childDetails: MathData['childDetails'],
      // teacherDetails: MathData['teacherDetails'],
    }>,
    mathChildTrends: Array<{
      teacherId: string,
      childTrends: MathData['childTrends']
    }>,
    mathTeacherTrends: Array<{
      teacherId: string,
      teacherTrends: MathData['teacherTrends']
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
  sequentialResultsState: {
    sequentialResults: Array<{
      teacherId: string,
      sessionId: string,
      childSummary: SequentialData['childSummary'],
      teacherSummary: SequentialData['teacherSummary'],
      details: SequentialData['childDetails'] & SequentialData['teacherDetails']
    }>,
    sequentialChildTrends: Array<{
      teacherId: string,
      childTrends: SequentialData['childTrends']
    }>,
    sequentialTeacherTrends: Array<{
      teacherId: string,
      teacherTrends: SequentialData['teacherTrends']
    }>
  },
  sessionDatesState: {
    dates: Array<{
      teacherId: string,
      data: Array<{
        tool: string,
        sessions: Array<{id: string, sessionStart: {value: string}}>
      }>
    }>
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