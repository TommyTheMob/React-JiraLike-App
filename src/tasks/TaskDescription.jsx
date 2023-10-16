import React, {useState} from 'react';
import {MdOutlineModeEditOutline} from "react-icons/md";
import {Editor} from "@tinymce/tinymce-react";
import {connect} from "react-redux";
import * as ProjectsActions from '../projects/projects.actions'
import './taskDescription.scss';

const TaskDescription = (props) => {
    const [editDesc, setEditDesc] = useState(props.creating ? true : false)
    const [editorValue, setEditorValue] = useState('')

    const {
        projectId,
        taskId,
        creating,
        type,
        taskTitle,
        taskDescription,
        editTaskDescription,
        editTaskTitle
    } = props


    return (
        <>
            <div className="task-description__title-container">
                <span className="task-description__title">{type === 'title' ? 'Title' : 'Description'}</span>
                <MdOutlineModeEditOutline
                    className="task-description__edit-btn"
                    onClick={() => setEditDesc(prev => !prev)}
                />
            </div>
            {
                editDesc
                    ?
                    <>
                        <Editor
                            apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                            initialValue={type === 'title' ? taskTitle : taskDescription}
                            value={editorValue}
                            onEditorChange={(newValue, editor) => {
                                type === 'title' ? setEditorValue(editor.getContent({ format: 'text' })) : setEditorValue(editor.getContent())
                            }}
                            init={type === 'title'
                                ?
                                {
                                    menubar: false,
                                    toolbar: false,
                                    height: 100
                                }
                                :{menubar: false}
                            }
                        />
                        <div className='task-description__edit-btn-group'>
                            <button
                                className='task-description__apply-edit-btn btn'
                                onClick={() => {
                                    type === 'title' ? editTaskTitle(projectId, taskId, editorValue) : editTaskDescription(projectId, taskId, editorValue)
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
                        onClick={(e) => {
                            setEditDesc(true)
                        }}
                    >
                        <div
                            className="task-description__desc-inner"
                            dangerouslySetInnerHTML={{ __html: type === 'title' ? taskTitle : taskDescription }}
                        />
                    </div>

            }
        </>
    );
};

const mapDispatch = {
    editTaskDescription: ProjectsActions.editTaskDescription,
    editTaskTitle: ProjectsActions.editTaskTitle
}

export default connect(null, mapDispatch)(TaskDescription);
