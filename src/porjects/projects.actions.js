export const CREATE_PROJECT = 'PROJECTS/CREATE_PROJECT'

export const createProject = (projectName) => {
    return {
        type: CREATE_PROJECT,
        payload: {
            name: projectName
        }
    }
}