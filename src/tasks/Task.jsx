import React from 'react';

const Task = ({ title, id, desc, createdAt, timeInWork, priority }) => {
    return (
        <div>
            <li className="tasks-cols__tasks-list-item">
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
