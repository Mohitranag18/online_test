import React from 'react';
import { Link } from 'react-router-dom';

const CourseActionButtons = ({ activeButton = null }) => {
    const buttons = [
        {
            label: 'Course Library',
            path: '/teacher/courses',
            type: 'library',
        },
        {
            label: 'Create Grading System',
            path: '/teacher/grading-system',
            type: 'grading',
        },
        {
            label: 'Create New Course',
            path: '/teacher/add-course',
            type: 'create',
        },
    ];

    return (
        <div className="flex flex-wrap gap-3 mb-6">
            {buttons.map((button) => {
                const isActive = activeButton === button.type;

                return (
                    <Link
                        key={button.type}
                        to={button.path}
                        className={`px-5 py-2.5 rounded-lg font-medium transition text-sm flex items-center gap-2 ${
                            isActive
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--input-bg)]'
                        }`}
                    >
                        {button.type === 'create' && (
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        )}
                        {button.label}
                    </Link>
                );
            })}
        </div>
    );
};

export default CourseActionButtons;