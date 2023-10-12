import React, {useRef} from 'react';
import {AiOutlineFileAdd} from "react-icons/ai";
import {MdDeleteOutline} from "react-icons/md";
import {connect} from "react-redux";
import * as ProjectsActions from '../projects/projects.actions'
import './taskIncludes.scss'

const TaskIncludes = (props) => {
    const filePicker = useRef(null)

    const {
        projectId,
        taskId,
        connectedFiles,
        addFilesToTask,
        deleteFileFromTask
    } = props

    return (
        <>
            <span className="task-includes__title">Includes</span>
            <AiOutlineFileAdd
                className='task-includes__add-btn'
                onClick={() => filePicker.current.click()}
            />
            <div className="task-includes__content-wrapper">
                <input
                    className='task-includes__input-file hidden'
                    type="file" multiple
                    onChange={(event) => addFilesToTask(projectId, taskId, event.target.files)
                    }
                    ref={filePicker}
                />
                <div className="task-includes__files">
                    {connectedFiles.length !== 0
                        ? connectedFiles.map(file => (
                            <div className='task-includes__file-item' key={file.name}>
                                <span className='task-includes__file-item-name' style={{fontWeight:"bold"}}>{file.name.slice(0, 11)}</span>
                                <span className='task-includes__file-item-type'>{file.type}</span>
                                <span className='task-includes__file-item-size'>{(file.size * 10**-6).toString().slice(0, 4)} Mb</span>
                                <MdDeleteOutline
                                    className='task-includes__file-item-delete'
                                    onClick={() => deleteFileFromTask(projectId, taskId, file)}
                                />
                            </div>
                        ))
                        : <span>No includes</span>
                    }
                </div>
            </div>
        </>
    );
};

const mapDispatch = {
    addFilesToTask: ProjectsActions.addFilesToTask,
    deleteFileFromTask: ProjectsActions.deleteFileFromTask
}

export default connect(null, mapDispatch)(TaskIncludes);
