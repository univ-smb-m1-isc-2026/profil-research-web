import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import VisibilityToggle from './buttons/visibilityToggle';
import ViewMoreButton from './buttons/viewMoreButton';
import DeleteButton from './buttons/deleteButton';
import '../../components/candidateOffer/styles/offer.css';
import './styles/adminOffer.css';

export default function AdminOffer({ offer, onVisibilityChange, onViewMore, onDelete }) {
  //const navigate = useNavigate();
  //offer.visible expected to be boolean; fallback to true if undefined

  // 1. Initialise visible avec offer.visible
  const [visible, setVisible] = useState(offer.visible || false);
  const [loading, setLoading] = useState(false);

  // 2. Fonction corrigée avec simulation réseau
  const toggleVisibility = async () => {
    const next = !visible;
    // Optimistic update
    setVisible(next);
    setLoading(true);
    
    try {
      // Simulation d'appel réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Appel du callback parent pour synchroniser la liste canonical
      if (onVisibilityChange) {
        onVisibilityChange(offer.id, next);
      }
    } catch (err) {
      console.error('Failed to update visibility', err);
      // Revert optimistic
      setVisible(!next);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = () => {
    if (onViewMore) {
      onViewMore(offer);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'offre "${offer.title}" ?`)) {
      console.log('Suppression de l\'offre ID :', offer.id);
      // Informe le parent que l'offre doit être supprimée de la vue
      if (onDelete) {
        onDelete(offer.id);
      }
    }
  };

  return (
    <div className="offer-card admin-offer">
      <div className="offer-header">
        <h3 className="offer-title">{offer.title}</h3>
        <span className="location-tag">{offer.location}</span>
      </div>
      <p className="offer-excerpt">{offer.description}</p>

      <div className="admin-actions">
        <ViewMoreButton onClick={handleViewMore} />
        <VisibilityToggle 
          visible={visible} 
          loading={loading} 
          onToggle={toggleVisibility} 
        />
        <DeleteButton onClick={handleDelete} />
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
  onViewMore: PropTypes.func,
  onDelete: PropTypes.func,
};
