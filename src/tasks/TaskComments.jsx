import React from 'react';
import './taskComments.scss';
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";

const TaskComments = (props) => {

    const {
        projectId,
        taskId,
        task
    } = props

    return (
        <div>
            <div className="comments__content">
                <div className="comments__add-comment-container">
                    <AddComment
                        projectId={projectId}
                        taskId={taskId}
                    />
                </div>
                <div className="comments__comments-list-container">
                    <span className="comments__comments-list-title">Commentaries</span>
                    <CommentsList
                        projectId={projectId}
                        taskId={taskId}
                        task={task}
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskComments;
