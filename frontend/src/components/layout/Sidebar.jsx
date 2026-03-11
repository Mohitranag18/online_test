import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaBook, FaChartBar, FaChevronRight, FaTimes, FaBars } from 'react-icons/fa';
import Logo from '../ui/Logo';

// Animation variants
const sidebarVariants = {
  hidden: { 
    x: -280, 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.4,
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
    transition: { duration: 0.2 }
  }
};

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FaHome, color: 'from-blue-500 to-cyan-500' },
    { path: '/courses', label: 'Courses', icon: FaBook, color: 'from-purple-500 to-pink-500' },
    { path: '/insights', label: 'Insights', icon: FaChartBar, color: 'from-orange-500 to-red-500' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    if (path === '/courses') {
      return (
        location.pathname === path ||
        location.pathname.startsWith('/course') ||
        location.pathname.startsWith('/courses') ||
        location.pathname === '/add-course'
      );
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen z-50
          w-64 app-sidebar flex flex-col
          transition-transform duration-300 ease-in-out backdrop-blur-xl
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        initial={false}
        animate={isMobileOpen ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: {} }}
      >
        {/* Gradient accent border */}
        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 opacity-60" />

        {/* Logo Section */}
        <div className="h-16 lg:h-20 px-4 sm:px-6 border-b border-[var(--sidebar-border)] bg-gradient-to-r from-purple-500/5 to-pink-500/5 backdrop-blur-xl flex items-center justify-between flex-shrink-0 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
          </motion.div>
          
          <motion.button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTimes className="w-5 h-5" />
          </motion.button>
          
          <motion.button 
            className="hidden lg:block p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 sm:p-6 space-y-2 overflow-y-auto custom-scrollbar">
          <motion.div 
            className="space-y-2"
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <motion.div
                  key={item.path}
                  custom={index}
                  variants={navItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredItem(item.path)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`
                      sidebar-nav-item flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium
                      ${active ? 'active text-white' : 'text-[var(--text-secondary)]'}
                      group relative overflow-hidden
                    `}
                  >
                    {/* Animated background for hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10`}
                      initial={false}
                      animate={{ opacity: hoveredItem === item.path && !active ? 0.1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Icon with gradient background */}
                    <div className={`
                      relative z-10 p-2 rounded-lg transition-all duration-300
                      ${active 
                        ? 'bg-white/20 shadow-lg' 
                        : 'bg-white/5 group-hover:bg-white/10'
                      }
                    `}>
                      <Icon className={`w-5 h-5 nav-icon transition-all duration-300 ${
                        active ? 'text-white' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                      }`} />
                    </div>

                    {/* Label */}
                    <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
                      {item.label}
                    </span>

                    {/* Active indicator */}
                    <AnimatePresence>
                      {active && (
                        <motion.div
                          className="absolute right-3 w-2 h-2 bg-white rounded-full"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover shine effect */}
                    {!active && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: hoveredItem === item.path ? '100%' : '-100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div 
            className="pt-6 mt-6 border-t border-[var(--border-subtle)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <p className="text-xs font-medium text-[var(--text-secondary)] mb-1">
                🎓 Student Side
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Navigate through your learning journey
              </p>
            </div>
          </motion.div>
        </nav>
      </motion.aside>

      {/* Mobile Menu Toggle Button */}
      <AnimatePresence>
        {!isMobileOpen && (
          <motion.button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--grad-1), var(--grad-2))',
              boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)'
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            aria-label="Open menu"
          >
            <FaBars className="w-6 h-6 text-white" />
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{
                scale: [0, 2],
                opacity: [0.5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;