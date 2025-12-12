import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from '../../components/layout/TeacherSidebar';
import Header from '../../components/layout/Header';
import CourseActionButtons from './CourseActionButtons';


const AddCourse = () => {
    const [formData, setFormData] = useState({
        title: 'Introduction to Environmental Science',
        instructions: 'Test your knowledge about environmental science basics, including renewable energy, ecosystems, and sustainability.',
        code: '0001',
        enrollment: 'Medium',
        startDate: '--/--/---',
        startTime: '--:--',
        endDate: '--/--/---',
        endTime: '--:--',
        gradingSystem: '',
        isActive: true,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="flex min-h-screen relative grid-texture">
            <TeacherSidebar />

            <main className="flex-1">
                <Header isAuth />

                <div className="p-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-2">Courses</h1>
                        <p className="text-sm muted">Create, manage and analyze your courses</p>
                    </div>

                    {/* Action Buttons */}
                    <CourseActionButtons activeButton="create" />

                    <div className='flex gap-8'>
                        {/* Main Card */}
                        <div className="card-strong rounded-2xl overflow-hidden">
                            {/* Card Header */}
                            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
                                <div className="flex items-center gap-4">
                                    <Link
                                        to="/teacher/courses"
                                        className="w-10 h-10 rounded-full bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--border-subtle)] transition"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                    </Link>
                                    <div>
                                        <h2 className="text-xl font-bold mb-1">Create New Course</h2>
                                        <p className="text-sm muted">
                                            Add details, set timings and configure course settings
                                        </p>
                                    </div>
                                </div>
                                <button className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition text-sm">
                                    Save Draft
                                </button>
                            </div>

                            {/* Form Content */}
                            <div className="p-8">
                                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl">
                                    {/* Left Column - Course Details */}
                                    <div>
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold mb-1">Course Details</h3>
                                            <p className="text-sm muted">Basic information about your Course</p>
                                        </div>

                                        {/* Course Title */}
                                        <div className="mb-5">
                                            <label className="block text-sm font-semibold soft mb-2">
                                                Course Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg"
                                            />
                                        </div>

                                        {/* Instructions */}
                                        <div className="mb-5">
                                            <label className="block text-sm font-semibold soft mb-2">
                                                Instructions
                                            </label>
                                            <textarea
                                                name="instructions"
                                                rows="5"
                                                value={formData.instructions}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg resize-none"
                                            />
                                        </div>

                                        {/* Code and Enrollment */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold soft mb-2">
                                                    Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={formData.code}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold soft mb-2">
                                                    Enrollment
                                                </label>
                                                <select
                                                    name="enrollment"
                                                    value={formData.enrollment}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg"
                                                >
                                                    <option value="Low">Low</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="High">High</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Quiz Settings */}
                                    <div>
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold mb-1">Quiz Settings</h3>
                                            <p className="text-sm muted">Configure how your course works</p>
                                        </div>

                                        {/* Start date & Time */}
                                        <div className="mb-5">
                                            <label className="block text-sm font-semibold soft mb-2">
                                                Start date & Time
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
            <svg
                className="w-5 h-5 text-[var(--text-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span className="soft text-sm">{formData.startDate}</span>
        </div>
                                                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
            <svg
                className="w-5 h-5 text-[var(--text-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span className="soft text-sm">{formData.endTime}</span>
        </div>
                                            </div>
                                        </div>

                                        {/* End date & Time */}
                                        <div className="mb-5">
                                            <label className="block text-sm font-semibold soft mb-2">
                                                End date & Time
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
            <svg
                className="w-5 h-5 text-[var(--text-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span className="soft text-sm">{formData.endDate}</span>
        </div>
                                                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
            <svg
                className="w-5 h-5 text-[var(--text-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span className="soft text-sm">{formData.endTime}</span>
        </div>
                                            </div>
                                        </div>

                                        {/* Grading System */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold soft mb-2">
                                                Grading System
                                            </label>
                                            <select
                                                name="gradingSystem"
                                                value={formData.gradingSystem}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg"
                                            >
                                                <option value="">Select grading system</option>
                                                <option value="percentage">Percentage</option>
                                                <option value="letter">Letter Grade</option>
                                                <option value="passfail">Pass/Fail</option>
                                            </select>
                                        </div>

                                        {/* Active Toggle */}
                                        <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-semibold mb-1">Active</div>
                                                    <div className="text-xs muted">Course ready for Enrollment</div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="isActive"
                                                        checked={formData.isActive}
                                                        onChange={handleInputChange}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Action Buttons */}
                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
                                    <button className="border border-white/10 px-6 py-2.5 rounded-lg font-medium hover:bg-white/5 transition flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                        Prev
                                    </button>
                                    <button className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
                                        Publish
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* New Course Drafts Section (Right Side Panel - Optional) */}
                        <div className="w-1/3">
                            <div className="card-strong p-6 rounded-2xl h-full">
                                <h3 className="text-lg font-bold mb-1">New Course Drafts</h3>
                                <p className="text-sm muted">Manage previous course drafts</p>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </main>
        </div>
    );
};

export default AddCourse;