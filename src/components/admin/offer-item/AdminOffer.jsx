import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VisibilityToggle from '../buttons/VisibilityToggle';
import ViewMoreButton from '../buttons/ViewMoreButton';
import DeleteButton from '../buttons/DeleteButton';
import '../../candidateOffer/styles/offer.css';
import '../styles/adminOffer.css';
import { API_URL } from '../../../config';

export default function AdminOffer({ offer, onVisibilityChange, onViewMore, onDelete }) {
  //const navigate = useNavigate();
  //offer.visible expected to be boolean; fallback to true if undefined

  // 1. Initialise visible en supportant plusieurs noms renvoyés par le back
  // Le backend Java expose la propriété sous le nom `public` dans le JSON
  // (parfois généré depuis un boolean `isPublic` en Java). On lit donc
  // `offer.isPublic` ou `offer.public` selon ce qui existe.
  const [visible, setVisible] = useState(
    (offer.isPublic === true) || (offer.public === true) || false
  );
  const [loading, setLoading] = useState(false);

  // Synchronisation si les props changent (important si la liste est re-fetchée)
  React.useEffect(() => {
    setVisible((offer.isPublic === true) || (offer.public === true) || false);
  }, [offer.isPublic, offer.public]);

  // 2. Fonction mise à jour pour appeler le backend
  const toggleVisibility = async () => {
    // Si déjà en cours on ne fait rien
    if (loading) return;

    const next = !visible;
    setLoading(true);

    console.log("OFFER ID: ", offer.id);
    try {
      const response = await fetch(`${API_URL}/api/joboffer/editIsPublic/${offer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Le back renvoie une String, on ne peut pas faire .json()
      //const message = await response;
      console.log('Backend response:', response);
      
      // On ne change l'UI QUE si le serveur a répondu OK
      setVisible(next);

      // Notification au parent pour garder la synchro globale
      if (onVisibilityChange) {
        onVisibilityChange(offer.id, next);
      }
    } catch (error) {
      console.error('Error updating visibility:', error);
      // L'UI reste à l'état précédent car setVisible(next) n'a pas été appelé ou est géré par le catch
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
    <div className="offer-card admin-offer" onClick={handleViewMore} style={{ cursor: 'pointer' }}>
      <div className="offer-header">
        <h3 className="offer-title">{offer.title}</h3>
        <span className="location-tag">{offer.location}</span>
      </div>
      <p className="offer-excerpt">{offer.description}</p>

      <div className="admin-actions" onClick={(e) => e.stopPropagation()}>
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
