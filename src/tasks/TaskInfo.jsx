import React, {useState} from 'react';
import './taskInfo.scss'
import {MdOutlineModeEditOutline} from "react-icons/md";
import {connect} from "react-redux";
import * as ProjectsActions from "../projects/projects.actions";
import {IconContext} from "react-icons";
import {RiArrowDropDownLine, RiArrowDropUpLine} from "react-icons/ri";

const TaskInfo = (props) => {
    const [editing, setEditing] = useState(true)
    const [inputValue, setInputValue] = useState('')

    const {
        projectId,
        task,
        creating,
        editTaskAuthor,
        changeTaskPriority,
        prioDropdownVisible,
        setPrioDropdownVisible
    } = props

    const {
        author,
        // createdAt,
        // developmentEndDate,
        status,
        developmentStartTime,
        timeSpentInDevelopment,
        priority,
        id
    } = task

    const createdAt = new Date(task.createdAt)

    let developmentEndDate = null
    if (task.developmentEndDate) {
        developmentEndDate = new Date(task.developmentEndDate)
    }

    const getPriosDropdown = (taskPrio) => {
        const prioNames = ['low', 'medium', 'high']

        switch (taskPrio) {
            case 'low':
                return prioNames.concat().filter(status => status !== 'low')
            case 'medium':
                return prioNames.concat().filter(status => status !== 'medium')
            case 'high':
                return prioNames.concat().filter(status => status !== 'high')
            default:
                return prioNames
        }
    }

    const getStylesForDropdownBtn = prioName => {
        let styles = {}

        switch (prioName) {
            case 'low':
                styles = {background: '#ccc', color: 'black'}
                return styles
            case 'medium':
                styles = {background: '#3474eb'}
                return styles
            case 'high':
                styles = {background: '#ff0000'}
                return styles
        }
    }

    const onDropdownItemClick = (prioName) => {
        setPrioDropdownVisible(false)
        changeTaskPriority(projectId, id, prioName)
    }

    function formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds} s`;
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            return `${minutes} m ${seconds % 60} s`;
        } else if (seconds < 86400) {
            const hours = Math.floor(seconds / 3600);
            const remainingSeconds = seconds % 3600;
            const minutes = Math.floor(remainingSeconds / 60);
            return `${hours} hrs ${minutes} m`;
        } else if (seconds < 31536000) {
            const days = Math.floor(seconds / 86400);
            const remainingSeconds = seconds % 86400;
            const hours = Math.floor(remainingSeconds / 3600);
            return `${days} d ${hours} hrs`;
        } else {
            const years = Math.floor(seconds / 31536000);
            const remainingSeconds = seconds % 31536000;
            const days = Math.floor(remainingSeconds / 86400);
            return `${years} yrs ${days} d`;
        }
    }

    const getTimeSpentInDevelopment = status => {
        switch (status) {
            case 'queue':
                return 'Not in work'
            case 'development':
                return formatTime((Date.now() - developmentStartTime) / 1000)
            default:
                if (developmentStartTime !== null) {
                    return formatTime(timeSpentInDevelopment / 1000)
                }
                return "Task avoid dev"
        }
    }

    return (
        <>
            <span className="info__title">Info</span>
            <div className="info__list">
                <div className="info__author-container">
                    <div className='info__author-title-container'>
                        <span className="info__author-title">Author</span>
                        {creating
                            && <MdOutlineModeEditOutline
                                className="info__author-edit-btn"
                                onClick={() => {
                                    setEditing(prev => !prev)
                                }}
                            />
                        }
                    </div>
                    {
                        creating && editing
                            ?
                            <div className='info__author-edit-container'>
                                <input
                                    className='info__author-input'
                                    type="text"
                                    placeholder='Type name...'
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <button
                                    className='info__author-apply-btn btn'
                                    onClick={() => {
                                        if (inputValue) {
                                            setEditing(false)
                                            editTaskAuthor(projectId, id, inputValue)
                                        }
                                    }}
                                >
                                    ok
                                </button>
                            </div>
                            : <span className="info__author-name">{author}</span>
                    }
                </div>
                <div className="info__create-date-container">
                    <span className="info__create-date-title">Create date</span>
                    <span
                        className="info__create-date">{`${createdAt.getDate()}.${createdAt.getMonth() + 1}.${createdAt.getFullYear()}`}</span>
                </div>
                <div className="info__work-time-container">
                    <span className="info__work-time-title">Time in work</span>
                    <span className="info__work-time">
                        {getTimeSpentInDevelopment(status)}
                    </span>
                </div>
                {developmentEndDate
                    && <div className="info__create-date-container">
                        <span className="info__create-date-title">End date</span>
                        <span
                            className="info__create-date">{`${developmentEndDate.getDate()}.${developmentEndDate.getMonth() + 1}.${developmentEndDate.getFullYear()}`}</span>
                    </div>
                }
                <div className="info__prio-container">
                    <span className="info__prio-title">Priority</span>
                    {/*<span className="info__prio">{priority}</span>*/}
                    <div className="prio-dropdown">
                        <IconContext.Provider
                            value={{style: {verticalAlign: 'middle', fontWeight: 'bold', fontSize: '20px'}}}>
                            <button
                                className="prio-dropdown__btn"
                                style={getStylesForDropdownBtn(priority)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPrioDropdownVisible(!prioDropdownVisible)
                                }}
                            >
                                {priority}
                                {prioDropdownVisible ? <RiArrowDropUpLine/> : <RiArrowDropDownLine/>}
                            </button>
                        </IconContext.Provider>
                        <ul className={prioDropdownVisible ? 'prio-dropdown__content visible' : 'prio-dropdown__content'}>
                            {
                                getPriosDropdown(priority).map(prioName => (
                                    <li key={prioName} className="prio-dropdown__item"
                                        onClick={() => onDropdownItemClick(prioName)}>{prioName}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatch = {
    editTaskAuthor: ProjectsActions.editTaskAuthor,
    changeTaskPriority: ProjectsActions.changeTaskPriority,
}

export default connect(null, mapDispatch)(TaskInfo);
