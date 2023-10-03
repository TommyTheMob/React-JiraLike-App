export const CREATE_PROJECT = 'PROJECTS/CREATE_PROJECT'
export const CHANGE_TASK_STATUS = 'PROJECTS/CHANGE_TASK_STATUS'


export const createProject = (projectName) => {
    return {
        type: CREATE_PROJECT,
        payload: {
            name: projectName
        }
    }
}

export const changeTaskStatus = (projectId, taskId, taskStatus) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {
            projectId,
            taskId,
            taskStatus,
        }
    }
}