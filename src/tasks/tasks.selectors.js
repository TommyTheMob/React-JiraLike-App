import {getProjectsSelector} from "../porjects/projects.selectors";
import {createSelector} from "reselect";


// export const getTasksSelector = (state, projectId) => {
//     return getProjectsSelector(state).find(project => project.id === projectId).tasks
// }

export const getTasksSelector = createSelector(
    [getProjectsSelector, (state, projectId) => projectId],
    (projectsList, projectId) => (
        projectsList.find(project => project.id === projectId).tasks
    )
)