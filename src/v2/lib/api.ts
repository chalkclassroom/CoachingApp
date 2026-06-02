import { buildObservationStartPayload } from './observationTypes'
import {
  AccountPreferences,
  AdminProgramRow,
  AdminSiteRow,
  AdminUserRow,
  ActivityItem,
  AttentionItem,
  ConferencePlanDetail,
  ConferencePlanItem,
  DashboardStats,
  DateRange,
  LeaderSummary,
  MessagingEmail,
  ObservationSession,
  PlanDetail,
  PlanItem,
  PracticeTrend,
  TeacherRow,
  TrainingCard
} from './types'

const DAY_MS = 24 * 60 * 60 * 1000

export const DEFAULT_ACCOUNT_PREFERENCES: AccountPreferences = {
  dailyDigestEnabled: true,
  actionPlanAlertsEnabled: true,
  defaultReportRangeDays: 30
}

type ObservationDraftPayload = {
  teacherUid: string
  checklist?: string
  teacherName?: string
  classroomName?: string
  sessionName?: string
  typeCode: string
  storedType: string
  notes: string
  elapsedSeconds: number
  updatedAt: Date
}

type ObservationCompletePayload = ObservationDraftPayload & {
  alignedTags: string[]
  strength: string
  opportunity: string
  nextStep: string
}

export function lastNDays(days: number): DateRange {
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - days * DAY_MS)
  return { startDate, endDate }
}

function toDate(value: any): Date | null {
  if (!value) return null
  if (value instanceof Date) return value
  if (value.toDate) return value.toDate()
  if (value.seconds) return new Date(value.seconds * 1000)
  return null
}

function formatDate(value: any): string {
  const date = toDate(value)
  return date ? date.toLocaleString() : 'Never'
}

async function safeRead<T>(label: string, read: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await read()
  } catch (error) {
    console.error(label, error)
    return fallback
  }
}

function fullName(data: any): string {
  return `${data?.firstName || ''} ${data?.lastName || ''}`.trim() || 'Unknown teacher'
}

function roleOf(value: string): TeacherRow['role'] {
  if (value === 'coach' || value === 'admin' || value === 'siteLeader' || value === 'programLeader') {
    return value
  }
  return 'teacher'
}

async function getCurrentUserRole(firebase: any): Promise<string> {
  const user: any = await safeRead("Unable to load v2 current user role", () => firebase.getUserInformation(), null)
  return user?.role || ""
}

function normalizeAdminTeacher(row: any): any | null {
  if (!row?.teacherId) return null
  return {
    id: row.teacherId,
    uid: row.teacherId,
    firstName: row.teacherFirstName || "",
    lastName: row.teacherLastName || "",
    role: "teacher",
    school: row.siteName || "Unassigned",
    program: row.siteName || "Unassigned",
    archived: Boolean(row.archived)
  }
}

async function resolveTeacherDocs(firebase: any): Promise<any[]> {
  const raw = await safeRead("Unable to load v2 teacher list", () => firebase.getTeacherList(), [])
  const list = Array.isArray(raw) ? raw : []
  const docs = await Promise.all(list.map(item => Promise.resolve(item).catch(error => {
    console.error("Unable to resolve v2 teacher document", error)
    return null
  })))
  const resolvedDocs = docs.filter(Boolean)

  if (resolvedDocs.length > 0) return resolvedDocs

  const role = await getCurrentUserRole(firebase)
  if (role === "admin" && typeof firebase.getTeacherData === "function") {
    const adminRows: any[] = await safeRead("Unable to load v2 admin teacher data", () => firebase.getTeacherData(), [])
    return (Array.isArray(adminRows) ? adminRows : []).map(normalizeAdminTeacher).filter(Boolean)
  }

  return resolvedDocs
}

