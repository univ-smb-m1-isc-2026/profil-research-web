import React from 'react';
import PropTypes from 'prop-types';
import '../../components/candidateOffer/styles/detailedOffer.css';

const AdminDetailedOffer = ({ offer }) => {
  return (
    <div className="detailed-offer">
      <h1>{offer.title}</h1>
      
      <div className="badges-row">
        <span className="badge location-badge">{offer.location}</span>
        {offer.contractType && <span className="badge contract-badge">{offer.contractType}</span>}
        {offer.postedDate && <span className="badge date-badge">Posté le {offer.postedDate}</span>}
      </div>
      
      <div className="detailed-description">
        {offer.description}
      </div>

      <div className="questions-section" style={{ marginTop: '2rem' }}>
        <h3>Questions associées</h3>
        {/* 
          TODO: Fetch questions 
          fetch(`/api/offers/${offer.id}/questions`)
        */}
        <p style={{ fontStyle: 'italic', color: '#64748b' }}>Chargement des questions...</p>
        <ul className="questions-list">
           <li className="question-item">Comment gérez-vous le stress ? (Exemple)</li>
           <li className="question-item">Dites-nous en plus sur vos précédentes expériences. (Exemple)</li>
        </ul>
      </div>
    </div>
  );
};

AdminDetailedOffer.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    location: PropTypes.string,
    contractType: PropTypes.string,
    postedDate: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default AdminDetailedOffer;
