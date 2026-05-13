// FILE: src/pages/RegistrationTypePage.jsx
// USE IN: Both mycarehub-mobile AND mycarehub-web
// PURPOSE: Let users choose between patient and provider registration

import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

export default function RegistrationTypePage() {
  const navigate = useNavigate();

  const registrationTypes = [
    {
      id: 'patient',
      title: '👤 Patient',
      description: 'Looking for healthcare services',
      icon: '🏥',
    },
    {
      id: 'doctor',
      title: '👨‍⚕️ Doctor',
      description: 'Healthcare provider',
      icon: '📋',
    },
    {
      id: 'pharmacy',
      title: '💊 Pharmacy',
      description: 'Medication provider',
      icon: '🏪',
    },
    {
      id: 'lab',
      title: '🔬 Lab',
      description: 'Laboratory services',
      icon: '🧪',
    },
    {
      id: 'radiology',
      title: '📸 Radiology',
      description: 'Imaging services',
      icon: '🖼️',
    },
    {
      id: 'hospital',
      title: '🏨 Hospital',
      description: 'Hospital services',
      icon: '🚑',
    },
  ];

  return (
    <div className="auth-container">
      <div className="registration-type-card">
        <h1>🏥 MyCareHub</h1>
        <h2>Who are you?</h2>
        <p>Select your registration type to get started</p>

        <div className="registration-options">
          {registrationTypes.map((type) => (
            <div
              key={type.id}
              className="registration-option"
              onClick={() => navigate(`/register/${type.id}`)}
            >
              <div className="option-icon">{type.icon}</div>
              <h3>{type.title}</h3>
              <p>{type.description}</p>
              <button className="btn-small">Register as {type.title}</button>
            </div>
          ))}
        </div>

        <p className="auth-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