export async function getTeachersForCoach(firebase: any, uid: string, range: DateRange = lastNDays(30)): Promise<TeacherRow[]> {
  const teachers = await resolveTeacherDocs(firebase)
  const loginCounts = await safeRead('Unable to load v2 login counts', () => firebase.getUsersLoginCounts(range.startDate, range.endDate), new Map<string, number>())
  const actionCounts = await safeRead('Unable to load v2 action counts', () => firebase.getUsersActionCounts(range.startDate, range.endDate), new Map<string, any>())

  return teachers.map((teacher: any) => {
    const id = teacher.id || teacher.uid || teacher.email || ''
    const action = actionCounts.get(id)
    return {
      id,
      firstName: teacher.firstName || '',
      lastName: teacher.lastName || '',
      role: roleOf(teacher.role),
      program: teacher.program || teacher.school || 'Unassigned',
      status: teacher.archived ? 'archived' : 'active',
      lastLogin: formatDate(teacher.lastLogin),
      loginCount: loginCounts.get(id) || 0,
      actionCount: action ? action.total : 0,
      lastAction: {
        type: teacher.lastActionType || 'None',
        date: formatDate(teacher.lastAction)
      }
    }
  })
}

async function getAdminActionPlans(firebase: any): Promise<any[]> {
  if (!firebase.db) return []
  const snapshot = await firebase.db.collection("actionPlans").orderBy("dateModified", "desc").limit(10).get()
  return snapshot.docs.map((doc: any) => {
    const data = doc.data()
    return {
      id: doc.id,
      teacherId: data.teacher || "",
      teacherFirstName: "",
      teacherLastName: "",
      practice: data.tool || "Action plan",
      date: data.dateModified,
      modified: toDate(data.dateModified)?.getTime() || 0,
      achieveBy: data.goalTimeline || data.achieveBy || null,
      status: data.status || "active"
    }
  })
}

export async function getActivePlans(firebase: any, uid: string): Promise<PlanItem[]> {
  const plans = await safeRead("Unable to load v2 active plans", () => firebase.getCoachActionPlans(), [])
  let list = Array.isArray(plans) ? plans : []

  if (list.length === 0 && await getCurrentUserRole(firebase) === "admin") {
    list = await safeRead("Unable to load v2 admin action plans", () => getAdminActionPlans(firebase), [])
  }

  return list
    .filter((plan: any) => plan.status !== "complete" && plan.status !== "archived")
    .sort((a: any, b: any) => (b.modified || 0) - (a.modified || 0))
    .slice(0, 2)
    .map((plan: any) => ({
      id: plan.id,
      title: plan.practice || "Action plan",
      forName: ((plan.teacherFirstName || "") + " " + (plan.teacherLastName || "")).trim() || plan.teacherId || "Teacher",
      progress: plan.status === "inProgress" ? 65 : 30,
      due: toDate(plan.achieveBy) ? "Due " + toDate(plan.achieveBy)?.toLocaleDateString() : "No due date"
    }))
}

function mapConferencePlan(id: string, data: any): ConferencePlanDetail {
  return {
    id,
    teacherId: data.teacher || data.teacherId || '',
    teacherName: data.teacherName || fullName({ firstName: data.teacherFirstName, lastName: data.teacherLastName }) || data.teacher || 'Teacher',
    sessionId: data.sessionId || '',
    practice: data.tool || data.practice || 'Conference plan',
    updatedAt: toDate(data.dateModified || data.dateCreated),
    feedback: Array.isArray(data.feedback) ? data.feedback : [''],
    questions: Array.isArray(data.questions) ? data.questions : [''],
    addedQuestions: Array.isArray(data.addedQuestions) ? data.addedQuestions : [],
    notes: Array.isArray(data.notes) ? data.notes : ['']
  }
}

export async function getConferencePlans(firebase: any, uid: string): Promise<ConferencePlanItem[]> {
  return safeRead('Unable to load v2 conference plans', async () => {
    const snapshot = await firebase.db.collection('conferencePlans').where('coach', '==', uid).get()
    return snapshot.docs
      .map((doc: any) => mapConferencePlan(doc.id, doc.data() || {}))
      .sort((a: ConferencePlanItem, b: ConferencePlanItem) => (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0))
  }, [])
}

export async function getConferencePlanFull(firebase: any, planId: string): Promise<ConferencePlanDetail | null> {
  const doc = await firebase.db.collection('conferencePlans').doc(planId).get()
  if (!doc.exists) return null
  return mapConferencePlan(doc.id, doc.data() || {})
}

