import React from 'react';
import './taskInfo.scss'

const TaskInfo = (props) => {

    const {
        task
    } = props

    const {
        author,
        createdAt,
        status,
        developmentStartTime,
        timeSpentInDevelopment,
        priority,
    } = task

    function formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds} s`;
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            return `${minutes} m ${seconds % 60} s`;
        } else if (seconds < 86400) {
            const hours = Math.floor(seconds / 3600);
            const remainingSeconds = seconds % 3600;
            const minutes = Math.floor(remainingSeconds / 60);
            return `${hours} hrs ${minutes} m`;
        } else if (seconds < 31536000) {
            const days = Math.floor(seconds / 86400);
            const remainingSeconds = seconds % 86400;
            const hours = Math.floor(remainingSeconds / 3600);
            return `${days} d ${hours} hrs`;
        } else {
            const years = Math.floor(seconds / 31536000);
            const remainingSeconds = seconds % 31536000;
            const days = Math.floor(remainingSeconds / 86400);
            return `${years} yrs ${days} d`;
        }
    }

    const getTimeSpentInDevelopment = status => {
        switch (status) {
            case 'queue':
                return 'Not in work'
            case 'development':
                return formatTime((Date.now() - developmentStartTime) / 1000)
            default:
                if (developmentStartTime !== null) {
                    return formatTime(timeSpentInDevelopment / 1000)
                }
                return "Task avoid dev"
        }
    }

    return (
        <>
            <span className="info__title">Info</span>
            <div className="info__list">
                <div className="info__author-container">
                    <span className="info__author-title">Author</span>
                    <span className="info__author-name">{author}</span>
                </div>
                <div className="info__create-date-container">
                    <span className="info__create-date-title">Create date</span>
                    <span
                        className="info__create-date">{`${createdAt.getDate()}.${createdAt.getMonth() + 1}.${createdAt.getFullYear()}`}</span>
                </div>
                <div className="info__work-time-container">
                    <span className="info__work-time-title">Time in work</span>
                    <span className="info__work-time">
                        {getTimeSpentInDevelopment(status)}
                    </span>
                </div>
                <div className="info__prio-container">
                    <span className="info__prio-title">Priority</span>
                    <span className="info__prio">{priority}</span>
                </div>
            </div>
        </>
    );
};

export default TaskInfo;
