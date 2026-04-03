// import { useState } from 'react';
import './loginPage.css';
import { API_URL } from '../../config';

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Connexion Administrateur</h2>
        <button onClick={handleLogin} className="login-submit-btn">
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
}