export async function saveConferencePlanDraft(firebase: any, planId: string, patch: Pick<ConferencePlanDetail, 'feedback' | 'questions' | 'addedQuestions' | 'notes'>): Promise<ConferencePlanDetail | null> {
  const normalize = (items: string[]) => (Array.isArray(items) ? items : ['']).map(item => String(item || '')).slice(0, 50)
  await firebase.db.collection('conferencePlans').doc(planId).update({
    feedback: normalize(patch.feedback),
    questions: normalize(patch.questions),
    addedQuestions: normalize(patch.addedQuestions),
    notes: normalize(patch.notes),
    dateModified: new Date()
  })
  return getConferencePlanFull(firebase, planId)
}

export async function getDashboardStats(firebase: any, uid: string, range: DateRange = lastNDays(7)): Promise<DashboardStats> {
  const teachers = await safeRead('Unable to load v2 dashboard teachers', () => getTeachersForCoach(firebase, uid, lastNDays(30)), [])
  const activePlans = await safeRead('Unable to load v2 dashboard active plans', () => getActivePlans(firebase, uid), [])

  let observationsThisWeek = 0
  try {
    const snapshot = await firebase.db.collection('observations')
      .where('observedBy', '==', `/user/${uid}`)
      .where('end', '>=', range.startDate)
      .where('end', '<=', range.endDate)
      .get()
    observationsThisWeek = snapshot.size
  } catch (error) {
    console.error('Unable to load v2 dashboard observation count', error)
  }

  const needAttention = teachers.filter(teacher => teacher.actionCount === 0 || teacher.lastLogin === 'Never').length
  return {
    underCoaching: teachers.filter(teacher => teacher.role === 'teacher' && teacher.status === 'active').length,
    needAttention,
    observationsThisWeek,
    activePlans: activePlans.length
  }
}

const PRACTICE_LABELS: Record<string, string> = {
  TT: 'Transition Time',
  CC: 'Classroom Climate',
  MI: 'Math Instruction',
  SE: 'Student Engagement',
  LI: 'Literacy Instruction',
  LC: 'Listening to Children',
  SA: 'Sequential Activities',
  IN: 'Level of Instruction',
  AC: 'Associative/Cooperative'
}

function normalizePracticeCode(data: any): string {
  const raw = String(data?.type || data?.storedType || data?.tool || data?.observationType || '').trim()
  if (!raw) return 'Other'
  const upper = raw.toUpperCase()
  if (PRACTICE_LABELS[upper]) return upper
  const found = Object.keys(PRACTICE_LABELS).find(code => PRACTICE_LABELS[code].toUpperCase() === upper || upper.includes(PRACTICE_LABELS[code].toUpperCase()))
  return found || raw
}

export async function getPracticeTrends(firebase: any, uid: string, range: DateRange = lastNDays(90)): Promise<PracticeTrend[]> {
  return safeRead('Unable to load v2 practice trends', async () => {
    const snapshot = await firebase.db.collection('observations').where('observedBy', '==', `/user/${uid}`).get()
    const counts = new Map<string, number>()
    snapshot.docs.forEach((doc: any) => {
      const data = doc.data() || {}
      const end = toDate(data.end || data.date || data.dateModified)
      if (end && (end < range.startDate || end > range.endDate)) return
      const code = normalizePracticeCode(data)
      counts.set(code, (counts.get(code) || 0) + 1)
    })

    const max = Math.max(1, ...Array.from(counts.values()))
    const tones: PracticeTrend['tone'][] = ['brand', 'warm', 'success', 'gold']
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([code, count], index) => ({
        label: PRACTICE_LABELS[code] || code,
        count,
        value: Math.max(8, Math.round((count / max) * 100)),
        tone: tones[index % tones.length]
      }))
  }, [])
}

export async function getCoachAttention(firebase: any, uid: string, opts: { limit?: number } = {}): Promise<AttentionItem[]> {
  const teachers = await getTeachersForCoach(firebase, uid, lastNDays(45))
  return teachers
    .filter(teacher => teacher.status === 'active')
    .map(teacher => {
      const inactive = teacher.lastLogin === 'Never' || teacher.loginCount === 0
      const noActions = teacher.actionCount === 0
      return {
        id: teacher.id,
        name: `${teacher.firstName} ${teacher.lastName}`.trim(),
        reason: inactive
          ? { text: 'No recent login', variant: 'warn' as const }
          : noActions
            ? { text: 'No recent activity', variant: 'neutral' as const }
            : { text: 'Follow-up due', variant: 'warn' as const },
        context: `${teacher.role} · ${teacher.program}`,
        cta: noActions ? 'Start obs' : 'Open profile'
      }
    })
    .slice(0, opts.limit || 4)
}

