import React from 'react';
import {getProjectsSelector} from "../porjects/projects.selectors";
import {connect} from "react-redux";

const TaskInModal = ({ taskId, projectId, projects }) => {
    if (!taskId) {
        return null
    }

    const task =  projects
        .find(project => project.id === projectId)
            .tasks
                .find(task => task.id === taskId)

    const { id } = task

    return (
        <div>
            task #id{id}
        </div>
    );
};

const mapState = state => {
    return {
        projects: getProjectsSelector(state)
    }
}

export default connect(mapState)(TaskInModal);
