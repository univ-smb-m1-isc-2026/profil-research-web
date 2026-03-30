import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminCandidatesPage.css';

const AdminCandidatesPage = () => {
    const { offerId } = useParams();
    const navigate = useNavigate();

    // Mock data pour les candidats
    // Dans un vrai scénario, on ferait un fetch(`/api/joboffer/${offerId}/candidates`)
    const candidates = [
        { id: 101, firstName: 'Jean', lastName: 'Dupont', applicationDate: '2023-10-15' },
        { id: 102, firstName: 'Marie', lastName: 'Curie', applicationDate: '2023-10-16' },
        { id: 103, firstName: 'Albert', lastName: 'Einstein', applicationDate: '2023-10-17' },
    ];

    const handleCandidateClick = (candidateId) => {
        // Logique pour voir le détail du candidat plus tard
        console.log(`Candidat cliqué: ${candidateId}`);
    };

    return (
        <div className="admin-candidates-container">
            <header className="candidates-header">
                <button className="back-btn" onClick={() => navigate('/admin')}>
                    Retour
                </button>
                <h1>Candidats pour l'offre #{offerId}</h1>
            </header>

            <div className="candidates-list">
                {candidates.map(candidate => (
                    <div 
                        key={candidate.id} 
                        className="candidate-card" 
                        onClick={() => handleCandidateClick(candidate.id)}
                    >
                        <div className="candidate-info">
                            <span className="candidate-name">{candidate.lastName} {candidate.firstName}</span>
                            <span className="candidate-date">Postulé le : {candidate.applicationDate}</span>
                        </div>
                        <div className="candidate-arrow">→</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCandidatesPage;
