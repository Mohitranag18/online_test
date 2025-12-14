import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUsers, FaClock, FaCode, FaSearch, FaFilter, FaBook, FaGraduationCap } from 'react-icons/fa';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

const CourseCatalog = () => {
  const [activeTab, setActiveTab] = useState('All Courses');

  const courses = [
    {
      id: 1,
      title: 'Python Fundamentals',
      subtitle: 'Data Structures & Algorithms',
      instructor: 'Prof. Sarah Chen',
      level: 'Advanced',
      rating: 4.8,
      students: 5200,
      duration: '40 hours',
      progress: 72,
      color: 'cyan',
      icon: 'code',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Web Development Basics',
      subtitle: 'HTML/CSS/JavaScript',
      instructor: 'Prof. Emma Johnson',
      level: 'Intermediate',
      rating: 4.6,
      students: 3800,
      duration: '35 hours',
      progress: 45,
      color: 'blue',
      icon: 'html',
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'Java Full-Stack Development',
      subtitle: 'Enterprise Development',
      instructor: 'Dr. Michael Wong',
      level: 'Advanced',
      rating: 4.9,
      students: 6400,
      duration: '52 hours',
      progress: 28,
      color: 'orange',
      icon: 'java',
      status: 'In Progress'
    },
    {
      id: 4,
      title: 'C Programming Basics',
      subtitle: 'Foundation Course',
      instructor: 'Prof. David Lee',
      level: 'Beginner',
      rating: 4.7,
      students: 4200,
      duration: '30 hours',
      progress: 60,
      color: 'green',
      icon: 'c',
      status: 'In Progress'
    },
    {
      id: 5,
      title: 'React Advanced Patterns',
      subtitle: 'Modern Web Development',
      instructor: 'Prof. Alex Turner',
      level: 'Advanced',
      rating: 4.9,
      students: 3200,
      duration: '45 hours',
      progress: 0,
      color: 'indigo',
      icon: 'code',
      status: 'Not Started'
    },
    {
      id: 6,
      title: 'Machine Learning Basics',
      subtitle: 'Introduction to AI',
      instructor: 'Dr. Lisa Wang',
      level: 'Intermediate',
      rating: 4.8,
      students: 7800,
      duration: '60 hours',
      progress: 100,
      color: 'purple',
      icon: 'code',
      status: 'Completed'
    }
  ];

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
          <div className="card-strong p-5 sm:p-6 min-h-[600px]">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold mb-1">Available Courses</h2>
              <p className="text-xs sm:text-sm muted">Explore and continue your learning journey</p>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-6">
              {/* Tabs */}
              <div className="flex bg-black/20 p-1 rounded-lg overflow-x-auto">
                {['All Courses', 'Enrolled', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-white/10 text-white'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search and Filter */}
              <div className="flex gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition whitespace-nowrap">
                  <FaFilter className="w-3 h-3" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            {/* Course List */}
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="card p-4 sm:p-5 hover:bg-white/[0.02] transition group"
                >
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                      {course.icon === 'code' && <FaCode className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />}
                      {course.icon === 'html' && <FaCode className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />}
                      {course.icon === 'java' && <FaCode className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />}
                      {course.icon === 'c' && <FaCode className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                        <h3 className="font-semibold text-base sm:text-lg truncate">
                          {course.title}
                        </h3>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border ${getLevelColor(
                            course.level
                          )} uppercase font-bold tracking-wider w-fit`}
                        >
                          {course.level}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm muted mb-2 sm:mb-3 truncate">{course.subtitle}</p>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs muted mb-3 sm:mb-4">
                        <div className="flex items-center gap-1.5">
                          <FaGraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className="truncate">{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FaStar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400" />
                          <span className="font-semibold">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FaUsers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FaClock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="muted">
                            {course.progress === 0 ? 'Not Started' : course.progress === 100 ? 'Completed' : 'In Progress'}
                          </span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-white/6 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                      {course.progress === 0 ? (
                        <Link
                          to={`/module`}
                          className="flex-1 md:flex-none bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition text-center"
                        >
                          Enroll Now
                        </Link>
                      ) : course.progress === 100 ? (
                        <Link
                          to={`/module`}
                          className="flex-1 md:flex-none border border-[var(--border-color)] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--input-bg)] transition text-center"
                        >
                          Review
                        </Link>
                      ) : (
                        <Link
                          to={`/module`}
                          className="flex-1 md:flex-none bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition text-center"
                        >
                          Continue
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseCatalog;