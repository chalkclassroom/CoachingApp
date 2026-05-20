import * as React from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { CoachHome } from './pages/CoachHome'
import { AllTeachers } from './pages/AllTeachers'
import { LiveObservation } from './pages/LiveObservation'
import { PlanDetail } from './pages/PlanDetail'
import { Training } from './pages/Training'
import { useTheme } from './hooks/useTheme'

import './design/tokens.css'
import './design/globals.css'

/**
 * v2 App entry point. Mounted under /v2/* by the main App router.
 * Everything inside .v2-root is scoped — no leakage to legacy MUI styling.
 */
export function V2App(props: { userName?: string }) {
  // Touch the hook so the theme attribute syncs even before any child mounts
  useTheme()
  const history = useHistory()
  const userName = props.userName ?? 'Coach'

  const path = history.location.pathname
  const activeKey =
    path.startsWith('/v2/teachers') ? 'teachers' :
    path.startsWith('/v2/observation') ? 'observation' :
    path.startsWith('/v2/plans') ? 'plans' :
    path.startsWith('/v2/training') ? 'training' :
    'home'

  return (
    <div className="v2-root" data-theme="light">
      <AppShell
        activeKey={activeKey}
        user={{ name: userName }}
        onNavigate={(to) => history.push(to)}
      >
        <Switch>
          <Route path="/v2/home" render={() => <CoachHome userName={userName} />} />
          <Route path="/v2/teachers" render={() => <AllTeachers />} />
          <Route path="/v2/observation" render={() => <LiveObservation />} />
          <Route path="/v2/plans" render={() => <PlanDetail />} />
          <Route path="/v2/training" render={() => <Training />} />
          <Redirect to="/v2/home" />
        </Switch>
      </AppShell>
    </div>
  )
}

export default V2App
