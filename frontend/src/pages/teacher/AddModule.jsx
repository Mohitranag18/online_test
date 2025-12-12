import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import CourseLayout from './CourseLayout';

const AddModule = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        moduleName: '',
        description: '',
        isActive: true,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSaveDraft = () => {
        console.log('Save draft:', formData);
        // API call to save draft
    };

    const handlePublish = () => {
        console.log('Publish module:', formData);
        // API call to create module
        navigate(`/teacher/course/${courseId}/modules`);
    };

    return (
        <CourseLayout>
            
            <div className="max-w-4xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(`/teacher/course/${courseId}/modules`)}
                        className="w-10 h-10 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--border-subtle)] transition"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold mb-1">Add New Course Module</h2>
                        <p className="text-sm muted">Add details and configure module settings</p>
                    </div>
                    <button
                        onClick={handleSaveDraft}
                        className="ml-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-semibold transition"
                    >
                        Save Draft
                    </button>
                </div>

                {/* Form */}
                <div className="card p-6 rounded-xl">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-1">Course Details</h3>
                        <p className="text-sm muted">Basic information about your Course</p>
                    </div>

                    {/* Module Title */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold soft mb-2">
                            Module Title
                        </label>
                        <input
                            type="text"
                            name="moduleName"
                            value={formData.moduleName}
                            onChange={handleInputChange}
                            placeholder="Enter module name"
                            className="w-full px-4 py-3 rounded-lg"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold soft mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="5"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter module description"
                            className="w-full px-4 py-3 rounded-lg resize-none"
                        />
                    </div>

                    {/* Active Toggle */}
                    <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] mb-6">
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
                                <div className="w-11 h-6 bg-[var(--surface)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-[var(--border-color)]">
                        <button
                            onClick={() => navigate(`/teacher/course/${courseId}/modules`)}
                            className="border border-[var(--border-color)] px-6 py-2.5 rounded-lg font-medium hover:bg-[var(--input-bg)] transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePublish}
                            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            
        </CourseLayout>
    );
};

export default AddModule;