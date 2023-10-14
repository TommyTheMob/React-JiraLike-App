import React from 'react';
import {connect} from "react-redux";
import * as projectsActions from '../projects/projects.actions'
import {Draggable} from "react-beautiful-dnd";


const Task = (props) => {

    const {
        setModal,
        setTaskId,
        mapIdx,
        title,
        id,
        desc
    } = props

    const onTaskClick = () => {
        setModal(true)
        setTaskId(id)
    }


    return (
        <Draggable draggableId={id} index={mapIdx}>
            {provided => (
                <li
                    className="tasks-cols__tasks-list-item"
                    onClick={onTaskClick}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="item-info">
                        <h4 className="item-header">{title}</h4>
                        <span className="item-desc" dangerouslySetInnerHTML={{__html: desc.length > 50 ? desc.slice(0,50) + '...' : desc}} />
                        <span className="item-id">#{id}</span>
                    </div>
                </li>
            )}
        </Draggable>
    );
};

const mapDispatch = {
    changeTaskStatus: projectsActions.changeTaskStatus
}

export default connect(null, mapDispatch)(Task);
