import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App.tsx";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { Provider } from "react-redux";
import { store } from "./state/store";

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <FirebaseContext.Consumer>
        {(firebase: object): React.ReactNode => <App firebase={firebase} />}
      </FirebaseContext.Consumer>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
       console.log('SW registered: ', registration);
    }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
     });
   });
}
