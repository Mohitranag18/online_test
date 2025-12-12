import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaChevronLeft, FaShareAlt, FaEllipsisV } from 'react-icons/fa';
import TeacherSidebar from '../../components/layout/TeacherSidebar';
import Header from '../../components/layout/Header';
import { getCourseById } from '../../data/mockCourses';
import CourseActionButtons from './CourseActionButtons';

const CourseLayout = ({ children, showAddButton, addButtonText, onAddClick }) => {
    const { courseId } = useParams();
    const location = useLocation();

    // Fetch course data based on courseId
    const course = getCourseById(courseId);

    // Handle case when course is not found
    if (!course) {
        return (
            <div className="flex min-h-screen relative grid-texture">
                <TeacherSidebar />
                <main className="flex-1">
                    <Header isAuth />
                    <div className="p-8">
                        <div className="text-center mt-20">
                            <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
                            <p className="text-muted mb-4">The course you're looking for doesn't exist.</p>
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
        { name: 'Enrollment', path: `/teacher/course/${courseId}/enrollment` },
        { name: 'Modules', path: `/teacher/course/${courseId}/modules` },
        { name: 'Design Course', path: `/teacher/course/${courseId}/design` },
        { name: 'Appearance', path: `/teacher/course/${courseId}/appearance` },
        { name: 'Privacy', path: `/teacher/course/${courseId}/privacy` },
        { name: 'Billing', path: `/teacher/course/${courseId}/billing` },
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
                                    to="/teacher/courses"
                                    className="w-10 h-10 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--border-subtle)] transition"
                                >
                                    <FaChevronLeft className="w-4 h-4" />
                                </Link>
                                <div>
                                    <h2 className="text-xl font-bold mb-1">{course.title}</h2>
                                    <p className="text-sm muted">{course.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--input-bg)] transition">
                                    <FaShareAlt className="w-4 h-4" />
                                    Share
                                </button>
                                {showAddButton && (
                                    <button
                                        onClick={onAddClick}
                                        className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                                    >
                                        {addButtonText}
                                    </button>
                                )}
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
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                                        isActiveTab(tab.path)
                                            ? 'bg-blue-600 text-white'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--input-bg)]'
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

export default CourseLayout;