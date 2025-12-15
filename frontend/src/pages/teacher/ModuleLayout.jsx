import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaChevronLeft, FaShareAlt, FaEllipsisV } from 'react-icons/fa';
import TeacherSidebar from '../../components/layout/TeacherSidebar';
import Header from '../../components/layout/Header';
import { getCourseById, getModuleById } from '../../data/mockCourses';
import CourseActionButtons from './CourseActionButtons';

const ModuleLayout = ({ children }) => {
    const { courseId, moduleId } = useParams();
    const location = useLocation();

    const course = getCourseById(courseId);
    const module = getModuleById(courseId, moduleId);

    if (!course || !module) {
        return (
            <div className="flex min-h-screen relative grid-texture">
                <TeacherSidebar />
                <main className="flex-1">
                    <Header isAuth />
                    <div className="p-8">
                        <div className="text-center mt-20">
                            <h2 className="text-2xl font-bold mb-2">Module Not Found</h2>
                            <p className="text-muted mb-4">The module you're looking for doesn't exist.</p>
                            <Link
                                to="/teacher/courses"
                                className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition inline-block"
                            >
                                Back to Courses
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    const tabs = [
        { name: 'Add Lesson', path: `/teacher/course/${courseId}/module/${moduleId}/add-lesson` },
        { name: 'Add Exercise', path: `/teacher/course/${courseId}/module/${moduleId}/add-exercise` },
        { name: 'Add Quiz', path: `/teacher/course/${courseId}/module/${moduleId}/add-quiz` },
        { name: 'Design Module', path: `/teacher/course/${courseId}/module/${moduleId}/design` },
    ];

    const isActiveTab = (path) => location.pathname === path;

    return (
        <div className="flex min-h-screen relative grid-texture">
            <TeacherSidebar />

            <main className="flex-1">
                <Header isAuth />

                <div className="p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-2">Courses</h1>
                        <p className="text-sm muted">Create, manage and analyze your courses</p>
                    </div>

                    {/* Action Buttons */}
                    <CourseActionButtons activeButton="library" />

                    <div className="card-strong p-6 min-h-[600px] rounded-2xl">
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <Link
                                    to={`/teacher/course/${courseId}/modules`}
                                    className="w-10 h-10 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--border-subtle)] transition"
                                >
                                    <FaChevronLeft className="w-4 h-4" />
                                </Link>
                                <div>
                                    <h2 className="text-xl font-bold mb-1">{course.title} → {module.name}</h2>
                                    
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--input-bg)] transition">
                                    <FaShareAlt className="w-4 h-4" />
                                    Share
                                </button>
                                <button className="w-10 h-10 border border-[var(--border-color)] rounded-lg flex items-center justify-center hover:bg-[var(--input-bg)] transition">
                                    <FaEllipsisV className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 mb-6 border-b border-[var(--border-subtle)] pb-4 overflow-x-auto">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.name}
                                    to={tab.path}
                                    className={`px-4 py-2 rounded-lg font-medium transition text-sm border ${
                                        isActiveTab(tab.path)
                                            ? tab.name === 'Design Module'
                                                ? 'bg-yellow-500 text-black border-yellow-500'
                                                : tab.name === 'Add Quiz'
                                                ? 'bg-green-600 text-white border-green-600'
                                                : tab.name === 'Add Exercise'
                                                ? 'bg-orange-600 text-white border-orange-600'
                                                : 'bg-cyan-600 text-white border-cyan-600'
                                            : 'bg-transparent border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]'
                                    }`}
                                >
                                    {tab.name}
                                </Link>
                            ))}
                        </div>

                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ModuleLayout;