import { buildObservationStartPayload } from './observationTypes'
import {
  ActivityItem,
  AttentionItem,
  DashboardStats,
  DateRange,
  ObservationSession,
  PlanDetail,
  PlanItem,
  TeacherRow,
  TrainingCard
} from './types'

const DAY_MS = 24 * 60 * 60 * 1000

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
      if (firebase.saveActionStep) {
        return firebase.saveActionStep(planId, String(index), step.step || '', step.person || '', step.timeline || null)
      }

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
    { id: 'transitions', title: 'Smooth Transitions', icon: '⏱', tone: 'warm', reason: 'alert', reasonText: 'Recommended from recent observations', ctaText: 'Start (18 min)', ctaVariant: 'primary' },
    { id: 'questions', title: 'Open-Ended Questions', icon: '🗣', tone: 'brand', reason: 'alert', reasonText: 'Recurring coaching theme', ctaText: 'Start (24 min)', ctaVariant: 'primary' },
    { id: 'climate', title: 'Classroom Climate', icon: '💚', tone: 'success', reason: 'win', reasonText: 'Refresh available', ctaText: 'Refresh (8 min)' },
    { id: 'discipline', title: 'Conscious Discipline Foundations', icon: '📚', tone: 'purple', reason: 'skip', reasonText: 'Completed previously — skip unless needed', ctaText: 'Review notes' },
    { id: 'magic9', title: 'Using Magic 9 effectively', icon: '📊', tone: 'gold', reason: 'skip', reasonText: 'Optional for experienced coaches', ctaText: 'Not now' },
    { id: 'plans', title: 'Writing better action plans', icon: '🎯', tone: 'warm', reason: 'alert', reasonText: 'Recommended when goals are not measurable', ctaText: 'Start (12 min)', ctaVariant: 'primary' }
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

export function createV2Api(firebase: any) {
  return {
    getCoachAttention: (uid: string, opts?: { limit?: number }) => getCoachAttention(firebase, uid, opts),
    getDashboardStats: (uid: string, range?: DateRange) => getDashboardStats(firebase, uid, range),
    getRecentActivity: (uid: string, limit?: number) => getRecentActivity(firebase, uid, limit),
    getActivePlans: (uid: string) => getActivePlans(firebase, uid),
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
    dismissTrainingRecommendation: (uid: string, trainingId: string) => dismissTrainingRecommendation(firebase, uid, trainingId)
  }
}
