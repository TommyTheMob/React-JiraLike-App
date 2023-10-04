import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {projectsReducer} from "./porjects/projects.reducer";
import {tasksReducer} from "./tasks/tasks.reducer";

const reducer = combineReducers({
    projects: projectsReducer,
    tasks: tasksReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

export default store