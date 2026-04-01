import React from 'react';

const CandidateItem = ({ candidate, isSelected, onClick }) => {
    return (
        <button 
            type="button"
            className={`candidate-card ${isSelected ? 'active' : ''}`}
            onClick={() => onClick(candidate)}
        >
            <div className="candidate-info">
                <span className="candidate-name">{candidate.lastname} {candidate.firstname}</span>
                <span className="candidate-date">Contact : {candidate.mail}</span>
            </div>
            <div className="candidate-arrow">→</div>
        </button>
    );
};

export default CandidateItem;
