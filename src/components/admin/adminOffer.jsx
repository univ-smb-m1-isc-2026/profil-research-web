import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../components/candidateOffer/styles/offer.css';
import './styles/adminOffer.css';

export default function AdminOffer({ offer, onVisibilityChange }) {
//   offer.visible expected to be boolean; fallback to true if undefined
  const [visible, setVisible] = useState(
    typeof offer.visible === 'boolean' ? offer.visible : true
  );
  const [loading, setLoading] = useState(false);

  const toggleVisibility = async () => {
    const next = !visible;
    // optimistic update
    setVisible(next);
    setLoading(true);
    try {
      // TODO : mettre un fetch réel vers le back pour mettre à jour la visibilité de l'offre
    //   const res = await fetch(`/api/offers/${offer.id}/visibility`, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ visible: next }),
    //   });
    //   if (!res.ok) {
    //     throw new Error(`Server returned ${res.status}`);
    //   }
    //   const data = await res.json();
      // call optional callback with server value (if provided)
      if (onVisibilityChange) onVisibilityChange(offer.id, offer.visible ?? next);
      // keep state as server confirmed value if provided
      if (typeof offer.visible === 'boolean') setVisible(offer.visible);
    } catch (err) {
      console.error('Failed to update visibility', err);
      // revert optimistic update on error
      setVisible(!next);
    } finally {
      setLoading(false);
    }
  };

  console.log('AdminOffer render', offer, visible);

  return (
    <div className="offer-card admin-offer">
      <div className="offer-header">
        <h3 className="offer-title">{offer.title}</h3>
        <span className="location-tag">{offer.location}</span>
      </div>
      <p className="offer-excerpt">{offer.description}</p>

      <div className="admin-actions">
        <button
          type="button"
          className={`visibility-toggle ${visible ? 'on' : 'off'}`}
          onClick={toggleVisibility}
          disabled={loading}
          aria-pressed={offer.visible}
          aria-label={offer.visible ? 'Rendre l\'offre invisible' : 'Rendre l\'offre visible'}
        >
          {offer.visible ? 'Visible' : 'Invisible'}
        </button>
      </div>
    </div>
  );
}

AdminOffer.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    visible: PropTypes.bool,
  }).isRequired,
  onVisibilityChange: PropTypes.func,
};
