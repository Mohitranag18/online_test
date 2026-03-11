import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLinkedin, 
  FaGithub, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGraduationCap,
  FaCamera,
  FaGlobe,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSave,
  FaTimes,
  FaEdit,
  FaPlus,
  FaTrash,
  FaChartLine,
  FaStar,
  FaTrophy,
  FaAward,
  FaFire,
  FaShieldAlt,
  FaCode,
  FaUserGraduate
} from 'react-icons/fa';
import Header from '../components/layout/Header';
import StudentSidebar from '../components/layout/Sidebar';
import TeacherSidebar from '../components/layout/TeacherSidebar';
import { useAuthStore } from '../store/authStore';
import { getUserProfile, patchUserProfile, getModeratorStatus } from '../api/api';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
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

const avatarVariants = {
  hover: {
    scale: 1.05,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      rotate: {
        duration: 0.5
      },
      scale: {
        duration: 0.2
      }
    }
  }
};

const skillBadgeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  hover: {
    scale: 1.1,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const Profile = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModeratorActive, setIsModeratorActive] = useState(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    display_name: '',
    bio: '',
    email: '',
    phone: '',
    city: '',
    country: 'India',
    linkedin: '',
    github: '',
    roll_number: '',
    institute: '',
    department: '',
    position: '',
    timezone: 'Asia/Kolkata'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState(['Data Structures', 'Algorithms', 'SQL', 'React', 'Python', 'JavaScript']);
  const [loading, setLoading] = useState(true);

  // Determine if user is currently in teacher mode
  const isTeacher = user?.is_moderator && isModeratorActive;

  // Fetch active moderator status on mount
  useEffect(() => {
    const fetchModeratorStatus = async () => {
      if (user?.is_moderator && isAuthenticated) {
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
  }, [user, isAuthenticated]);

  // Fetch profile data on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();
        const userData = response.user;
        setProfileData(userData);
        
        setFormData({
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          display_name: userData.display_name || '',
          bio: userData.bio || '',
          email: userData.email || '',
          phone: userData.phone || '',
          city: userData.city || '',
          country: userData.country || 'India',
          linkedin: userData.linkedin || '',
          github: userData.github || '',
          roll_number: userData.roll_number || '',
          institute: userData.institute || '',
          department: userData.department || '',
          position: userData.position || '',
          timezone: userData.timezone || 'Asia/Kolkata'
        });
      } catch (error) {
        console.error('Failed to load profile:', error);
        showMessage('error', 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadProfile();
    }
  }, [isAuthenticated]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const changedFields = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== profileData?.[key]) {
          changedFields[key] = formData[key];
        }
      });

      if (Object.keys(changedFields).length === 0) {
        showMessage('info', 'No changes to save');
        setIsSaving(false);
        return;
      }

      const response = await patchUserProfile(changedFields);
      
      if (response.message) {
        setProfileData(response.user);
        showMessage('success', 'Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      showMessage('error', error.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profileData) {
      setFormData({
        first_name: profileData.first_name || '',
        last_name: profileData.last_name || '',
        display_name: profileData.display_name || '',
        bio: profileData.bio || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        city: profileData.city || '',
        country: profileData.country || 'India',
        linkedin: profileData.linkedin || '',
        github: profileData.github || '',
        roll_number: profileData.roll_number || '',
        institute: profileData.institute || '',
        department: profileData.department || '',
        position: profileData.position || '',
        timezone: profileData.timezone || 'Asia/Kolkata'
      });
    }
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const calculateProfileCompleteness = () => {
    const fields = [
      formData.first_name,
      formData.last_name,
      formData.email,
      formData.bio,
      formData.phone,
      formData.city,
      formData.institute,
      formData.department,
      formData.linkedin || formData.github
    ];
    const filledFields = fields.filter(field => field && field.trim()).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const completeness = calculateProfileCompleteness();

  // Get avatar colors based on name
  const getAvatarGradient = () => {
    const gradients = [
      'from-blue-500 via-cyan-500 to-teal-500',
      'from-purple-500 via-pink-500 to-rose-500',
      'from-emerald-500 via-green-500 to-teal-500',
      'from-orange-500 via-amber-500 to-yellow-500',
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-red-500 via-rose-500 to-pink-500',
      'from-teal-500 via-cyan-500 to-blue-500',
      'from-amber-500 via-orange-500 to-red-500'
    ];
    const name = formData.first_name || 'U';
    const index = name.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

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
            <FaUser className="w-16 h-16 text-purple-400" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Access Denied
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 text-lg">
            Please sign in to view your profile
          </p>
          <Link to="/signin">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-xl font-semibold hover:brightness-110 transition-all shadow-lg shadow-purple-500/30 text-white"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        {isTeacher ? <TeacherSidebar /> : <StudentSidebar />}
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
                  <FaUser className="w-6 h-6 text-purple-400" />
                </div>
              </motion.div>
              <p className="text-[var(--text-secondary)] text-lg font-medium">Loading your profile...</p>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen relative">
      {isTeacher ? <TeacherSidebar /> : <StudentSidebar />}

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
                  <FaUser className="w-8 h-8 text-purple-400" />
                </motion.div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    My Profile
                  </h1>
                  <p className="text-base text-[var(--text-secondary)] mt-1">
                    Manage your account information and preferences
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status Message with Animation */}
          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className={`mb-6 p-5 rounded-2xl border-2 backdrop-blur-sm ${
                  message.type === 'success' 
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-500/20' :
                  message.type === 'error' 
                    ? 'bg-red-500/10 border-red-500/50 text-red-400 shadow-lg shadow-red-500/20' :
                    'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: message.type === 'success' ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {message.type === 'success' ? <FaCheckCircle className="w-6 h-6" /> : <FaTimesCircle className="w-6 h-6" />}
                  </motion.div>
                  <span className="font-medium text-lg">{message.text}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col xl:flex-row gap-6">
            {/* Main Profile Card */}
            <motion.div variants={itemVariants} className="flex-1 min-w-0">
              <div className="card-strong rounded-2xl overflow-hidden border-2 border-[var(--border-color)] shadow-xl">
                
                {/* Enhanced Card Header with Avatar */}
                <div className="relative overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${getAvatarGradient()} opacity-10`} />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                  
                  <div className="relative p-6 border-b-2 border-[var(--border-color)]">
                    <div className="flex items-start gap-6 flex-wrap">
                      {/* Enhanced Avatar */}
                      <div className="relative group">
                        <motion.div
                          className="relative"
                          variants={avatarVariants}
                          whileHover="hover"
                        >
                          <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${getAvatarGradient()} p-1 shadow-2xl`}>
                            <div className="w-full h-full rounded-3xl bg-[var(--surface)] flex items-center justify-center overflow-hidden">
                              <span className="text-4xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
                                {formData.first_name?.charAt(0)}{formData.last_name?.charAt(0)}
                              </span>
                            </div>
                          </div>
                          
                          {/* Edit overlay */}
                          {isEditing && (
                            <motion.button 
                              type="button"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`absolute -bottom-2 -right-2 p-3 rounded-xl bg-gradient-to-r ${getAvatarGradient()} text-white shadow-xl border-2 border-[var(--surface)] transition-all`}
                              onClick={() => alert('Avatar upload coming soon!')}
                            >
                              <FaCamera className="w-4 h-4" />
                            </motion.button>
                          )}
                        </motion.div>

                        {/* Status indicator */}
                        <motion.div 
                          className="absolute top-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[var(--surface)] shadow-lg"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="min-w-0 flex-1">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              {formData.display_name || `${formData.first_name} ${formData.last_name}`}
                            </h2>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border-color)] rounded-lg text-sm font-medium">
                                @{user?.username}
                              </span>
                              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold border-2 ${
                                isTeacher 
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                                  : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                              }`}>
                                {isTeacher ? <FaShieldAlt className="w-4 h-4" /> : <FaUserGraduate className="w-4 h-4" />}
                                {formData.position || (isTeacher ? 'Teacher' : 'Student')}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          {!isEditing && (
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <motion.button
                                type="button"
                                onClick={() => setIsSummaryOpen(true)}
                                className="xl:hidden p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FaChartLine className="w-5 h-5" />
                              </motion.button>
                              
                              <motion.button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FaEdit className="w-5 h-5" />
                                <span className="hidden sm:inline">Edit Profile</span>
                              </motion.button>
                            </div>
                          )}
                        </div>

                        {formData.bio && (
                          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-3">
                            {formData.bio}
                          </p>
                        )}

                        {/* Quick Info Tags */}
                        <div className="flex items-center gap-3 flex-wrap mt-4">
                          {formData.city && (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--surface-2)] border border-[var(--border-color)] rounded-lg text-sm">
                              <FaMapMarkerAlt className="w-3 h-3 text-purple-400" />
                              {formData.city}, {formData.country}
                            </span>
                          )}
                          {formData.institute && (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--surface-2)] border border-[var(--border-color)] rounded-lg text-sm">
                              <FaGraduationCap className="w-3 h-3 text-blue-400" />
                              {formData.institute}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSave}>
                  <div className="p-6 lg:p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-8">
                        {/* Personal Information */}
                        <motion.div variants={itemVariants}>
                          <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                              <FaUser className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">Personal Information</h3>
                              <p className="text-xs text-[var(--text-secondary)]">Basic details about yourself</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                  First Name *
                                </label>
                                <input
                                  type="text"
                                  value={formData.first_name}
                                  onChange={(e) => handleChange('first_name', e.target.value)}
                                  disabled={!isEditing}
                                  required
                                  placeholder="First name"
                                  className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-purple-500/50"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                  Last Name *
                                </label>
                                <input
                                  type="text"
                                  value={formData.last_name}
                                  onChange={(e) => handleChange('last_name', e.target.value)}
                                  disabled={!isEditing}
                                  required
                                  placeholder="Last name"
                                  className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-purple-500/50"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                Display Name
                              </label>
                              <input
                                type="text"
                                value={formData.display_name}
                                onChange={(e) => handleChange('display_name', e.target.value)}
                                disabled={!isEditing}
                                placeholder="How you want to be called"
                                className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-purple-500/50"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                Bio
                              </label>
                              <textarea
                                value={formData.bio}
                                onChange={(e) => handleChange('bio', e.target.value)}
                                disabled={!isEditing}
                                rows="4"
                                placeholder="Tell us about yourself..."
                                className="w-full px-4 py-3 rounded-xl resize-none text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-purple-500/50"
                                maxLength={500}
                              />
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-xs text-[var(--text-muted)]">
                                  {formData.bio?.length || 0}/500 characters
                                </p>
                                {formData.bio && formData.bio.length > 450 && (
                                  <span className="text-xs text-amber-400">Nearly at limit!</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div variants={itemVariants}>
                          <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                              <FaEnvelope className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">Contact & Location</h3>
                              <p className="text-xs text-[var(--text-secondary)]">How to reach you</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                Email *
                              </label>
                              <div className="relative">
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => handleChange('email', e.target.value)}
                                  disabled={!isEditing}
                                  required
                                  placeholder="your.email@example.com"
                                  className="w-full px-4 py-3 pl-11 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-blue-500/50"
                                />
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                Phone
                              </label>
                              <div className="relative">
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) => handleChange('phone', e.target.value)}
                                  disabled={!isEditing}
                                  placeholder="+91 XXXXX XXXXX"
                                  className="w-full px-4 py-3 pl-11 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-blue-500/50"
                                />
                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                  City
                                </label>
                                <input
                                  type="text"
                                  value={formData.city}
                                  onChange={(e) => handleChange('city', e.target.value)}
                                  disabled={!isEditing}
                                  placeholder="Your city"
                                  className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-blue-500/50"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                  Country
                                </label>
                                <select
                                  value={formData.country}
                                  onChange={(e) => handleChange('country', e.target.value)}
                                  disabled={!isEditing}
                                  className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-blue-500/50"
                                >
                                  <option value="India">India</option>
                                  <option value="United States">United States</option>
                                  <option value="United Kingdom">United Kingdom</option>
                                  <option value="Canada">Canada</option>
                                  <option value="Australia">Australia</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                <FaClock className="inline w-4 h-4 mr-2 text-purple-400" />
                                Timezone
                              </label>
                              <select
                                value={formData.timezone}
                                onChange={(e) => handleChange('timezone', e.target.value)}
                                disabled={!isEditing}
                                className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-blue-500/50"
                              >
                                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                                <option value="Europe/London">Europe/London (GMT)</option>
                                <option value="America/New_York">America/New York (EST)</option>
                                <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                                <option value="UTC">UTC</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-8">
                        {/* Educational Information */}
                        <motion.div variants={itemVariants}>
                          <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                              <FaGraduationCap className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">Educational Information</h3>
                              <p className="text-xs text-[var(--text-secondary)]">Academic details</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                  Roll Number
                                </label>
                                <input
                                  type="text"
                                  value={formData.roll_number}
                                  onChange={(e) => handleChange('roll_number', e.target.value)}
                                  disabled={!isEditing}
                                  placeholder="Roll no."
                                  className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-emerald-500/50"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                  Position
                                </label>
                                <input
                                  type="text"
                                  value={formData.position}
                                  onChange={(e) => handleChange('position', e.target.value)}
                                  disabled={!isEditing}
                                  placeholder="e.g., Student"
                                  className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-emerald-500/50"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                Institute
                              </label>
                              <input
                                type="text"
                                value={formData.institute}
                                onChange={(e) => handleChange('institute', e.target.value)}
                                disabled={!isEditing}
                                placeholder="Enter institute name"
                                className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-emerald-500/50"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                Department
                              </label>
                              <input
                                type="text"
                                value={formData.department}
                                onChange={(e) => handleChange('department', e.target.value)}
                                disabled={!isEditing}
                                placeholder="e.g., Computer Science"
                                className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-emerald-500/50"
                              />
                            </div>

                            {/* Enhanced Skills Section */}
                            <div className="pt-4 border-t-2 border-[var(--border-color)]">
                              <div className="flex justify-between items-center mb-4">
                                <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
                                  <FaCode className="w-4 h-4 text-cyan-400" />
                                  Skills & Technologies
                                </label>
                                <motion.span 
                                  className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-bold text-cyan-400"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  {skills.length} skills
                                </motion.span>
                              </div>
                              
                              <motion.div 
                                className="flex flex-wrap gap-2 mb-4"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                              >
                                <AnimatePresence mode="popLayout">
                                  {skills.map((skill, index) => (
                                    <motion.div
                                      key={skill}
                                      variants={skillBadgeVariants}
                                      initial="hidden"
                                      animate="visible"
                                      exit={{ scale: 0, opacity: 0 }}
                                      whileHover="hover"
                                      layout
                                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-xl text-sm font-medium text-cyan-400 shadow-lg shadow-cyan-500/10"
                                    >
                                      <span>{skill}</span>
                                      {isEditing && (
                                        <motion.button
                                          type="button"
                                          onClick={() => handleRemoveSkill(skill)}
                                          className="hover:text-red-400 transition-colors p-1"
                                          whileHover={{ scale: 1.2, rotate: 90 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <FaTimes className="w-3 h-3" />
                                        </motion.button>
                                      )}
                                    </motion.div>
                                  ))}
                                </AnimatePresence>
                              </motion.div>

                              {isEditing && (
                                <motion.div 
                                  className="flex gap-2"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                    placeholder="Add a skill..."
                                    className="flex-1 px-4 py-3 rounded-xl text-sm border-2 focus:border-cyan-500/50 transition-all"
                                  />
                                  <motion.button
                                    type="button"
                                    onClick={handleAddSkill}
                                    className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-all shadow-lg shadow-cyan-500/30"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <FaPlus className="w-5 h-5" />
                                  </motion.button>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={itemVariants}>
                          <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30">
                              <FaGlobe className="w-5 h-5 text-pink-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">Social Links</h3>
                              <p className="text-xs text-[var(--text-secondary)]">Connect your social profiles</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                <FaLinkedin className="inline w-4 h-4 mr-2 text-blue-400" />
                                LinkedIn Profile
                              </label>
                              <input
                                type="url"
                                value={formData.linkedin}
                                onChange={(e) => handleChange('linkedin', e.target.value)}
                                disabled={!isEditing}
                                placeholder="https://www.linkedin.com/in/your-profile"
                                className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-blue-500/50"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                                <FaGithub className="inline w-4 h-4 mr-2 text-gray-400" />
                                GitHub Profile
                              </label>
                              <input
                                type="url"
                                value={formData.github}
                                onChange={(e) => handleChange('github', e.target.value)}
                                disabled={!isEditing}
                                placeholder="https://github.com/your-username"
                                className="w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 focus:border-gray-500/50"
                              />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                      <motion.div 
                        className="flex justify-between gap-4 mt-8 pt-6 border-t-2 border-[var(--border-color)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.button
                          type="button"
                          onClick={handleCancel}
                          disabled={isSaving}
                          className="flex-1 sm:flex-initial px-8 py-4 border-2 border-[var(--border-color)] rounded-xl font-semibold hover:bg-[var(--surface-2)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaTimes className="w-5 h-5" />
                          <span>Cancel</span>
                        </motion.button>
                        
                        <motion.button
                          type="submit"
                          disabled={isSaving}
                          className="flex-1 sm:flex-initial px-10 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/30"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSaving ? (
                            <>
                              <motion.div 
                                className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <FaSave className="w-5 h-5" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Enhanced Profile Summary Sidebar - Desktop */}
            <motion.aside 
              variants={itemVariants}
              className="hidden xl:block w-96 flex-shrink-0"
            >
              <div className="sticky top-24 space-y-5">
                {/* Profile Completeness Card */}
                <motion.div
                  className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border-2 border-purple-500/30 shadow-xl backdrop-blur-sm"
                  variants={statCardVariants}
                  whileHover="hover"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                      <FaChartLine className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Profile Summary</h3>
                      <p className="text-xs text-[var(--text-secondary)]">Your profile overview</p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-[var(--text-secondary)]">Completeness</span>
                      <motion.span 
                        className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {completeness}%
                      </motion.span>
                    </div>
                    <div className="relative w-full h-4 bg-[var(--surface)] rounded-full overflow-hidden border-2 border-[var(--border-color)] shadow-inner">
                      <motion.div 
                        className={`absolute top-0 left-0 h-full rounded-full ${
                          completeness >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                          completeness >= 50 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                          'bg-gradient-to-r from-red-500 to-rose-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${completeness}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-3 flex items-center gap-2">
                      {completeness >= 80 ? (
                        <><FaTrophy className="text-amber-400" /> Great! Your profile is complete</>
                      ) : completeness >= 50 ? (
                        <><FaStar className="text-amber-400" /> Good progress! Add more details</>
                      ) : (
                        <><FaFire className="text-red-400" /> Let's complete your profile</>
                      )}
                    </p>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 shadow-xl"
                    variants={statCardVariants}
                    whileHover="hover"
                  >
                    <motion.div
                      className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isTeacher ? (profileData?.teacher_courses_count || 0) : (profileData?.student_enrolled_count || 0)}
                    </motion.div>
                    <div className="text-xs font-semibold text-[var(--text-secondary)]">
                      {isTeacher ? 'Courses' : 'Enrolled'}
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 shadow-xl"
                    variants={statCardVariants}
                    whileHover="hover"
                  >
                    <motion.div
                      className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isTeacher ? (profileData?.teacher_students_count || 0) : (profileData?.student_completed_count || 0)}
                    </motion.div>
                    <div className="text-xs font-semibold text-[var(--text-secondary)]">
                      {isTeacher ? 'Students' : 'Completed'}
                    </div>
                  </motion.div>
                </div>

                {/* Account Info Card */}
                <motion.div
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 shadow-xl backdrop-blur-sm"
                  variants={statCardVariants}
                  whileHover="hover"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
                      <FaUser className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold">Account Info</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-xl">
                      <span className="text-sm text-[var(--text-secondary)]">Username</span>
                      <span className="text-sm font-bold">@{user?.username}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-xl">
                      <span className="text-sm text-[var(--text-secondary)]">Role</span>
                      <span className={`text-sm font-bold ${isTeacher ? 'text-emerald-400' : 'text-blue-400'}`}>
                        {isTeacher ? 'Teacher' : 'Student'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-xl">
                      <span className="text-sm text-[var(--text-secondary)]">Location</span>
                      <span className="text-sm font-bold text-right flex-1 ml-2 truncate">
                        {formData.city ? `${formData.city}, ${formData.country}` : 'Not set'}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links Summary */}
                {(formData.linkedin || formData.github) && (
                  <motion.div
                    className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-2 border-pink-500/30 shadow-xl"
                    variants={statCardVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500">
                        <FaGlobe className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold">Social Profiles</h4>
                    </div>
                    <div className="space-y-3">
                      {formData.linkedin && (
                        <motion.a 
                          href={formData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-blue-500/10 hover:bg-blue-500/20 border-2 border-blue-500/30 rounded-xl transition-all group"
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaLinkedin className="w-6 h-6 text-blue-400" />
                          <span className="text-sm font-semibold group-hover:text-blue-400 transition-colors">LinkedIn</span>
                        </motion.a>
                      )}
                      {formData.github && (
                        <motion.a 
                          href={formData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-gray-500/10 hover:bg-gray-500/20 border-2 border-gray-500/30 rounded-xl transition-all group"
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaGithub className="w-6 h-6 text-gray-400" />
                          <span className="text-sm font-semibold group-hover:text-gray-300 transition-colors">GitHub</span>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.aside>
          </div>
        </motion.div>
      </main>

      {/* Mobile Summary Drawer */}
      <AnimatePresence>
        {isSummaryOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="xl:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setIsSummaryOpen(false)}
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="xl:hidden fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--surface)] shadow-2xl z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-[var(--surface)] border-b-2 border-[var(--border-color)] p-5 flex items-center justify-between z-10 backdrop-blur-sm">
                <div>
                  <h3 className="text-xl font-bold">Profile Summary</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Your profile overview</p>
                </div>
                <motion.button
                  onClick={() => setIsSummaryOpen(false)}
                  className="p-3 hover:bg-[var(--surface-2)] rounded-xl transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="p-5 space-y-5">
                {/* All the same cards as desktop but in mobile drawer */}
                {/* Profile Completeness */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border-2 border-purple-500/30 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <FaChartLine className="w-6 h-6 text-purple-400" />
                    <h4 className="text-lg font-bold">Completeness</h4>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        {completeness}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[var(--surface-2)] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          completeness >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                          completeness >= 50 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                          'bg-gradient-to-r from-red-500 to-rose-500'
                        }`}
                        style={{ width: `${completeness}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-blue-500/10 border-2 border-blue-500/30 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">
                      {isTeacher ? (profileData?.teacher_courses_count || 0) : (profileData?.student_enrolled_count || 0)}
                    </div>
                    <div className="text-xs font-semibold text-[var(--text-secondary)]">
                      {isTeacher ? 'Courses' : 'Enrolled'}
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">
                      {isTeacher ? (profileData?.teacher_students_count || 0) : (profileData?.student_completed_count || 0)}
                    </div>
                    <div className="text-xs font-semibold text-[var(--text-secondary)]">
                      {isTeacher ? 'Students' : 'Completed'}
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FaUser className="w-5 h-5 text-amber-400" />
                    Account Info
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-[var(--surface-2)] rounded-xl">
                      <span className="text-sm text-[var(--text-secondary)]">Username</span>
                      <span className="text-sm font-bold">@{user?.username}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[var(--surface-2)] rounded-xl">
                      <span className="text-sm text-[var(--text-secondary)]">Role</span>
                      <span className={`text-sm font-bold ${isTeacher ? 'text-emerald-400' : 'text-blue-400'}`}>
                        {isTeacher ? 'Teacher' : 'Student'}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-[var(--surface-2)] rounded-xl">
                      <span className="text-sm text-[var(--text-secondary)]">Location</span>
                      <span className="text-sm font-bold truncate ml-2">
                        {formData.city ? `${formData.city}, ${formData.country}` : 'Not set'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                {(formData.linkedin || formData.github) && (
                  <div className="p-5 rounded-2xl bg-pink-500/10 border-2 border-pink-500/30">
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <FaGlobe className="w-5 h-5 text-pink-400" />
                      Social Profiles
                    </h4>
                    <div className="space-y-3">
                      {formData.linkedin && (
                        <a 
                          href={formData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl"
                        >
                          <FaLinkedin className="w-6 h-6 text-blue-400" />
                          <span className="text-sm font-semibold">LinkedIn</span>
                        </a>
                      )}
                      {formData.github && (
                        <a 
                          href={formData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-gray-500/10 border-2 border-gray-500/30 rounded-xl"
                        >
                          <FaGithub className="w-6 h-6 text-gray-400" />
                          <span className="text-sm font-semibold">GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;