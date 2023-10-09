import React, {useState} from 'react';
import Comment from "./Comment";
import './commentsList.scss'

const CommentsList = (props) => {
    const {
        projectId,
        taskId,
        parentCommentId,
    } = props

    let nested = false
    let items = []

    if (Object.keys(props).includes('task')) {

        const task = props.task

        items = task.comments

        nested = false

        console.group('getting task')
        console.log('parentCommentId', parentCommentId)
        console.log('taskId', taskId)
        console.log('child comments:', items)
        console.groupEnd()
    }

    if (Object.keys(props).includes('comments')) {
        items = props.comments

        nested = true

        console.group('getting comments')
        console.log('parentCommentId', parentCommentId)
        console.log('child comments:', items)
        console.log(items)
        console.groupEnd()
    }

    // console.log('CommentsList ==>', 'projectId:', projectId, 'taskId:', taskId)

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
                                    nested={nested}
                                    parentCommentId={parentCommentId}
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
