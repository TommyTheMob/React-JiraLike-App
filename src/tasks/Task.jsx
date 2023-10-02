import React from 'react';

const Task = ({ setModal, setTaskId, title, id, desc, createdAt, timeInWork, priority }) => {
    const onTaskClick = () => {
        setModal(true)
        setTaskId(id)
    }

    return (
        <div>
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

export default Task;
