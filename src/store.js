import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {projectsReducer} from "./projects/projects.reducer";
import localStorageMiddleware from './reduxLocalStorageMiddleware';

const reducer = combineReducers({
    projects: projectsReducer,
})

// const reducer = projectsReducer

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk),
        applyMiddleware(localStorageMiddleware)
    )
)

export default store