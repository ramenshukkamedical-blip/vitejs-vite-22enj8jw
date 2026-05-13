import { useState } from 'react';
import './styles/auth.css';

export default function App() {
  const [page, setPage] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage('❌ Please fill all fields');
      return;
    }
    setMessage('✅ Login successful! (Demo mode)');
    setTimeout(() => {
      alert('Welcome! (This is demo mode - not connected to backend yet)');
    }, 500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.phone) {
      setMessage('❌ Please fill all fields');
      return;
    }
    if (formData.password.length < 6) {
      setMessage('❌ Password must be at least 6 characters');
      return;
    }
    setMessage('✅ Registration successful! Please login.');
    setTimeout(() => {
      setPage('login');
      setFormData({
        email: formData.email,
        password: formData.password,
        firstName: '',
        lastName: '',
        phone: '',
      });
      setMessage('');
    }, 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🏥 MyCareHub</h1>

        {/* LOGIN PAGE */}
        {page === 'login' && (
          <>
            <h2>Login</h2>

            {message && (
              <div style={{
                padding: '12px',
                background: message.includes('❌') ? '#fee' : '#efe',
                color: message.includes('❌') ? '#c33' : '#3c3',
                borderRadius: '6px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                {message}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="btn-primary">
                Login
              </button>
            </form>

            <p className="auth-link">
              Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setPage('register'); setMessage(''); }}>Register here</a>
            </p>
          </>
        )}

        {/* REGISTRATION PAGE */}
        {page === 'register' && (
          <>
            <h2>Register</h2>

            {message && (
              <div style={{
                padding: '12px',
                background: message.includes('❌') ? '#fee' : '#efe',
                color: message.includes('❌') ? '#c33' : '#3c3',
                borderRadius: '6px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                {message}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                />
              </div>

              <div className="form-group">
                <label>Password (min 6 characters)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>

              <button type="submit" className="btn-primary">
                Create Account
              </button>
            </form>

            <p className="auth-link">
              Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); setMessage(''); }}>Login here</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
