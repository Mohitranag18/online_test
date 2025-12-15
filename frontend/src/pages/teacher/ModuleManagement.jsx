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
                    <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Add Module</span>
                    <span className="sm:hidden">Add</span>
                </>
            }
            onAddClick={() => navigate(`/teacher/course/${courseId}/add-module`)}
        >
            {/* Modules Content */}
            <div className="mb-5 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold mb-1">
                    <span className="text-cyan-400">MODULES</span> for the course are below →
                </h3>
            </div>

            {/* Empty State */}
            {modules.length === 0 ? (
                <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] px-4">
                    <div className="text-center max-w-md">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <FaBook className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--text-muted)]" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2">No Modules Yet</h3>
                        <p className="text-xs sm:text-sm muted mb-4">Start by adding your first module to this course</p>
                        <button 
                            onClick={() => navigate(`/teacher/course/${courseId}/add-module`)}
                            className="bg-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-95 transition flex items-center gap-2 mx-auto"
                        >
                            <FaPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Add Module
                        </button>
                    </div>
                </div>
            ) : (
                /* Modules List */
                <div className="space-y-4 sm:space-y-6">
                    {modules.map((module) => (
                        <div key={module.id} className="card p-4 sm:p-5 lg:p-6 rounded-xl">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-5 gap-3 sm:gap-4">
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-base sm:text-lg font-bold mb-1 line-clamp-1">{module.name}</h4>
                                    <p className="text-xs sm:text-sm muted line-clamp-2">{module.description}</p>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-2">
                                    <button 
                                        onClick={() => navigate(`/teacher/course/${courseId}/module/${module.id}/add-lesson`)}
                                        className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 active:scale-95 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap"
                                    >
                                        <FaPlus className="w-3 h-3" />
                                        <span className="hidden sm:inline">Add </span>Lesson
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/teacher/course/${courseId}/module/${module.id}/add-quiz`)}
                                        className="px-3 py-2 bg-green-600 hover:bg-green-700 active:scale-95 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap"
                                    >
                                        <FaPlus className="w-3 h-3" />
                                        <span className="hidden sm:inline">Add </span>Quiz
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/teacher/course/${courseId}/module/${module.id}/add-exercise`)}
                                        className="px-3 py-2 bg-orange-600 hover:bg-orange-700 active:scale-95 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap"
                                    >
                                        <FaPlus className="w-3 h-3" />
                                        <span className="hidden sm:inline">Add </span>Exercise
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/teacher/course/${courseId}/module/${module.id}/design`)}
                                        className="px-3 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 rounded-lg text-xs font-medium transition whitespace-nowrap"
                                    >
                                        <span className="hidden sm:inline">Design Module</span>
                                        <span className="sm:hidden">Design</span>
                                    </button>
                                </div>
                            </div>

                            {/* Events/Quizzes/Lessons */}
                            {module.events && module.events.length > 0 ? (
                                <div className="space-y-2 sm:space-y-3">
                                    {module.events.map((event) => {
                                        const { icon: Icon, color } = getEventIcon(event.type);
                                        return (
                                            <div
                                                key={event.id}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)] hover:bg-[var(--input-bg)] transition gap-3"
                                            >
                                                <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-${color}-600/10 border border-${color}-600/20 flex items-center justify-center flex-shrink-0`}>
                                                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${color}-400`} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h5 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 line-clamp-1">{event.name}</h5>
                                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs muted">
                                                            <div className="flex items-center gap-1.5">
                                                                <FaClock className="w-3 h-3 flex-shrink-0" />
                                                                <span className="truncate">{event.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <FaUserFriends className="w-3 h-3 flex-shrink-0" />
                                                                <span className="truncate">{event.participants} participants</span>
                                                            </div>
                                                            <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded text-[10px] uppercase font-bold whitespace-nowrap">
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
                                                    }}
                                                    className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded-lg text-xs sm:text-sm font-medium hover:bg-[var(--input-bg)] active:scale-95 transition"
                                                >
                                                    Manage
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-6 sm:py-8 text-muted text-xs sm:text-sm">
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