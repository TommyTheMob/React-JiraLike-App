const projectsList = [
    {
        name: "Project 1",
        id: '1',
        tasks: [
            {
                title: "task 1 header",
                id: "1",
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
                id: "2",
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
                id: "3",
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

export const initialState = {
    projectsList,
}