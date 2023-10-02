import React, {useState} from 'react';

const TasksSearch = ({ projectId, getSearchValue }) => {
    const [inputValue, setInputValue] = useState('')

    const onInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const onBtnClick = () => {
        getSearchValue(inputValue)
    }

    const onInputEnterDown = e => {
        if (e.key === 'Enter') {
            getSearchValue(inputValue)
        }
    }

    return (
        <>
            <div className="tasks-list__search">
                <input className="tasks-list__search-input"
                       type="text" placeholder="Find task..."
                       value={inputValue}
                       onChange={onInputChange}
                       onKeyDown={onInputEnterDown}
                />
                <button
                    className="tasks-list__search-btn"
                    onClick={onBtnClick}
                >
                    Find
                </button>
            </div>
        </>
    );
};

export default TasksSearch;
