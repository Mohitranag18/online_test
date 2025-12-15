// AddExercise.jsx - Updated with two-column layout
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModuleLayout from './ModuleLayout';

const AddExercise = () => {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        description: 'Test your knowledge about environmental science basics, including renewable energy, ecosystems, and sustainability.',
        
        viewAnswerScript: true,
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
    };

    const handleSave = () => {
        console.log('Save exercise:', formData);
        navigate(`/teacher/course/${courseId}/modules`);
    };

    return (
        <ModuleLayout>
            <div className="flex gap-8">
                {/* Main Form Card */}
                <div className="flex-1 card-strong rounded-2xl overflow-hidden">
                    {/* Card Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
                        <div>
                            <h2 className="text-xl font-bold mb-1">Add New Exercise</h2>
                            <p className="text-sm muted">
                                Add details and configure exercise settings
                            </p>
                        </div>
                        <button 
                            onClick={handleSaveDraft}
                            className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition text-sm"
                        >
                            Save Draft
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Left Column - Exercise Details */}
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-1">Exercise Details</h3>
                                    <p className="text-sm muted">Basic information about your Exercise</p>
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
                                        placeholder="Enter exercise description"
                                        className="w-full px-4 py-3 rounded-lg resize-none"
                                    />
                                </div>

                                
                            </div>

                            {/* Right Column - Exercise Settings */}
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-1">Exercise Settings</h3>
                                    <p className="text-sm muted">Configure how your exercise works</p>
                                </div>

                                {/* View Answer Script Toggle */}
                                <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] mb-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold mb-1">View Answer Script</div>
                                            <div className="text-xs muted">Students can view their answer script</div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="viewAnswerScript"
                                                checked={formData.viewAnswerScript}
                                                onChange={handleInputChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-[var(--surface)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Active Toggle */}
                                <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold mb-1">Active</div>
                                            <div className="text-xs muted">Exercise ready for use</div>
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
                            </div>
                        </div>

                        {/* Bottom Action Buttons */}
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-[var(--border-color)]">
                            <button
                                onClick={() => navigate(`/teacher/course/${courseId}/modules`)}
                                className="border border-[var(--border-color)] px-6 py-2.5 rounded-lg font-medium hover:bg-[var(--input-bg)] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                </div>

                {/* New Exercise Drafts Section (Right Side Panel) */}
                <div className="w-1/3">
                    <div className="card-strong p-6 rounded-2xl h-full">
                        <h3 className="text-lg font-bold mb-1">New Exercise Drafts</h3>
                        <p className="text-sm muted">Manage previous exercise drafts</p>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
};

export default AddExercise;