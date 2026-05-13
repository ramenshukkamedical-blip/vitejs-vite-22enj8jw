// FILE: src/store/authStore.js
// USE IN: Both mycarehub-mobile AND mycarehub-web
// PURPOSE: Handle user authentication state

import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,
  userType: null, // 'patient', 'doctor', 'pharmacy', 'lab', 'radiology', 'hospital', 'admin'
  loading: false,
  error: null,

  // Actions
  setUser: (user) => set({ user }),
  
  setToken: (token) => {
    // Save to localStorage for persistence
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    set({ token });
  },

  setUserType: (type) => {
    localStorage.setItem('userType', type);
    set({ userType: type });
  },

  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  // Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Save auth data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userType', data.user.type);
      localStorage.setItem('user', JSON.stringify(data.user));

      set({
        user: data.user,
        token: data.token,
        userType: data.user.type,
        isAuthenticated: true,
        loading: false,
      });

      return { success: true, user: data.user };
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Register Patient
  registerPatient: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register/user`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();

      // Auto-login after registration
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userType', 'patient');
      localStorage.setItem('user', JSON.stringify(data.user));

      set({
        user: data.user,
        token: data.token,
        userType: 'patient',
        isAuthenticated: true,
        loading: false,
      });

      return { success: true, user: data.user };
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Register Provider (Doctor, Pharmacy, Lab, etc)
  registerProvider: async (formData, providerType) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register/provider`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, type: providerType }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();

      // Auto-login after registration
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userType', providerType);
      localStorage.setItem('user', JSON.stringify(data.user));

      set({
        user: data.user,
        token: data.token,
        userType: providerType,
        isAuthenticated: true,
        loading: false,
      });

      return { success: true, user: data.user };
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      userType: null,
      isAuthenticated: false,
      error: null,
    });
  },

  // Check if user is logged in (run on app startup)
  checkAuth: () => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const user = localStorage.getItem('user');

    if (token && user) {
      set({
        token,
        userType,
        user: JSON.parse(user),
        isAuthenticated: true,
      });
    }
  },

  // Check if user has specific role
  hasRole: (role) => {
    const state = useAuthStore.getState();
    return state.userType === role;
  },

  // Check if user is authenticated
  isLoggedIn: () => {
    const state = useAuthStore.getState();
    return state.isAuthenticated && state.token;
  },
}));

export default useAuthStore;

