export const CREATE_PROJECT = 'PROJECTS/CREATE_PROJECT'
export const CREATE_TASK = 'PROJECTS/CREATE_TASK'
export const DELETE_TASK = 'PROJECTS/DELETE_TASK'
export const CHANGE_TASK_STATUS = 'PROJECTS/CHANGE_TASK_STATUS'
export const CHANGE_TASK_PRIORITY = 'PROJECTS/CHANGE_TASK_PRIORITY'
export const SORT_TASKS_IN_COL_BY_DRAG = 'PROJECTS/SORT_TASKS_IN_COL_BY_DRAG'
export const ADD_FILES_TO_TASK = 'PROJECTS/ADD_FILES_TO_TASK'
export const ADD_FILE_URL_TO_TASK = 'PROJECTS/ADD_FILE_URL_TO_TASK'
export const DELETE_FILE_FROM_TASK = 'PROJECTS/DELETE_FILE_FROM_TASK'
export const DELETE_FILE_URL_FROM_TASK = 'PROJECTS/DELETE_FILE_URL_FROM_TASK'
export const EDIT_TASK_TITLE = 'PROJECTS/EDIT_TASK_TITLE'
export const EDIT_TASK_AUTHOR = 'PROJECTS/EDIT_TASK_AUTHOR'
export const EDIT_TASK_DESCRIPTION = 'PROJECTS/EDIT_TASK_DESCRIPTION'
export const ADD_COMMENT = 'PROJECTS/ADD_COMMENT'
export const EDIT_COMMENT = 'PROJECTS/EDIT_COMMENT'
export const ADD_SUBTASK = 'PROJECTS/ADD_SUBTASK'
export const DELETE_SUBTASK = 'PROJECTS/DELETE_SUBTASK'
export const DELETE_COMMENT = 'PROJECTS/DELETE_COMMENT'

export const createProject = (projectName) => {
    return {
        type: CREATE_PROJECT,
        payload: {
            name: projectName
        }
    }
}

export const createTask = (projectId, taskId) => {
    return {
        type: CREATE_TASK,
        payload: {
            projectId,
            taskId,
        }
    }
}

export const deleteTask = (projectId, taskId) => {
    return {
        type: DELETE_TASK,
        payload: {
            projectId,
            taskId,
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

export const changeTaskPriority = (projectId, taskId, prioName) => {
    return {
        type: CHANGE_TASK_PRIORITY,
        payload: {
            projectId,
            taskId,
            prioName,
        }
    }
}

export const addFilesToTask = (projectId, taskId, filesObject) => {
    return {
        type: ADD_FILES_TO_TASK,
        payload: {
            projectId,
            taskId,
            filesObject,
        }
    }
}

export const addFileURLToTask = (projectId, taskId, url) => {
    return {
        type: ADD_FILE_URL_TO_TASK,
        payload: {
            projectId,
            taskId,
            url,
        }
    }
}

export const deleteFileFromTask = (projectId, taskId, file) => {
    return {
        type: DELETE_FILE_FROM_TASK,
        payload: {
            projectId,
            taskId,
            file,
        }
    }
}

export const deleteFileURLFromTask = (projectId, taskId, url, fileName) => {
    return {
        type: DELETE_FILE_URL_FROM_TASK,
        payload: {
            projectId,
            taskId,
            url,
            fileName,
        }
    }
}

export const editTaskTitle = (projectId, taskId, title) => {
    return {
        type: EDIT_TASK_TITLE,
        payload: {
            projectId,
            taskId,
            title,
        }
    }
}

export const editTaskAuthor = (projectId, taskId, name) => {
    return {
        type: EDIT_TASK_AUTHOR,
        payload: {
            projectId,
            taskId,
            name,
        }
    }
}

export const editTaskDescription = (projectId, taskId, desc) => {
    return {
        type: EDIT_TASK_DESCRIPTION,
        payload: {
            projectId,
            taskId,
            desc,
        }
    }
}

export const addComment = (projectId, taskId, parentId, text) => {
    return {
        type: ADD_COMMENT,
        payload: {
            projectId,
            taskId,
            parentId,
            text
        }
    }
}

export const deleteComment = (projectId, taskId, commentId) => {
    return {
        type: DELETE_COMMENT,
        payload: {
            projectId,
            taskId,
            commentId
        }
    }
}

export const editComment = (projectId, taskId, commentId, newText) => {
    return {
        type: EDIT_COMMENT,
        payload: {
            projectId,
            taskId,
            commentId,
            newText,
        }
    }
}

export const addSubTask = (projectId, taskId, subTaskId) => {
    return {
        type: ADD_SUBTASK,
        payload: {
            projectId,
            taskId,
            subTaskId
        }
    }
}

export const deleteSubTask = (projectId, taskId, subTaskId) => {
    return {
        type: DELETE_SUBTASK,
        payload: {
            projectId,
            taskId,
            subTaskId
        }
    }
}

export const sortTasksInColbyDrag = (
    projectId,
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
) => {
    return {
        type: SORT_TASKS_IN_COL_BY_DRAG,
        payload: {
            projectId,
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId
        }
    }
}