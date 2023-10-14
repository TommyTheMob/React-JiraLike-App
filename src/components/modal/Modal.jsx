import React from 'react';
import './modal.scss'
import {connect} from "react-redux";
import * as ProjectsActions from '../../projects/projects.actions'

const Modal = ({ active, setActive, children, creating, deleteTask, projectId, taskId}) => {
    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={() => {
                setActive(false)
                creating && deleteTask(projectId, taskId)
            }}
        >
            <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

const mapDispatch = {
    deleteTask: ProjectsActions.deleteTask
}

export default connect(null, mapDispatch)(Modal);
