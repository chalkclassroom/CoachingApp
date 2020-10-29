import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { AppContainer } from 'react-hot-loader';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <FirebaseContext.Provider value={new Firebase()}>
                    <FirebaseContext.Consumer>
                        {firebase => <App firebase={firebase} />}
                    </FirebaseContext.Consumer>
                </FirebaseContext.Provider>
            </Provider>
        </AppContainer>,
        document.getElementById("root")
    );
};

render(App);

// webpack Hot Module Replacement API
if (module.hot) {
    // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
    // while `hot` would configure HMR for the CURRENT module
    module.hot.accept('./App', () => {
        // if you are using harmony modules ({modules:false})
        render(App);
        // else older browsers need
        render(require('./App'));

    });
}

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
       console.log('SW registered: ', registration);
    }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
     });
   });
}
