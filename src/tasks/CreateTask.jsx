import React from 'react';
import './createTask.scss'
import {AiOutlineClose} from "react-icons/ai";
import CreatTaskHeader from "./CreatTaskHeader";
import TaskDescription from "./TaskDescription";
import TaskIncludes from "./TaskIncludes";
import SubTasks from "./SubTasks";

const CreateTask = (props) => {

    const {
        setModal
    } = props

    return (
        <div className="create-task-modal__container">
            <div className="create-task-modal__header">
                <span className="create-task-modal__id">id</span>
                <div className="create-task-modal__header-btns">
                    <AiOutlineClose
                        className="create-task-modal__close-btn"
                        onClick={() => setModal(false)}
                    />
                </div>
            </div>

            <div className="create-task-modal__content">

                <div className="header__container">
                    <CreatTaskHeader />
                </div>

                <div className="desc__container">
                    <TaskDescription />
                </div>

                <div className="includes__container">
                    {/*<TaskIncludes />*/}
                </div>

                <div className="sub-tasks__container">
                    {/*<SubTasks />*/}
                </div>

            </div>
        </div>
    );
};

export default CreateTask;
