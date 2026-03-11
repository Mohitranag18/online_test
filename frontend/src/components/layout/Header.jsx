import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBell, 
  FaUser, 
  FaSun, 
  FaMoon, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaCheck,
  FaCheckDouble,
  FaArrowRight,
  FaClock,
  FaSync
} from 'react-icons/fa';
import Logo from '../ui/Logo';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/authStore';
import { useNotificationsStore } from '../../store/notificationsStore';
import { toggleModeratorRole, getModeratorStatus } from '../../api/api';

// Animation variants
const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

const mobileMenuVariants = {
  hidden: { 
    opacity: 0, 
    height: 0,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: { duration: 0.2 }
  }
};

const notificationItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  })
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

const Header = ({ isAuth = false, isLanding = false }) => {
  const { theme, toggleTheme } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  
  const { 
    notifications, 
    unreadCount, 
    isLoading,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead
  } = useNotificationsStore();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isModeratorActive, setIsModeratorActive] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Enhanced scroll detection for dynamic shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch notifications on mount and periodically
  useEffect(() => {
    if (isAuth && user) {
      fetchNotifications();
      fetchUnreadCount();

      const interval = setInterval(() => {
        fetchUnreadCount();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isAuth, user]);

  const handleSignOut = async () => {
    await logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/signin', { replace: true });
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification.message_uid);
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleToggleModerator = async () => {
    try {
      const response = await toggleModeratorRole();
      if (response.success) {
        setIsModeratorActive(response.is_moderator_active);
        setIsDropdownOpen(false);
        
        if (response.is_moderator_active) {
          window.location.href = '/teacher/dashboard';
        } else {
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      console.error('Failed to toggle moderator role:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchModeratorStatus = async () => {
      if (user?.is_moderator && isAuth) {
        try {
          const status = await getModeratorStatus();
          setIsModeratorActive(status.is_moderator_active);
        } catch (error) {
          console.error('Failed to fetch moderator status:', error);
          setIsModeratorActive(false);
        }
      } else {
        setIsModeratorActive(false);
      }
    };

    fetchModeratorStatus();
  }, [user, isAuth]);

  const ThemeToggle = () => (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 border border-[var(--border-color)] transition-all duration-200 overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0.8
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {theme === 'dark' ? (
          <FaSun className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        ) : (
          <FaMoon className="w-5 h-5 text-indigo-500" />
        )}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/10 group-hover:to-transparent pointer-events-none"
        initial={false}
        animate={{ opacity: theme === 'dark' ? 1 : 0 }}
      />
    </motion.button>
  );

  if (isLanding) {
    return (
      <motion.header 
        className="sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
        style={{
          background: 'var(--header-bg)',
          borderColor: 'var(--header-border)',
          boxShadow: isScrolled ? 'var(--header-shadow)' : '0 4px 16px rgba(0, 0, 0, 0.1)'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Logo size="md" />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ThemeToggle />
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/signin" 
                  className="px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-xl hover:bg-white/5 border border-transparent hover:border-[var(--border-color)]"
                >
                  Sign In
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/signup" 
                  className="relative px-6 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, var(--grad-1), var(--grad-2))',
                    boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 border border-[var(--border-color)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                ref={mobileMenuRef}
                className="md:hidden border-t border-[var(--border-color)] overflow-hidden"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="py-4 flex flex-col gap-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link 
                      to="/signin" 
                      className="block px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-xl font-medium transition-colors border border-transparent hover:border-[var(--border-color)]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Link 
                      to="/signup" 
                      className="block px-4 py-3 text-white text-center rounded-xl font-semibold"
                      style={{
                        background: 'linear-gradient(135deg, var(--grad-1), var(--grad-2))',
                        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)'
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    );
  }

  if (isAuth) {
    return (
      <motion.header 
        className="sticky top-0 z-50 backdrop-blur-xl transition-all duration-300"
        style={{
          background: 'var(--header-bg)',
          borderBottom: `1px solid var(--header-border)`,
          boxShadow: isScrolled ? 'var(--header-shadow)' : '0 4px 16px rgba(0, 0, 0, 0.1)'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Enhanced gradient top border */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-3 h-16 md:h-20">
            
            {/* Left: Mobile Logo */}
            <motion.div 
              className="flex items-center gap-2 md:hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Logo size="sm" showText={false} />
            </motion.div>

            {/* Right Side Actions */}
            <motion.div 
              className="flex items-center gap-2 sm:gap-3 ml-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <motion.button 
                  onClick={() => {
                    setIsNotificationOpen(!isNotificationOpen);
                    if (!isNotificationOpen) {
                      fetchNotifications();
                    }
                  }}
                  className="relative p-2.5 rounded-xl bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Notifications"
                >
                  <FaBell className="w-5 h-5" />
                  <AnimatePresence>
                    {unreadCount > 0 && (
                      <motion.span 
                        className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/50"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </motion.span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {isNotificationOpen && (
                    <>
                      {/* Mobile Overlay */}
                      <motion.div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setIsNotificationOpen(false)}
                      />
                      
                      {/* Dropdown Panel */}
                      <motion.div 
                        className="fixed md:absolute inset-x-4 top-20 md:inset-x-auto md:right-0 md:top-auto md:mt-3 w-auto md:w-96 max-w-md mx-auto md:mx-0 bg-[var(--surface)] border-2 border-[var(--border-color)] rounded-2xl overflow-hidden z-50"
                        style={{
                          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(124, 58, 237, 0.1)'
                        }}
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        
                        {/* Header */}
                        <div className="px-4 py-4 border-b border-[var(--border-color)] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-sm">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <motion.div 
                                className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex-shrink-0 shadow-lg shadow-purple-500/30"
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                <FaBell className="w-4 h-4 text-white" />
                              </motion.div>
                              <div>
                                <h3 className="font-bold text-[var(--text-primary)] text-sm">
                                  Notifications
                                </h3>
                                {unreadCount > 0 && (
                                  <p className="text-xs text-purple-400 font-medium">
                                    {unreadCount} new
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {notifications.length > 0 && unreadCount > 0 && (
                                <motion.button
                                  onClick={handleMarkAllAsRead}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium transition-all hover:bg-purple-500/10 rounded-lg border border-purple-500/20"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaCheckDouble className="w-3 h-3" />
                                  <span className="hidden sm:inline">Mark all</span>
                                </motion.button>
                              )}
                              <motion.button
                                onClick={() => setIsNotificationOpen(false)}
                                className="md:hidden p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <FaTimes className="w-4 h-4 text-[var(--text-secondary)]" />
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-[60vh] md:max-h-[28rem] overflow-y-auto custom-scrollbar">
                          {isLoading ? (
                            <div className="px-4 py-12 text-center">
                              <motion.div 
                                className="inline-block w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full mb-3"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <p className="text-sm text-[var(--text-secondary)]">Loading notifications...</p>
                            </div>
                          ) : notifications.length === 0 ? (
                            <motion.div 
                              className="px-4 py-12 text-center"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center">
                                <FaBell className="w-8 h-8 text-[var(--text-secondary)] opacity-40" />
                              </div>
                              <p className="text-sm font-medium text-[var(--text-primary)] mb-1">All caught up!</p>
                              <p className="text-xs text-[var(--text-secondary)]">No new notifications</p>
                            </motion.div>
                          ) : (
                            <div className="divide-y divide-[var(--border-subtle)]">
                              {notifications.map((notif, index) => (
                                <motion.div
                                  key={notif.message_uid}
                                  custom={index}
                                  variants={notificationItemVariants}
                                  initial="hidden"
                                  animate="visible"
                                  onClick={() => handleNotificationClick(notif)}
                                  className={`group relative px-4 py-4 hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-pink-500/5 cursor-pointer transition-all ${
                                    !notif.read ? 'bg-purple-500/5' : ''
                                  }`}
                                  whileHover={{ x: 4 }}
                                >
                                  {!notif.read && (
                                    <motion.div 
                                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500"
                                      layoutId={`unread-${notif.message_uid}`}
                                    />
                                  )}

                                  <div className="flex items-start gap-3">
                                    <motion.div 
                                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                                        notif.message_type === 'success' ? 'bg-green-500/20 text-green-400' :
                                        notif.message_type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                                        notif.message_type === 'danger' ? 'bg-red-500/20 text-red-400' :
                                        'bg-purple-500/20 text-purple-400'
                                      }`}
                                      whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                      {notif.sender_name ? (
                                        <span className="text-sm font-semibold">
                                          {notif.sender_name.charAt(0).toUpperCase()}
                                        </span>
                                      ) : (
                                        <FaBell className="w-4 h-4" />
                                      )}
                                    </motion.div>

                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2 mb-1">
                                        <p className="text-sm font-semibold text-[var(--text-primary)] line-clamp-2 group-hover:text-purple-400 transition-colors">
                                          {notif.summary}
                                        </p>
                                        {!notif.read && (
                                          <motion.button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              markAsRead(notif.message_uid);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-purple-500/20 text-purple-400"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            title="Mark as read"
                                          >
                                            <FaCheck className="w-3.5 h-3.5" />
                                          </motion.button>
                                        )}
                                      </div>

                                      {notif.description && (
                                        <div 
                                          className="text-xs text-[var(--text-secondary)] mb-2 line-clamp-2 leading-relaxed"
                                          dangerouslySetInnerHTML={{ __html: notif.description }}
                                        />
                                      )}

                                      <div className="flex items-center gap-2 flex-wrap">
                                        {notif.sender_name && (
                                          <span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] bg-white/5 px-2 py-0.5 rounded-md border border-[var(--border-subtle)]">
                                            <FaUser className="w-2.5 h-2.5" />
                                            {notif.sender_name}
                                          </span>
                                        )}
                                        <span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                                          <FaClock className="w-2.5 h-2.5" />
                                          {notif.time_since} ago
                                        </span>
                                        {notif.message_type && (
                                          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md ${
                                            notif.message_type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                            notif.message_type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                            notif.message_type === 'danger' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                          }`}>
                                            {notif.message_type}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                          <motion.div 
                            className="px-4 py-3 border-t border-[var(--border-color)] bg-gradient-to-r from-purple-500/5 to-pink-500/5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <motion.button 
                              onClick={() => {
                                setIsNotificationOpen(false);
                                navigate('/notifications');
                              }}
                              className="w-full py-2 text-sm text-purple-400 hover:text-purple-300 font-medium transition-all hover:bg-purple-500/10 rounded-lg group flex items-center justify-center gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span>View All Notifications</span>
                              <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                          </motion.div>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 border border-[var(--border-color)] transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 8px 20px rgba(124, 58, 237, 0.4)"
                    }}
                  >
                    {user?.first_name?.charAt(0) || 'U'}
                  </motion.div>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden sm:block"
                  >
                    <FaChevronDown className="w-3 h-3 text-[var(--text-secondary)]" />
                  </motion.div>
                </motion.button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      className="absolute right-0 mt-3 w-64 bg-[var(--surface)] border-2 border-[var(--border-color)] rounded-2xl overflow-hidden z-50"
                      style={{
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(124, 58, 237, 0.1)'
                      }}
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      
                      {/* User Info */}
                      <div className="px-4 py-4 border-b border-[var(--border-color)] bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                        <motion.div 
                          className="flex items-center gap-3 mb-3"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                            {user?.first_name?.charAt(0) || 'U'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[var(--text-primary)] truncate">
                              {user?.first_name} {user?.last_name}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] truncate">
                              {user?.email}
                            </p>
                          </div>
                        </motion.div>
                        <motion.span 
                          className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {user?.is_moderator ? '✨ Teacher' : '🎓 Student'}
                        </motion.span>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/5 hover:text-[var(--text-primary)] transition-all group border-l-2 border-transparent hover:border-purple-500"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <FaUser className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">My Profile</span>
                          </Link>
                        </motion.div>
                        
                        {user?.is_moderator && (
                          <>
                            <div className="border-t border-[var(--border-subtle)] my-2"></div>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 }}
                            >
                              <motion.button
                                onClick={handleToggleModerator}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/5 hover:text-[var(--text-primary)] transition-all group border-l-2 border-transparent hover:border-purple-500"
                                whileHover={{ x: 2 }}
                              >
                                <motion.div
                                  animate={{ rotate: isModeratorActive ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <FaSync className="w-4 h-4" />
                                </motion.div>
                                <span className="font-medium">{isModeratorActive ? 'Switch To Student' : 'Switch To Teacher'}</span>
                              </motion.button>
                            </motion.div>
                            <div className="border-t border-[var(--border-subtle)] my-2"></div>
                          </>
                        )}
                        
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: user?.is_moderator ? 0.2 : 0.15 }}
                        >
                          <Link
                            to="/settings"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/5 hover:text-[var(--text-primary)] transition-all group border-l-2 border-transparent hover:border-purple-500"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <motion.div
                              whileHover={{ rotate: 90 }}
                              transition={{ duration: 0.3 }}
                            >
                              <FaCog className="w-4 h-4" />
                            </motion.div>
                            <span className="font-medium">Settings</span>
                          </Link>
                        </motion.div>
                      </div>

                      {/* Sign Out */}
                      <div className="border-t border-[var(--border-color)] py-2 bg-red-500/5">
                        <motion.button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group font-medium border-l-2 border-transparent hover:border-red-500"
                          whileHover={{ x: 2 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 }}
                        >
                          <FaSignOutAlt className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          <span>Sign Out</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>  
      </motion.header>
    );
  }

  return null;
};

export default Header;