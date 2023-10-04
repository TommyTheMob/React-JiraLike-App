import {initialState} from "../initialState";
import {CREATE_PROJECT, CHANGE_TASK_STATUS} from "./projects.actions";

export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROJECT: {
            return {
                ...state,
                projectsList: state.projectsList.concat({
                    name: action.payload.name,
                    id: Math.round(Math.random() * 1000000),
                    tasks: []
                })
            }
        }
        case CHANGE_TASK_STATUS: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)

            const newTask = {
                ...currentTask,
                status: action.payload.taskStatus
            }

            const newProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? newTask : task
                )),
            }

            const updatedList = state.projectsList.map(project => (
                project.id === currentProject.id ? newProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        default:
            return state
    }
}