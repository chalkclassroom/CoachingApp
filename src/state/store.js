import {applyMiddleware, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const logger = createLogger();
const middleware = [logger, thunk];

export const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(...middleware))
);
