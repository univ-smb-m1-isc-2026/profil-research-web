import '../styles/detailedOffer.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function DetailedOffer({offer}) {
  const navigate = useNavigate();

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