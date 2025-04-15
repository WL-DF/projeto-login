import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/global.css';
import '../Styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="dashboard-card">
        <h1>Olá, {user?.name}!</h1>
        <p>Email: {user?.email || 'Não disponivel'}</p>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>

        <div className='dashboard-image'>
          <img
            src='https://i.ytimg.com/vi/bpYlar-UDyo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDOqVc_4CdTLSEpdr66oPv6KLjJvg'
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;