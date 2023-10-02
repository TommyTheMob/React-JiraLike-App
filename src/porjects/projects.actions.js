export const CREATE_PROJECT = 'PROJECTS/CREATE_PROJECT'
export const FIND_TASK = 'PROJECTS/FIND_TASK'

export const createProject = (projectName) => {
    return {
        type: CREATE_PROJECT,
        payload: {
            name: projectName
        }
    }
}

export const findTask = (projectId, inputValue) => {
    return {
        type: FIND_TASK,
        payload: {
            projectId,
            inputValue,
        }
    }
}