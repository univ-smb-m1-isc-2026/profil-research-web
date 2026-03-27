import React from 'react';
import PropTypes from 'prop-types';

const ViewMoreButton = ({ onClick }) => {
  return (
    <button 
      type="button" 
      className="view-more-btn" 
      onClick={onClick}
    >
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ marginRight: '6px' }}
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      Voir plus
    </button>
  );
};

ViewMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ViewMoreButton;
