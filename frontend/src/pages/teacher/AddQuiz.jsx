import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import ModuleLayout from './ModuleLayout';

const AddQuiz = () => {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        quizTitle: 'Introduction to Environmental Science',
        description: '',
        instructions: '',
        passingPercentage: 40,
        attemptsAllowed: '',
        startDate: '--/--/---',
        startTime: '--:--',
        endDate: '--/--/---',
        endTime: '--:--',
        timeBetweenAttempts: '--:--',
        isActive: true,
        viewAnswerScript: true,
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

    const handlePublish = () => {
        console.log('Publish quiz:', formData);
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
                            <h2 className="text-xl font-bold mb-1">Add New Quiz</h2>
                            <p className="text-sm muted">
                                Add details, set timings and configure quiz settings
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
                            {/* Left Column - Quiz Details */}
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-1">Quiz Details</h3>
                                    <p className="text-sm muted">Basic information about your Quiz</p>
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold soft mb-2">
                                        Course Title
                                    </label>
                                    <input
                                        type="text"
                                        name="quizTitle"
                                        value={formData.quizTitle}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold soft mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter quiz description"
                                        className="w-full px-4 py-3 rounded-lg resize-none"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold soft mb-2">
                                        Instructions
                                    </label>
                                    <textarea
                                        name="instructions"
                                        rows="4"
                                        value={formData.instructions}
                                        onChange={handleInputChange}
                                        placeholder="Enter instructions for students"
                                        className="w-full px-4 py-3 rounded-lg resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold soft mb-2">
                                            Passing Percentage
                                        </label>
                                        <input
                                            type="number"
                                            name="passingPercentage"
                                            value={formData.passingPercentage}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold soft mb-2">
                                            Attempts Allowed
                                        </label>
                                        <select
                                            name="attemptsAllowed"
                                            value={formData.attemptsAllowed}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg"
                                        >
                                            <option value="">---</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="unlimited">Unlimited</option>
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
                                            <FaClock className="w-5 h-5 text-[var(--text-muted)]" />
                                            <span className="soft text-sm">{formData.startDate}</span>
                                        </div>
                                        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
                                            <FaClock className="w-5 h-5 text-[var(--text-muted)]" />
                                            <span className="soft text-sm">{formData.startTime}</span>
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
                                            <FaClock className="w-5 h-5 text-[var(--text-muted)]" />
                                            <span className="soft text-sm">{formData.endDate}</span>
                                        </div>
                                        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
                                            <FaClock className="w-5 h-5 text-[var(--text-muted)]" />
                                            <span className="soft text-sm">{formData.endTime}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Time between Quiz Attempts */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold soft mb-2">
                                        Time between Quiz Attempts (hrs)
                                    </label>
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
                                        <FaClock className="w-5 h-5 text-[var(--text-muted)]" />
                                        <span className="soft text-sm">{formData.timeBetweenAttempts}</span>
                                    </div>
                                </div>

                                {/* Active Toggle */}
                                <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] mb-4">
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

                                {/* View Answer Script Toggle */}
                                <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
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
                                onClick={handlePublish}
                                className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                </div>

                {/* New Quiz Drafts Section (Right Side Panel) */}
                <div className="w-1/3">
                    <div className="card-strong p-6 rounded-2xl h-full">
                        <h3 className="text-lg font-bold mb-1">New Quiz Drafts</h3>
                        <p className="text-sm muted">Manage previous quiz drafts</p>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
};

export default AddQuiz;