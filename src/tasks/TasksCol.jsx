import React from 'react';
import Task from "./Task";
import {connect} from "react-redux";
import {getProjectsSelector} from "../projects/projects.selectors";
import * as projectsActions from "../projects/projects.actions";
import {Droppable} from "react-beautiful-dnd";


const TasksCol = (props) => {

    const {
            colName,
            projectId,
            searchValue,
            setModal,
            setTaskId,
            projects,
    } = props


    const getFilteredTasks = (projectId, searchValue) => {
        const currentProject = projects.find(project => project.id === projectId)
        const tasks = currentProject.tasks.filter(task => task.status === colName)


        if (searchValue !== '') {
            return tasks.filter(task => task.id === searchValue || task.title.includes(searchValue))
        }

        return tasks
    }

    const tasksInCol = getFilteredTasks(projectId, searchValue)
    const isTasksThere = tasksInCol.length !== 0

    return (
        <Droppable droppableId={colName}>
            {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="tasks-list__tasks-col">
                    <h3 className="tasks-cols__header">{ colName }</h3>
                    <div className="tasks-cols__content">
                        {isTasksThere
                            ? <ul className="tasks-cols__tasks-list">
                                {tasksInCol
                                    .map((task, mapIdx) => (
                                        <Task
                                            {...task}
                                            mapIdx={mapIdx}
                                            key={task.id}
                                            projectId={projectId}
                                            setModal={setModal}
                                            setTaskId={setTaskId}
                                        />
                                    ))
                                }
                            </ul>
                            : <></>
                        }
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

const mapState = state => {
    return {
        projects: getProjectsSelector(state)
    }
}

const mapDispatch = {
    changeTaskStatus: projectsActions.changeTaskStatus
}

export default connect(mapState, mapDispatch)(TasksCol);
