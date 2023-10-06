import {CREATE_PROJECT, CHANGE_TASK_STATUS, SORT_TASKS_IN_COL_BY_DRAG} from "./projects.actions";

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
                connectedFiles: "",
                chainedTo: []
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
        case SORT_TASKS_IN_COL_BY_DRAG: {
            const {
                projectId,
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId
            } = action.payload

            const currentProject = state.projectsList.concat().find(project => project.id === projectId)
            const tasks = currentProject.tasks

            if (droppableIdStart === droppableIdEnd) {
                // const tasksInCol = tasks.filter(task => droppableIdStart === task.status)

                const task = tasks.splice(droppableIndexStart, 1)
                tasks.splice(droppableIndexEnd, 0, ...task)
            }

            return {
                ...state,
                projectsList: state.projectsList.map(project => (
                    project.id === currentProject.id ? currentProject : project
                ))
            }
        }
        default:
            return state
    }
}