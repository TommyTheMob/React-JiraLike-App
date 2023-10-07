import React from 'react';
import './taskComments.scss'
import {Editor} from "@tinymce/tinymce-react";

const TaskComments = () => {
    return (
        <div>
            <div className="comments__content">
                <div className="comments__add-comment-container">
                    <Editor
                        apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                        className='comments__add-comment-editor'
                        init={{
                            height: 150,
                            width: 450,
                            menubar: false
                        }}
                    />
                    <button
                        className='comments__add-comment-btn btn'
                    >
                        Add Comment
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TaskComments;
