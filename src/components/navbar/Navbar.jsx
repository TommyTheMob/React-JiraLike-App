import React from 'react';
import {Link} from "react-router-dom";
import classNames from "classnames";

import './navbar.scss'
import logo from './logo.png'

const Navbar = ({ page }) => {
    const projectPageClassNames = classNames('navbar__page', `${page === 'projects' && 'active'}`)


    return (
        <div className="navbar">
            <div className="navbar__container">
                <Link to="/"><img src={logo} alt="Navbar Logo" className="navbar__logo"/></Link>
                { page === 'tasks' && <button className="navbar__create-task-btn">Create task</button> }
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

export default Navbar;
