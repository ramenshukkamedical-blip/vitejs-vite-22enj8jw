// FILE: src/pages/provider/ProviderDashboard.jsx
// USE IN: Both mycarehub-mobile AND mycarehub-web
// PURPOSE: Dashboard for all provider types (doctor, pharmacy, lab, etc)

import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const { user, logout, userType } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardContent = () => {
    const providerTypeTitle = {
      doctor: '👨‍⚕️ Doctor',
      pharmacy: '💊 Pharmacy',
      lab: '🔬 Lab',
      radiology: '📸 Radiology',
      hospital: '🏥 Hospital',
    };

    const sections = {
      doctor: [
        {
          id: 'appointments',
          title: '📅 Appointments',
          description: 'Manage your appointments',
          count: 0,
        },
        {
          id: 'prescriptions',
          title: '💊 Prescriptions',
          description: 'Send prescriptions',
          count: 0,
        },
        {
          id: 'earnings',
          title: '💰 Earnings',
          description: 'View your earnings',
          amount: '₦0',
        },
      ],
      pharmacy: [
        {
          id: 'pending-orders',
          title: '📦 Pending Orders',
          description: 'New orders waiting',
          count: 0,
        },
        {
          id: 'controlled-verification',
          title: '🚨 Controlled Drug Verification',
          description: 'Verify controlled drug orders',
          count: 0,
          critical: true,
        },
        {
          id: 'inventory',
          title: '📊 Inventory',
          description: 'Manage medicines',
        },
        {
          id: 'earnings',
          title: '💰 Earnings',
          description: 'View your earnings',
          amount: '₦0',
        },
      ],
      lab: [
        {
          id: 'test-orders',
          title: '🧪 Test Orders',
          description: 'Lab test orders',
          count: 0,
        },
        {
          id: 'results',
          title: '📋 Results',
          description: 'Upload results',
        },
        {
          id: 'earnings',
          title: '💰 Earnings',
          description: 'View your earnings',
          amount: '₦0',
        },
      ],
      radiology: [
        {
          id: 'imaging-orders',
          title: '📸 Imaging Orders',
          description: 'Imaging orders',
          count: 0,
        },
        {
          id: 'reports',
          title: '📄 Reports',
          description: 'Upload reports',
        },
        {
          id: 'earnings',
          title: '💰 Earnings',
          description: 'View your earnings',
          amount: '₦0',
        },
      ],
      hospital: [
        {
          id: 'admissions',
          title: '🚑 Admissions',
          description: 'Patient admissions',
          count: 0,
        },
        {
          id: 'departments',
          title: '🏢 Departments',
          description: 'Manage departments',
        },
        {
          id: 'earnings',
          title: '💰 Earnings',
          description: 'View your earnings',
          amount: '₦0',
        },
      ],
    };

    return {
      title: providerTypeTitle[userType] || 'Provider',
      sections: sections[userType] || sections.pharmacy,
    };
  };

  const dashboard = getDashboardContent();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🏥 MyCareHub</h1>
          <span className="provider-type">{dashboard.title}</span>
        </div>
        <div className="header-right">
          <span className="user-name">{user?.businessName || 'Provider'}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Welcome, {user?.businessName}! 👋</h2>
          <p>Status: <strong style={{ color: '#ff9500' }}>Pending Verification</strong></p>
          <p style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>
            Your account is being reviewed by our admin team. You'll be notified once verified.
          </p>
        </section>

        <section className="quick-actions">
          <div className="actions-grid">
            {dashboard.sections.map((section) => (
              <div
                key={section.id}
                className={`action-card ${section.critical ? 'critical' : ''}`}
              >
                {section.critical && <div className="critical-badge">⚠️ CRITICAL</div>}
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                {section.count !== undefined && (
                  <div className="card-count">{section.count}</div>
                )}
                {section.amount !== undefined && (
                  <div className="card-amount">{section.amount}</div>
                )}
                <button className="btn-action">View</button>
              </div>
            ))}
          </div>
        </section>

        {userType === 'pharmacy' && (
          <section className="important-notice">
            <h3>⚠️ Important: Controlled Drug Verification</h3>
            <p>
              You have access to a critical feature: <strong>Controlled Drug Verification</strong>.
              This is where you verify controlled drug orders from patients before they can complete payment.
            </p>
            <p>
              Make sure to review prescription details carefully and approve or reject orders as appropriate.
            </p>
          </section>
        )}
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

        .header-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .dashboard-header h1 {
          color: #667eea;
          font-size: 24px;
          margin: 0;
        }

        .provider-type {
          background: #f0f4ff;
          color: #667eea;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
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
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .welcome-section h2 {
          color: #333;
          font-size: 28px;
          margin-bottom: 10px;
        }

        .welcome-section p {
          color: #666;
          font-size: 16px;
          margin: 8px 0;
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
          border-left: 4px solid #667eea;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
        }

        .action-card.critical {
          border-left-color: #ff6b6b;
          background: #fff5f5;
        }

        .critical-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 12px;
          background: #ff6b6b;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
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

        .card-count {
          font-size: 28px;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 10px;
        }

        .card-amount {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
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

        .action-card.critical .btn-action {
          background: #ff6b6b;
        }

        .btn-action:hover {
          opacity: 0.9;
        }

        .important-notice {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .important-notice h3 {
          color: #856404;
          margin-top: 0;
        }

        .important-notice p {
          color: #856404;
          margin: 10px 0;
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

