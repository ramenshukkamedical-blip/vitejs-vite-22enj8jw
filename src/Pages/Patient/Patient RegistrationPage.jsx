// FILE: src/pages/patient/PatientRegistrationPage.jsx
// USE IN: Both mycarehub-mobile AND mycarehub-web
// PURPOSE: Patient registration form

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '../../store/authStore';
import '../../styles/auth.css';

// Validation schema
const patientSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  dateOfBirth: z.string().optional(),
  nhiaId: z.string().optional(),
  password: z.string().min(8, 'Password must be 8+ characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, 'Accept terms to continue'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export default function PatientRegistrationPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerPatient } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const { confirmPassword, acceptTerms, ...registrationData } = data;

    const result = await registerPatient(registrationData);

    if (result.success) {
      navigate('/patient-dashboard');
    } else {
      alert('Registration failed: ' + result.error);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🏥 MyCareHub</h1>
        <h2>Patient Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                {...register('firstName')}
                placeholder="First name"
                disabled={loading}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input
                {...register('lastName')}
                placeholder="Last name"
                disabled={loading}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              {...register('email')}
              placeholder="your@email.com"
              disabled={loading}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              {...register('phone')}
              placeholder="+234..."
              disabled={loading}
            />
            {errors.phone && (
              <span className="error">{errors.phone.message}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender *</label>
              <select {...register('gender')} disabled={loading}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <span className="error">{errors.gender.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                {...register('dateOfBirth')}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>NHIA ID (Optional)</label>
            <input
              {...register('nhiaId')}
              placeholder="Nigerian Health ID"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                {...register('password')}
                placeholder="At least 8 characters"
                disabled={loading}
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm password"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword.message}</span>
              )}
            </div>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              {...register('acceptTerms')}
              id="acceptTerms"
              disabled={loading}
            />
            <label htmlFor="acceptTerms">
              I accept the Terms and Conditions
            </label>
            {errors.acceptTerms && (
              <span className="error">{errors.acceptTerms.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