export async function getRecentActivity(firebase: any, uid: string, limit: number = 4): Promise<ActivityItem[]> {
  const range = lastNDays(30)
  const teachers = await getTeachersForCoach(firebase, uid, range)
  return teachers
    .filter(teacher => teacher.lastAction.type !== 'None')
    .slice(0, limit)
    .map(teacher => ({
      id: `${teacher.id}-${teacher.lastAction.type}`,
      title: teacher.lastAction.type,
      meta: `${teacher.firstName} ${teacher.lastName} · ${teacher.lastAction.date}`,
      tone: teacher.actionCount > 0 ? 'success' : 'brand'
    }))
}

export async function getActionPlanFull(firebase: any, planId: string): Promise<PlanDetail | null> {
  const doc = await firebase.db.collection('actionPlans').doc(planId).get()
  if (!doc.exists) {
    return null
  }

  const data = doc.data() || {}
  const [steps, commentsSnapshot] = await Promise.all([
    safeRead('Unable to load v2 action plan steps', () => firebase.getActionStepsForExport(planId), []),
    firebase.db.collection('actionPlans').doc(planId).collection('comments').orderBy('createdAt', 'asc').get().catch(() => null)
  ])

  const comments = commentsSnapshot
    ? commentsSnapshot.docs.map(commentDoc => {
      const comment = commentDoc.data()
      return {
        id: commentDoc.id,
        name: comment.authorName || 'CHALK user',
        time: formatDate(comment.createdAt),
        text: comment.text || ''
      }
    })
    : []

  return {
    id: doc.id,
    title: data.tool || data.practice || 'Action plan',
    teacherId: data.teacher || '',
    teacherName: data.teacherName || fullName({ firstName: data.teacherFirstName, lastName: data.teacherLastName }),
    goal: data.goal || '',
    benefit: data.benefit || '',
    dueDate: toDate(data.goalTimeline || data.achieveBy),
    progress: data.status === 'complete' ? 100 : 65,
    steps: Array.isArray(steps) ? steps : [],
    comments
  }
}

export async function saveActionPlanField(firebase: any, planId: string, patch: Partial<PlanDetail>): Promise<PlanDetail | null> {
  await firebase.db.collection('actionPlans').doc(planId).update({
    ...patch,
    dateModified: new Date()
  })
  return getActionPlanFull(firebase, planId)
}

export async function saveActionPlanDraft(firebase: any, planId: string, patch: { title?: string; goal?: string; benefit?: string; dueDate?: Date | null; steps?: PlanDetail['steps'] }): Promise<PlanDetail | null> {
  const update: any = {
    dateModified: new Date()
  }

  if (patch.title !== undefined) update.tool = patch.title
  if (patch.goal !== undefined) update.goal = patch.goal
  if (patch.benefit !== undefined) update.benefit = patch.benefit
  if (patch.dueDate !== undefined) update.goalTimeline = patch.dueDate

  await firebase.db.collection('actionPlans').doc(planId).update(update)

  if (patch.steps) {
    await Promise.all(patch.steps.map((step, index) => {
      return firebase.db.collection('actionPlans').doc(planId).collection('actionSteps').doc(String(index)).set({
        step: step.step || '',
        person: step.person || '',
        timeline: step.timeline || null
      }, { merge: true })
    }))
  }

  return getActionPlanFull(firebase, planId)
}

export async function addActionPlanComment(firebase: any, planId: string, comment: { authorName: string; authorId?: string; text: string }): Promise<{ id: string; name: string; time: string; text: string }> {
  const createdAt = new Date()
  const ref = await firebase.db.collection('actionPlans').doc(planId).collection('comments').add({
    authorName: comment.authorName,
    authorId: comment.authorId || null,
    text: comment.text,
    createdAt
  })

  return {
    id: ref.id,
    name: comment.authorName,
    time: formatDate(createdAt),
    text: comment.text
  }
}

export async function markActionPlanSentToTeacher(firebase: any, planId: string, sentBy: string): Promise<{ sent: boolean }> {
  await firebase.db.collection('actionPlans').doc(planId).update({
    sentToTeacher: true,
    sentToTeacherAt: new Date(),
    sentToTeacherBy: sentBy,
    dateModified: new Date()
  })

  return { sent: true }
}

