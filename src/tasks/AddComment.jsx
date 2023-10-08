import React from 'react';
import './addComment.scss'
import {Editor} from "@tinymce/tinymce-react";

const AddComment = () => {
    return (
        <>
            <Editor
                apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                className='comments__add-comment-editor'
                init={{
                    height: 150,
                    menubar: false
                }}
            />
            <div className="comments__add-comment-btn-group">
                <button
                    className='comments__add-comment-btn btn'
                >
                    Add Comment
                </button>
                <button
                    className='comments__cancel-comment-btn btn'
                >
                    Cancel
                </button>
            </div>
        </>
    );
};

export default AddComment;
