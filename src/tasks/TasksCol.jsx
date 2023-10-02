import React from 'react';
import Task from "./Task";
import {connect} from "react-redux";
import {getProjectsSelector} from "../porjects/projects.selectors";

const TasksCol = ({ colName, projectId, searchValue, projects }) => {

    const getFilteredTasks = (projectId, searchValue) => {
        const currentProject = projects.find(project => project.id === projectId)

        if (searchValue !== '') {
            return currentProject.tasks.filter(task => task.id === searchValue || task.title.includes(searchValue))
        }

        return currentProject.tasks
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
                                    colName === task.status && <Task key={task.id} {...task} />
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

export default connect(mapState)(TasksCol);
