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
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="text-center mt-12 sm:mt-20">
                            <h2 className="text-xl sm:text-2xl font-bold mb-2">Course Not Found</h2>
                            <p className="text-xs sm:text-sm muted">The course you're looking for doesn't exist.</p>
                            <Link
                                to="/teacher/courses"
                                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition inline-block text-sm"
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
        { name: 'Enrollment', shortName: 'Enroll', path: `/teacher/course/${courseId}/enrollment` },
        { name: 'Modules', shortName: 'Modules', path: `/teacher/course/${courseId}/modules` },
        { name: 'Design Course', shortName: 'Design', path: `/teacher/course/${courseId}/design` },
        { name: 'Appearance', shortName: 'Style', path: `/teacher/course/${courseId}/appearance` },
        { name: 'Privacy', shortName: 'Privacy', path: `/teacher/course/${courseId}/privacy` },
        { name: 'Billing', shortName: 'Billing', path: `/teacher/course/${courseId}/billing` },
    ];

    const isActiveTab = (path) => location.pathname === path;

    return (
        <div className="flex min-h-screen relative grid-texture">
            <TeacherSidebar />

            <main className="flex-1">
                <Header isAuth />

                <div className="p-4 sm:p-6 lg:p-8">
                    {/* Header Section */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl font-bold mb-2">Courses</h1>
                        <p className="text-sm muted">Create, manage and analyze your courses</p>
                    </div>

                    {/* Action Buttons */}
                    <CourseActionButtons activeButton="library" />

                    <div className="card-strong p-4 sm:p-5 lg:p-6 min-h-[calc(100vh-16rem)] sm:min-h-[600px] rounded-xl sm:rounded-2xl">
                        {/* Course Header */}
                        {/* Course Header */}
<div className="flex items-start justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 lg:gap-8">
    <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
        <Link
            to="/teacher/courses"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--border-subtle)] active:scale-95 transition flex-shrink-0"
        >
            <FaChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
        <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1 line-clamp-1">{course.title}</h2>
            <p className="text-xs sm:text-sm muted line-clamp-2">{course.description}</p>
        </div>
    </div>
    
    {/* Action Buttons */}
    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto">
        <button className="flex items-center gap-2 px-2 sm:px-3 md:px-4 py-2 border border-[var(--border-color)] rounded-lg text-xs sm:text-sm font-medium hover:bg-[var(--input-bg)] active:scale-95 transition">
            <FaShareAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">Share</span>
        </button>
        {showAddButton && (
            <button
                onClick={onAddClick}
                className="bg-blue-600 px-2 sm:px-3 md:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 active:scale-95 transition flex items-center gap-2 whitespace-nowrap"
            >
                {addButtonText}
            </button>
        )}
        <button className="w-9 h-9 sm:w-10 sm:h-10 border border-[var(--border-color)] rounded-lg flex items-center justify-center hover:bg-[var(--input-bg)] active:scale-95 transition flex-shrink-0">
            <FaEllipsisV className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
    </div>
</div>

                        {/* Tabs */}
                        <div className="flex gap-2 sm:gap-3 mb-5 sm:mb-6 border-b border-[var(--border-subtle)] pb-3 sm:pb-4 overflow-x-auto scrollbar-hide">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.name}
                                    to={tab.path}
                                    className={`flex-1 sm:flex-initial px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap text-center ${
                                        isActiveTab(tab.path)
                                            ? 'bg-blue-600 text-white'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--input-bg)]'
                                    }`}
                                >
                                    <span className="sm:hidden">{tab.shortName}</span>
                                    <span className="hidden sm:inline">{tab.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Content */}
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseLayout;