import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../candidateOffer/styles/detailedOffer.css';
import { API_URL } from '../../../config';

const AdminDetailedOffer = ({ offer }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoadingQuestions(true);
      try {
        const response = await fetch(`${API_URL}/api/joboffer/getAllQuestion/${offer.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const normalizedQuestions = (data || [])
          .sort((a, b) => (a.question_number ?? 0) - (b.question_number ?? 0))
          .map((item) => ({
            id: item.id ?? item.id_question?.id,
            title: item.id_question?.title ?? 'Question',
          }));

        setQuestions(normalizedQuestions);
      } catch (error) {
        console.error('Error fetching offer questions:', error);
        setQuestions([]);
      } finally {
        setLoadingQuestions(false);
      }
    };

    if (offer?.id) {
      fetchQuestions();
    }
  }, [offer?.id]);

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
        {loadingQuestions && (
          <p style={{ fontStyle: 'italic', color: '#64748b' }}>Chargement des questions...</p>
        )}

        {!loadingQuestions && questions.length === 0 && (
          <p style={{ fontStyle: 'italic', color: '#64748b' }}>
            Aucune question associée à cette offre.
          </p>
        )}

        {!loadingQuestions && questions.length > 0 && (
          <ul className="questions-list">
            {questions.map((question) => (
              <li key={question.id} className="question-item">{question.title}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="admin-actions-footer" style={{ marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <button 
          className="btn-submit" 
          style={{ width: '100%' }}
          onClick={() => navigate(`/admin/offer/${offer.id}/candidates`, { state: { offerTitle: offer.title } })}
        >
          Voir les candidats
        </button>
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
