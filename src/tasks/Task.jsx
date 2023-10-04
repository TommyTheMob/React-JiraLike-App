import React from 'react';

const Task = () => {
    return (
        <>
            <li className="tasks-cols__tasks-list-item">
                <div className="item-info">
                    <h4 className="item-header">Task 1</h4>
                    <span className="item-desc">desc</span>
                    <span className="item-id">#TaskID</span>
                </div>
            </li>
        </>
    );
};

export default Task;
