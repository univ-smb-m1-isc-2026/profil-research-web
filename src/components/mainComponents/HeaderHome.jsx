import './styles/headerHome.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from "../../context/AdminContext";
import { fetchWithAuth } from "../../utils/api";
import { API_URL } from "../../config";

export default function HeaderHome() {
  const { admin, setAdmin } = useAdmin();
  const navigate = useNavigate();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    if (admin) {
      setAdmin(null);
      localStorage.removeItem('jwt_token');
      setIsMenuOpen(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleCreateInvite = async () => {
    try {
      // Utilisation du bon endpoint configuré dans le contrôleur (probablement /api/invitations/generate)
      const response = await fetchWithAuth(`${API_URL}/api/invitations/generate`, {
        method: 'POST'
      });
      if (response.ok) {
        // Le backend renvoie directement la chaîne du token ou l'URL
        const token = await response.text();
        const url = token.startsWith('http') ? token : `${window.location.origin}/invite?token=${token}`;
        setInviteUrl(url);
        setShowInviteModal(true);
      } else {
        alert("Erreur lors de la création de l'invitation");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur réseau");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    alert("Lien copié !");
  };

  return (
    <header className="header-home">
      <div className="header-left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="site-title">Profil Research</span>
        </Link>
        <span className="site-subtitle">- Offres & profils</span>
      </div>

      <div className="header-right">
        {admin ? (
          <>
            <div className="admin-nav-desktop">
              <Link to="/admin" className="login-btn" style={{ textDecoration: 'none' }}>
                Dashboard
              </Link>
              <Link to="/create-offer" className="login-btn" style={{ textDecoration: 'none' }}>
                Créer une offre
              </Link>
              <button onClick={handleCreateInvite} className="login-btn" style={{ textDecoration: 'none', border: 'none', font: 'inherit' }}>
                Inviter collab
              </button>
              <button onClick={handleLoginClick} className="login-btn">
                <svg className="login-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="login-label">Déconnexion</span>
              </button>
            </div>

            <button className={`burger-menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={`admin-nav-mobile ${isMenuOpen ? 'open' : ''}`}>
              <Link to="/admin" className="mobile-nav-link" onClick={closeMenu}>
                Dashboard
              </Link>
              <Link to="/create-offer" className="mobile-nav-link" onClick={closeMenu}>
                Créer une offre
              </Link>
              <button 
                onClick={() => { handleCreateInvite(); closeMenu(); }} 
                className="mobile-nav-link" 
                style={{ border: 'none', font: 'inherit', fontWeight: 700 }}
              >
                Inviter collab
              </button>
              <button onClick={handleLoginClick} className="mobile-nav-link login-mobile">
                Déconnexion
              </button>
            </div>
          </>
        ) : (
          <button onClick={handleLoginClick} aria-label="Connexion employés" className="login-btn">
            <svg className="login-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="login-label">Connexion</span>
          </button>
        )}
      </div>

      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Lien d'invitation généré</h3>
            <p className="modal-description">Envoyez ce lien à votre futur collaborateur :</p>
            <div className="invite-url-container">
              <input type="text" readOnly value={inviteUrl} className="invite-url-input" />
              <button onClick={copyToClipboard} className="copy-btn">Copier</button>
            </div>
            <button onClick={() => setShowInviteModal(false)} className="modal-close-btn">Fermer</button>
          </div>
        </div>
      )}
    </header>
  );
}