import React from 'react';
import Navbar from "../components/navbar/Navbar";
import './projectsListPage.scss'
import {connect} from "react-redux";
import {getProjectsSelector} from "./projects.selectors";
import Project from "./Project";


const ProjectsListPage = ({ projects }) => {
    return (
        <div className="page__content">
            <Navbar page="projects" />
            <div className="projects-list__container">
                <h1 className="projects-list__header">Choose a project</h1>
                <ul className="projects-list__items">
                    {
                        projects.map(project => (
                            <Project key={project.id} name={project.name} id={project.id}/>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

const mapState = state => {
    return {
        projects: getProjectsSelector(state)
    }
}

export default connect(mapState)(ProjectsListPage);
