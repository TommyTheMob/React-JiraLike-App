import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineFileAdd} from "react-icons/ai";
import {MdDeleteOutline} from "react-icons/md";
import {connect} from "react-redux";
import * as ProjectsActions from '../projects/projects.actions'
import './taskIncludes.scss'
import {storage} from '../firebase'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const TaskIncludes = (props) => {

    const {
        projectId,
        taskId,
        // connectedFiles,
        addFilesToTask,
        deleteFileFromTask
    } = props



    const filePicker = useRef(null)
    const [connectedFiles, setConnectedFiles] = useState([])

    useEffect(() => {
        console.log('useEffect')

        const fetchData = async () => {
            const files = [];
            for (const url of filesUrls) {
                const response = await fetch(url);
                const data = await response.blob();
                files.push(data);
            }
            setConnectedFiles(files);
        };

        fetchData()
    }, []);


    const handleUpload = (event) => {
        Object.values(event.target.files).forEach(file => {
            const storageRef = ref(storage, `${taskId}/files/` + file.name)
            const uploadTask = uploadBytesResumable(storageRef, file)

            const filesUrls = []

            uploadTask.on('state_changed',
                snapshot => {},
                error => console.log(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        filesUrls.push(downloadURL)
                        console.log(filesUrls)
                    })
                }
            )

            // call the redux action for save urls in state
        })
    }

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
                    // onChange={(event) => addFilesToTask(projectId, taskId, event.target.files)}
                    onChange={(event) => {
                        handleUpload(event)
                    }}
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
