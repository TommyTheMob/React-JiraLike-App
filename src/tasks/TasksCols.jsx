import React from 'react';
import TasksCol from "./TasksCol";

const TasksCols = ({ projectId, searchValue, setModal, setTaskId }) => {

    return (
        <>
            <div className="tasks-list__tasks-cols">
                <TasksCol setModal={setModal} setTaskId={setTaskId} searchValue={searchValue} projectId={projectId} colName="queue" />
                <TasksCol setModal={setModal} setTaskId={setTaskId} searchValue={searchValue} projectId={projectId} colName="development" />
                <TasksCol setModal={setModal} setTaskId={setTaskId} searchValue={searchValue} projectId={projectId} colName="done" />
            </div>
        </>
    );
};

export default TasksCols;
