import React, {useState} from 'react';
import TasksCol from "./TasksCol";

const TasksCols = ({ projectId, searchValue, setModal, setTaskId }) => {
    const [currentBoard, setCurrentBoard] = useState(null)

    const [boards, setBoards] = useState([
        {id: 1, title: 'queue', item: <TasksCol setCurrentBoard={setCurrentBoard} setModal={setModal} setTaskId={setTaskId} searchValue={searchValue} projectId={projectId} colName="queue" />},
        {id: 2, title: 'development', item: <TasksCol setCurrentBoard={setCurrentBoard} setModal={setModal} setTaskId={setTaskId} searchValue={searchValue} projectId={projectId} colName="development" />},
        {id: 3, title: 'done', item: <TasksCol setCurrentBoard={setCurrentBoard} setModal={setModal} setTaskId={setTaskId} searchValue={searchValue} projectId={projectId} colName="done" />},
    ])




    return (
        <div className="tasks-list__tasks-cols">
            {
                boards.map(board => (
                    board.item
                ))
            }
        </div>
    )



    // return (
    //     <>
    //         <div className="tasks-list__tasks-cols">
    //             <TasksCol setModal={setModal} setTaskId={setTaskId} searchValue={searchValue} projectId={projectId} colName="queue" />
    //             <TasksCol setModal={setModal} setTaskId={setTaskId} searchValue={searchValue} projectId={projectId} colName="development" />
    //             <TasksCol setModal={setModal} setTaskId={setTaskId} searchValue={searchValue} projectId={projectId} colName="done" />
    //         </div>
    //     </>
    // );
};

export default TasksCols;
