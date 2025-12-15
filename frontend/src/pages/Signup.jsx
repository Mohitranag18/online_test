import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook, FaStar, FaCheckCircle, FaGraduationCap, FaChalkboardTeacher, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import Logo from '../components/ui/Logo';
import { useAuthStore } from '../store/authStore';

const Signup = () => {
  const navigate = useNavigate();
  const { register, user, isAuthenticated, isLoading, error, initializeAuth, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    role: 'student',
  });

  const [formErrors, setFormErrors] = useState({});

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    clearError();

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.fullName.split(' ')[0] || '',
      lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
      role: formData.role
    };

    try {
      const result = await register(userData);

      if (result.success && result.user) {
        // Redirect based on user role
        if (result.user.role === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login coming soon!`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left side (Brand / Illustration) */}
      <div className="hidden lg:flex flex-col justify-center items-center w-full lg:w-1/2 min-h-screen bg-gradient-to-br from-[#0e0e14] to-[#1a1a2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/15 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-md px-6 md:px-10 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 logo-badge rounded-xl md:rounded-2xl flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold">Y</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 md:mb-4 tracking-tight">
            Welcome to <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Yaksh</span>
          </h1>
          <p className="soft text-base md:text-lg leading-relaxed">
            Learn, grow, and achieve milestones — all in one platform.
            Unlock badges, complete courses, and showcase your learning journey.
          </p>

          {/* Icons */}
          <div className="mt-8 md:mt-12 flex justify-center gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <FaBook className="w-6 h-6 md:w-8 md:h-8 text-indigo-400" />
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <FaStar className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <FaCheckCircle className="w-6 h-6 md:w-8 md:h-8 text-pink-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Right side (Signup Form) */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-b from-[var(--bg-1)] to-[var(--bg-2)] px-4 sm:px-6 md:px-8 lg:px-16 overflow-y-auto min-h-screen relative grid-texture">
        <div className="w-full max-w-md space-y-4 sm:space-y-5 py-6 sm:py-8 md:py-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-4">
            <div className="w-14 h-14 logo-badge rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold">Y</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-1 sm:mb-2">Register ✨</h2>
            <p className="text-[var(--text-muted)] text-xs sm:text-sm">Choose your account type and start your journey with us</p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${
                formData.role === 'student'
                  ? 'border-indigo-500 bg-indigo-500/20'
                  : 'border-[var(--border-color)] bg-[var(--input-bg)] hover:bg-[var(--hover-bg)]'
              }`}
            >
              <FaGraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400 mx-auto mb-2" />
              <div className="text-[var(--text-primary)] font-semibold text-sm sm:text-base mb-1">Student</div>
              <div className="text-[var(--text-muted)] text-[10px] sm:text-xs leading-tight">Take quizzes and track your progress</div>
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect('teacher')}
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${
                formData.role === 'teacher'
                  ? 'border-indigo-500 bg-indigo-500/20'
                  : 'border-[var(--border-color)] bg-[var(--input-bg)] hover:bg-[var(--hover-bg)]'
              }`}
            >
              <FaChalkboardTeacher className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400 mx-auto mb-2" />
              <div className="text-[var(--text-primary)] font-semibold text-sm sm:text-base mb-1">Teacher</div>
              <div className="text-[var(--text-muted)] text-[10px] sm:text-xs leading-tight">Create quizzes and manage students</div>
            </button>
          </div>

                    {/* Social Login Buttons */}
          <div className="flex justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="social-btn flex items-center justify-center rounded-lg sm:rounded-xl p-2.5 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 bg-[var(--input-bg)] hover:bg-[var(--hover-bg)] border border-[var(--border-color)] transition"
              disabled={isLoading}
            >
              <FaGoogle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('GitHub')}
              className="social-btn flex items-center justify-center rounded-lg sm:rounded-xl p-2.5 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 bg-[var(--input-bg)] hover:bg-[var(--hover-bg)] border border-[var(--border-color)] transition"
              disabled={isLoading}
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-primary)]" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('LinkedIn')}
              className="social-btn flex items-center justify-center rounded-lg sm:rounded-xl p-2.5 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 bg-[var(--input-bg)] hover:bg-[var(--hover-bg)] border border-[var(--border-color)] transition"
              disabled={isLoading}
            >
              <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-3 sm:my-4">
            <div className="flex-grow h-px bg-[var(--border-color)]"></div>
            <span className="mx-3 sm:mx-4 text-xs sm:text-sm text-[var(--text-muted)]">OR</span>
            <div className="flex-grow h-px bg-[var(--border-color)]"></div>
          </div>

          {/* Alert */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-600 dark:text-red-200 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
              <p className="text-xs sm:text-sm">{error}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Full Name and Username */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[var(--text-secondary)] mb-1.5 sm:mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <FaUser className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-8 sm:pl-9 pr-2 sm:pr-3 py-2 sm:py-2.5 bg-[var(--input-bg)] border ${
                      formErrors.fullName ? 'border-red-500' : 'border-[var(--border-color)]'
                    } text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 text-xs sm:text-sm`}
                    placeholder="John Doe"
                    required
                    disabled={isLoading}
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-red-500 text-[10px] sm:text-xs mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[var(--text-secondary)] mb-1.5 sm:mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <FaUser className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full pl-8 sm:pl-9 pr-2 sm:pr-3 py-2 sm:py-2.5 bg-[var(--input-bg)] border ${
                      formErrors.username ? 'border-red-500' : 'border-[var(--border-color)]'
                    } text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 text-xs sm:text-sm`}
                    placeholder="johndoe"
                    required
                    disabled={isLoading}
                  />
                </div>
                {formErrors.username && (
                  <p className="text-red-500 text-[10px] sm:text-xs mt-1">{formErrors.username}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[var(--text-secondary)] mb-1.5 sm:mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-8 sm:pl-9 pr-2 sm:pr-3 py-2 sm:py-2.5 bg-[var(--input-bg)] border ${
                    formErrors.email ? 'border-red-500' : 'border-[var(--border-color)]'
                  } text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 text-xs sm:text-sm`}
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
              {formErrors.email && (
                <p className="text-red-500 text-[10px] sm:text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[var(--text-secondary)] mb-1.5 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                  <FaLock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-8 sm:pl-9 pr-2 sm:pr-3 py-2 sm:py-2.5 bg-[var(--input-bg)] border ${
                    formErrors.password ? 'border-red-500' : 'border-[var(--border-color)]'
                  } text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-500 text-xs sm:text-sm`}
                  placeholder="••••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
              {formErrors.password && (
                <p className="text-red-500 text-[10px] sm:text-xs mt-1">{formErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-xs sm:text-sm text-[var(--text-muted)] mt-4">
            Already have an account?{' '}
            <Link to="/signin" className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition">
              Login
            </Link>
          </p>

          {/* Footer */}
          <div className="text-center text-[10px] sm:text-xs text-[var(--text-muted)] pt-4 sm:pt-6">
            © 2025 Yaksh. Developed by FOSSEE group, IIT Bombay
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;