export async function startObservation(firebase: any, coachUid: string, teacherUid: string, typeCode: string, checklist?: string | null): Promise<ObservationSession> {
  const payload = buildObservationStartPayload(coachUid, teacherUid, typeCode, checklist)
  await firebase.handleSession(payload)
  return { coachUid, teacherUid, type: payload.type, checklist: payload.checklist, startedAt: new Date() }
}

export async function saveObservationDraft(firebase: any, coachUid: string, draft: ObservationDraftPayload): Promise<{ saved: boolean }> {
  await firebase.db.collection('users').doc(coachUid).set({ observationDraft: draft }, { merge: true })
  return { saved: true }
}

function requiresCanonicalObservationEntries(firebase: any): boolean {
  const entries = firebase?.currentObservation?.entries
  return Array.isArray(entries) && entries.length > 0
}

export async function completeObservation(firebase: any, coachUid: string, payload: ObservationCompletePayload): Promise<{ completed: boolean; observationId?: string | null }> {
  if (!requiresCanonicalObservationEntries(firebase)) {
    throw new Error('V2 observation completion requires canonical coded entries before export')
  }

  const notes = payload.notes.trim()
  if (notes && firebase.handlePushNotes) {
    firebase.handlePushNotes(notes)
  }

  if (firebase.handlePushNotes) {
    firebase.handlePushNotes([
      `Framework alignment: ${payload.alignedTags.join(', ') || 'Not recorded'}`,
      `Strength: ${payload.strength || 'Not recorded'}`,
      `Opportunity: ${payload.opportunity || 'Not recorded'}`,
      `Next step: ${payload.nextStep || 'Not recorded'}`
    ].join('\n'))
  }

  firebase.endSession(new Date())
  await firebase.db.collection('users').doc(coachUid).set({ observationDraft: null }, { merge: true })
  return { completed: true, observationId: firebase.sessionRef?.id || null }
}

export async function getTrainingRecommendations(firebase: any, uid: string): Promise<TrainingCard[]> {
  return [
    { id: 'transitions', title: 'Smooth Transitions', icon: '⏱', tone: 'warm', reason: 'alert', reasonText: 'Curated CHALK module', ctaText: 'Start (18 min)', ctaVariant: 'primary' },
    { id: 'questions', title: 'Open-Ended Questions', icon: '🗣', tone: 'brand', reason: 'alert', reasonText: 'Curated coaching module', ctaText: 'Start (24 min)', ctaVariant: 'primary' },
    { id: 'climate', title: 'Classroom Climate', icon: '💚', tone: 'success', reason: 'win', reasonText: 'Refresh available', ctaText: 'Refresh (8 min)' },
    { id: 'discipline', title: 'Conscious Discipline Foundations', icon: '📚', tone: 'purple', reason: 'skip', reasonText: 'Completed previously — skip unless needed', ctaText: 'Review notes' },
    { id: 'magic9', title: 'Using Magic 9 effectively', icon: '📊', tone: 'gold', reason: 'skip', reasonText: 'Optional for experienced coaches', ctaText: 'Not now' },
    { id: 'plans', title: 'Writing better action plans', icon: '🎯', tone: 'warm', reason: 'alert', reasonText: 'Curated action-planning module', ctaText: 'Start (12 min)', ctaVariant: 'primary' }
  ]
}

export async function getTrainingStatus(firebase: any, uid: string): Promise<Record<string, { completedAt?: any; dismissedAt?: any }>> {
  return safeRead('Unable to load v2 training status', async () => {
    const doc = await firebase.db.collection('users').doc(uid).get()
    const data = doc.exists ? doc.data() || {} : {}
    return data.v2TrainingStatus || {}
  }, {})
}

export async function markTrainingCompleted(firebase: any, uid: string, trainingId: string): Promise<{ completed: boolean }> {
  await firebase.db.collection('users').doc(uid).set({
    v2TrainingStatus: {
      [trainingId]: { completedAt: new Date() }
    }
  }, { merge: true })
  return { completed: true }
}

