import {CREATE_PROJECT, FIND_TASK} from "./projects.actions";

const projectsList = [
    {
        name: "Project 1",
        id: '1',
        tasks: [
            {
                title: "task 1 header",
                id: "1",
                status: "queue",
                desc: "queued task 1",
                createdAt: +(new Date()),
                timeInWork: 0,
                priority: "low",
                connectedFiles: "",
                chainedTo: []
            },
            {
                title: "task 2",
                id: "2",
                status: "development",
                desc: "task 2 in dev",
                createdAt: +(new Date()),
                timeInWork: 3600,
                priority: "medium",
                connectedFiles: "",
                chainedTo: []
            },
            {
                title: "task 3",
                id: "3",
                status: "done",
                desc: "task 3 is done",
                createdAt: +(new Date()),
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
        case FIND_TASK: {
            return {
                ...state,
                projectsList: state.projectsList
                    .map(project => {
                        if (project.id === action.payload.projectId) {
                            project.tasks = project.tasks.filter(task => task.id === action.payload.inputValue || task.title === action.payload.inputValue)
                            return project
                        }
                        return project
                    })
            }
        }
        default:
            return state
    }
}