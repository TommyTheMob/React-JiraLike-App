import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineFileAdd} from "react-icons/ai";
import {MdDeleteOutline} from "react-icons/md";
import {connect} from "react-redux";
import * as ProjectsActions from '../projects/projects.actions'
import './taskIncludes.scss'
import {storage} from '../firebase'
import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from "firebase/storage";

const TaskIncludes = (props) => {

    const {
        projectId,
        taskId,
        connectedFilesURLs,
        addFileURLToTask,
        deleteFileURLFromTask,
    } = props

    const fetchData = async (urls) => {
        const files = [];

        for (const url of urls) {
            console.log('fetching url:', url)
            const fileName = url.substring(url.lastIndexOf('%2F') + 3, url.lastIndexOf('?'))

            const response = await fetch(url)
            const data = await response.blob()

            const dataObj = {}
            dataObj.name = fileName
            dataObj.file = data
            dataObj.url = url

            files.push(dataObj)

        }
        setConnectedFiles(files)
        console.log('connectedFiles:', files)
    };


    const filePicker = useRef(null)
    const [connectedFiles, setConnectedFiles] = useState([])

    useEffect(() => {
        console.group('useEffect==>')
        console.log('connectedFilesURLs:', connectedFilesURLs)

        if (connectedFilesURLs.length > 0) {
            fetchData(connectedFilesURLs);
        } else {
            setConnectedFiles([])
        }

        console.groupEnd()
    }, [connectedFilesURLs]);


    const handleUpload = (event) => {

        const files = event.target.files
        console.log('files', files)

        for (const file of Object.values(files)) {
            const storageRef = ref(storage, `${taskId}/files/` + file.name)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on('state_changed',
                snapshot => {
                },
                error => console.log(error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    addFileURLToTask(projectId, taskId, downloadURL)
                }
            )
        }
    }

    const handleDelete = (fileURL, fileName) => {
        deleteFileURLFromTask(projectId, taskId, fileURL, fileName)

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
                                <span className='task-includes__file-item-name'
                                      style={{fontWeight: "bold"}}>{file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}</span>
                                <span className='task-includes__file-item-type'>{file.file.type.length > 40 ? file.file.type.slice(0,40) + '...' : file.file.type}</span>
                                <span
                                    className='task-includes__file-item-size'>{(file.file.size * 10 ** -6).toString().slice(0, 4)} Mb</span>
                                <MdDeleteOutline
                                    className='task-includes__file-item-delete'
                                    onClick={() => handleDelete(file.url, file.name)}
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
    addFileURLToTask: ProjectsActions.addFileURLToTask,
    deleteFileURLFromTask: ProjectsActions.deleteFileURLFromTask
}

export default connect(null, mapDispatch)(TaskIncludes);
