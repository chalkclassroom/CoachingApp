import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Firebase, { FirebaseContext } from './components/Firebase'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import initializeStore from './state/store'
import { AppContainer } from 'react-hot-loader'

const { store, persistor } = initializeStore()

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <FirebaseContext.Consumer>
                        {(firebase:Firebase) => <App firebase={firebase} />}
                     </FirebaseContext.Consumer>
                 </PersistGate>
            </Provider>
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(App)

// webpack Hot Module Replacement API
if (module.hot) {
    // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
    // while `hot` would configure HMR for the CURRENT module
    module.hot.accept('./App', () => {
        // if you are using harmony modules ({modules:false})
        render(App)
        // else older browsers need
        render(require('./App'))

    })
}


function showServiceWorkerUpdateNotice(): void {
    if (document.getElementById('chalk-update-notice')) {
        return
    }

    const notice = document.createElement('div')
    notice.id = 'chalk-update-notice'
    notice.setAttribute('role', 'status')
    notice.style.cssText = [
        'position: fixed',
        'right: 20px',
        'bottom: 20px',
        'z-index: 10000',
        'max-width: 360px',
        'background: #e5f6ff',
        'color: #006fa5',
        'border: 1px solid #00b2ff',
        'border-radius: 8px',
        'box-shadow: 0 12px 40px rgba(39,39,39,0.12)',
        'padding: 12px',
        'font-family: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
        'font-size: 13px',
        'font-weight: 600'
    ].join(';')

    const copy = document.createElement('div')
    copy.textContent = 'A new CHALK version is available.'
    copy.style.marginBottom = '10px'

    const controls = document.createElement('div')
    controls.style.cssText = 'display:flex; gap:8px; justify-content:flex-end; flex-wrap:wrap'

    const dismiss = document.createElement('button')
    dismiss.type = 'button'
    dismiss.textContent = 'Later'
    dismiss.style.cssText = 'border:1px solid #00b2ff; background:#fff; color:#006fa5; border-radius:999px; padding:6px 12px; font-weight:700; cursor:pointer'
    dismiss.onclick = () => notice.remove()

    const refresh = document.createElement('button')
    refresh.type = 'button'
    refresh.textContent = 'Refresh'
    refresh.style.cssText = 'border:1px solid #272727; background:#272727; color:#fff; border-radius:999px; padding:6px 12px; font-weight:700; cursor:pointer'
    refresh.onclick = () => window.location.reload()

    controls.appendChild(dismiss)
    controls.appendChild(refresh)
    notice.appendChild(copy)
    notice.appendChild(controls)
    document.body.appendChild(notice)
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        let refreshing = false

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) {
                return
            }
            refreshing = true
            window.location.reload()
        })

        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration)
            registration.onupdatefound = () => {
                const installingWorker = registration.installing
                if (!installingWorker) {
                    return
                }

                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('New CHALK version available; waiting for user refresh.')
                        showServiceWorkerUpdateNotice()
                    }
                }
            }
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError)
        })
    })
}

// exposes store when running app in cypress
if (window.Cypress) {
    window.store = store
}
