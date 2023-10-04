import React, {useState} from 'react';
import Navbar from "../components/navbar/Navbar";
import './tasksListPage.scss'
import TasksSearch from "./TasksSearch";
import Modal from "../components/modal/Modal";
import TaskInModal from "./TaskInModal";
import TasksCol from "./TasksCol";

const TasksListPage = ({ projectId }) => {
    // it's for search the task on desk
    const [searchValue, setSearchValue] = useState('')

    // it's for calling modal with current task data
    const [modalActive, setModalActive] = useState(false)
    const [taskId, setTaskId] = useState(0)

    return (
        <>
            <Modal
                active={modalActive}
                setActive={setModalActive}
            >
                <TaskInModal
                    taskId={taskId}
                    projectId={projectId}
                />
            </Modal>
            <div className="page__content">
                <Navbar page="tasks" />
                <div className="container">
                    <h1 className="tasks-list__header">Tasks status</h1>
                    <div className="tasks-list__container">
                        <TasksSearch
                            getSearchValue={setSearchValue}
                        />

                        <div className="tasks-list__tasks-cols">

                            <TasksCol
                                colName="queue"
                                projectId={projectId}
                                setModal={setModalActive}
                                setTaskId={setTaskId}
                                searchValue={searchValue}
                            />

                            <TasksCol
                                colName="development"
                                projectId={projectId}
                                setModal={setModalActive}
                                setTaskId={setTaskId}
                                searchValue={searchValue}
                            />

                            <TasksCol
                                colName="done"
                                projectId={projectId}
                                setModal={setModalActive}
                                setTaskId={setTaskId}
                                searchValue={searchValue}
                            />

                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};


export default TasksListPage;
