import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus, FaClock, FaUserFriends, FaBook } from 'react-icons/fa';
import CourseLayout from './CourseLayout';
import { getModulesByCourseId } from '../../data/mockCourses';

const ModuleManagement = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // Get modules for this specific course
    const modules = getModulesByCourseId(courseId);

    const getEventIcon = (type) => {
        switch (type) {
            case 'quiz':
                return { icon: FaBook, color: 'green' };
            case 'lesson':
                return { icon: FaBook, color: 'blue' };
            case 'exercise':
                return { icon: FaBook, color: 'orange' };
            default:
                return { icon: FaBook, color: 'green' };
        }
    };

    return (
        <CourseLayout
            showAddButton={true}
            addButtonText={
                <>
                    <FaPlus className="w-4 h-4" />
                    Add Module
                </>
            }
            onAddClick={() => navigate(`/teacher/course/${courseId}/add-module`)}
        >
            {/* Modules Content */}
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">
                    <span className="text-cyan-400">MODULES</span> for the course are below →
                </h3>
            </div>

            {/* Empty State */}
            {modules.length === 0 ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center mx-auto mb-4">
                            <FaBook className="w-10 h-10 text-[var(--text-muted)]" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No Modules Yet</h3>
                        <p className="text-sm muted mb-4">Start by adding your first module to this course</p>
                        <button 
                            onClick={() => navigate(`/teacher/course/${courseId}/add-module`)}
                            className="bg-blue-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
                        >
                            <FaPlus className="w-4 h-4" />
                            Add Module
                        </button>
                    </div>
                </div>
            ) : (
                /* Modules List */
                <div className="space-y-6">
                    {modules.map((module) => (
                        <div key={module.id} className="card p-6 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-lg font-bold mb-1">{module.name}</h4>
                                    <p className="text-sm muted">{module.description}</p>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    <button 
                                        onClick={() => navigate(`/teacher/course/${courseId}/module/${module.id}/add-lesson`)}
                                        className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-xs font-medium transition flex items-center gap-1"
                                    >
                                        <FaPlus className="w-3 h-3" />
                                        Add Lesson
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/teacher/course/${courseId}/module/${module.id}/add-quiz`)}
                                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-xs font-medium transition flex items-center gap-1"
                                    >
                                        <FaPlus className="w-3 h-3" />
                                        Add Quiz
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/teacher/course/${courseId}/module/${module.id}/add-exercise`)}
                                        className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 rounded-lg text-xs font-medium transition flex items-center gap-1"
                                    >
                                        <FaPlus className="w-3 h-3" />
                                        Add Exercise
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/teacher/course/${courseId}/module/${module.id}/design`)}
                                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 rounded-lg text-xs font-medium transition"
                                    >
                                        Design Module
                                    </button>
                                </div>
                            </div>

                            {/* Events/Quizzes/Lessons */}
                            {module.events && module.events.length > 0 ? (
                                <div className="space-y-3">
                                    {module.events.map((event) => {
                                        const { icon: Icon, color } = getEventIcon(event.type);
                                        return (
                                            <div
                                                key={event.id}
                                                className="flex items-center justify-between p-4 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)] hover:bg-[var(--input-bg)] transition"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-lg bg-${color}-600/10 border border-${color}-600/20 flex items-center justify-center`}>
                                                        <Icon className={`w-5 h-5 text-${color}-400`} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-semibold mb-1">{event.name}</h5>
                                                        <div className="flex items-center gap-4 text-xs muted">
                                                            <div className="flex items-center gap-1.5">
                                                                <FaClock className="w-3 h-3" />
                                                                {event.date}
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <FaUserFriends className="w-3 h-3" />
                                                                {event.participants} participants
                                                            </div>
                                                            <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded text-[10px] uppercase font-bold">
                                                                {event.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        if (event.type === 'quiz') {
                                                            navigate(`/teacher/course/${courseId}/module/${module.id}/quiz/${event.id}/questions`);
                                                        } else if (event.type === 'exercise') {
                                                            navigate(`/teacher/course/${courseId}/module/${module.id}/exercise/${event.id}/questions`);
                                                        }
                                                        // For lessons, do nothing or you can add a toast message
                                                    }}
                                                    className="px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--input-bg)] transition"
                                                >
                                                    Manage
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted text-sm">
                                    No quizzes or lessons in this module yet
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </CourseLayout>
    );
};

export default ModuleManagement;