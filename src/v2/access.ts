export type V2Role = 'teacher' | 'coach' | 'admin' | 'siteLeader' | 'programLeader' | 'default'
export type V2Area = 'home' | 'teachers' | 'observation' | 'plans' | 'messages' | 'resources' | 'reports' | 'admin' | 'leader' | 'training' | 'account'

export type V2NavItem = {
  key: V2Area
  label: string
  path: string
}

export const V2_NAV_ITEMS: V2NavItem[] = [
  { key: 'home', label: 'Home', path: '/v2/home' },
  { key: 'teachers', label: 'Teachers', path: '/v2/teachers' },
  { key: 'observation', label: 'Observe', path: '/v2/observation' },
  { key: 'plans', label: 'Plans', path: '/v2/plans' },
  { key: 'messages', label: 'Messages', path: '/v2/messages' },
  { key: 'resources', label: 'Resources', path: '/v2/resources' },
  { key: 'reports', label: 'Reports', path: '/v2/reports' },
  { key: 'leader', label: 'Leader', path: '/v2/leader' },
  { key: 'admin', label: 'Admin', path: '/v2/admin' },
  { key: 'training', label: 'Training', path: '/v2/training' }
]

export const ROLE_AREAS: Record<V2Role, V2Area[]> = {
  admin: ['home', 'teachers', 'observation', 'plans', 'messages', 'resources', 'reports', 'leader', 'admin', 'training', 'account'],
  coach: ['home', 'teachers', 'observation', 'plans', 'messages', 'resources', 'training', 'account'],
  siteLeader: ['home', 'teachers', 'messages', 'resources', 'reports', 'leader', 'training', 'account'],
  programLeader: ['home', 'teachers', 'messages', 'resources', 'reports', 'leader', 'training', 'account'],
  teacher: ['home', 'resources', 'training', 'account'],
  default: ['home', 'resources', 'training', 'account']
}

export const AREA_ROLES: Record<V2Area, V2Role[]> = {
  home: ['admin', 'coach', 'siteLeader', 'programLeader', 'teacher', 'default'],
  teachers: ['admin', 'coach', 'siteLeader', 'programLeader'],
  observation: ['admin', 'coach'],
  plans: ['admin', 'coach'],
  messages: ['admin', 'coach', 'siteLeader', 'programLeader'],
  resources: ['admin', 'coach', 'siteLeader', 'programLeader', 'teacher', 'default'],
  reports: ['admin', 'siteLeader', 'programLeader'],
  admin: ['admin'],
  leader: ['admin', 'siteLeader', 'programLeader'],
  training: ['admin', 'coach', 'siteLeader', 'programLeader', 'teacher', 'default'],
  account: ['admin', 'coach', 'siteLeader', 'programLeader', 'teacher', 'default']
}

export function normalizeV2Role(role?: string): V2Role {
  if (role === 'teacher' || role === 'coach' || role === 'admin' || role === 'siteLeader' || role === 'programLeader') {
    return role
  }
  return 'default'
}

export function canAccessV2Area(role: string | undefined, area: V2Area): boolean {
  return AREA_ROLES[area].includes(normalizeV2Role(role))
}

export function getV2NavItemsForRole(role?: string): V2NavItem[] {
  return V2_NAV_ITEMS.filter(item => canAccessV2Area(role, item.key))
}

export function getLegacyDelegationPath(area: V2Area): string | null {
  if (area === 'admin') return '/Admin'
  if (area === 'reports') return '/Reports'
  if (area === 'leader') return '/LeadersDashboard'
  if (area === 'messages') return '/Messaging'
  if (area === 'teachers') return '/MyTeachers'
  if (area === 'plans') return '/ActionPlans'
  return null
}
