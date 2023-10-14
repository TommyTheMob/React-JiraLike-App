import React from 'react';
import {Link} from "react-router-dom";
import classNames from "classnames";
import './navbar.scss'
import logo from './logo.png'
import {connect} from "react-redux";
import * as ProjectsActions from '../../projects/projects.actions'
import { v4 as uuidv4 } from 'uuid';

const Navbar = ({ page, projectId, createTask, setModal, setCreatedTaskId }) => {
    const projectPageClassNames = classNames('navbar__page', `${page === 'projects' && 'active'}`)


    return (
        <div className="navbar">
            <div className="navbar__container">
                <Link to="/"><img src={logo} alt="Navbar Logo" className="navbar__logo"/></Link>
                { page === 'tasks' &&
                    <button
                        className="navbar__create-task-btn"
                        onClick={() => {
                            const newTaskId = uuidv4()
                            setCreatedTaskId(newTaskId)
                            createTask(projectId, newTaskId)
                            setModal(true)
                        }}
                    >
                        Create task
                    </button>
                }
                <div className="navbar__pages">
                    <Link to='/'>
                        <span
                            className={projectPageClassNames}
                        >
                            Projects page
                        </span>
                    </Link>
                    { page === 'tasks' && <span className="navbar__page active">Tasks page</span> }
                </div>
            </div>
        </div>
    );
};

const mapDispatch = {
    createTask: ProjectsActions.createTask,
}

export default connect(null, mapDispatch)(Navbar);
