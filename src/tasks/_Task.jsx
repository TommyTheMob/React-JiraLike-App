import React, {useState} from 'react';
import {connect} from "react-redux";
import * as projectsActions from '../porjects/projects.actions'
import {changeTaskStatus} from "../porjects/projects.actions";

const _Task = ({ setModal, setTaskId, projectId, title, id, desc, createdAt, timeInWork, priority, status, taskItem, setCurrentBoard, changeTaskStatus }) => {
    const [currentItemId, setCurrentItemId] = useState(id)
    
    const onTaskClick = () => {
        setModal(true)
        setTaskId(id)
    }


    const dragOverHandler = (e) => {
        e.preventDefault()
        // console.log(e.target)
        if (e.target.className === 'tasks-cols__tasks-list-item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    const dragLeaveHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }

    const dragStartHandler = (e, id) => {
        console.log(e.target)
        setCurrentItemId(id)
    }

    const dragEndHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }

    const dragDropHandler = (e) => {
            e.preventDefault()
            console.log(e.target.closest('.tasks-list__tasks-col').querySelector('.tasks-cols__header').textContent)
            const status = e.target.closest('.tasks-list__tasks-col').querySelector('.tasks-cols__header').textContent
            changeTaskStatus(projectId, currentItemId, status)
    }



    return (
        <div
            className="list-item-container"
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, id)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dragDropHandler(e)}
            draggable={true}
        >
            <li className="tasks-cols__tasks-list-item" onClick={onTaskClick}>
                <div className="item-info">
                    <h4 className="item-header">{title}</h4>
                    <span className="item-desc">{desc}</span>
                    {/*<span className="item-createdAt">{(new Date(createdAt)).toString()}</span>*/}
                    {/*<span className="item-time-in-work">{timeInWork}</span>*/}
                    {/*<span className="item-priority">{priority}</span>*/}
                    <span className="item-id">#{id}</span>
                </div>
            </li>
        </div>
    );
};

const mapDispatch = {
    changeTaskStatus: projectsActions.changeTaskStatus
}

export default connect(null, mapDispatch)(_Task);
