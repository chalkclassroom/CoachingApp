import * as React from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { CoachHome } from './pages/CoachHome'
import { AllTeachers } from './pages/AllTeachers'
import { LiveObservation } from './pages/LiveObservation'
import { PlanDetail } from './pages/PlanDetail'
import { Training } from './pages/Training'
import { ActionPlans } from './pages/ActionPlans'
import { Messaging } from './pages/Messaging'
import { Resources } from './pages/Resources'
import { Reports } from './pages/Reports'
import { AdminWorkspace } from './pages/AdminWorkspace'
import { TeacherProfile } from './pages/TeacherProfile'
import { AccountSettings } from './pages/AccountSettings'
import { ErrorBoundary } from './components/ErrorBoundary'
import { EmptyState } from './components/EmptyState'
import { Toast } from './components/Toast'
import { useTheme } from './hooks/useTheme'
import { useV2Auth } from './hooks/useV2Auth'
import { ToastProvider } from './hooks/useToast'
import { V2FirebaseProvider } from './lib/firebase'

import './design/tokens.css'
import './design/globals.css'

function V2Routes() {
  const history = useHistory()
  const auth = useV2Auth()

  const userName = auth.user
    ? `${auth.user.firstName} ${auth.user.lastName}`.trim() || 'Coach'
    : 'Coach'

  const path = history.location.pathname
  const activeKey =
    path.startsWith('/v2/teachers') ? 'teachers' :
    path.startsWith('/v2/observation') ? 'observation' :
    path.startsWith('/v2/plans') ? 'plans' :
    path.startsWith('/v2/messages') ? 'messages' :
    path.startsWith('/v2/resources') ? 'resources' :
    path.startsWith('/v2/reports') ? 'reports' :
    path.startsWith('/v2/admin') ? 'admin' :
    path.startsWith('/v2/account') ? 'account' :
    path.startsWith('/v2/training') ? 'training' :
    'home'

  return (
    <ToastProvider>
      <AppShell
        activeKey={activeKey}
        user={{ name: auth.loading ? 'Coach' : userName, role: auth.user?.role }}
        onNavigate={(to) => history.push(to)}
      >
        <ErrorBoundary fallback={(
          <EmptyState
            title="Unable to load this view"
            description="Refresh the page or return to the CHALK home screen."
          />
        )}>
          <Switch>
            <Route path="/v2/home" render={() => <CoachHome userName={userName} />} />
            <Route path="/v2/teachers/:teacherId" render={() => <TeacherProfile />} />
            <Route exact path="/v2/teachers" render={() => <AllTeachers />} />
            <Route path="/v2/observation" render={() => <LiveObservation />} />
            <Route exact path="/v2/plans" render={() => <ActionPlans />} />
            <Route path="/v2/plans/:planId" render={() => <PlanDetail />} />
            <Route path="/v2/messages" render={() => <Messaging />} />
            <Route path="/v2/resources" render={() => <Resources />} />
            <Route path="/v2/reports" render={() => <Reports />} />
            <Route path="/v2/admin" render={() => <AdminWorkspace />} />
            <Route path="/v2/account" render={() => <AccountSettings />} />
            <Route path="/v2/training" render={() => <Training />} />
            <Redirect to="/v2/home" />
          </Switch>
        </ErrorBoundary>
      </AppShell>
      <Toast />
    </ToastProvider>
  )
}

/**
 * v2 App entry point. Mounted under /v2/* by the main App router.
 * Everything inside .v2-root is scoped; no leakage to legacy MUI styling.
 */
export function V2App() {
  // Touch the hook so the theme attribute syncs even before any child mounts.
  useTheme()

  return (
    <div className="v2-root" data-theme="light">
      <V2FirebaseProvider>
        <V2Routes />
      </V2FirebaseProvider>
    </div>
  )
}

export default V2App
