export type AttentionVariant = 'warn' | 'danger' | 'neutral'

export type V2User = {
  uid: string
  email: string
  isAnonymous: boolean
  firstName: string
  lastName: string
  role: string
  programs?: string[]
  sites?: string[]
}

export type DateRange = {
  startDate: Date
  endDate: Date
}

export type AccountPreferences = {
  dailyDigestEnabled: boolean
  actionPlanAlertsEnabled: boolean
  defaultReportRangeDays: 7 | 30 | 90
}

export type MessagingEmail = {
  id: string
  subject: string
  emailContent: string
  recipientId: string
  recipientFirstName: string
  recipientName: string
  recipientEmail: string
  type: 'draft' | 'sent'
  user: string
  dateModified: Date | null
  dateCreated?: Date | null
}

export type AdminUserRow = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  archived: boolean
  programs: string[]
  sites: string[]
}

export type AdminProgramRow = {
  id: string
  name: string
}

export type AdminSiteRow = {
  id: string
  name: string
  programId: string
}

export type LeaderSummary = {
  programs: number
  sites: number
  teachers: number
  coaches: number
  archivedUsers: number
}

export type DashboardStats = {
  underCoaching: number
  needAttention: number
  observationsThisWeek: number
  activePlans: number
}

export type PracticeTrend = {
  label: string
  value: number
  count: number
  tone: 'brand' | 'warm' | 'success' | 'gold'
}

export type AttentionItem = {
  id: string
  name: string
  reason: { text: string; variant: AttentionVariant }
  context: string
  cta: string
}

export type ActivityItem = {
  id: string
  title: string
  meta: string
  tone: 'success' | 'brand' | 'warn'
  date?: Date | null
}

export type PlanItem = {
  id: string
  title: string
  forName: string
  progress: number
  due: string
}

export type TeacherRow = {
  id: string
  firstName: string
  lastName: string
  role: 'teacher' | 'coach' | 'admin' | 'siteLeader' | 'programLeader'
  program: string
  status: 'active' | 'archived'
  lastLogin: string
  loginCount: number
  actionCount: number
  lastAction: { type: string; date: string }
}

export type PlanComment = {
  id: string
  name: string
  time: string
  text: string
}

export type PlanStep = {
  step: string | null
  person: string | null
  timeline: Date | null
}

export type PlanDetail = {
  id: string
  title: string
  teacherId: string
  teacherName: string
  goal: string
  benefit: string
  dueDate: Date | null
  progress: number
  steps: PlanStep[]
  comments: PlanComment[]
}

export type ConferencePlanItem = {
  id: string
  teacherId: string
  teacherName: string
  sessionId: string
  practice: string
  updatedAt: Date | null
}

export type ConferencePlanDetail = ConferencePlanItem & {
  feedback: string[]
  questions: string[]
  addedQuestions: string[]
  notes: string[]
}

export type ObservationSession = {
  coachUid: string
  teacherUid: string
  type: string
  checklist?: string
  startedAt: Date
}

export type TrainingCard = {
  id: string
  title: string
  icon: string
  tone: 'warm' | 'brand' | 'success' | 'gold' | 'purple'
  reason: 'alert' | 'win' | 'skip'
  reasonText: string
  ctaText: string
  ctaVariant?: 'default' | 'primary'
}
