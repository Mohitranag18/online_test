import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import TeacherSidebar from '../../components/layout/TeacherSidebar';
import Header from '../../components/layout/Header';
import CourseActionButtons from './CourseActionButtons';

const AddCourse = () => {
    const [formData, setFormData] = useState({
        title: '',
        instructions: '',
        code: '',
        enrollment: 'Medium',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        gradingSystem: '',
        isActive: true,
        isDraft: false,
    });

    // Mock draft courses
    const [drafts, setDrafts] = useState([
        {
            id: 1,
            title: 'Introduction to Environmental Science',
            instructions: 'Test your knowledge about environmental science basics, including renewable energy, ecosystems, and sustainability.',
            code: '0001',
            savedAt: '2 hours ago',
        },
        {
            id: 2,
            title: 'Advanced Machine Learning',
            instructions: 'Deep dive into neural networks, deep learning, and AI applications',
            code: '0002',
            savedAt: '1 day ago',
        },
        {
            id: 3,
            title: 'Web Development Bootcamp',
            instructions: 'Complete guide to modern web development with React and Node.js',
            code: '0003',
            savedAt: '3 days ago',
        },
    ]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSaveDraft = () => {
        console.log('Save draft:', { ...formData, isDraft: true });
        setFormData(prev => ({ ...prev, isDraft: true }));
        // API call to save draft
        const newDraft = {
            id: Date.now(),
            title: formData.title || 'Untitled Course',
            instructions: formData.instructions || 'No description',
            code: formData.code || '0000',
            savedAt: 'Just now',
        };
        setDrafts(prev => [newDraft, ...prev]);
    };

    const loadDraft = (draft) => {
        setFormData({
            title: draft.title,
            instructions: draft.instructions,
            code: draft.code,
            enrollment: 'Medium',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            gradingSystem: '',
            isActive: true,
            isDraft: true,
        });
    };

    const deleteDraft = (draftId) => {
        setDrafts(prev => prev.filter(d => d.id !== draftId));
    };

    return (
        <div className="flex min-h-screen relative grid-texture">
            <TeacherSidebar />

            <main className="flex-1">
                <Header isAuth />

                <div className="p-4 sm:p-6 lg:p-8">
                    {/* Header Section */}
                    <div className="mb-6 lg:mb-8">
                        <h1 className="text-2xl font-bold mb-2">Courses</h1>
                        <p className="text-sm muted">Create, manage and analyze your courses</p>
                    </div>

                    {/* Action Buttons */}
                    <CourseActionButtons activeButton="create" />

                    <div className='flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8'>
                        {/* Main Card */}
                        <div className="flex-1 card-strong rounded-xl sm:rounded-2xl overflow-hidden">
                            {/* Card Header */}
                            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--border-color)] gap-3 sm:gap-4">
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                    <Link
                                        to="/teacher/courses"
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--border-subtle)] transition flex-shrink-0"
                                    >
                                        <svg
                                            className="w-4 h-4 sm:w-5 sm:h-5"
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
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h2 className="text-lg sm:text-xl font-bold">Create New Course</h2>
                                            {formData.isDraft && (
                                                <span className="px-2 py-0.5 bg-orange-600/20 text-orange-600 border border-orange-600/30 rounded text-xs font-medium flex-shrink-0">
                                                    Draft
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs sm:text-sm muted line-clamp-1">
                                            Add details, set timings and configure course settings
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSaveDraft}
                                    className="bg-orange-600 text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-orange-700 active:scale-95 transition text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                                >
                                    <span className="hidden sm:inline">Save Draft</span>
                                    <span className="sm:hidden">Save Draft</span>
                                </button>
                            </div>

                            {/* Form Content */}
                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                                    {/* Left Column - Course Details */}
                                    <div>
                                        <div className="mb-5 sm:mb-6">
                                            <h3 className="text-base sm:text-lg font-bold mb-1">Course Details</h3>
                                            <p className="text-xs sm:text-sm muted">Basic information about your Course</p>
                                        </div>

                                        {/* Course Title */}
                                        <div className="mb-4 sm:mb-5">
                                            <label className="block text-xs sm:text-sm font-semibold soft mb-2">
                                                Course Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                placeholder="Enter course title"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm"
                                            />
                                        </div>

                                        {/* Instructions */}
                                        <div className="mb-4 sm:mb-5">
                                            <label className="block text-xs sm:text-sm font-semibold soft mb-2">
                                                Instructions
                                            </label>
                                            <textarea
                                                name="instructions"
                                                rows="5"
                                                value={formData.instructions}
                                                onChange={handleInputChange}
                                                placeholder="Enter course instructions"
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg resize-none text-sm"
                                            />
                                        </div>

                                        {/* Code and Enrollment */}
                                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                            <div>
                                                <label className="block text-xs sm:text-sm font-semibold soft mb-2">
                                                    Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={formData.code}
                                                    onChange={handleInputChange}
                                                    placeholder="0001"
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs sm:text-sm font-semibold soft mb-2">
                                                    Enrollment
                                                </label>
                                                <select
                                                    name="enrollment"
                                                    value={formData.enrollment}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm"
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
                                        <div className="mb-5 sm:mb-6">
                                            <h3 className="text-base sm:text-lg font-bold mb-1">Quiz Settings</h3>
                                            <p className="text-xs sm:text-sm muted">Configure how your course works</p>
                                        </div>

                                        {/* Start date & Time */}
                                        <div className="mb-4 sm:mb-5">
                                            <label className="block text-xs sm:text-sm font-semibold soft mb-2">
                                                Start date & Time
                                            </label>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="flex-1 relative">
                                                    <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <svg
                                                            className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="date"
                                                        name="startDate"
                                                        value={formData.startDate}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm [color-scheme:dark]"
                                                    />
                                                </div>
                                                <div className="flex-1 relative">
                                                    <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <svg
                                                            className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="time"
                                                        name="startTime"
                                                        value={formData.startTime}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm [color-scheme:dark]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* End date & Time */}
                                        <div className="mb-4 sm:mb-5">
                                            <label className="block text-xs sm:text-sm font-semibold soft mb-2">
                                                End date & Time
                                            </label>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="flex-1 relative">
                                                    <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <svg
                                                            className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="date"
                                                        name="endDate"
                                                        value={formData.endDate}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm [color-scheme:dark]"
                                                    />
                                                </div>
                                                <div className="flex-1 relative">
                                                    <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <svg
                                                            className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="time"
                                                        name="endTime"
                                                        value={formData.endTime}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm [color-scheme:dark]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Grading System */}
                                        <div className="mb-5 sm:mb-6">
                                            <label className="block text-xs sm:text-sm font-semibold soft mb-2">
                                                Grading System
                                            </label>
                                            <select
                                                name="gradingSystem"
                                                value={formData.gradingSystem}
                                                onChange={handleInputChange}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm"
                                            >
                                                <option value="">Select grading system</option>
                                                <option value="percentage">Percentage</option>
                                                <option value="letter">Letter Grade</option>
                                                <option value="passfail">Pass/Fail</option>
                                            </select>
                                        </div>

                                        {/* Active Toggle */}
                                        <div className="p-3 sm:p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <div className="text-sm sm:text-base font-semibold mb-1">Active</div>
                                                    <div className="text-xs muted">Course ready for Enrollment</div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
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
                                <div className="flex justify-between gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
                                    <Link
                                        to="/teacher/courses"
                                        className="border border-white/10 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium hover:bg-white/5 active:scale-95 transition flex items-center justify-center gap-2 text-sm flex-1 sm:flex-initial"
                                    >
                                        <svg
                                            className="w-4 h-4 sm:w-5 sm:h-5"
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
                                        <span className="hidden sm:inline">Cancel</span>
                                    </Link>
                                    <button className="bg-blue-600 text-white px-5 sm:px-8 py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition text-sm flex-1 sm:flex-initial">
                                        {formData.isDraft ? 'Publish' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* New Course Drafts Section (Right Side Panel) */}
                        <div className="xl:w-80 2xl:w-96">
                            <div className="card-strong p-4 sm:p-6 rounded-xl sm:rounded-2xl sticky top-6">
                                <div className="mb-4">
                                    <h3 className="text-base sm:text-lg font-bold mb-1">Course Drafts</h3>
                                    <p className="text-xs sm:text-sm muted">Your saved course drafts</p>
                                </div>

                                {drafts.length > 0 ? (
                                    <div className="space-y-3">
                                        {drafts.map((draft) => (
                                            <div
                                                key={draft.id}
                                                className="p-3 sm:p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] hover:border-[var(--border-subtle)] transition group"
                                            >
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-sm line-clamp-1">
                                                            {draft.title}
                                                        </h4>
                                                        <span className="text-xs text-[var(--text-muted)]">Code: {draft.code}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteDraft(draft.id)}
                                                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition p-1"
                                                        title="Delete draft"
                                                    >
                                                        <FaTrash className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <p className="text-xs muted line-clamp-2 mb-3">
                                                    {draft.instructions}
                                                </p>
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-xs muted">{draft.savedAt}</span>
                                                    <button
                                                        onClick={() => loadDraft(draft)}
                                                        className="text-xs text-blue-500 hover:text-blue-400 font-medium transition"
                                                    >
                                                        Load
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--input-bg)] flex items-center justify-center mx-auto mb-3">
                                            <svg
                                                className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--text-muted)]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-xs sm:text-sm muted">No saved drafts yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddCourse;