import React, {useState} from 'react';
import Navbar from "../components/navbar/Navbar";
import './tasksListPage.scss'
import TasksCols from "./TasksCols";
import TasksSearch from "./TasksSearch";

const TasksListPage = ({ projectId }) => {
    const [searchValue, setSearchValue] = useState('')

    const getSearchValue = value => setSearchValue(value)

    return (
        <div className="page__content">
            <Navbar page="tasks" />
            <div className="container">
                <h1 className="tasks-list__header">Tasks status</h1>
                <div className="tasks-list__container">
                    <TasksSearch getSearchValue={getSearchValue} projectId={projectId} />
                    <TasksCols searchValue={searchValue} projectId={projectId} />
                </div>
            </div>
        </div>
    );
};


export default TasksListPage;
