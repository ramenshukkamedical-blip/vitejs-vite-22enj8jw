// FILE: src/pages/provider/ProviderRegistrationPage.jsx
// USE IN: Both mycarehub-mobile AND mycarehub-web
// PURPOSE: Registration for all provider types (doctor, pharmacy, lab, etc)

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '../../store/authStore';
import '../../styles/auth.css';

// Validation schema
const providerSchema = z.object({
  businessName: z.string().min(2, 'Business name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  licenseNumber: z.string().min(3, 'License number required'),
  registrationNumber: z.string().min(3, 'Registration number required'),
  address: z.string().min(5, 'Address required'),
  specialty: z.string().optional(),
  bankAccountName: z.string().min(3, 'Account holder name required'),
  bankAccountNumber: z.string().min(10, 'Valid account number required'),
  bankCode: z.string().min(3, 'Bank code required'),
  password: z.string().min(8, 'Password must be 8+ characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, 'Accept terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const providerTypes = {
  doctor: {
    title: 'Doctor',
    icon: '👨‍⚕️',
    showSpecialty: true,
  },
  pharmacy: {
    title: 'Pharmacy',
    icon: '💊',
    showSpecialty: false,
  },
  lab: {
    title: 'Laboratory',
    icon: '🔬',
    showSpecialty: false,
  },
  radiology: {
    title: 'Radiology Center',
    icon: '📸',
    showSpecialty: false,
  },
  hospital: {
    title: 'Hospital',
    icon: '🏥',
    showSpecialty: false,
  },
};

const specialties = [
  'General Practice',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Dermatology',
  'Psychiatry',
  'Surgery',
  'Emergency Medicine',
  'Gynecology',
];

const banks = [
  { code: '044', name: 'Access Bank' },
  { code: '050', name: 'Ecobank' },
  { code: '058', name: 'Guaranty Trust Bank' },
  { code: '011', name: 'First Bank' },
  { code: '012', name: 'UBA' },
  { code: '081', name: 'Zenith Bank' },
  { code: '035', name: 'Wema Bank' },
  { code: '048', name: 'Fidelity Bank' },
];

export default function ProviderRegistrationPage() {
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerProvider } = useAuthStore();

  const providerType = providerTypes[type] || providerTypes.doctor;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(providerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const { confirmPassword, acceptTerms, ...registrationData } = data;

    const result = await registerProvider(registrationData, type);

    if (result.success) {
      navigate('/provider-dashboard');
    } else {
      alert('Registration failed: ' + result.error);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card large">
        <h1>🏥 MyCareHub</h1>
        <h2>{providerType.icon} {providerType.title} Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Business Info */}
          <fieldset>
            <legend>Business Information</legend>
            
            <div className="form-group">
              <label>Business Name *</label>
              <input
                {...register('businessName')}
                placeholder="Your business name"
                disabled={loading}
              />
              {errors.businessName && (
                <span className="error">{errors.businessName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                {...register('address')}
                placeholder="Business address"
                disabled={loading}
              />
              {errors.address && (
                <span className="error">{errors.address.message}</span>
              )}
            </div>

            {providerType.showSpecialty && (
              <div className="form-group">
                <label>Specialty *</label>
                <select {...register('specialty')} disabled={loading}>
                  <option value="">Select specialty</option>
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </fieldset>

          {/* License Info */}
          <fieldset>
            <legend>License & Registration</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label>License Number *</label>
                <input
                  {...register('licenseNumber')}
                  placeholder="Professional license"
                  disabled={loading}
                />
                {errors.licenseNumber && (
                  <span className="error">{errors.licenseNumber.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>Registration Number *</label>
                <input
                  {...register('registrationNumber')}
                  placeholder="CAC/NAFDAC registration"
                  disabled={loading}
                />
                {errors.registrationNumber && (
                  <span className="error">{errors.registrationNumber.message}</span>
                )}
              </div>
            </div>
          </fieldset>

          {/* Contact Info */}
          <fieldset>
            <legend>Contact Information</legend>
            
            <div className="form-row">
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
                <label>Phone *</label>
                <input
                  {...register('phone')}
                  placeholder="+234..."
                  disabled={loading}
                />
                {errors.phone && (
                  <span className="error">{errors.phone.message}</span>
                )}
              </div>
            </div>
          </fieldset>

          {/* Bank Info */}
          <fieldset>
            <legend>Payment Information</legend>
            
            <div className="form-group">
              <label>Account Holder Name *</label>
              <input
                {...register('bankAccountName')}
                placeholder="Name on bank account"
                disabled={loading}
              />
              {errors.bankAccountName && (
                <span className="error">{errors.bankAccountName.message}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Bank *</label>
                <select {...register('bankCode')} disabled={loading}>
                  <option value="">Select bank</option>
                  {banks.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
                {errors.bankCode && (
                  <span className="error">{errors.bankCode.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>Account Number *</label>
                <input
                  {...register('bankAccountNumber')}
                  placeholder="10-digit account number"
                  disabled={loading}
                />
                {errors.bankAccountNumber && (
                  <span className="error">{errors.bankAccountNumber.message}</span>
                )}
              </div>
            </div>
          </fieldset>

          {/* Password */}
          <fieldset>
            <legend>Secure Your Account</legend>
            
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
          </fieldset>

          {/* Terms */}
          <div className="form-group checkbox">
            <input
              type="checkbox"
              {...register('acceptTerms')}
              id="acceptTerms"
              disabled={loading}
            />
            <label htmlFor="acceptTerms">
              I accept the Terms and Conditions and confirm all information is accurate
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

        <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
          After registration, your account will be verified by our admin team.
        </p>

        <p className="auth-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

