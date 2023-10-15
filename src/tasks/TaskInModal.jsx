import React, {useState} from 'react';
import {getProjectsSelector} from "../projects/projects.selectors";
import {connect} from "react-redux";
import './taskInModal.scss'
import * as projectsActions from "../projects/projects.actions";
import {RiArrowDropDownLine, RiArrowDropUpLine} from "react-icons/ri";
import {IconContext} from "react-icons";
import {AiOutlineClose} from "react-icons/ai";
import TaskComments from "../comments/TaskComments";
import TaskDescription from "./TaskDescription";
import TaskIncludes from "./TaskIncludes";
import SubTasks from "./SubTasks";
import TaskInfo from "./TaskInfo";


const TaskInModal = ({
                         taskId,
                         projectId,
                         setModal,
                         creating,
                         projects,
                         changeTaskStatus,
                         deleteTask,
                         confirmTaskCreating
                     }) => {

    const task = projects
        .find(project => project.id === projectId)
        .tasks
        .find(task => task.id === taskId)


    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [prioDropdownVisible, setPrioDropdownVisible] = useState(false)
    const [isAddingSubTasks, setIsAddingSubTasks] = useState(false)

    if (!taskId) {
        return null
    }

    if (!task) {
        return null
    }

    const {
        id,
        title,
        status,
        connectedFilesURLs,
        desc,
        subTasks,
    } = task


    const onDropdownItemClick = (statusName) => {
        setDropdownVisible(false)
        console.log(statusName)
        changeTaskStatus(projectId, taskId, statusName)
    }

    const getStatusDropdown = (taskStatus) => {
        const statusNames = ['queue', 'development', 'done']

        switch (taskStatus) {
            case 'queue':
                return statusNames.concat().filter(status => status !== 'queue')
            case 'development':
                return statusNames.concat().filter(status => status !== 'development')
            case 'done':
                return statusNames.concat().filter(status => status !== 'done')
            default:
                return statusNames
        }
    }

    const getStylesForDropdownBtn = taskStatus => {
        let styles = {}

        switch (taskStatus) {
            case 'queue':
                styles = {background: '#ccc', color: 'black'}
                return styles
            case 'development':
                styles = {background: '#3474eb'}
                return styles
            case 'done':
                styles = {background: '#34eb61', color: 'black'}
                return styles
        }
    }

    return (
        <div className="task-modal__container"
             onClick={() => {
                 setDropdownVisible(false)
                 setIsAddingSubTasks(false)
                 setPrioDropdownVisible(false)
             }}
        >
            <div className="task-modal__header">
                <span className="task-modal__id">{id}</span>
                <div className="task-modal__header-btns">
                    <AiOutlineClose
                        className="task-modal__close-btn"
                        onClick={() => {
                            setModal(false)
                            creating && deleteTask(projectId, taskId)
                        }}
                    />
                </div>
            </div>
            <div className="task-modal__cols">
                <div className="left-col">
                    <h2 className="task-header">{title}</h2>
                    <div className="task-description__container">
                        <TaskDescription
                            projectId={projectId}
                            taskId={taskId}
                            taskTitle={title}
                            creating={creating}
                            type='title'
                        />
                    </div>

                    <div className="task-description__container">
                        <TaskDescription
                            projectId={projectId}
                            taskId={taskId}
                            taskDescription={desc}
                            creating={creating}
                            type='desc'
                        />
                    </div>

                    <div className="task-includes__container">
                        <TaskIncludes
                            projectId={projectId}
                            taskId={taskId}
                            connectedFilesURLs={connectedFilesURLs}
                        />
                    </div>

                    <div className="sub-tasks__container">
                        <SubTasks
                            projectId={projectId}
                            taskId={taskId}
                            subTasks={subTasks}
                            isAddingSubTasks={isAddingSubTasks}
                            setIsAddingSubTasks={setIsAddingSubTasks}
                        />
                    </div>

                    <div className="activity__container">
                        <span className="activity__title">Activity</span>
                        <div className="activity__comments">
                            <TaskComments
                                projectId={projectId}
                                taskId={taskId}
                                task={task}
                            />
                        </div>
                    </div>
                </div>
                <div className="right-col">
                    <div className="status__container">
                        <div className="status-dropdown">
                            <IconContext.Provider
                                value={{style: {verticalAlign: 'middle', fontWeight: 'bold', fontSize: '20px'}}}>
                                <button
                                    className="status-dropdown__btn"
                                    style={getStylesForDropdownBtn(status)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropdownVisible(!dropdownVisible)
                                    }}
                                >
                                    {status}
                                    {dropdownVisible ? <RiArrowDropUpLine/> : <RiArrowDropDownLine/>}
                                </button>
                            </IconContext.Provider>
                            <ul className={dropdownVisible ? 'status-dropdown__content visible' : 'status-dropdown__content'}>
                                {
                                    getStatusDropdown(status).map(statusName => (
                                        <li key={statusName} className="status-dropdown__item"
                                            onClick={() => onDropdownItemClick(statusName)}>{statusName}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="info__container">
                        <TaskInfo
                            projectId={projectId}
                            task={task}
                            creating={creating}
                            prioDropdownVisible={prioDropdownVisible}
                            setPrioDropdownVisible={setPrioDropdownVisible}
                        />
                    </div>

                    {creating === true
                        ?
                        <div className='confirm-creating__container'>
                            <button
                                className='confirm-creating__apply-btn btn'
                                onClick={() => {
                                    setModal(false)
                                }}
                            >
                                Save
                            </button>
                            <button
                                className='confirm-creating__cancel-btn btn'
                                onClick={() => {
                                    setModal(false)
                                    deleteTask(projectId, taskId)
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                        :
                        <div className='confirm-creating__container'>
                            <button
                                className='confirm-creating__cancel-btn btn'
                                onClick={() => {
                                    setModal(false)
                                    deleteTask(projectId, taskId)
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

const mapState = state => {
    return {
        projects: getProjectsSelector(state)
    }
}

const mapDispatch = {
    changeTaskStatus: projectsActions.changeTaskStatus,
    deleteTask: projectsActions.deleteTask,
}

export default connect(mapState, mapDispatch)(TaskInModal);
