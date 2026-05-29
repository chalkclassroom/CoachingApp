import { getStoredObservationType } from './observationTypes'
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

function fullName(data: any): string {
  return `${data?.firstName || ''} ${data?.lastName || ''}`.trim() || 'Unknown teacher'
}

function roleOf(value: string): TeacherRow['role'] {
  if (value === 'coach' || value === 'admin' || value === 'siteLeader' || value === 'programLeader') {
    return value
  }
  return 'teacher'
}

async function resolveTeacherDocs(firebase: any): Promise<any[]> {
  const raw = await firebase.getTeacherList()
  const list = Array.isArray(raw) ? raw : []
  return Promise.all(list.map(item => Promise.resolve(item)))
}

export async function getTeachersForCoach(firebase: any, uid: string, range: DateRange = lastNDays(30)): Promise<TeacherRow[]> {
  const [teachers, loginCounts, actionCounts] = await Promise.all([
    resolveTeacherDocs(firebase),
    firebase.getUsersLoginCounts(range.startDate, range.endDate),
    firebase.getUsersActionCounts(range.startDate, range.endDate)
  ])

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

export async function getActivePlans(firebase: any, uid: string): Promise<PlanItem[]> {
  const plans = await firebase.getCoachActionPlans()
  const list = Array.isArray(plans) ? plans : []
  return list
    .filter((plan: any) => plan.status !== 'complete' && plan.status !== 'archived')
    .sort((a: any, b: any) => (b.modified || 0) - (a.modified || 0))
    .slice(0, 2)
    .map((plan: any) => ({
      id: plan.id,
      title: plan.practice || 'Action plan',
      forName: `${plan.teacherFirstName || ''} ${plan.teacherLastName || ''}`.trim() || plan.teacherId || 'Teacher',
      progress: plan.status === 'inProgress' ? 65 : 30,
      due: toDate(plan.achieveBy) ? `Due ${toDate(plan.achieveBy)?.toLocaleDateString()}` : 'No due date'
    }))
}

export async function getDashboardStats(firebase: any, uid: string, range: DateRange = lastNDays(7)): Promise<DashboardStats> {
  const [teachers, activePlans] = await Promise.all([
    getTeachersForCoach(firebase, uid, lastNDays(30)),
    getActivePlans(firebase, uid)
  ])

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
    firebase.getActionStepsForExport(planId),
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

export async function saveActionPlanDraft(firebase: any, planId: string, patch: { title?: string; goal?: string; benefit?: string; dueDate?: Date | null }): Promise<PlanDetail | null> {
  const update: any = {
    dateModified: new Date()
  }

  if (patch.title !== undefined) update.tool = patch.title
  if (patch.goal !== undefined) update.goal = patch.goal
  if (patch.benefit !== undefined) update.benefit = patch.benefit
  if (patch.dueDate !== undefined) update.goalTimeline = patch.dueDate

  await firebase.db.collection('actionPlans').doc(planId).update(update)
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

export async function startObservation(firebase: any, coachUid: string, teacherUid: string, typeCode: string): Promise<ObservationSession> {
  const storedType = getStoredObservationType(typeCode) || typeCode
  await firebase.handleSession({
    observedBy: coachUid,
    teacher: teacherUid,
    type: storedType,
    checklist: typeCode === 'LI' ? 'LI' : undefined
  })
  return { coachUid, teacherUid, type: storedType, startedAt: new Date() }
}

export async function endObservation(firebase: any): Promise<{ completed: boolean }> {
  firebase.endSession(new Date())
  return { completed: true }
}

export async function getTrainingRecommendations(firebase: any, uid: string): Promise<TrainingCard[]> {
  return [
    { id: 'transitions', title: 'Smooth Transitions', icon: 'Timer', tone: 'warm', reason: 'alert', reasonText: 'Recommended from recent observations', ctaText: 'Start (18 min)', ctaVariant: 'primary' },
    { id: 'questions', title: 'Open-Ended Questions', icon: 'Message', tone: 'brand', reason: 'alert', reasonText: 'Recurring coaching theme', ctaText: 'Start (24 min)', ctaVariant: 'primary' },
    { id: 'climate', title: 'Classroom Climate', icon: 'Heart', tone: 'success', reason: 'win', reasonText: 'Refresh available', ctaText: 'Refresh (8 min)' }
  ]
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
    saveActionPlanDraft: (planId: string, patch: { title?: string; goal?: string; benefit?: string; dueDate?: Date | null }) => saveActionPlanDraft(firebase, planId, patch),
    addActionPlanComment: (planId: string, comment: { authorName: string; authorId?: string; text: string }) => addActionPlanComment(firebase, planId, comment),
    markActionPlanSentToTeacher: (planId: string, sentBy: string) => markActionPlanSentToTeacher(firebase, planId, sentBy),
    startObservation: (coachUid: string, teacherUid: string, typeCode: string) => startObservation(firebase, coachUid, teacherUid, typeCode),
    endObservation: () => endObservation(firebase),
    getTrainingRecommendations: (uid: string) => getTrainingRecommendations(firebase, uid)
  }
}
