import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {Reducer} from "./Reducer";

const reducers = combineReducers({
    reducer: Reducer,
});

// расширение для chrome Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store =
    createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
