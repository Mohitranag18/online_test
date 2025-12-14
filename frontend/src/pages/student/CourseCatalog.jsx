import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUsers, FaClock, FaCode, FaSearch, FaFilter, FaGraduationCap } from 'react-icons/fa';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import { getAllStudentCourses, getEnrolledCourses, getCompletedCourses } from '../../data/mockStudentCourses';

const CourseCatalog = () => {
  const [activeTab, setActiveTab] = useState('All Courses');

  // Get courses based on active tab
  const getCourses = () => {
    switch (activeTab) {
      case 'Enrolled':
        return getEnrolledCourses();
      case 'Completed':
        return getCompletedCourses();
      default:
        return getAllStudentCourses();
    }
  };

  const courses = getCourses();

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Advanced':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 0) return 'bg-gray-500';
    if (progress === 100) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="flex min-h-screen relative grid-texture">
      <Sidebar />

      <main className="flex-1 w-full lg:w-auto">
        <Header isAuth />

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl font-bold mb-2">Course Catalog</h1>
            <p className="text-sm muted">Browse, enroll, and manage your learning courses</p>
          </div>

          {/* Course Library Section */}
          <div className="card-strong p-4 sm:p-5 lg:p-6 min-h-[600px]">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold mb-1">Available Courses</h2>
              <p className="text-xs sm:text-sm muted">Explore and continue your learning journey</p>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 sm:gap-4 mb-6">
              {/* Tabs */}
              <div className="flex bg-black/20 p-1 rounded-lg overflow-x-auto scrollbar-hide">
                {['All Courses', 'Enrolled', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 sm:flex-initial px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search and Filter */}
              <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-3.5 h-3.5 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-9 pr-3 sm:pr-4 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-xs sm:text-sm font-medium hover:bg-white/5 transition-all duration-200 whitespace-nowrap">
                  <FaFilter className="w-3 h-3" />
                  <span className="sm:hidden">Filter</span>
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            {/* Course List */}
            <div className="space-y-3 sm:space-y-4">
              {courses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg muted">No courses found</p>
                </div>
              ) : (
                courses.map((course) => (
                  <div
                    key={course.id}
                    className="card p-4 sm:p-5 hover:bg-white/[0.02] transition-all duration-200 group"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/20 group-hover:border-blue-500/30 transition-all duration-200">
                        {course.icon === 'code' && <FaCode className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />}
                        {course.icon === 'html' && <FaCode className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />}
                        {course.icon === 'java' && <FaCode className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />}
                        {course.icon === 'c' && <FaCode className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 w-full">
                        {/* Title and Level Badge */}
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base sm:text-lg line-clamp-1 group-hover:text-blue-400 transition-colors duration-200">
                            {course.title}
                          </h3>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded border ${getLevelColor(
                              course.level
                            )} uppercase font-bold tracking-wider whitespace-nowrap flex-shrink-0 transition-all duration-200`}
                          >
                            {course.level}
                          </span>
                        </div>

                        {/* Subtitle */}
                        <p className="text-xs sm:text-sm muted mb-2 sm:mb-3 line-clamp-1">{course.subtitle}</p>

                        {/* Stats - Responsive Grid */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 text-xs muted mb-3 sm:mb-4">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <FaGraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                            <span className="truncate">{course.instructor}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaStar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 flex-shrink-0" />
                            <span className="font-semibold">{course.rating}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaUsers className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaClock className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                            <span>{course.duration}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3 sm:mb-0">
                          <div className="flex justify-between text-xs mb-2">
                            <span className="muted">
                              {course.progress === 0 ? 'Not Started' : course.progress === 100 ? 'Completed' : 'In Progress'}
                            </span>
                            <span className="font-semibold">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-white/6 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(course.progress)} transition-all duration-500 ease-out`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Actions - Responsive Button */}
                      <div className="flex items-center w-full sm:w-auto sm:self-start">
                        {course.progress === 0 ? (
                          <Link
                            to={`/module`}
                            className="w-full sm:w-auto bg-blue-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 text-center whitespace-nowrap"
                          >
                            Enroll Now
                          </Link>
                        ) : course.progress === 100 ? (
                          <Link
                            to={`/module`}
                            className="w-full sm:w-auto border border-[var(--border-color)] px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-[var(--input-bg)] active:scale-95 transition-all duration-200 text-center whitespace-nowrap"
                          >
                            Review
                          </Link>
                        ) : (
                          <Link
                            to={`/module`}
                            className="w-full sm:w-auto bg-blue-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 text-center whitespace-nowrap"
                          >
                            Continue
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseCatalog;