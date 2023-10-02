import React from 'react';
import Navbar from "../components/navbar/Navbar";
import './tasksListPage.scss'

const TasksListPage = ({ projectId }) => {
    return (
        <div className="page__content">
            <Navbar page="tasks" />
            <div className="container">
                <h1 className="tasks-list__header">Tasks status</h1>
                <div className="tasks-list__container">
                    <div className="tasks-list__search">
                        <input className="tasks-list__search-input" type="text" value="Find task..."/>
                        <button className="tasks-list__search-btn">Find</button>
                    </div>
                    <div className="tasks-list__tasks-cols">
                        <div className="tasks-list__tasks-col-queue">
                            <h3 className="tasks-cols__header">queue</h3>
                            <div className="tasks-cols__content">
                                <ul className="tasks-cols__tasks-list">
                                    <li className="tasks-cols__tasks-list-item">1</li>
                                    <li className="tasks-cols__tasks-list-item">2</li>
                                    <li className="tasks-cols__tasks-list-item">3</li>
                                </ul>
                            </div>
                        </div>
                        <div className="tasks-list__tasks-col-development">
                            <h3 className="tasks-cols__header">dev</h3>
                            <div className="tasks-cols__content">
                                <ul className="tasks-cols__tasks-list">
                                    <li className="tasks-cols__tasks-list-item">1</li>
                                    <li className="tasks-cols__tasks-list-item">2</li>
                                    <li className="tasks-cols__tasks-list-item">3</li>
                                </ul>
                            </div>
                        </div>
                        <div className="tasks-list__tasks-col-done">
                            <h3 className="tasks-cols__header">done</h3>
                            <div className="tasks-cols__content">
                                <ul className="tasks-cols__tasks-list">
                                    <li className="tasks-cols__tasks-list-item">1</li>
                                    <li className="tasks-cols__tasks-list-item">2</li>
                                    <li className="tasks-cols__tasks-list-item">3</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TasksListPage;
