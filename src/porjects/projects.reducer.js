import {CREATE_PROJECT, CHANGE_TASK_STATUS, ADD_FILES_TO_TASK, DELETE_FILE_FROM_TASK, EDIT_TASK_DESCRIPTION, SORT_TASKS_IN_COL_BY_DRAG} from "./projects.actions";

const projectsList = [
    {
        name: "Project 1",
        id: '1',
        tasks: [
            {
                title: "task 1 header",
                id: Math.round(Math.random() * 1000000).toString(),
                author: "Egar",
                status: "queue",
                desc: "queued task 1",
                createdAt: new Date('1995-12-17T03:24:00'),
                timeInWork: 0,
                priority: "low",
                connectedFiles: [],
                chainedTo: [],
                comments: [
                    {
                        id: Math.round(Math.random() * 1000000).toString(),
                        text: "Поздравляю и желанию дальнейшего процветания. Успехов и всего самого наилучшего. Ваша новость еще раз свидетельство того, что все под силу изменить, если нас много и мы едины.",
                        comments: [
                            {
                                id: Math.round(Math.random() * 1000000).toString(),
                                text: "Ебать ты хуйню несешь.",
                                comments: [
                                    {
                                        id: Math.round(Math.random() * 1000000).toString(),
                                        text: "Так да, вообще конч ебаный.",
                                        comments: []
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        id: Math.round(Math.random() * 1000000).toString(),
                        text: "Ну типа коммент. Надо было что-то написать, ну я и написал как бы, ну а че? Вовка.",
                        comments: []
                    },
                ]
            },
            {
                title: "task 2",
                id: Math.round(Math.random() * 1000000).toString(),
                author: "",
                status: "development",
                desc: "task 2 in dev",
                createdAt: new Date('1995-12-17T03:24:00'),
                timeInWork: 3600,
                priority: "medium",
                connectedFiles: "",
                chainedTo: []
            },
            {
                title: "task 3",
                id: Math.round(Math.random() * 1000000).toString(),
                author: "",
                status: "done",
                desc: "task 3 is done",
                createdAt: new Date('1995-12-17T03:24:00'),
                timeInWork: 7200,
                priority: "high",
                connectedFiles: "",
                chainedTo: []
            }
        ]
    },
    {
        name: "Project 2",
        id: '2',
        tasks: [
            {
                title: "task 1",
                id: "1",
                author: "",
                status: "done",
                desc: "",
                createdAt: new Date(),
                timeInWork: 0,
                priority: "",
                connectedFiles: "",
                chainedTo: []
            }
        ]
    },
    {
        name: "Project 3",
        id: '3',
        tasks: [
            {
                title: "task 1",
                id: "1",
                author: "",
                status: "",
                desc: "",
                createdAt: new Date(),
                timeInWork: 0,
                priority: "",
                connectedFiles: "",
                chainedTo: []
            }
        ]
    },
    {
        name: "Project 4",
        id: '4',
        tasks: [
            {
                title: "task 1",
                id: "1",
                author: "",
                status: "",
                desc: "",
                createdAt: new Date(),
                timeInWork: 0,
                priority: "",
                connectedFiles: "",
                chainedTo: []
            }
        ]
    },
]

const initialState = {
    projectsList,
}

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