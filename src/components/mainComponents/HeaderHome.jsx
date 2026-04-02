import './styles/headerHome.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from "../../context/AdminContext";
import { useState } from 'react';

export default function HeaderHome() {
  const { admin, setAdmin } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (admin) {
      setAdmin(null);
      setIsMenuOpen(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header-home">
      <div className="header-left">
        <Link to="/" style={{ textDecoration: 'none' }} onClick={closeMenu}>
          <span className="site-title">Profil Research</span>
        </Link>
        <span className="site-subtitle">- Offres & profils</span>
      </div>

      {admin ? (
        <>
          {/* Menu Desktop */}
          <div className="admin-nav-desktop">
            <Link to="/admin" className="add-offer-btn">
                Dashboard
            </Link>
            <Link to="/create-offer" className="add-offer-btn">
                Créer une offre
            </Link>
            <button onClick={handleLoginClick} className="login-btn">
              <svg className="login-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="login-label">Déconnexion</span>
            </button>
          </div>

          {/* Bouton Burger Mobile */}
          <button className={`burger-menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Menu Mobile Overlay */}
          <div className={`admin-nav-mobile ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/admin" className="mobile-nav-link" onClick={closeMenu}>
                Dashboard
            </Link>
            <Link to="/create-offer" className="mobile-nav-link" onClick={closeMenu}>
                Créer une offre
            </Link>
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
    </header>
  );
}