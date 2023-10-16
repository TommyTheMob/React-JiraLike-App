import React from 'react';
import './subTasks.scss';
import {connect} from "react-redux";
import {getProjectsSelector} from "../projects/projects.selectors";
import {MdDeleteOutline, MdOutlineAddToPhotos} from "react-icons/md";
import * as ProjectsActions from "../projects/projects.actions";

const SubTasks = (props) => {

    const {
        projectId,
        taskId,
        subTasks,
        isAddingSubTasks,
        setIsAddingSubTasks,
        projects,
        addSubTask,
        deleteSubTask
    } = props

    const tasksInAddList = projects
        .find(project => project.id === projectId)
        .tasks
        .filter(task => task.id !== taskId && !subTasks.includes(task.id))

    return (
        <>
            <span className="sub-tasks__title">Subtasks</span>
            <MdOutlineAddToPhotos
                className='sub-tasks__add-btn'
                onClick={(e) => {
                    e.stopPropagation()
                    setIsAddingSubTasks(prev => !prev)
                }}
            />
            <div className={isAddingSubTasks ? 'sub-tasks__add-item-container visible' : 'sub-tasks__add-item-container'}>
                {tasksInAddList.length > 0
                    ?
                    <ul className="sub-tasks__add-item-list">
                        {tasksInAddList
                            .map(task => {
                                return (
                                    <li
                                        key={task.id}
                                        className="sub-tasks__add-item"
                                        onClick={() => {
                                            setIsAddingSubTasks(prev => !prev)
                                            // adding id to subtasks
                                            addSubTask(projectId, taskId, task.id)
                                        }}
                                    >
                                        <span style={{fontWeight: 'bold'}}>{task.title}</span>
                                        &nbsp;
                                        <span style={{fontStyle: 'italic'}}>#{task.id.slice(0, 8) + '...'}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    : <span style={{padding: 5}}>No available tasks. Create a new one.</span>
                }
            </div>
            <ul className="sub-tasks__list">
                {subTasks.length > 0
                    ? subTasks.map(subTask => {
                        const subTaskData = projects
                            .find(project => project.id === projectId)
                            .tasks
                            .find(task => task.id === subTask)

                        return (
                            <li
                                key={subTaskData.id}
                                className="sub-tasks__item"
                                style={
                                    subTaskData.status === 'development'
                                        ? {background: "#3474eb"}
                                        : subTaskData.status === 'done' ? {background: "#34eb61"} : {}
                                }
                            >
                                <span className="sub-tasks__item-title">{subTaskData.title}</span>
                                <span className="sub-tasks__item-id">#{subTaskData.id.slice(0,9) + '...'}</span>
                                <span className="sub-tasks__item-status">{subTaskData.status}</span>
                                <MdDeleteOutline
                                    className='sub-tasks__item-delete'
                                    onClick={() => {
                                        // delete subTask from task
                                        deleteSubTask(projectId, taskId, subTaskData.id)
                                    }}
                                />
                            </li>
                        )
                    })
                    : <span>No subtasks</span>
                }
            </ul>
        </>
    );
};

const mapState = (state) => {
    return {
        projects: getProjectsSelector(state)
    }
}

const mapDispatch = {
    addSubTask: ProjectsActions.addSubTask,
    deleteSubTask: ProjectsActions.deleteSubTask,
}

export default connect(mapState, mapDispatch)(SubTasks);
