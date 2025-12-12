import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaChartBar, FaChevronRight, FaQuestionCircle } from 'react-icons/fa';
import Logo from '../ui/Logo';

const TeacherSidebar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/teacher/dashboard', label: 'Dashboard', icon: FaHome },
        { path: '/teacher/quizzes', label: 'Quizzes', icon: FaChartBar },
        { path: '/teacher/courses', label: 'Courses', icon: FaBook },
        { path: '/teacher/questions', label: 'Questions', icon: FaQuestionCircle },
    ];

    const isActive = (path) => {
        // Special handling for courses - match all course-related paths
        if (path === '/teacher/courses') {
            return location.pathname === path || 
                   location.pathname.startsWith('/teacher/course/') ||
                   location.pathname.startsWith('/teacher/courses') ||
                   location.pathname === '/teacher/add-course' ||
                   location.pathname === '/teacher/grading-system';
        }
        // For other paths, exact match or starts with
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <aside className="w-64 app-sidebar flex flex-col border-r border-white/5 min-h-screen">
            {/* Logo Section */}
            <div className="p-4 border-b border-white/6">
                <div className="flex items-center justify-between">
                    <Logo />
                    <button className="text-muted hover:text-white transition">
                        <FaChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                                isActive(item.path)
                                    ? 'bg-blue-600 text-white'
                                    : 'text-soft hover:bg-white/3'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default TeacherSidebar;