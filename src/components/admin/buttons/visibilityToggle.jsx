import React from 'react';
import PropTypes from 'prop-types';
import '../styles/adminOffer.css';

const VisibilityToggle = ({ visible, loading, onToggle }) => {
  return (
    <button
      type="button"
      className={`visibility-toggle ${visible ? 'on' : 'off'}`}
      onClick={onToggle}
      disabled={loading}
      aria-pressed={visible}
      aria-label={visible ? "Rendre l'offre invisible" : "Rendre l'offre visible"}
    >
      {visible ? 'Visible' : 'Invisible'}
    </button>
  );
};

VisibilityToggle.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

export default VisibilityToggle;
