import React from 'react';
import './comment.scss';
import CommentsList from "./CommentsList";
import {BiReply} from "react-icons/bi";

const Comment = (props) => {

    const { comment, nested } = props

    const {
        text,
        comments,
    } = comment

    return (
        <>
            { nested && <BiReply style={{transform: 'rotate(180deg)'}} />}
            <div className="comments__comment-container" style={nested ? {border: '2px solid rgba(204, 204, 204, 0.5)'} : {}}>
                <div className="comments__comment-content">
                    <div className="comments__comment-content-inner">{text}</div>
                </div>
                <div className="comments__comment-btns">
                    <button className='comments__comment-add-btn btn'>Reply</button>
                    <button className='comments__comment-edit-btn btn'>Edit</button>
                </div>
                <CommentsList
                    comments={comments}
                />
            </div>
        </>
    );
};

export default Comment;
