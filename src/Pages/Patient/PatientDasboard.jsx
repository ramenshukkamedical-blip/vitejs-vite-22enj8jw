// FILE: src/pages/patient/PatientDashboard.jsx
// USE IN: Both mycarehub-mobile AND mycarehub-web
// PURPOSE: Patient dashboard home page

import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const quickActions = [
    {
      id: 'doctors',
      title: '👨‍⚕️ Find Doctors',
      description: 'Search and book doctors',
      color: '#667eea',
    },
    {
      id: 'medicines',
      title: '💊 Order Medicines',
      description: 'Search and order medications',
      color: '#764ba2',
    },
    {
      id: 'prescriptions',
      title: '📋 My Prescriptions',
      description: 'View your prescriptions',
      color: '#f093fb',
    },
    {
      id: 'appointments',
      title: '📅 My Appointments',
      description: 'View scheduled appointments',
      color: '#4facfe',
    },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🏥 MyCareHub</h1>
        </div>
        <div className="header-right">
          <span className="user-name">{user?.firstName || 'Patient'}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Welcome back, {user?.firstName}! 👋</h2>
          <p>What would you like to do today?</p>
        </section>

        <section className="quick-actions">
          <div className="actions-grid">
            {quickActions.map((action) => (
              <div
                key={action.id}
                className="action-card"
                style={{ borderLeftColor: action.color }}
              >
                <h3>{action.title}</h3>
                <p>{action.description}</p>
                <button className="btn-action">Get Started</button>
              </div>
            ))}
          </div>
        </section>

        <section className="recent-section">
          <h3>Recent Orders</h3>
          <div className="empty-state">
            <p>No orders yet</p>
            <p style={{ fontSize: '12px', color: '#999' }}>
              Start ordering medicines to see them here
            </p>
          </div>
        </section>
      </main>

      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: #f5f5f5;
        }

        .dashboard-header {
          background: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .dashboard-header h1 {
          color: #667eea;
          font-size: 24px;
          margin: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .user-name {
          font-weight: 600;
          color: #333;
        }

        .btn-logout {
          padding: 8px 16px;
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-logout:hover {
          background: #ff5252;
        }

        .dashboard-main {
          padding: 30px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-section {
          margin-bottom: 40px;
        }

        .welcome-section h2 {
          color: #333;
          font-size: 28px;
          margin-bottom: 10px;
        }

        .welcome-section p {
          color: #666;
          font-size: 16px;
        }

        .quick-actions {
          margin-bottom: 40px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .action-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .action-card h3 {
          margin: 0 0 8px 0;
          color: #333;
          font-size: 16px;
        }

        .action-card p {
          margin: 0 0 15px 0;
          color: #666;
          font-size: 14px;
        }

        .btn-action {
          width: 100%;
          padding: 10px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-action:hover {
          background: #5568d3;
        }

        .recent-section h3 {
          color: #333;
          font-size: 20px;
          margin-bottom: 20px;
        }

        .empty-state {
          background: white;
          padding: 40px;
          border-radius: 8px;
          text-align: center;
          color: #999;
        }

        @media (max-width: 600px) {
          .dashboard-header {
            flex-direction: column;
            gap: 15px;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

