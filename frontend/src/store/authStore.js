import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mock users database 
const MOCK_USERS = [
  {
    id: 1,
    username: 'student',
    email: 'student@example.com',
    password: 'student123', 
    role: 'student',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: 2,
    username: 'teacher',
    email: 'teacher@example.com',
    password: 'teacher123',
    role: 'teacher',
    firstName: 'Jane',
    lastName: 'Smith',
  },
];

// Auth store using Zustand with backend-less authentication
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
          // Find user in mock database
          const user = MOCK_USERS.find(
            u => u.username === credentials.username && u.password === credentials.password
          );

          if (!user) {
            throw new Error('Invalid username or password');
          }

          // Remove password from user object
          const { password, ...userWithoutPassword } = user;

          // Generate mock token
          const token = `mock_token_${user.id}_${Date.now()}`;
          
          // Store token and user data
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          
          set({ 
            user: userWithoutPassword, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          const errorMessage = error.message || 'Login failed';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
          // Check if username already exists
          const existingUser = MOCK_USERS.find(u => u.username === userData.username);
          if (existingUser) {
            throw new Error('Username already exists');
          }

          // Check if email already exists
          const existingEmail = MOCK_USERS.find(u => u.email === userData.email);
          if (existingEmail) {
            throw new Error('Email already exists');
          }

          // Create new user
          const newUser = {
            id: MOCK_USERS.length + 1,
            username: userData.username,
            email: userData.email,
            role: userData.role || 'student',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
          };

          // Add to mock database (in real app, this would persist in backend)
          MOCK_USERS.push({
            ...newUser,
            password: userData.password,
          });

          // Generate mock token
          const token = `mock_token_${newUser.id}_${Date.now()}`;
          
          // Store token and user data
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(newUser));
          
          set({ 
            user: newUser, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          const errorMessage = error.message || 'Registration failed';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },

      logout: async () => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Clear localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Clear all auth state
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false, 
          isLoading: false,
          error: null 
        });
        
        return { success: true };
      },

      // Initialize auth state from localStorage
      initializeAuth: () => {
        const token = localStorage.getItem('authToken');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({ 
              user, 
              token, 
              isAuthenticated: true 
            });
          } catch (error) {
            console.error('Failed to parse user data:', error);
            // Clear corrupted data
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Update user data
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);