import React from 'react';
import {connect} from "react-redux";
import * as projectsActions from '../porjects/projects.actions'

const Task = (props) => {

    const {
        setModal,
        setTaskId,
        setGrabbedTaskId,
        onDragOver,
        onDragLeave,
        onDragStart,
        onDragEnd,
        onDrop,
        projectId,
        changeTaskStatus,
        title,
        id,
        desc
    } = props

    const onTaskClick = () => {
        setModal(true)
        setTaskId(id)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        if (e.target.className === 'tasks-cols__tasks-list-item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
        onDragOver()
        // console.log('task id:', id)
    }

    const handleDragLeave = (e) => {
        e.target.style.boxShadow = 'none'
        onDragLeave()
        // console.log('task id:', id)
    }

    const handleDragStart = (e) => {
        onDragStart()
        // console.log('task id:', id)
    }

    const handleDragEnd = (e) => {
        e.target.style.boxShadow = 'none'
        setGrabbedTaskId(id)
        onDragEnd()
        // console.log('task id:', id)
    }

    const handleDragDrop = (e) => {
        e.preventDefault()
        onDrop()
        // console.log('task id:', id)

    }

    // 1. when HandleDragStart - save the dragging task's id
    // 2. when handleDragDrop - get the col's status and save it +
    // 3. when handleDragDrop - call changeTaskStatus with dragging task's id and col's status

    return (
        <>
            <li
                className="tasks-cols__tasks-list-item"
                onClick={onTaskClick}
                draggable={true}
                onDragOver={(e) => {handleDragOver(e)}}
                onDragLeave={(e) => {handleDragLeave(e)}}
                onDragStart={(e) => {handleDragStart(e)}}
                onDragEnd={(e) => {handleDragEnd(e)}}
                onDrop={(e) => {handleDragDrop(e)}}
            >
                <div className="item-info">
                    <h4 className="item-header">{title}</h4>
                    <span className="item-desc">{desc}</span>
                    <span className="item-id">#{id}</span>
                </div>
            </li>
        </>
    );
};

const mapDispatch = {
    changeTaskStatus: projectsActions.changeTaskStatus
}

export default connect(null, mapDispatch)(Task);