export async function dismissTrainingRecommendation(firebase: any, uid: string, trainingId: string): Promise<{ dismissed: boolean }> {
  await firebase.db.collection('users').doc(uid).set({
    v2TrainingStatus: {
      [trainingId]: { dismissedAt: new Date() }
    }
  }, { merge: true })
  return { dismissed: true }
}

function normalizeAccountPreferences(value: any): AccountPreferences {
  const range = Number(value?.defaultReportRangeDays)
  return {
    dailyDigestEnabled: typeof value?.dailyDigestEnabled === 'boolean' ? value.dailyDigestEnabled : DEFAULT_ACCOUNT_PREFERENCES.dailyDigestEnabled,
    actionPlanAlertsEnabled: typeof value?.actionPlanAlertsEnabled === 'boolean' ? value.actionPlanAlertsEnabled : DEFAULT_ACCOUNT_PREFERENCES.actionPlanAlertsEnabled,
    defaultReportRangeDays: range === 7 || range === 90 ? range : DEFAULT_ACCOUNT_PREFERENCES.defaultReportRangeDays
  }
}

export async function getAccountPreferences(firebase: any, uid: string): Promise<AccountPreferences> {
  return safeRead('Unable to load v2 account preferences', async () => {
    const doc = await firebase.db.collection('users').doc(uid).get()
    const data = doc.exists ? doc.data() || {} : {}
    return normalizeAccountPreferences(data.v2Preferences)
  }, DEFAULT_ACCOUNT_PREFERENCES)
}

export async function saveAccountPreferences(firebase: any, uid: string, preferences: AccountPreferences): Promise<AccountPreferences> {
  const normalized = normalizeAccountPreferences(preferences)
  await firebase.db.collection('users').doc(uid).set({
    v2Preferences: normalized
  }, { merge: true })
  return normalized
}

function mapMessagingEmail(id: string, data: any): MessagingEmail {
  return {
    id: data.id || id,
    subject: data.subject || '',
    emailContent: data.emailContent || '',
    recipientId: data.recipientId || '',
    recipientFirstName: data.recipientFirstName || '',
    recipientName: data.recipientName || '',
    recipientEmail: data.recipientEmail || '',
    type: data.type === 'sent' ? 'sent' : 'draft',
    user: data.user || '',
    dateCreated: toDate(data.dateCreated),
    dateModified: toDate(data.dateModified)
  }
}

export async function getMessagingEmails(firebase: any, uid: string): Promise<MessagingEmail[]> {
  return safeRead('Unable to load v2 messaging emails', async () => {
    const snapshot = await firebase.db.collection('emails').where('user', '==', uid).get()
    return snapshot.docs
      .map((doc: any) => mapMessagingEmail(doc.id, doc.data() || {}))
      .sort((a: MessagingEmail, b: MessagingEmail) => (b.dateModified?.getTime() || 0) - (a.dateModified?.getTime() || 0))
  }, [])
}

export async function saveMessagingDraft(firebase: any, uid: string, draft: Partial<MessagingEmail>): Promise<MessagingEmail> {
  const ref = draft.id ? firebase.db.collection('emails').doc(draft.id) : firebase.db.collection('emails').doc()
  const now = new Date()
  const existing = draft.id ? await ref.get().catch(() => null) : null
  const existingData = existing?.exists ? existing.data() || {} : {}
  const data = {
    id: ref.id,
    emailContent: draft.emailContent || '',
    subject: draft.subject || '',
    recipientId: draft.recipientId || '',
    recipientFirstName: draft.recipientFirstName || '',
    recipientName: draft.recipientName || '',
    recipientEmail: draft.recipientEmail || '',
    dateCreated: existingData.dateCreated || now,
    dateModified: now,
    type: 'draft',
    user: uid
  }
  await ref.set(data, { merge: true })
  return mapMessagingEmail(ref.id, data)
}

function mapAdminUser(id: string, data: any): AdminUserRow {
  return {
    id,
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    role: data.role || '',
    archived: Boolean(data.archived),
    programs: Array.isArray(data.programs) ? data.programs : (data.program ? [data.program] : []),
    sites: Array.isArray(data.sites) ? data.sites : []
  }
}

