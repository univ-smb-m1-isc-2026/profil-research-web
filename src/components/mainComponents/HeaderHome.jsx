import './styles/headerHome.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from "../../context/AdminContext";
import { fetchWithAuth } from "../../utils/api";

export default function HeaderHome() {
  const { admin, setAdmin } = useAdmin();
  const navigate = useNavigate();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');

  const handleLoginClick = () => {
    if (admin) {
      setAdmin(null);
      localStorage.removeItem('jwt_token');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const handleCreateInvite = async () => {
    try {
      // Utilisation du bon endpoint configuré dans le contrôleur (probablement /api/invitations/generate)
      const response = await fetchWithAuth('http://localhost:8080/api/invitations/generate', {
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

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {admin && (
          <>
            <Link to="/admin" className="add-offer-btn" style={{ textDecoration: 'none' }}>
                Dashboard
            </Link>
            <Link to="/create-offer" className="add-offer-btn" style={{ textDecoration: 'none' }}>
                Créer une offre
            </Link>
            <button onClick={handleCreateInvite} className="add-offer-btn" style={{ textDecoration: 'none', border: 'none', font: 'inherit', fontWeight: 700 }}>
                Inviter collab
            </button>
          </>
        )}

        <button onClick={handleLoginClick} aria-label="Connexion employés" className="login-btn">
          <svg className="login-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="login-label">{admin ? 'Déconnexion' : 'Connexion'}</span>
        </button>
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
            <button onClick={() => setShowInviteModal(false)} className="close-btn">Fermer</button>
          </div>
        </div>
      )}
    </header>
  );
}