// FILE: src/services/api.js
// USE IN: Both mycarehub-mobile AND mycarehub-web
// PURPOSE: All API calls to backend

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ AUTHENTICATION SERVICES ============

export const authAPI = {
  // Login
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  // Register Patient
  registerPatient: async (userData) => {
    const response = await apiClient.post('/auth/register/user', userData);
    return response.data;
  },

  // Register Provider
  registerProvider: async (providerData) => {
    const response = await apiClient.post('/auth/register/provider', providerData);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

// ============ MEDICATION SERVICES ============

export const medicationAPI = {
  // Get all medications (with optional filter)
  getAllMedications: async (filter = {}) => {
    const params = new URLSearchParams(filter);
    const response = await apiClient.get(`/medications?${params}`);
    return response.data;
  },

  // Get single medication
  getMedicationById: async (id) => {
    const response = await apiClient.get(`/medications/${id}`);
    return response.data;
  },

  // Search medications
  searchMedications: async (query) => {
    const response = await apiClient.get(`/medications/search?q=${query}`);
    return response.data;
  },

  // Get controlled drugs
  getControlledDrugs: async () => {
    const response = await apiClient.get('/medications/controlled');
    return response.data;
  },

  // Get medication by category
  getMedicationsByCategory: async (category) => {
    const response = await apiClient.get(`/medications/category/${category}`);
    return response.data;
  },
};

// ============ DOCTOR SERVICES ============

export const doctorAPI = {
  // Get all doctors
  getAllDoctors: async () => {
    const response = await apiClient.get('/doctors');
    return response.data;
  },

  // Search doctors
  searchDoctors: async (query) => {
    const response = await apiClient.get(`/doctors/search?q=${query}`);
    return response.data;
  },

  // Get doctor by specialty
  getDoctorsBySpecialty: async (specialty) => {
    const response = await apiClient.get(`/doctors/specialty/${specialty}`);
    return response.data;
  },

  // Get single doctor
  getDoctorById: async (id) => {
    const response = await apiClient.get(`/doctors/${id}`);
    return response.data;
  },

  // Get doctor profile (for logged-in doctor)
  getMyProfile: async () => {
    const response = await apiClient.get('/doctors/me');
    return response.data;
  },

  // Update doctor profile
  updateProfile: async (data) => {
    const response = await apiClient.put('/doctors/me', data);
    return response.data;
  },

  // Get doctor's earnings
  getEarnings: async () => {
    const response = await apiClient.get('/doctors/me/earnings');
    return response.data;
  },
};

// ============ PHARMACY SERVICES ============

export const pharmacyAPI = {
  // Get all pharmacies
  getAllPharmacies: async () => {
    const response = await apiClient.get('/pharmacies');
    return response.data;
  },

  // Search pharmacies
  searchPharmacies: async (query) => {
    const response = await apiClient.get(`/pharmacies/search?q=${query}`);
    return response.data;
  },

  // Get pharmacy profile (for logged-in pharmacy)
  getMyProfile: async () => {
    const response = await apiClient.get('/pharmacies/me');
    return response.data;
  },

  // Get pharmacy's earnings
  getEarnings: async () => {
    const response = await apiClient.get('/pharmacies/me/earnings');
    return response.data;
  },

  // Update pharmacy profile
  updateProfile: async (data) => {
    const response = await apiClient.put('/pharmacies/me', data);
    return response.data;
  },

  // Update inventory
  updateInventory: async (medicationId, quantity) => {
    const response = await apiClient.put(`/pharmacies/me/inventory/${medicationId}`, {
      quantity,
    });
    return response.data;
  },
};

// ============ DRUG ORDER SERVICES ============

export const drugOrderAPI = {
  // Create order
  createOrder: async (orderData) => {
    const response = await apiClient.post('/drug-orders', orderData);
    return response.data;
  },

  // Get user's orders
  getMyOrders: async () => {
    const response = await apiClient.get('/drug-orders/me');
    return response.data;
  },

  // Get single order
  getOrderById: async (id) => {
    const response = await apiClient.get(`/drug-orders/${id}`);
    return response.data;
  },

  // Get pending orders (for pharmacy)
  getPendingOrders: async () => {
    const response = await apiClient.get('/drug-orders/pending');
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    const response = await apiClient.put(`/drug-orders/${id}`, { status });
    return response.data;
  },

  // Cancel order
  cancelOrder: async (id) => {
    const response = await apiClient.delete(`/drug-orders/${id}`);
    return response.data;
  },
};

// ============ CONTROLLED DRUG SERVICES ============

export const controlledDrugAPI = {
  // Get pending controlled drug verifications
  getPendingVerifications: async () => {
    const response = await apiClient.get('/controlled-drugs/pending');
    return response.data;
  },

  // Verify controlled drug order (approve)
  verifyOrder: async (orderId, verificationData) => {
    const response = await apiClient.post(`/controlled-drugs/${orderId}/verify`, verificationData);
    return response.data;
  },

  // Reject controlled drug order
  rejectOrder: async (orderId, rejectionData) => {
    const response = await apiClient.post(`/controlled-drugs/${orderId}/reject`, rejectionData);
    return response.data;
  },

  // Get verification history
  getVerificationHistory: async () => {
    const response = await apiClient.get('/controlled-drugs/history');
    return response.data;
  },

  // Get all controlled drugs (admin)
  getAllControlledDrugs: async () => {
    const response = await apiClient.get('/controlled-drugs');
    return response.data;
  },
};

// ============ PRESCRIPTION SERVICES ============

export const prescriptionAPI = {
  // Create prescription (doctor only)
  createPrescription: async (prescriptionData) => {
    const response = await apiClient.post('/prescriptions', prescriptionData);
    return response.data;
  },

  // Get patient's prescriptions
  getMyPrescriptions: async () => {
    const response = await apiClient.get('/prescriptions/me');
    return response.data;
  },

  // Get single prescription
  getPrescriptionById: async (id) => {
    const response = await apiClient.get(`/prescriptions/${id}`);
    return response.data;
  },

  // Get doctor's prescriptions
  getDoctorPrescriptions: async () => {
    const response = await apiClient.get('/prescriptions/doctor/me');
    return response.data;
  },

  // Update prescription
  updatePrescription: async (id, data) => {
    const response = await apiClient.put(`/prescriptions/${id}`, data);
    return response.data;
  },

  // Validate prescription for controlled drug
  validatePrescription: async (prescriptionId, medicationId) => {
    const response = await apiClient.get(
      `/prescriptions/${prescriptionId}/validate/${medicationId}`
    );
    return response.data;
  },
};

// ============ APPOINTMENT SERVICES ============

export const appointmentAPI = {
  // Create appointment
  createAppointment: async (appointmentData) => {
    const response = await apiClient.post('/appointments', appointmentData);
    return response.data;
  },

  // Get patient's appointments
  getMyAppointments: async () => {
    const response = await apiClient.get('/appointments/me');
    return response.data;
  },

  // Get doctor's appointments
  getDoctorAppointments: async () => {
    const response = await apiClient.get('/appointments/doctor/me');
    return response.data;
  },

  // Get single appointment
  getAppointmentById: async (id) => {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data;
  },

  // Update appointment status
  updateAppointmentStatus: async (id, status) => {
    const response = await apiClient.put(`/appointments/${id}`, { status });
    return response.data;
  },

  // Cancel appointment
  cancelAppointment: async (id) => {
    const response = await apiClient.delete(`/appointments/${id}`);
    return response.data;
  },

  // Get doctor's available slots
  getAvailableSlots: async (doctorId, date) => {
    const response = await apiClient.get(`/doctors/${doctorId}/slots?date=${date}`);
    return response.data;
  },
};

// ============ PAYMENT SERVICES ============

export const paymentAPI = {
  // Initialize Paystack payment
  initializePayment: async (orderId, amount, email) => {
    const response = await apiClient.post('/payments/initialize', {
      orderId,
      amount,
      email,
    });
    return response.data;
  },

  // Verify payment
  verifyPayment: async (reference) => {
    const response = await apiClient.get(`/payments/verify/${reference}`);
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async () => {
    const response = await apiClient.get('/payments/history');
    return response.data;
  },

  // Get transaction details
  getTransactionDetails: async (transactionId) => {
    const response = await apiClient.get(`/payments/${transactionId}`);
    return response.data;
  },
};

// ============ ADMIN SERVICES ============

export const adminAPI = {
  // Get all providers (pending verification)
  getPendingProviders: async () => {
    const response = await apiClient.get('/admin/providers/pending');
    return response.data;
  },

  // Verify provider
  verifyProvider: async (providerId, verificationData) => {
    const response = await apiClient.post(
      `/admin/providers/${providerId}/verify`,
      verificationData
    );
    return response.data;
  },

  // Reject provider
  rejectProvider: async (providerId, rejectionData) => {
    const response = await apiClient.post(
      `/admin/providers/${providerId}/reject`,
      rejectionData
    );
    return response.data;
  },

  // Get all providers
  getAllProviders: async () => {
    const response = await apiClient.get('/admin/providers');
    return response.data;
  },

  // Get all users
  getAllUsers: async () => {
    const response = await apiClient.get('/admin/users');
    return response.data;
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },

  // Get audit logs
  getAuditLogs: async () => {
    const response = await apiClient.get('/admin/audit-logs');
    return response.data;
  },

  // Get compliance reports
  getComplianceReports: async () => {
    const response = await apiClient.get('/admin/compliance');
    return response.data;
  },

  // Get fraud alerts
  getFraudAlerts: async () => {
    const response = await apiClient.get('/admin/fraud-alerts');
    return response.data;
  },
};

// ============ LAB SERVICES ============

export const labAPI = {
  // Get lab profile
  getMyProfile: async () => {
    const response = await apiClient.get('/labs/me');
    return response.data;
  },

  // Get lab orders
  getOrders: async () => {
    const response = await apiClient.get('/labs/me/orders');
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await apiClient.put(`/labs/orders/${orderId}`, { status });
    return response.data;
  },

  // Upload test results
  uploadResults: async (orderId, resultsFile) => {
    const formData = new FormData();
    formData.append('results', resultsFile);
    const response = await apiClient.post(`/labs/orders/${orderId}/results`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

// ============ NOTIFICATION SERVICES ============

export const notificationAPI = {
  // Get notifications
  getNotifications: async () => {
    const response = await apiClient.get('/notifications');
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    const response = await apiClient.put(`/notifications/${notificationId}`, {
      read: true,
    });
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await apiClient.put('/notifications/mark-all-read');
    return response.data;
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    const response = await apiClient.delete(`/notifications/${notificationId}`);
    return response.data;
  },
};

// ============ DASHBOARD SERVICES ============

export const dashboardAPI = {
  // Get patient dashboard data
  getPatientDashboard: async () => {
    const response = await apiClient.get('/dashboard/patient');
    return response.data;
  },

  // Get doctor dashboard data
  getDoctorDashboard: async () => {
    const response = await apiClient.get('/dashboard/doctor');
    return response.data;
  },

  // Get pharmacy dashboard data
  getPharmacyDashboard: async () => {
    const response = await apiClient.get('/dashboard/pharmacy');
    return response.data;
  },

  // Get lab dashboard data
  getLabDashboard: async () => {
    const response = await apiClient.get('/dashboard/lab');
    return response.data;
  },
};

export default apiClient;

