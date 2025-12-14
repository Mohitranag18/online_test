import React from 'react';
import CourseLayout from './CourseLayout';

const Enrollment = () => {
    return (
        <CourseLayout>
            {/* Enrollment Content */}
            <div className="mb-5 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold mb-1">
                    <span className="text-cyan-400">ENROLLMENTS</span> for the course are below →
                </h3>
            </div>

            {/* Empty State */}
            <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] px-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--text-muted)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">No Enrollments Yet</h3>
                    <p className="text-xs sm:text-sm muted">Students will appear here once they enroll in this course</p>
                </div>
            </div>
        </CourseLayout>
    );
};

export default Enrollment;