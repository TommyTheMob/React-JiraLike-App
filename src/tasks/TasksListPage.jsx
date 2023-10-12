import React, {useState} from 'react';
import Navbar from "../components/navbar/Navbar";
import './tasksListPage.scss'
import TasksSearch from "./TasksSearch";
import Modal from "../components/modal/Modal";
import TaskInModal from "./TaskInModal";
import TasksCol from "./TasksCol";
import {DragDropContext} from "react-beautiful-dnd";
import {connect} from "react-redux";
import * as projectsActions from '../projects/projects.actions'


const TasksListPage = ({ projectId, changeTaskStatus, sortTasksInColbyDrag }) => {
    // it's for search the task on desk
    const [searchValue, setSearchValue] = useState('')

    // it's for calling modal with current task data
    const [modalActive, setModalActive] = useState(false)
    const [taskId, setTaskId] = useState(0)


    const onDragEnd = (result) => {
        const {
            destination,
            source,
            draggableId,
        } = result

        if (!destination) {
            return
        }

        if (source.droppableId !== destination.droppableId) {
            changeTaskStatus(projectId, draggableId, destination.droppableId)

        }

        // sortTasksInColbyDrag(projectId, source.droppableId, destination.droppableId, source.index, destination.index, draggableId)

    }

    return (
        <>
            <Modal
                active={modalActive}
                setActive={setModalActive}
            >
                <TaskInModal
                    taskId={taskId}
                    projectId={projectId}
                    setModal={setModalActive}
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
                        <DragDropContext onDragEnd={onDragEnd}>
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
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </>

    );
};

const mapDispatch = {
    changeTaskStatus: projectsActions.changeTaskStatus,
    sortTasksInColbyDrag: projectsActions.sortTasksInColbyDrag
}

export default connect(null, mapDispatch)(TasksListPage);
