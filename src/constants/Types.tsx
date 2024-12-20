// import { Prompt } from "react-router-dom";

import { Role } from '../state/actions/coach'

export type DashboardType = 'AppBar' | 'TT' | 'CC' | 'MI' | 'SE' | 'IN' | 'LC' | 'SA' | 'LI' | 'AC' | 'RedGraph' | 'NotPresent';

export type Selected = 'TransitionTime' | 'ClassroomClimate' | 'MathInstruction' | 'StudentEngagement' |
'LevelOfInstruction' | 'ListeningToChildren' | 'SequentialActivities' | 'LiteracyInstruction' | 'AssociativeCooperativeInteractions' | 'none';

export type ToolNamesKey = 'TT' | 'CC' | 'MI' | 'SE' | 'IN' | 'LC' | 'SA' | 'LI' | 'AC';

export type ToolAbbreviationsKey = 'Transition Time' | 'Classroom Climate' | 'Math Instruction' | 'Level of Engagement' |
'Level of Instruction' | 'Listening to Children' | 'Sequential Activities' | 'Literacy Instruction' | 'AC';

export type TrainingLiteracy = {
  conceptsFoundational: boolean,
  conceptsWriting: boolean,
  conceptsReading: boolean,
  conceptsLanguage: boolean,
  definitionsFoundational: boolean,
  definitionsWriting: boolean,
  definitionsReading: boolean,
  definitionsLanguage: boolean,
  demoFoundational: boolean,
  demoWriting: boolean,
  demoReading: boolean,
  demoLanguage: boolean,
  knowledgeCheckFoundational: boolean,
  knowledgeCheckWriting: boolean,
  knowledgeCheckReading: boolean,
  knowledgeCheckLanguage: boolean
};

export interface ReduxState {
  trainingLiteracyState: TrainingLiteracy,
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
    coachName: string,
    role: Role
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
  literacyCountState: {
    literacyCount: number,
    noLiteracyCount: number
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
  transitionTimeState: {
    transitionTime: number
  },
  transitionTypeState: {
    transitionType: string
  },
  unlockedState: {
    unlocked: Array<number>
  }
  watchedVideos: Array<string>
}

export interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string,
  unlocked: Array<number>
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

export interface CalendarEvent {
  title: string,
  start: Date,
  end: Date,
  allDay?: boolean
  resource: string,
  hexColor?: string,
  type: ToolNamesKey,
  id: string,
  conferencePlanSessionId?: string,
  appointment?: boolean
}

export interface Site {
  name: string,
  id: string,
  siteLeaderId: string,
  coaches: Array<{
    id: string
  }>
}

export interface User {
  firstName: string,
  lastName: string,
  id: string,
  role: string,
  programs: Array<{
    id: string
  }>
}
