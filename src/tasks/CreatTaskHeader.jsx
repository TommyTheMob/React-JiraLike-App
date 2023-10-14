import React, {useState} from 'react';
import './creatTaskHeader.scss';
import {Editor} from "@tinymce/tinymce-react";
import {MdOutlineModeEditOutline} from "react-icons/md";

const CreatTaskHeader = () => {
    const [editorValue, setEditorValue] = useState('')
    const [applied, setApplied] = useState(false)

    return (
        <>
            <div className="header__title-container">
                <span className="header__title">Header</span>
                {applied && <MdOutlineModeEditOutline
                    className="header__edit-btn"
                    onClick={() => setApplied(false)}
                />}
            </div>
            {
                applied
                    ?
                    <>
                        <div
                            className="header__desc"
                        >
                            <div
                                className="header__desc-inner"
                                dangerouslySetInnerHTML={{ __html: 'zag' }}
                            />
                        </div>
                    </>
                    :
                    <>
                        <Editor
                            apiKey='8ve8okstzg59eg1ewpa2p85hshxcts8o7dw3ze38wwl38v6r'
                            value={editorValue}
                            onEditorChange={(newValue, editor) => {
                                setEditorValue(newValue)
                            }}
                            init={{
                                menubar: false,
                                toolbar: false,
                                width: 500,
                                height: 100
                            }}
                        />
                        <div className='header__edit-btn-group'>
                            <button
                                className='header__apply-edit-btn btn'
                                onClick={() => setApplied(true)}
                            >
                                Apply changes
                            </button>
                            <button
                                className='task-description__cancel-edit-btn btn'
                                onClick={() => {
                                    setApplied(prev => !prev)
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
            }
        </>
    );
};

export default CreatTaskHeader;
