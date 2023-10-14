import { v4 as uuidv4 } from 'uuid';
import {
    CREATE_PROJECT,
    CREATE_TASK,
    DELETE_TASK,
    CHANGE_TASK_STATUS,
    CHANGE_TASK_PRIORITY,
    ADD_FILES_TO_TASK,
    DELETE_FILE_FROM_TASK,
    EDIT_TASK_TITLE,
    EDIT_TASK_AUTHOR,
    EDIT_TASK_DESCRIPTION,
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    ADD_SUBTASK,
    DELETE_SUBTASK,
    SORT_TASKS_IN_COL_BY_DRAG
} from "./projects.actions";

const projectsList = [
    {
        name: "Project 1",
        id: 'project-1',
        tasks: [
            {
                title: "task 1 header",
                id: 'project-1_task-1',
                author: "Egar",
                status: "queue",
                desc: "queued task 1",
                createdAt: '1995-12-17T03:24:00Z',
                developmentStartTime: null,
                timeSpentInDevelopment: 0,
                developmentEndDate: null,
                priority: "low",
                connectedFiles: [],
                subTasks: ['project-1_task-3'],
                comments: [
                    {
                        id: 'project-1_task-1_comment-1',
                        text: "Example comment 1",
                        comments: [
                            {
                                id: 'project-1_task-1_comment-1_comment-1',
                                text: "Example reply 1 to comment 1",
                                comments: [
                                    {
                                        id: 'project-1_task-1_comment-1_comment-1_comment-1',
                                        text: "Example reply 1 to reply 1",
                                        comments: []
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        id: 'project-1_task-1_comment-2',
                        text: "Example comment 2",
                        comments: []
                    },
                    {
                        id: 'project-1_task-1_comment-3',
                        text: "Example comment 3",
                        comments: []
                    },
                ]
            },
            {
                title: "task 2",
                id: 'project-1_task-2',
                author: "",
                status: "development",
                desc: "task 2 in dev",
                createdAt: '1995-12-17T03:24:00Z',
                developmentStartTime: 819159840000,
                timeSpentInDevelopment: 0,
                developmentEndDate: null,
                priority: "medium",
                connectedFiles: "",
                subTasks: [],
                comments: []
            },
            {
                title: "task 3",
                id: 'project-1_task-3',
                author: "",
                status: "development",
                desc: "task 3 is done",
                createdAt: '1995-12-17T03:24:00Z',
                developmentStartTime: 819159840000,
                timeSpentInDevelopment: 0,
                developmentEndDate: null,
                priority: "high",
                connectedFiles: "",
                subTasks: [],
                comments: []
            }
        ]
    },
    {
        name: "Project 2",
        id: 'project-2',
        tasks: []
    },
]

const savedState = localStorage.getItem('reduxState')

const initialState = savedState
    ? JSON.parse(savedState)
    : {projectsList}

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
        case CREATE_TASK: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)

            const newTask = {
                title: "Type your title",
                id: action.payload.taskId,
                author: "Who's author?",
                status: "queue",
                desc: "Type task description",
                createdAt: new Date(),
                developmentStartTime: null,
                timeSpentInDevelopment: 0,
                priority: "low",
                connectedFiles: [],
                subTasks: [],
                comments: []
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.concat(newTask)
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case DELETE_TASK: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.filter(task => task.id !== action.payload.taskId)
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case CHANGE_TASK_STATUS: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)

            const getDevelopmentStartTime = (taskStatus) => {
                let developmentStartTime = null


                switch (taskStatus) {
                    case 'development': {
                        developmentStartTime = +new Date()
                        return developmentStartTime
                    }
                    case 'done': {
                        developmentStartTime = currentTask.developmentStartTime
                        return developmentStartTime
                    }
                    case 'queue': {
                        developmentStartTime = null
                        return developmentStartTime
                    }
                    default:
                        return developmentStartTime
                }
            }

            const getTimeSpentInDevelopment = (taskStatus) => {
                let timeSpentInDevelopment = 0

                switch (taskStatus) {
                    case 'development': {
                        timeSpentInDevelopment = currentTask.timeSpentInDevelopment
                        return timeSpentInDevelopment
                    }
                    case 'done': {
                        if (currentTask.developmentStartTime !== null) {
                            timeSpentInDevelopment = +new Date() - currentTask.developmentStartTime
                            return timeSpentInDevelopment
                        } else {
                            return 0
                        }

                    }
                    case 'queue': {
                        timeSpentInDevelopment = 0
                        return timeSpentInDevelopment
                    }
                    default:
                        return timeSpentInDevelopment
                }
            }

            const getDevelopmentEndDate = (taskStatus) => {
                let developmentEndDate = null

                switch (taskStatus) {
                    case 'development': {
                        developmentEndDate = currentTask.developmentEndDate
                        return developmentEndDate
                    }
                    case 'done': {
                        developmentEndDate = new Date().toISOString()
                        return developmentEndDate
                    }
                    case 'queue': {
                        developmentEndDate = null
                        return developmentEndDate
                    }
                    default:
                        return developmentEndDate
                }
            }

            const newTask = {
                ...currentTask,
                status: action.payload.taskStatus,
                developmentStartTime: getDevelopmentStartTime(action.payload.taskStatus),
                timeSpentInDevelopment: getTimeSpentInDevelopment(action.payload.taskStatus),
                developmentEndDate: getDevelopmentEndDate(action.payload.taskStatus)
            }


            const newProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? newTask : task
                )),
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? newProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case CHANGE_TASK_PRIORITY: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)

            const newTask = {
                ...currentTask,
                priority: action.payload.prioName
            }


            const newProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? newTask : task
                )),
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? newProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case ADD_FILES_TO_TASK: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)

            const filesToAdd = Object.entries(action.payload.filesObject).map(file => file[1])

            const updatedTask = {
                ...currentTask,
                connectedFiles: currentTask.connectedFiles.concat(filesToAdd)
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? updatedTask : task
                ))
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case DELETE_FILE_FROM_TASK: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)

            const updatedFiles = currentTask.connectedFiles.filter(file => file.name !== action.payload.file.name)

            const updatedTask = {
                ...currentTask,
                connectedFiles: updatedFiles
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? updatedTask : task
                ))
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case EDIT_TASK_TITLE: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)

            const updatedTask = {
                ...currentTask,
                title: action.payload.title
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? updatedTask : task
                ))
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case EDIT_TASK_AUTHOR: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)

            const updatedTask = {
                ...currentTask,
                author: action.payload.name
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? updatedTask : task
                ))
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case EDIT_TASK_DESCRIPTION: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)

            const updatedTask = {
                ...currentTask,
                desc: action.payload.desc
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? updatedTask : task
                ))
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case ADD_COMMENT: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)
            const comments = currentTask.comments

            let updatedTask

            // adding reply to comment
            if (action.payload.parentId !== null) {
                const addComment = (comments, parentId, text) => {
                    return comments.map(comment => {
                        if (comment.id === parentId) {
                            return {
                                ...comment,
                                comments: [
                                    ...comment.comments,
                                    {id: Math.round(Math.random() * 1000000), text, comments: []}
                                ]
                            }
                        } else if (comment.comments.length > 0) {
                            return {
                                ...comment,
                                comments: addComment(comment.comments, parentId, text)
                            }
                        }
                        return comment
                    })
                }

                updatedTask = {
                    ...currentTask,
                    comments: addComment(comments, action.payload.parentId, action.payload.text)
                }

                // adding new comment to task
            } else {
                updatedTask = {
                    ...currentTask,
                    comments: currentTask.comments.concat(
                        {id: Math.round(Math.random() * 1000000), text: action.payload.text, comments: []}
                    )
                }
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? updatedTask : task
                ))
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case DELETE_COMMENT : {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)
            const comments = currentTask.comments

            const deleteComment = (comments, commentId) => {
                return comments.map(comment => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            deleted: true,
                            text: 'Comment deleted.'
                        }
                    } else if (comment.comments.length > 0) {
                        return {
                            ...comment,
                            comments: deleteComment(comment.comments, commentId)
                        }
                    }
                    return comment
                })
            }

            const updatedTask = {
                ...currentTask,
                comments: deleteComment(comments, action.payload.commentId)
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? updatedTask : task
                ))
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case EDIT_COMMENT: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)
            const comments = currentTask.comments

            const editComment = (comments, commentId, text) => {
                return comments.map(comment => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            text,
                        }
                    } else if (comment.comments.length > 0) {
                        return {
                            ...comment,
                            comments: editComment(comment.comments, commentId, text)
                        }
                    }
                    return comment
                })
            }

            const updatedTask = {
                ...currentTask,
                comments: editComment(comments, action.payload.commentId, action.payload.newText)
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? updatedTask : task
                ))
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case ADD_SUBTASK: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)

            const updatedTask = {
                ...currentTask,
                subTasks: currentTask.subTasks.concat(action.payload.subTaskId)
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? updatedTask : task
                ))
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        case DELETE_SUBTASK: {
            const currentProject = state.projectsList.find(project => project.id === action.payload.projectId)
            const currentTask = currentProject.tasks.find(task => task.id === action.payload.taskId)

            const updatedTask = {
                ...currentTask,
                subTasks: currentTask.subTasks.filter(task => task !== action.payload.subTaskId)
            }

            const updatedProject = {
                ...currentProject,
                tasks: currentProject.tasks.map(task => (
                    task.id === currentTask.id ? updatedTask : task
                ))
            }

            const updatedList = projectsList.map(project => (
                project.id === currentProject.id ? updatedProject : project
            ))

            return {
                ...state,
                projectsList: updatedList
            }
        }
        // case SORT_TASKS_IN_COL_BY_DRAG: {
        //     const {
        //         projectId,
        //         droppableIdStart,
        //         droppableIdEnd,
        //         droppableIndexStart,
        //         droppableIndexEnd,
        //         draggableId
        //     } = action.payload
        //
        //     const currentProject = state.projectsList.concat().find(project => project.id === projectId)
        //     const tasks = currentProject.tasks
        //
        //     if (droppableIdStart === droppableIdEnd) {
        //         // const tasksInCol = tasks.filter(task => droppableIdStart === task.status)
        //
        //         const task = tasks.splice(droppableIndexStart, 1)
        //         tasks.splice(droppableIndexEnd, 0, ...task)
        //     }
        //
        //     return {
        //         ...state,
        //         projectsList: state.projectsList.map(project => (
        //             project.id === currentProject.id ? currentProject : project
        //         ))
        //     }
        // }
        default:
            return state
    }
}