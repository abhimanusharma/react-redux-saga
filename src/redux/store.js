import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import userSaga from "./userSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(userSaga);

export default store;
