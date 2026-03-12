import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBell, 
  FaCheck, 
  FaCheckDouble, 
  FaUser, 
  FaClock, 
  FaInbox,
  FaExclamationCircle,
  FaChartLine,
  FaTimes,
  FaFilter,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
  FaStar,
  FaTrophy,
  FaFire,
  FaGraduationCap,
  FaBook,
  FaCode,
  FaComments
} from 'react-icons/fa';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import TeacherSidebar from '../components/layout/TeacherSidebar';
import { useAuthStore } from '../store/authStore';
import { useNotificationsStore } from '../store/notificationsStore';
import { getModeratorStatus } from '../api/api';



// Enhanced Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14
    }
  }
};

const statCardVariants = {
  hidden: { scale: 0.85, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  },
  hover: {
    scale: 1.05,
    y: -4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const filterButtonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, y: -2 },
  tap: { scale: 0.95 }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Notifications = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const { 
    notifications, 
    unreadCount, 
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    markBulkAsRead
  } = useNotificationsStore();

  const [isModeratorActive, setIsModeratorActive] = useState(false);
  const isTeacher = user?.is_moderator && isModeratorActive;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch notifications
        await fetchNotifications();
        
        // Fetch current moderator toggle state if user is a moderator
        if (user?.is_moderator) {
          const status = await getModeratorStatus();
          setIsModeratorActive(status.is_moderator_active);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, fetchNotifications, user]); // Add user to dependency array



  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread' && notif.read) return false;
    if (filter === 'read' && !notif.read) return false;
    if (typeFilter !== 'all' && notif.message_type !== typeFilter) return false;
    return true;
  });

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification.message_uid);
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleMarkSelectedAsRead = async () => {
    const unreadIds = filteredNotifications
      .filter(n => !n.read)
      .map(n => n.message_uid);
    if (unreadIds.length > 0) {
      await markBulkAsRead(unreadIds);
    }
  };

  // Enhanced notification type styling with diverse colors
  const getNotificationStyle = (type) => {
    switch(type) {
      case 'success':
        return {
          icon: FaCheckCircle,
          bgClass: 'bg-[var(--notif-success-bg)]',
          borderClass: 'border-[var(--notif-success-border)]',
          textClass: 'text-[var(--notif-success-text)]',
          iconBg: 'bg-emerald-500/20',
          iconColor: 'text-emerald-400',
          glowClass: 'shadow-[var(--notif-success-glow)]',
          gradient: 'from-emerald-500 to-green-500',
          badgeBg: 'bg-emerald-500/10',
          badgeBorder: 'border-emerald-500/30'
        };
      case 'warning':
        return {
          icon: FaExclamationTriangle,
          bgClass: 'bg-[var(--notif-warning-bg)]',
          borderClass: 'border-[var(--notif-warning-border)]',
          textClass: 'text-[var(--notif-warning-text)]',
          iconBg: 'bg-amber-500/20',
          iconColor: 'text-amber-400',
          glowClass: 'shadow-[var(--notif-warning-glow)]',
          gradient: 'from-amber-500 to-orange-500',
          badgeBg: 'bg-amber-500/10',
          badgeBorder: 'border-amber-500/30'
        };
      case 'danger':
        return {
          icon: FaTimesCircle,
          bgClass: 'bg-[var(--notif-danger-bg)]',
          borderClass: 'border-[var(--notif-danger-border)]',
          textClass: 'text-[var(--notif-danger-text)]',
          iconBg: 'bg-red-500/20',
          iconColor: 'text-red-400',
          glowClass: 'shadow-[var(--notif-danger-glow)]',
          gradient: 'from-red-500 to-rose-500',
          badgeBg: 'bg-red-500/10',
          badgeBorder: 'border-red-500/30'
        };
      default:
        return {
          icon: FaInfoCircle,
          bgClass: 'bg-[var(--notif-info-bg)]',
          borderClass: 'border-[var(--notif-info-border)]',
          textClass: 'text-[var(--notif-info-text)]',
          iconBg: 'bg-blue-500/20',
          iconColor: 'text-blue-400',
          glowClass: 'shadow-[var(--notif-info-glow)]',
          gradient: 'from-blue-500 to-cyan-500',
          badgeBg: 'bg-blue-500/10',
          badgeBorder: 'border-blue-500/30'
        };
    }
  };

  // Enhanced avatar generator with better colors
  const getAvatarStyle = (name, type) => {
    const colors = [
      { bg: 'bg-gradient-to-br from-blue-500 to-cyan-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-emerald-500 to-teal-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-orange-500 to-red-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-indigo-500 to-purple-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-pink-500 to-rose-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-amber-500 to-yellow-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-teal-500 to-cyan-500', text: 'text-white' },
    ];
    
    if (!name) {
      const style = getNotificationStyle(type);
      return { bg: style.iconBg, text: style.iconColor, useIcon: true };
    }
    
    const index = name.charCodeAt(0) % colors.length;
    return { ...colors[index], useIcon: false };
  };

  // Enhanced statistics with more visual interest
  const stats = [
    {
      label: 'Total',
      value: notifications.length,
      icon: FaBell,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/20'
    },
    {
      label: 'Unread',
      value: unreadCount,
      icon: FaFire,
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      glow: 'shadow-purple-500/20'
    },
    {
      label: 'Read',
      value: notifications.filter(n => n.read).length,
      icon: FaCheckCircle,
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/20'
    },
    {
      label: 'Important',
      value: notifications.filter(n => n.message_type === 'warning' || n.message_type === 'danger').length,
      icon: FaStar,
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      glow: 'shadow-amber-500/20'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All', icon: FaBell, count: notifications.length, color: 'blue' },
    { value: 'unread', label: 'Unread', icon: FaExclamationCircle, count: unreadCount, color: 'purple' },
    { value: 'read', label: 'Read', icon: FaCheckCircle, count: notifications.filter(n => n.read).length, color: 'emerald' }
  ];

  const typeFilterOptions = [
    { value: 'all', label: 'All Types', icon: FaFilter, color: 'text-[var(--text-secondary)]', bg: 'bg-[var(--surface)]' },
    { value: 'info', label: 'Info', icon: FaInfoCircle, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { value: 'success', label: 'Success', icon: FaCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { value: 'warning', label: 'Warning', icon: FaExclamationTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { value: 'danger', label: 'Danger', icon: FaTimesCircle, color: 'text-red-400', bg: 'bg-red-500/10' }
  ];

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaBell className="w-16 h-16 text-purple-400" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Access Denied
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 text-lg">
            Please sign in to view your notifications and stay updated
          </p>
          <motion.button
            onClick={() => navigate('/signin')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-xl font-semibold hover:brightness-110 transition-all shadow-lg shadow-purple-500/30 text-white"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In Now
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        {isTeacher ? <TeacherSidebar /> : <Sidebar />}
        <main className="flex-1">
          <Header isAuth />
          <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div className="relative w-20 h-20 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 border-4 border-pink-500/30 border-b-pink-500 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaBell className="w-6 h-6 text-purple-400" />
                </div>
              </motion.div>
              <p className="text-[var(--text-secondary)] text-lg font-medium">Loading notifications...</p>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen relative">
      {isTeacher ? <TeacherSidebar /> : <Sidebar />}

      <main className="flex-1">
        <Header isAuth />

        <motion.div 
          className="p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Enhanced Page Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 shadow-xl shadow-purple-500/20"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaBell className="w-8 h-8 text-purple-400" />
                  {unreadCount > 0 && (
                    <motion.div 
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-red-500/50"
                      variants={pulseVariants}
                      animate="pulse"
                    >
                      {unreadCount}
                    </motion.div>
                  )}
                </motion.div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Notifications
                  </h1>
                  <p className="text-base text-[var(--text-secondary)] mt-1">
                    {notifications.length} total • {unreadCount} unread • {notifications.filter(n=> n.read).length} read
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              {unreadCount > 0 && (
                <motion.button
                  onClick={handleMarkAllAsRead}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/30"
                  variants={filterButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaCheckDouble className="w-5 h-5" />
                  <span className="hidden sm:inline">Mark All Read</span>
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className={`relative overflow-hidden p-5 rounded-2xl ${stat.bg} border-2 ${stat.border} backdrop-blur-sm shadow-lg ${stat.glow}`}
                  variants={statCardVariants}
                  custom={index}
                  whileHover="hover"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`w-7 h-7 ${stat.text}`} />
                      <motion.div
                        className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                        animate={stat.label === 'Unread' && stat.value >0 ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {stat.value}
                      </motion.div>
                    </div>
                    <div className="text-sm font-semibold text-[var(--text-secondary)]">
                      {stat.label}
                    </div>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <div className="flex flex-col xl:flex-row gap-6">
            {/* Main Content */}
            <motion.div variants={itemVariants} className="flex-1 min-w-0">
              <div className="card-strong rounded-2xl overflow-hidden border-2 border-[var(--border-color)] shadow-xl">
                {/* Enhanced Filters Header */}
                <div className="p-6 border-b-2 border-[var(--border-color)] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                      <FaFilter className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="font-bold text-lg">Filter Notifications</span>
                  </div>

                  {/* Status Filter with enhanced design */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2 block">
                        Status
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {filterOptions.map((option) => {
                          const Icon = option.icon;
                          const isActive = filter === option.value;
                          return (
                            <motion.button
                              key={option.value}
                              onClick={() => setFilter(option.value)}
                              className={`
                                relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all
                                ${isActive 
                                  ? `bg-gradient-to-r from-${option.color}-500 to-${option.color === 'blue' ? 'cyan' : option.color === 'purple' ? 'pink' : 'green'}-500 text-white shadow-xl shadow-${option.color}-500/40 border-2 border-transparent` 
                                  : 'bg-[var(--surface)] border-2 border-[var(--border-color)] text-[var(--text-secondary)] hover:border-purple-500/50 hover:bg-[var(--surface-2)]'
                                }
                              `}
                              variants={filterButtonVariants}
                              initial="rest"
                              whileHover="hover"
                              whileTap="tap"
                            >
                              <Icon className="w-5 h-5" />
                              <span>{option.label}</span>
                              <motion.span 
                                className={`
                                  px-2.5 py-0.5 rounded-full text-xs font-bold
                                  ${isActive ? 'bg-white/25' : 'bg-[var(--bg-secondary)] border border-[var(--border-color)]'}
                                `}
                                animate={isActive && option.count > 0 ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                {option.count}
                              </motion.span>

                              {/* Hover shine effect */}
                              {!isActive && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
                                  initial={{ x: '-100%' }}
                                  whileHover={{ x: '200%' }}
                                  transition={{ duration: 0.6 }}
                                />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2 block">
                        Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {typeFilterOptions.map((option) => {
                          const Icon = option.icon;
                          const isActive = typeFilter === option.value;
                          return (
                            <motion.button
                              key={option.value}
                              onClick={() => setTypeFilter(option.value)}
                              className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all border-2
                                ${isActive 
                                  ? `${option.bg} border-current shadow-md scale-105` 
                                  : 'bg-[var(--surface)] border-[var(--border-subtle)] hover:border-[var(--border-color)] hover:bg-[var(--surface-2)]'
                                }
                              `}
                              variants={filterButtonVariants}
                              initial="rest"
                              whileHover="hover"
                              whileTap="tap"
                            >
                              <Icon className={`w-4 h-4 ${option.color}`} />
                              <span className={isActive ? option.color : ''}>{option.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Bulk Actions */}
                  {filteredNotifications.filter(n => !n.read).length > 0 && (
                    <motion.div 
                      className="mt-5 pt-5 border-t-2 border-[var(--border-color)] flex justify-between items-center gap-4 flex-wrap"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-2 h-2 bg-purple-500 rounded-full"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-medium text-[var(--text-secondary)]">
                          <span className="font-bold text-purple-400">
                            {filteredNotifications.filter(n => !n.read).length}
                          </span> unread in this view
                        </span>
                      </div>
                      <motion.button
                        onClick={handleMarkSelectedAsRead}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaCheckDouble className="w-4 h-4" />
                        Mark Visible as Read
                      </motion.button>
                    </motion.div>
                  )}
                </div>

                {/* Notifications List */}
                <div className="p-6">
                  {filteredNotifications.length === 0 ? (
                    <motion.div 
                      className="text-center py-20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <motion.div 
                        className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl flex items-center justify-center border-2 border-purple-500/20 shadow-xl"
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          y: [0, -10, 0]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {notifications.length === 0 ? (
                          <FaInbox className="w-16 h-16 text-purple-400/50" />
                        ) : (
                          <FaExclamationCircle className="w-16 h-16 text-purple-400/50" />
                        )}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {notifications.length === 0 ? 'No notifications yet' : 'No matches found'}
                      </h3>
                      <p className="text-[var(--text-secondary)] max-w-md mx-auto text-lg">
                        {notifications.length === 0 
                          ? "You're all caught up! New notifications will appear here when you receive them."
                          : 'Try adjusting your filters to see more notifications.'}
                      </p>
                      {notifications.length > 0 && (
                        <motion.button
                          onClick={() => { setFilter('all'); setTypeFilter('all'); }}
                          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Clear Filters
                        </motion.button>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="space-y-4"
                      variants={containerVariants}
                    >
                      <AnimatePresence mode="popLayout">
                        {filteredNotifications.map((notification, index) => {
                          const style = getNotificationStyle(notification.message_type || 'info');
                          const TypeIcon = style.icon;
                          const avatarStyle = getAvatarStyle(notification.sender_name, notification.message_type);
                          
                          return (
                            <motion.div
                              key={notification.message_uid}
                              layout
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                              exit={{ opacity: 0, x: -100, scale: 0.95 }}
                              onClick={() => handleNotificationClick(notification)}
                              className={`
                                group relative p-6 rounded-2xl border-2 cursor-pointer overflow-hidden
                                transition-all duration-300
                                ${!notification.read 
                                  ? 'bg-[var(--notif-unread-bg)] border-[var(--notif-unread-border)] shadow-xl shadow-purple-500/10' 
                                  : 'bg-[var(--surface)] border-[var(--border-subtle)] hover:border-[var(--border-color)] hover:shadow-lg'
                                }
                              `}
                              whileHover={{ scale: 1.01, x: 6 }}
                              style={{ originX: 0 }}
                            >
                              {/* Unread indicator with animation */}
                              {!notification.read && (
                                <motion.div 
                                  className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-l-2xl"
                                  layoutId={`unread-${notification.message_uid}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                />
                              )}

                              {/* Hover gradient overlay */}
                              <motion.div 
                                className={`absolute inset-0 bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                              />

                              <div className="relative z-10 flex items-start gap-5">
                                {/* Enhanced Avatar/Icon */}
                                <motion.div 
                                  className={`
                                    relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center
                                    border-2 shadow-xl ${avatarStyle.bg}
                                    ${!notification.read ? 'border-purple-500/50' : 'border-transparent'}
                                  `}
                                  whileHover={{ 
                                    rotate: [0, -12, 12, -12, 0],
                                    scale: 1.1
                                  }}
                                  transition={{ duration: 0.6 }}
                                >
                                  {avatarStyle.useIcon ? (
                                    <TypeIcon className={`w-7 h-7 ${avatarStyle.text}`} />
                                  ) : (
                                    <span className={`text-xl font-bold ${avatarStyle.text}`}>
                                      {notification.sender_name?.charAt(0).toUpperCase()}
                                    </span>
                                  )}

                                  {/* Online indicator for unread */}
                                  {!notification.read && (
                                    <motion.div 
                                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-[var(--surface)]"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    />
                                  )}
                                </motion.div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3 className={`
                                      text-lg font-bold leading-snug
                                      ${!notification.read ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}
                                      group-hover:${style.textClass} transition-colors
                                    `}>
                                      {notification.summary}
                                    </h3>
                                    {!notification.read && (
                                      <motion.button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          markAsRead(notification.message_uid);
                                        }}
                                        className="flex-shrink-0 p-2.5 rounded-xl hover:bg-[var(--surface-2)] text-purple-400 hover:text-purple-300 transition-all border border-transparent hover:border-purple-500/30"
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        whileTap={{ scale: 0.9 }}
                                        title="Mark as read"
                                      >
                                        <FaCheck className="w-4 h-4" />
                                      </motion.button>
                                    )}
                                  </div>

                                  {notification.description && (
                                    <div 
                                      className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-2"
                                      dangerouslySetInnerHTML={{ __html: notification.description }}
                                    />
                                  )}

                                  {/* Meta info with enhanced badges */}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {notification.sender_name && (
                                      <span className="inline-flex items-center gap-2 text-xs font-medium bg-[var(--surface-2)] px-3 py-1.5 rounded-lg border border-[var(--border-color)]">
                                        <FaUser className="w-3 h-3 text-purple-400" />
                                        {notification.sender_name}
                                      </span>
                                    )}
                                    <span className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] font-medium">
                                      <FaClock className="w-3 h-3" />
                                      {notification.time_since} ago
                                    </span>
                                    {notification.message_type && (
                                      <span className={`
                                        inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border-2
                                        ${style.badgeBg} ${style.badgeBorder} ${style.textClass} shadow-md ${style.glowClass}
                                      `}>
                                        <TypeIcon className="w-3 h-3" />
                                        {notification.message_type}
                                      </span>
                                    )}
                                    {!notification.read && (
                                      <motion.span 
                                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg shadow-purple-500/30"
                                        animate={{ 
                                          boxShadow: [
                                            '0 4px 12px rgba(168, 85, 247, 0.3)',
                                            '0 4px 20px rgba(168, 85, 247, 0.6)',
                                            '0 4px 12px rgba(168, 85, 247, 0.3)'
                                          ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      >
                                        <motion.span 
                                          className="w-2 h-2 bg-white rounded-full"
                                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                                          transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                        New
                                      </motion.span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Shine effect on hover */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '200%' }}
                                transition={{ duration: 0.8 }}
                              />
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Enhanced Sidebar Stats - Desktop */}
            {notifications.length > 0 && (
              <motion.aside 
                variants={itemVariants}
                className="hidden xl:block w-96 flex-shrink-0"
              >
                <div className="sticky top-24 space-y-5">
                  {/* Detailed Stats Cards */}
                  <motion.div
                    className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border-2 border-purple-500/30 shadow-xl backdrop-blur-sm"
                    variants={statCardVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                        <FaChartLine className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-lg">Read Progress</span>
                    </div>

                    <div className="mb-3 flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {notifications.filter(n => n.read).length} of {notifications.length} read
                      </span>
                      <motion.span 
                        className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {notifications.length > 0 
                          ? Math.round((notifications.filter(n => n.read).length / notifications.length) * 100)
                          : 0}%
                      </motion.span>
                    </div>

                    <div className="relative h-4 bg-[var(--surface)] rounded-full overflow-hidden border-2 border-[var(--border-color)] shadow-inner">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full shadow-lg"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: notifications.length > 0 
                            ? `${(notifications.filter(n => n.read).length / notifications.length) * 100}%`
                            : '0%'
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                      {/* Shine effect */}
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </div>
                  </motion.div>

                  {/* Type Breakdown */}
                  <motion.div
                    className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 shadow-xl backdrop-blur-sm"
                    variants={statCardVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                        <FaFilter className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-lg">By Type</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { type: 'info', label: 'Info', icon: FaInfoCircle, color: 'blue' },
                        { type: 'success', label: 'Success', icon: FaCheckCircle, color: 'emerald' },
                        { type: 'warning', label: 'Warning', icon: FaExclamationTriangle, color: 'amber' },
                        { type: 'danger', label: 'Danger', icon: FaTimesCircle, color: 'red' }
                      ].map((item) => {
                        const count = notifications.filter(n => n.message_type === item.type).length;
                        const percentage = notifications.length > 0 ? (count / notifications.length) * 100 : 0;
                        const Icon = item.icon;

                        return (
                          <motion.div 
                            key={item.type}
                            className="flex items-center gap-3"
                            whileHover={{ x: 4 }}
                          >
                            <Icon className={`w-5 h-5 text-${item.color}-400 flex-shrink-0`} />
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-[var(--text-secondary)]">
                                  {item.label}
                                </span>
                                <span className={`text-sm font-bold text-${item.color}-400`}>
                                  {count}
                                </span>
                              </div>
                              <div className={`h-2 bg-[var(--surface)] rounded-full overflow-hidden border border-${item.color}-500/20`}>
                                <motion.div 
                                  className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-full`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Achievement Card */}
                  {notifications.filter(n => n.read).length === notifications.length && notifications.length > 0 && (
                    <motion.div
                      className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/30 shadow-xl"
                      variants={statCardVariants}
                      whileHover="hover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <motion.div
                        className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-2xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.3, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                    </motion.div>
                  )}
                </div>
              </motion.aside>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Notifications;