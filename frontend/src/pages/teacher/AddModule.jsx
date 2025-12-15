import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaTrash } from 'react-icons/fa';
import CourseLayout from './CourseLayout';

const AddModule = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        moduleName: '',
        description: '',
        isActive: true,
        isDraft: false,
    });

    // Mock draft modules
    const [drafts, setDrafts] = useState([
        {
            id: 1,
            moduleName: 'Introduction to React',
            description: 'Learn the basics of React and component-based architecture',
            savedAt: '2 hours ago',
        },
        {
            id: 2,
            moduleName: 'Advanced JavaScript Concepts',
            description: 'Deep dive into closures, promises, and async/await',
            savedAt: '1 day ago',
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
        // Add to drafts list
        const newDraft = {
            id: Date.now(),
            moduleName: formData.moduleName || 'Untitled Module',
            description: formData.description || 'No description',
            savedAt: 'Just now',
        };
        setDrafts(prev => [newDraft, ...prev]);
    };

    const handlePublish = () => {
        console.log('Publish module:', { ...formData, isDraft: false });
        // API call to create module
        navigate(`/teacher/course/${courseId}/modules`);
    };

    const loadDraft = (draft) => {
        setFormData({
            moduleName: draft.moduleName,
            description: draft.description,
            isActive: true,
            isDraft: true,
        });
    };

    const deleteDraft = (draftId) => {
        setDrafts(prev => prev.filter(d => d.id !== draftId));
    };

    return (
        <CourseLayout>
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8">
                {/* Main Card */}
                <div className="flex-1 card-strong rounded-xl sm:rounded-2xl overflow-hidden">
                    {/* Card Header */}
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--border-color)] gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            <button
                                onClick={() => navigate(`/teacher/course/${courseId}/modules`)}
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
                            </button>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-lg sm:text-xl font-bold">Add New Module</h2>
                                    {formData.isDraft && (
                                        <span className="px-2 py-0.5 bg-orange-600/20 text-orange-600 border border-orange-600/30 rounded text-xs font-medium flex-shrink-0">
                                            Draft
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs sm:text-sm muted line-clamp-1">
                                    Add details and configure module settings
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
                        <div className="mb-5 sm:mb-6">
                            <h3 className="text-base sm:text-lg font-bold mb-1">Module Details</h3>
                            <p className="text-xs sm:text-sm muted">Basic information about your module</p>
                        </div>

                        {/* Module Title */}
                        <div className="mb-4 sm:mb-5">
                            <label className="block text-xs sm:text-sm font-semibold soft mb-2">
                                Module Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="moduleName"
                                value={formData.moduleName}
                                onChange={handleInputChange}
                                placeholder="Enter module name"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-5 sm:mb-6">
                            <label className="block text-xs sm:text-sm font-semibold soft mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter module description"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg resize-none text-sm"
                            />
                        </div>

                        {/* Active Toggle */}
                        <div className="p-3 sm:p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] mb-5 sm:mb-6">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm sm:text-base font-semibold mb-1">Active</div>
                                    <div className="text-xs muted">Module ready for students</div>
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

                        {/* Bottom Action Buttons */}
                        <div className="flex justify-between gap-3 pt-5 sm:pt-6 border-t border-white/10">
                            <button
                                onClick={() => navigate(`/teacher/course/${courseId}/modules`)}
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
                            </button>
                            <button
                                onClick={handlePublish}
                                className="bg-blue-600 text-white px-5 sm:px-8 py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition text-sm flex-1 sm:flex-initial"
                            >
                                {formData.isDraft ? 'Publish' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* New Module Drafts Section (Right Side Panel) */}
                <div className="xl:w-80 2xl:w-96">
                    <div className="card-strong p-4 sm:p-6 rounded-xl sm:rounded-2xl sticky top-6">
                        <div className="mb-4">
                            <h3 className="text-base sm:text-lg font-bold mb-1">Module Drafts</h3>
                            <p className="text-xs sm:text-sm muted">Your saved module drafts</p>
                        </div>

                        {drafts.length > 0 ? (
                            <div className="space-y-3">
                                {drafts.map((draft) => (
                                    <div
                                        key={draft.id}
                                        className="p-3 sm:p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] hover:border-[var(--border-subtle)] transition group"
                                    >
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h4 className="font-semibold text-sm line-clamp-1 flex-1">
                                                {draft.moduleName}
                                            </h4>
                                            <button
                                                onClick={() => deleteDraft(draft.id)}
                                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition p-1"
                                                title="Delete draft"
                                            >
                                                <FaTrash className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="text-xs muted line-clamp-2 mb-3">
                                            {draft.description}
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
        </CourseLayout>
    );
};

export default AddModule;