import React from 'react';
import Task from "./Task";
import {connect} from "react-redux";
import {getTasksSelector} from "./tasks.selectors";


const TasksCol = (props) => {
    const { colStatus } = props

    return (
        <>
            <div className="tasks-list__tasks-col">
                <h3 className="tasks-cols__header">{colStatus}</h3>
                <div className="tasks-cols__content">

                    <ul className="tasks-cols__tasks-list">

                        <Task

                        />

                    </ul>

                </div>
            </div>
        </>
    );
};

const mapState = state => {
    return {
        tasks: getTasksSelector(state, )
    }
}

export default connect(mapState)(TasksCol);
