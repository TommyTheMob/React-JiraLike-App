import React, {useState} from 'react';
import Navbar from "../components/navbar/Navbar";
import './tasksListPage.scss'
import TasksCols from "./TasksCols";
import TasksSearch from "./TasksSearch";
import Modal from "../components/modal/Modal";
import TaskInModal from "./TaskInModal";

const TasksListPage = ({ projectId }) => {
    const [searchValue, setSearchValue] = useState('')
    const [modalActive, setModalActive] = useState(false)
    const [taskId, setTaskId] = useState(0)

    return (
        <>
            <Modal active={modalActive} setActive={setModalActive} >
                <TaskInModal taskId={taskId} projectId={projectId} />
            </Modal>
            <div className="page__content">
                <Navbar page="tasks" />
                <div className="container">
                    <h1 className="tasks-list__header">Tasks status</h1>
                    <div className="tasks-list__container">
                        <TasksSearch getSearchValue={setSearchValue} />
                        <TasksCols setModal={setModalActive} setTaskId={setTaskId} searchValue={searchValue} projectId={projectId} />
                    </div>
                </div>
            </div>
        </>

    );
};


export default TasksListPage;
