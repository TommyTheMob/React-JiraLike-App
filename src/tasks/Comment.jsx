import React, {useState} from 'react';
import './comment.scss';
import CommentsList from "./CommentsList";
import {BiReply} from "react-icons/bi";
import {Editor} from "@tinymce/tinymce-react";
import {connect} from "react-redux";
import * as ProjectsActions from "../porjects/projects.actions";

const Comment = (props) => {
    const [editing, setEditing] = useState(false)
    const [editorValue, setEditorValue] = useState('')

    const {
        comment,
        nested,
        projectId,
        taskId,
        parentCommentId,
        editCommentInTask,
    } = props

    const {
        text,
        comments,
        id
    } = comment

    // console.log('Comment ==>', 'projectId:', projectId, 'taskId:', taskId)

    return (
        <>
            { nested && <BiReply style={{transform: 'rotate(180deg)'}} />}
            <div className="comments__comment-container" style={nested ? {border: '2px solid rgba(204, 204, 204, 0.5)'} : {}}>
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
                </div>
                <div className="comments__comment-btns">
                    {editing
                        ?
                            <>
                                <button
                                    className='comments__comment-apply-edit-btn btn'
                                    onClick={() => {
                                        editCommentInTask(projectId, taskId, parentCommentId, id, nested, editorValue)
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
                            <>
                                <button className='comments__comment-add-btn btn'>Reply</button>
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
                            parentCommentId={id}
                        />
                    : false
                }
            </div>
        </>
    );
};

const mapDispatch = {
    editCommentInTask: ProjectsActions.editCommentInTask
}

export default connect(null, mapDispatch)(Comment);