export async function getAdminUsers(firebase: any): Promise<AdminUserRow[]> {
  return safeRead('Unable to load v2 admin users', async () => {
    const snapshot = await firebase.db.collection('users').get()
    return snapshot.docs
      .map((doc: any) => mapAdminUser(doc.id, doc.data() || {}))
      .sort((a: AdminUserRow, b: AdminUserRow) => {
        const aName = (a.lastName + ' ' + a.firstName + ' ' + a.email).toLowerCase()
        const bName = (b.lastName + ' ' + b.firstName + ' ' + b.email).toLowerCase()
        return aName.localeCompare(bName)
      })
  }, [])
}

export async function setUserArchived(firebase: any, userId: string, archived: boolean): Promise<{ archived: boolean }> {
  await firebase.db.collection('users').doc(userId).update({ archived })
  return { archived }
}

function slugId(value: string, fallback: string): string {
  const slug = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || fallback
}

function mapAdminProgram(id: string, data: any): AdminProgramRow {
  return {
    id,
    name: data.name || data.programName || id
  }
}

function mapAdminSite(id: string, data: any): AdminSiteRow {
  return {
    id,
    name: data.name || data.siteName || id,
    programId: data.programId || data.program || ''
  }
}

export async function getAdminPrograms(firebase: any): Promise<AdminProgramRow[]> {
  return safeRead('Unable to load v2 admin programs', async () => {
    const snapshot = await firebase.db.collection('programs').get()
    return snapshot.docs
      .map((doc: any) => mapAdminProgram(doc.id, doc.data() || {}))
      .sort((a: AdminProgramRow, b: AdminProgramRow) => a.name.localeCompare(b.name))
  }, [])
}

export async function getAdminSites(firebase: any): Promise<AdminSiteRow[]> {
  return safeRead('Unable to load v2 admin sites', async () => {
    const snapshot = await firebase.db.collection('sites').get()
    return snapshot.docs
      .map((doc: any) => mapAdminSite(doc.id, doc.data() || {}))
      .sort((a: AdminSiteRow, b: AdminSiteRow) => a.name.localeCompare(b.name))
  }, [])
}

export async function saveAdminProgram(firebase: any, program: AdminProgramRow): Promise<AdminProgramRow> {
  const id = program.id || slugId(program.name, 'program-' + Date.now())
  const data = {
    name: program.name.trim(),
    dateModified: new Date()
  }
  await firebase.db.collection('programs').doc(id).set(data, { merge: true })
  return mapAdminProgram(id, data)
}

export async function saveAdminSite(firebase: any, site: AdminSiteRow): Promise<AdminSiteRow> {
  const id = site.id || slugId(site.name, 'site-' + Date.now())
  const data = {
    name: site.name.trim(),
    programId: site.programId.trim(),
    dateModified: new Date()
  }
  await firebase.db.collection('sites').doc(id).set(data, { merge: true })
  return mapAdminSite(id, data)
}

function intersects(left: string[] = [], right: string[] = []): boolean {
  if (left.length === 0 || right.length === 0) return false
  return left.some(value => right.includes(value))
}

function userInLeaderScope(row: AdminUserRow, leader: { role?: string; programs?: string[]; sites?: string[] }): boolean {
  if (leader.role === 'admin') return true
  const leaderPrograms = leader.programs || []
  const leaderSites = leader.sites || []
  if (leaderPrograms.length === 0 && leaderSites.length === 0) return true
  return intersects(row.programs, leaderPrograms) || intersects(row.sites, leaderSites)
}

export async function getLeaderSummary(firebase: any, leader: { role?: string; programs?: string[]; sites?: string[] }): Promise<LeaderSummary> {
  return safeRead('Unable to load v2 leader summary', async () => {
    const [users, programsSnapshot, sitesSnapshot] = await Promise.all([
      getAdminUsers(firebase),
      firebase.db.collection('programs').get().catch(() => null),
      firebase.db.collection('sites').get().catch(() => null)
    ])
    const scopedUsers = users.filter(user => userInLeaderScope(user, leader))
    const leaderPrograms = leader.programs || []
    const leaderSites = leader.sites || []
    const programs = programsSnapshot
      ? programsSnapshot.docs.filter((doc: any) => leader.role === 'admin' || leaderPrograms.length === 0 || leaderPrograms.includes(doc.id)).length
      : leaderPrograms.length
    const sites = sitesSnapshot
      ? sitesSnapshot.docs.filter((doc: any) => leader.role === 'admin' || leaderSites.length === 0 || leaderSites.includes(doc.id) || leaderPrograms.includes((doc.data() || {}).programs)).length
      : leaderSites.length
    return {
      programs,
      sites,
      teachers: scopedUsers.filter(user => user.role === 'teacher' && !user.archived).length,
      coaches: scopedUsers.filter(user => user.role === 'coach' && !user.archived).length,
      archivedUsers: scopedUsers.filter(user => user.archived).length
    }
  }, { programs: 0, sites: 0, teachers: 0, coaches: 0, archivedUsers: 0 })
}

