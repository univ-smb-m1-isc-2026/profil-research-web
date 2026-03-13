import './styles/headerHome.css';

export default function HeaderHome() {
  const handleLoginClick = () => {
    // placeholder: la logique d'authentification se branchera ici
    console.log('Connexion employés demandée');
  };

  return (
    <header className="header-home">
      {/* Nom du site à gauche */}
      <div className="header-left">
        <span className="site-title">Profil Research</span>
        <span className="site-subtitle">- Offres & profils</span>
      </div>

      {/* Bouton de connexion à droite (accessible) */}
      <button onClick={handleLoginClick} aria-label="Connexion employés" className="login-btn">
        {/* icône utilisateur simple */}
        <svg className="login-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="login-label">Connexion</span>
      </button>
    </header>
  );
}