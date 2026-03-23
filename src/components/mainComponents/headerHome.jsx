import './styles/headerHome.css';
import { Link } from 'react-router-dom';
import { useAdmin } from "../../context/AdminContext";

export default function HeaderHome() {
  const { admin } = useAdmin();

  const handleLoginClick = () => {
    // placeholder: la logique d'authentification se branchera ici
    console.log('Connexion employés demandée');
  };

  return (
    <header className="header-home">
      {/* Nom du site à gauche */}
      <div className="header-left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="site-title">Profil Research</span>
        </Link>
        <span className="site-subtitle">- Offres & profils</span>
      </div>

      {/* Afficher le bouton seulement si admin est connecté */}
      {admin && (
          <Link to="/admin" className="add-offer-btn">
              Créer une offre
          </Link>
      )}

      {/* Bouton de connexion à droite */}
      <button onClick={handleLoginClick} aria-label="Connexion employés" className="login-btn">
        {/* icône utilisateur simple */}
        <svg className="login-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

          { 
          // TODO: ajouter le action de connexion/déconnexion
          }
          { !admin && (
            <span className="login-label">Connexion</span>
          )}

          { admin && (
              <span className="login-label">Déconnexion</span>
          )}
        
      </button>
    </header>
  );
}