export function createV2Api(firebase: any) {
  return {
    getCoachAttention: (uid: string, opts?: { limit?: number }) => getCoachAttention(firebase, uid, opts),
    getDashboardStats: (uid: string, range?: DateRange) => getDashboardStats(firebase, uid, range),
    getPracticeTrends: (uid: string, range?: DateRange) => getPracticeTrends(firebase, uid, range),
    getRecentActivity: (uid: string, limit?: number) => getRecentActivity(firebase, uid, limit),
    getActivePlans: (uid: string) => getActivePlans(firebase, uid),
    getConferencePlans: (uid: string) => getConferencePlans(firebase, uid),
    getConferencePlanFull: (planId: string) => getConferencePlanFull(firebase, planId),
    saveConferencePlanDraft: (planId: string, patch: Pick<ConferencePlanDetail, 'feedback' | 'questions' | 'addedQuestions' | 'notes'>) => saveConferencePlanDraft(firebase, planId, patch),
    getTeachersForCoach: (uid: string, range?: DateRange) => getTeachersForCoach(firebase, uid, range),
    getActionPlanFull: (planId: string) => getActionPlanFull(firebase, planId),
    saveActionPlanField: (planId: string, patch: Partial<PlanDetail>) => saveActionPlanField(firebase, planId, patch),
    saveActionPlanDraft: (planId: string, patch: { title?: string; goal?: string; benefit?: string; dueDate?: Date | null; steps?: PlanDetail['steps'] }) => saveActionPlanDraft(firebase, planId, patch),
    addActionPlanComment: (planId: string, comment: { authorName: string; authorId?: string; text: string }) => addActionPlanComment(firebase, planId, comment),
    markActionPlanSentToTeacher: (planId: string, sentBy: string) => markActionPlanSentToTeacher(firebase, planId, sentBy),
    startObservation: (coachUid: string, teacherUid: string, typeCode: string, checklist?: string | null) => startObservation(firebase, coachUid, teacherUid, typeCode, checklist),
    saveObservationDraft: (coachUid: string, draft: ObservationDraftPayload) => saveObservationDraft(firebase, coachUid, draft),
    completeObservation: (coachUid: string, payload: ObservationCompletePayload) => completeObservation(firebase, coachUid, payload),
    getTrainingRecommendations: (uid: string) => getTrainingRecommendations(firebase, uid),
    getTrainingStatus: (uid: string) => getTrainingStatus(firebase, uid),
    markTrainingCompleted: (uid: string, trainingId: string) => markTrainingCompleted(firebase, uid, trainingId),
    dismissTrainingRecommendation: (uid: string, trainingId: string) => dismissTrainingRecommendation(firebase, uid, trainingId),
    getAccountPreferences: (uid: string) => getAccountPreferences(firebase, uid),
    saveAccountPreferences: (uid: string, preferences: AccountPreferences) => saveAccountPreferences(firebase, uid, preferences),
    getMessagingEmails: (uid: string) => getMessagingEmails(firebase, uid),
    saveMessagingDraft: (uid: string, draft: Partial<MessagingEmail>) => saveMessagingDraft(firebase, uid, draft),
    getAdminUsers: () => getAdminUsers(firebase),
    setUserArchived: (userId: string, archived: boolean) => setUserArchived(firebase, userId, archived),
    getAdminPrograms: () => getAdminPrograms(firebase),
    getAdminSites: () => getAdminSites(firebase),
    saveAdminProgram: (program: AdminProgramRow) => saveAdminProgram(firebase, program),
    saveAdminSite: (site: AdminSiteRow) => saveAdminSite(firebase, site),
    getLeaderSummary: (leader: { role?: string; programs?: string[]; sites?: string[] }) => getLeaderSummary(firebase, leader)
  }
}
