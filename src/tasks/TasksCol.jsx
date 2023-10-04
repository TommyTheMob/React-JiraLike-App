import React, {useState} from 'react';
import Task from "./Task";
import {connect} from "react-redux";
import {getProjectsSelector} from "../porjects/projects.selectors";
import * as projectsActions from "../porjects/projects.actions";

const TasksCol = (props) => {
    const [grabbedTaskId, setGrabbedTaskId] = useState(null)
    const [currentCol, setCurrentCol] = useState(null)

    const {
            colName,
            projectId,
            searchValue,
            setModal,
            setTaskId,
            projects,
            changeTaskStatus,
    } = props

    const onDragOver = () => {
        console.log('dragging over', 'colName:', currentCol, '; grabbed task id:', grabbedTaskId)
    }

    const onDragLeave = () => {
        console.log('drag leave', 'colName:', currentCol, '; grabbed task id:', grabbedTaskId)
    }

    const onDragStart = (colName) => {
        console.log('drag start', 'colName:', currentCol, '; grabbed task id:', grabbedTaskId)
    }

    const onDragEnd = (taskId) => {
        console.log('drag end', 'colName:', currentCol, '; grabbed task id:', grabbedTaskId)
        changeTaskStatus(projectId, grabbedTaskId, currentCol)
    }

    const onDrop = () => {
        console.log('drag drop', 'colName:', colName, '; grabbed task id:', grabbedTaskId)
        setCurrentCol(colName)
    }

    const getFilteredTasks = (projectId, searchValue) => {
        const currentProject = projects.find(project => project.id === projectId)
        const tasks = currentProject.tasks.filter(task => task.status === colName)

        if (searchValue !== '') {
            return tasks.filter(task => task.id === searchValue || task.title.includes(searchValue))
        }

        return tasks
    }

    return (
        <>
            <div className="tasks-list__tasks-col">
                <h3 className="tasks-cols__header">{ colName }</h3>
                <div className="tasks-cols__content">
                    <ul className="tasks-cols__tasks-list">
                        {
                            getFilteredTasks(projectId, searchValue)
                                .map(task => (
                                    <Task
                                        {...task}
                                        key={task.id}
                                        onDragOver={onDragOver}
                                        onDragLeave={onDragLeave}
                                        onDragStart={onDragStart}
                                        onDragEnd={onDragEnd}
                                        onDrop={onDrop}
                                        setGrabbedTaskId={setGrabbedTaskId}
                                        projectId={projectId}
                                        setModal={setModal}
                                        setTaskId={setTaskId}
                                    />
                                ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};

const mapState = state => {
    return {
        projects: getProjectsSelector(state)
    }
}

const mapDispatch = {
    changeTaskStatus: projectsActions.changeTaskStatus
}

export default connect(mapState, mapDispatch)(TasksCol);
