import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import { useStore } from '../../store/useStore';

const Dashboard = () => {
  const { user, courses, stats } = useStore();

  const statsCards = [
    {
      label: 'Courses Enrolled',
      value: stats.coursesEnrolled,
      change: `${stats.inProgress} in progress`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13M3 6.253C4.168 5.477 5.754 5 7.5 5S10.832 5.477 12 6.253M12 6.253C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253M3 19.253C4.168 18.477 5.754 18 7.5 18S10.832 18.477 12 19.253M12 19.253C13.168 18.477 14.754 18 16.5 18S19.832 18.477 21 19.253" />
        </svg>
      ),
      color: 'rgb(59, 130, 246)',
    },
    {
      label: 'Challenges Solved',
      value: stats.challengesSolved,
      change: `+${stats.challengesThisWeek} this week`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      color: 'rgb(34, 197, 94)',
    },
    {
      label: 'Current Streak',
      value: `${stats.currentStreak} days`,
      change: 'Keep it up!',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        </svg>
      ),
      color: 'rgb(249, 115, 22)',
    },
    {
      label: 'Learning Hours',
      value: stats.learningHours,
      change: 'This month',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'rgb(168, 85, 247)',
    },
  ];

  const upcomingLessons = [
    {
      title: 'Advanced Python Concepts',
      course: 'Python Fundamentals',
      time: 'Today, 3:00 PM',
      duration: '45 min',
      isNext: true,
    },
    {
      title: 'Object-Oriented Programming',
      course: 'Java Programming',
      time: 'Tomorrow, 10:00 AM',
      duration: '60 min',
      isNext: false,
    },
    {
      title: 'React Hooks Deep Dive',
      course: 'Web Development with React',
      time: 'May 18, 2:00 PM',
      duration: '50 min',
      isNext: false,
    },
  ];

  const recentAchievements = [
    { title: 'Problem Solver', desc: 'Solved 100 challenges', date: 'Yesterday', icon: '🏆', color: 'f59e0b' },
    { title: 'Quick Learner', desc: 'Completed 3 lessons in a day', date: '2 days ago', icon: '⚡', color: '3b82f6' },
    { title: 'Code Master', desc: 'Perfect score on Python quiz', date: '3 days ago', icon: '💎', color: '8b5cf6' },
    { title: 'Consistent', desc: '7-day learning streak', date: '1 week ago', icon: '🔥', color: 'f97316' },
    { title: 'Beginner', desc: 'Completed first course', date: '2 weeks ago', icon: '🌟', color: '10b981' },
  ];

  const monthlyProgress = [
    { label: 'Challenges Solved', value: stats.thisMonth.challengesSolved, icon: '🎯' },
    { label: 'Lessons Completed', value: stats.thisMonth.lessonsCompleted, icon: '📚' },
    { label: 'Points Earned', value: stats.thisMonth.pointsEarned, icon: '⭐' },
  ];

  return (
    <div className="flex min-h-screen relative grid-texture">
      <Sidebar />

      <main className="flex-1 w-full lg:w-auto">
        <Header isAuth />

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6 lg:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Dashboard</h1>
              <p className="muted text-sm">
                Welcome back, {user.name}! Keep up the momentum with your learning journey
              </p>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/courses"
                className="border border-[var(--border-color)] px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[var(--input-bg)] transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <span className="hidden lg:inline">Browse Courses</span>
                <span className="lg:hidden">Browse</span>
              </Link>
              <Link
                to="/quiz"
                className="bg-blue-600 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                <span className="hidden lg:inline">Continue Learning</span>
                <span className="lg:hidden">Continue</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
            {statsCards.map((stat, index) => (
              <div key={index} className="card-strong p-5 sm:p-6 rounded-2xl">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="muted text-xs sm:text-sm mb-2">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</p>
                    <p className="text-xs sm:text-sm font-medium text-green-400">{stat.change}</p>
                  </div>
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${stat.color}26`,
                      border: `1px solid ${stat.color}40`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
            {/* Active Courses - Takes 2 columns */}
            <div className="lg:col-span-2 card-strong p-5 sm:p-6 rounded-2xl">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold mb-1">Active Courses</h2>
                <p className="text-xs sm:text-sm muted">Continue your learning journey</p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="card p-4 sm:p-5 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex gap-3 sm:gap-4 flex-1">
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `rgba(${course.color === 'indigo' ? '99,102,241' : course.color === 'pink' ? '236,72,153' : '59,130,246'},0.15)`,
                            border: `1px solid rgba(${course.color === 'indigo' ? '99,102,241' : course.color === 'pink' ? '236,72,153' : '59,130,246'},0.2)`,
                          }}
                        >
                          <svg className={`w-5 h-5 sm:w-6 sm:h-6 text-${course.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base sm:text-lg mb-1 truncate">{course.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm muted mb-2 sm:mb-3">
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                              </svg>
                              <span className="truncate">{course.instructor}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {course.duration}
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-${course.color}-500/20 text-${course.color}-400`}>
                              {course.level}
                            </span>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-2">
                              <span className="muted">Progress: {course.lessons.completed}/{course.lessons.total} lessons</span>
                              <span className="font-semibold">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full bg-${course.color}-500`}
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/module"
                        className="w-full sm:w-auto bg-blue-600 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 transition whitespace-nowrap text-center"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="card-strong p-5 sm:p-6 rounded-2xl">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold mb-1">Achievements</h2>
                <p className="text-xs sm:text-sm muted">Your recent badges and milestones</p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl flex-shrink-0"
                      style={{
                        background: `#${achievement.color}26`,
                        border: `1px solid #${achievement.color}40`,
                      }}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base truncate">{achievement.title}</div>
                      <div className="text-xs muted truncate">{achievement.desc}</div>
                      <div className="text-xs muted">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Progress & Upcoming Lessons */}
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Monthly Progress Stats */}
            <div className="card-strong p-5 sm:p-6 rounded-2xl">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold mb-1">This Month</h2>
                <p className="text-xs sm:text-sm muted">Your monthly learning summary</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {monthlyProgress.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--input-bg)] flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xl sm:text-2xl font-bold">{item.value}</div>
                      <div className="text-xs sm:text-sm muted truncate">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Lessons */}
            <div className="lg:col-span-2 card-strong p-5 sm:p-6 rounded-2xl">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold mb-1">Upcoming Lessons</h2>
                <p className="text-xs sm:text-sm muted">Your scheduled learning sessions</p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {upcomingLessons.map((lesson, index) => (
                  <div key={index} className="card p-4 sm:p-5 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex gap-3 sm:gap-4 flex-1">
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: lesson.isNext ? 'rgba(59,130,246,0.15)' : 'rgba(100,116,139,0.15)',
                            border: lesson.isNext ? '1px solid rgba(59,130,246,0.2)' : '1px solid rgba(100,116,139,0.2)',
                          }}
                        >
                          <svg
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${lesson.isNext ? 'text-blue-400' : 'text-gray-400'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base mb-1 truncate">{lesson.title}</h3>
                          <p className="text-xs sm:text-sm muted mb-2 truncate">{lesson.course}</p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs muted">
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {lesson.time}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {lesson.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                      {lesson.isNext ? (
                        <Link
                          to="/lesson"
                          className="w-full sm:w-auto bg-blue-600 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 transition whitespace-nowrap text-center"
                        >
                          Start Now
                        </Link>
                      ) : (
                        <button className="w-full sm:w-auto border border-[var(--border-color)] px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-[var(--input-bg)] transition whitespace-nowrap">
                          View
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;