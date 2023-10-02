import React from 'react';
import TasksCol from "./TasksCol";

const TasksCols = ({ projectId, searchValue }) => {
    return (
        <>
            <div className="tasks-list__tasks-cols">
                <TasksCol searchValue={searchValue} projectId={projectId} colName="queue" />
                <TasksCol searchValue={searchValue} projectId={projectId} colName="development" />
                <TasksCol searchValue={searchValue} projectId={projectId} colName="done" />
            </div>
        </>
    );
};

export default TasksCols;
