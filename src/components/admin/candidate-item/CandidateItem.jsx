import React from 'react';
import DeleteButton from '../buttons/DeleteButton';

const CandidateItem = ({ candidate, isSelected, onClick, onDelete }) => {
    return (
        <div 
            className={`candidate-card ${isSelected ? 'active' : ''}`}
            onClick={() => onClick(candidate)}
            style={{ 
                position: 'relative', 
                marginBottom: '10px', 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: '15px'
            }}
        >
            <div className="candidate-info" style={{ textAlign: 'left', width: '100%' }}>
                <span className="candidate-name" style={{ display: 'block', fontWeight: 'bold' }}>
                    {candidate.lastname} {candidate.firstname}
                </span>
                <span className="candidate-date" style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
                    Contact : {candidate.mail}
                </span>
            </div>
            <div className="candidate-arrow" style={{ position: 'absolute', right: '15px', top: '15px' }}>→</div>
            
            <div 
                className="candidate-item-actions" 
                style={{ 
                    alignSelf: 'flex-end',
                    marginTop: '15px'
                }}
            >
                <DeleteButton onClick={onDelete} />
            </div>
        </div>
    );
};

export default CandidateItem;
