import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import './loginPage.css';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAdmin } = useAdmin();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login && password) {
      // Pour l'instant, aucune vérification réelle du mot de passe ou login au backend
      setAdmin({ mail: login, name: "Admin" });
      navigate('/admin');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Connexion Administrateur</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="login">Identifiant</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              placeholder="Votre identifiant"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Votre mot de passe"
            />
          </div>
          <button type="submit" className="login-submit-btn">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
