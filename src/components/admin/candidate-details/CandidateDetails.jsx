import React from 'react';

const CandidateDetails = ({ candidate, candidateResponses, loadingResponses, onClose }) => {
    let content;
    
    if (loadingResponses) {
        content = <p>Chargement des réponses...</p>;
    } else if (candidateResponses.length === 0) {
        content = <p>Aucune réponse trouvée pour ce candidat.</p>;
    } else {
        content = (
            <ul className="responses-list">
                {candidateResponses.map((item, index) => (
                    <li key={item.id_question.id || `q-${index}`} className="response-item">
                        <p className="question-text"><strong>Question :</strong> {item.id_question.content}</p>
                        <div className="answer-text">
                            <strong>Réponse(s) :</strong> 
                            <ul>
                                {item.responses?.map((resp, i) => (
                                    <li key={`${item.id_question.id || index}-resp-${i}`}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="candidate-details-container">
            <div className="details-header">
                <h2>Détails du candidat : {candidate.firstname} {candidate.lastname}</h2>
                <button className="close-btn" onClick={onClose} aria-label="Fermer">×</button>
            </div>
            
            <div className="details-content">
                <div className="candidate-info-summary" style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px', border: '1px solid #ddd' }}>
                    <p><strong>Nom :</strong> {candidate.lastname}</p>
                    <p><strong>Prénom :</strong> {candidate.firstname}</p>
                    <p><strong>Email :</strong> {candidate.mail}</p>
                </div>
                <h3>Réponses aux questions :</h3>
                {content}
            </div>
        </div>
    );
};

export default CandidateDetails;
