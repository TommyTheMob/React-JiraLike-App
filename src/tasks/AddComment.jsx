import React, {useState} from 'react';
import './addComment.scss'
import {Editor} from "@tinymce/tinymce-react";
import {connect} from "react-redux";
import * as ProjectsActions from "../porjects/projects.actions";

const AddComment = (props) => {
    const {
        projectId,
        taskId,
        addCommentToTask,
    } = props

    const [editorValue, setEditorValue] = useState('')

    return (
        <>
            <Editor
                apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                className='comments__add-comment-editor'
                value={editorValue}
                onEditorChange={(newValue, editor) => {
                    setEditorValue(editor.getContent())
                }}
                init={{
                    height: 150,
                    menubar: false
                }}
            />
            <div className="comments__add-comment-btn-group">
                <button
                    className='comments__add-comment-btn btn'
                    onClick={() => {
                        editorValue !== '' &&
                            addCommentToTask(projectId, taskId, editorValue)
                    }}
                >
                    Add Comment
                </button>
                <button
                    className='comments__cancel-comment-btn btn'
                    onClick={() => {
                        setEditorValue('')
                    }}
                >
                    Cancel
                </button>
            </div>
        </>
    );
};

const mapDispatch = {
    addCommentToTask: ProjectsActions.addCommentToTask,
}

export default connect(null, mapDispatch)(AddComment);
