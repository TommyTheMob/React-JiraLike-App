import React, {useState} from 'react';
import Comment from "./Comment";
import './commentsList.scss'

const CommentsList = (props) => {
    let nested = false
    let items = []

    if (Object.keys(props).includes('task')) {
        const { task } = props

        items = task.comments

        nested = false
    }

    if (Object.keys(props).includes('comments')) {
        const { comments } = props

        items = comments

        nested = true
    }

    return (
        <>
            <ul className="comments__comments-list">
                {items && items.length > 0
                    ?
                        items.map(comment => (
                            <li key={comment.id} className="comments__comments-list-item">
                                <Comment nested={nested} comment={comment} />
                            </li>
                        ))
                    : false
                }
            </ul>
        </>
    );
};

export default CommentsList;
