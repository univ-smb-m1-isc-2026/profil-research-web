import '../styles/detailedOffer.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config';

export default function DetailedOffer({offer}) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoadingQuestions(true);
      try {
        const response = await fetch(`${API_URL}/api/joboffer/getAllQuestion/${offer.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const normalizedQuestions = [
          { id: 'base-1', title: 'Nom du candidat', format: 'text', options: [] },
          { id: 'base-2', title: 'Prénom du candidat', format: 'text', options: [] },
          { id: 'base-3', title: 'Adresse Email', format: 'text', options: [] },
          ...(data || []).sort((a, b) => (a.question_number ?? 0) - (b.question_number ?? 0)).map((item) => ({
            id: item.id ?? item.id_question?.id,
            title: item.id_question?.title ?? 'Question',
          }))
        ];

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

  const handleApply = () => {
    console.log('vers formulaire de l\'offre', offer.id);
    navigate(`/form/${offer.id}`);
  };

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
            <h3>Questions requises pour cette offre</h3>
            {loadingQuestions && (
              <p style={{ fontStyle: 'italic', color: '#64748b' }}>Chargement des questions...</p>
            )}

            {!loadingQuestions && questions.length === 0 && (
              <p style={{ fontStyle: 'italic', color: '#64748b' }}>Aucune question spécifique pour cette offre.</p>
            )}

            {!loadingQuestions && questions.length > 0 && (
              <ul className="questions-list" style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
                {questions.map((question) => (
                  <li key={question.id} style={{ marginBottom: '0.5rem' }}>{question.title}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="apply-row">
            <button className="apply-btn" onClick={handleApply} aria-label={`Candidater à ${offer.title}`}>
              Candidater
            </button>
          </div>
      </div>
     );
}

DetailedOffer.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    location: PropTypes.string,
    contractType: PropTypes.string,
    postedDate: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};