import React, {useState} from 'react';
import {MdOutlineModeEditOutline} from "react-icons/md";
import {Editor} from "@tinymce/tinymce-react";
import {connect} from "react-redux";
import * as ProjectsActions from '../projects/projects.actions'
import './taskDescription.scss'

const TaskDescription = (props) => {
    const [editDesc, setEditDesc] = useState(false)
    const [editorValue, setEditorValue] = useState('')

    const {
        projectId,
        taskId,
        taskDescription,
        editTaskDescription,
    } = props

    return (
        <>
            <div className="task-description__title-container">
                <span className="task-description__title">Description</span>
                <MdOutlineModeEditOutline
                    className="task-description__edit-btn"
                    onClick={() => setEditDesc(true)}
                />
            </div>
            {
                editDesc
                    ?
                    <>
                        <Editor
                            apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                            initialValue={taskDescription}
                            value={editorValue}
                            onEditorChange={(newValue, editor) => {
                                setEditorValue(editor.getContent())
                            }}
                            init={{
                                menubar: false,
                            }}
                        />
                        <div className='task-description__edit-btn-group'>
                            <button
                                className='task-description__apply-edit-btn btn'
                                onClick={() => {
                                    editTaskDescription(projectId, taskId, editorValue)
                                    setEditDesc(!editDesc)
                                }}
                            >
                                Apply changes
                            </button>
                            <button
                                className='task-description__cancel-edit-btn btn'
                                onClick={() => {
                                    setEditDesc(!editDesc)
                                }}
                            >
                                Cancel editing
                            </button>
                        </div>
                    </>

                    :
                    <div
                        className="task-description__desc"
                    >
                        <div
                            className="task-description__desc-inner"
                            dangerouslySetInnerHTML={{ __html: taskDescription }}
                        />
                    </div>

            }
        </>
    );
};

const mapDispatch = {
    editTaskDescription: ProjectsActions.editTaskDescription,
}

export default connect(null, mapDispatch)(TaskDescription);
