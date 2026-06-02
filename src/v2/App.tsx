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
import { Button } from './components/Button'
import { Toast } from './components/Toast'
import { useTheme } from './hooks/useTheme'
import { useV2Auth } from './hooks/useV2Auth'
import { ToastProvider } from './hooks/useToast'
import { V2FirebaseProvider } from './lib/firebase'
import { canAccessV2Area, getLegacyDelegationPath, V2Area } from './access'

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

  function UnsupportedV2Route(props: { area: V2Area }) {
    const legacyPath = getLegacyDelegationPath(props.area)
    return (
      <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 960, margin: '0 auto' }}>
        <EmptyState
          title="Unsupported V2 route"
          description="This workspace is not enabled for your role in CHALK 2.0 yet. Use the supported V2 navigation or open the legacy workflow."
          cta={legacyPath ? (
            <Button variant="primary" onClick={() => { window.location.href = legacyPath }}>
              Open legacy workflow
            </Button>
          ) : undefined}
        />
      </div>
    )
  }

  function GuardedV2Route(props: { path: string; exact?: boolean; area: V2Area; render: () => React.ReactElement }) {
    return (
      <Route
        exact={props.exact}
        path={props.path}
        render={() => {
          if (auth.loading) {
            return <EmptyState title="Loading workspace" description="Checking your CHALK role before opening this V2 route." />
          }
          if (!canAccessV2Area(auth.user?.role, props.area)) {
            return <UnsupportedV2Route area={props.area} />
          }
          return props.render()
        }}
      />
    )
  }

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
            <GuardedV2Route path="/v2/home" area="home" render={() => <CoachHome userName={userName} />} />
            <GuardedV2Route path="/v2/teachers/:teacherId" area="teachers" render={() => <TeacherProfile />} />
            <GuardedV2Route exact path="/v2/teachers" area="teachers" render={() => <AllTeachers />} />
            <GuardedV2Route path="/v2/observation" area="observation" render={() => <LiveObservation />} />
            <GuardedV2Route exact path="/v2/plans" area="plans" render={() => <ActionPlans />} />
            <GuardedV2Route path="/v2/plans/:planId" area="plans" render={() => <PlanDetail />} />
            <GuardedV2Route path="/v2/messages" area="messages" render={() => <Messaging />} />
            <GuardedV2Route path="/v2/resources" area="resources" render={() => <Resources />} />
            <GuardedV2Route path="/v2/reports" area="reports" render={() => <Reports />} />
            <GuardedV2Route path="/v2/admin" area="admin" render={() => <AdminWorkspace />} />
            <GuardedV2Route path="/v2/account" area="account" render={() => <AccountSettings />} />
            <GuardedV2Route path="/v2/training" area="training" render={() => <Training />} />
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
