import React, {useState} from 'react';
import {getProjectsSelector} from "../porjects/projects.selectors";
import {connect} from "react-redux";
import './taskInModal.scss'
import * as projectsActions from "../porjects/projects.actions";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import {IconContext} from "react-icons";


const TaskInModal = ({ taskId, projectId, projects, changeTaskStatus }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false)

    if (!taskId) {
        return null
    }

    const task =  projects
        .find(project => project.id === projectId)
            .tasks
                .find(task => task.id === taskId)

    const { id, title, status, author, createdAt, timeInWork, priority } = task

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

    return (
        <div className="task-modal__container" onClick={() => {setDropdownVisible(false)}}>
            <div className="task-modal__header">
                <span className="task-modal__id">{id}</span>
                <div className="task-modal__header-btns">
                    x
                </div>
            </div>
            <div className="task-modal__cols">
                <div className="left-col">
                    <h2 className="task-header">{title}</h2>
                    <div className="task-description__container">
                        <span className="task-description__title">Description</span>
                        <div className="task-description__desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad cumque dolor expedita, hic impedit ipsam laboriosam natus placeat, porro possimus tempore veritatis. Ab, architecto consectetur dolores dolorum enim, eos est et facere fuga harum ipsam libero, magni nam nobis officiis perspiciatis possimus quaerat quasi quia quisquam saepe sit voluptatibus!
                        </div>
                    </div>
                    <div className="task-includes__container">
                        <span className="task-includes__title">Includes</span>
                        <div className="task-includes__content-wrapper">
                            <div className="task-includes__files">files here</div>
                            <div className="task-includes__btns">- +</div>
                        </div>
                    </div>
                    <div className="sub-tasks__container">
                        <span className="sub-tasks__title">Subtasks</span>
                        <ul className="sub-tasks__list">
                            <li className="sub-tasks__item">1</li>
                            <li className="sub-tasks__item">2</li>
                            <li className="sub-tasks__item">3</li>
                        </ul>
                    </div>
                    <div className="activity__container">
                        <span className="activity__title">Activity</span>
                        <div className="activity__comments">comments will be here</div>
                    </div>
                </div>
                <div className="right-col">
                    <div className="status__container">
                        <div className="status-dropdown">
                            <IconContext.Provider value={{style: { verticalAlign: 'middle', fontWeight: 'bold', fontSize: '20px' } }}>
                                <button className="status-dropdown__btn" onClick={(e) => {e.stopPropagation(); setDropdownVisible(!dropdownVisible)}}>
                                    {status}
                                    {dropdownVisible ? <RiArrowDropUpLine/> : <RiArrowDropDownLine/>}
                                </button>
                            </IconContext.Provider>
                            <ul className={dropdownVisible ? 'status-dropdown__content visible' : 'status-dropdown__content'} >
                                {
                                    getStatusDropdown(status).map(statusName => (
                                        <li key={statusName} className="status-dropdown__item" onClick={() => onDropdownItemClick(statusName)}>{statusName}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="info__container">
                        <span className="info__title">Info</span>
                        <div className="info__list">
                            <div className="info__author-container">
                                <span className="info__author-title">Author</span>
                                <span className="info__author-name">{author}</span>
                            </div>
                            <div className="info__create-date-container">
                                <span className="info__create-date-title">Create date</span>
                                <span className="info__create-date">{`${createdAt.getDate()}.${createdAt.getMonth() + 1}.${createdAt.getFullYear()}`}</span>
                            </div>
                            <div className="info__work-time-container">
                                <span className="info__work-time-title">Time in work</span>
                                <span className="info__work-time">{timeInWork}</span>
                            </div>
                            <div className="info__prio-container">
                                <span className="info__prio-title">Priority</span>
                                <span className="info__prio">{priority}</span>
                            </div>
                        </div>
                    </div>
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
    changeTaskStatus: projectsActions.changeTaskStatus
}

export default connect(mapState, mapDispatch)(TaskInModal);
