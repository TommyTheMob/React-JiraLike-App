import React from 'react';
import Comment from "./Comment";
import './commentsList.scss'

const CommentsList = (props) => {

    const {
        projectId,
        taskId,
        nestLevel,
    } = props

    let items = []

    Object.keys(props).includes('task') ? items = props.task.comments : items = props.comments

    return (
        <>
            <ul className="comments__comments-list">
                {items && items.length > 0
                    ?
                        items.map(comment => (
                            <li key={comment.id} className="comments__comments-list-item">
                                <Comment
                                    projectId={projectId}
                                    taskId={taskId}
                                    comment={comment}
                                    nestLevel={nestLevel}
                                />
                            </li>
                        ))
                    : false
                }
            </ul>
        </>
    );
};

export default CommentsList;
