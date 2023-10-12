import React from 'react';
import {Link} from "react-router-dom";


const Project = ({ id, name }) => {
    return (
        <Link to={`${id}/tasks`}>
            <li className="projects-list__item">
               {`${name} #id${id}`}
            </li>
        </Link>
    );
};

export default Project;
