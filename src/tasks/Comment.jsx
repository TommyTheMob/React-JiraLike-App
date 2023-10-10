import React, {useState} from 'react';
import './comment.scss';
import CommentsList from "./CommentsList";
import {BiReply} from "react-icons/bi";
import {Editor} from "@tinymce/tinymce-react";
import {connect} from "react-redux";
import * as ProjectsActions from "../porjects/projects.actions";
import AddComment from "./AddComment";

const Comment = (props) => {
    const [editing, setEditing] = useState(false)
    const [replying, setReplying] = useState(false)
    const [editorValue, setEditorValue] = useState('')

    const {
        comment,
        nestLevel,
        projectId,
        taskId,
        editComment,
    } = props

    const {
        text,
        comments,
        id
    } = comment

    return (
        <>
            { nestLevel > 0 && <BiReply style={{transform: 'rotate(180deg)'}} />}
            <div className="comments__comment-container" style={nestLevel > 0 ? {border: `2px solid rgba(204, 204, 204, ${1 - 2*(nestLevel * 10**-1)})`, width: `${100 - (nestLevel + 1)}%`} : {}}>
                <div className="comments__comment-content">
                    {editing
                        ?
                            <>
                                <Editor
                                    apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                                    className='comments__comment-editor'
                                    initialValue={text}
                                    value={editorValue}
                                    onEditorChange={(newValue, editor) => {
                                        setEditorValue(editor.getContent())
                                    }}
                                    init={{
                                        height: 200,
                                        menubar: false
                                    }}
                                />
                            </>
                        :
                            <>
                                <div
                                    className="comments__comment-content-inner"
                                    dangerouslySetInnerHTML={{__html: text}}
                                />
                            </>
                    }
                    {replying
                        ?
                            <>
                                <AddComment
                                    projectId={projectId}
                                    taskId={taskId}
                                    setReplying={setReplying}
                                    commentId={id}
                                />
                            </>
                        :
                            <>
                            </>
                    }
                </div>
                <div className="comments__comment-btns">
                    {editing
                        ?
                            <>
                                <button
                                    className='comments__comment-apply-edit-btn btn'
                                    onClick={() => {
                                        editComment(projectId, taskId, id, editorValue)
                                        setEditing(false)
                                    }}
                                >
                                    Apply
                                </button>
                                <button
                                    className='comments__comment-cancel-edit-btn btn'
                                    onClick={() => {
                                        setEditing(false)
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        :
                            replying
                                ? <></>
                                :
                                    <>
                                        <button
                                            className='comments__comment-add-btn btn'
                                            onClick={() => setReplying(true)}
                                        >
                                            Reply
                                        </button>
                                        <button
                                            className='comments__comment-edit-btn btn'
                                            onClick={() => setEditing(true)}
                                        >
                                            Edit
                                        </button>
                                    </>
                    }
                </div>
                {comments && comments.length !== 0
                    ?
                        <CommentsList
                            projectId={projectId}
                            taskId={taskId}
                            comments={comments}
                            nestLevel={nestLevel + 1}
                        />
                    : false
                }
            </div>
        </>
    );
};

const mapDispatch = {
    editComment: ProjectsActions.editComment
}

export default connect(null, mapDispatch)(Comment);
