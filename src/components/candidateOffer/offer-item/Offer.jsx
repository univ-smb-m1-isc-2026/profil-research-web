import '../styles/offer.css';
import PropTypes from 'prop-types';

export default function OfferBox({offer, onClick}) {
  const handleKeyDown = (e) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="offer-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-pressed={false}
    >
      <div className="offer-header">
        <h3 className="offer-title">{offer.title}</h3>
        <span className="location-tag">{offer.location}</span>
      </div>
      <p className="offer-excerpt">{  
        offer.description.length > 150 
        ? offer.description.slice(0, 150) + '...' 
        : offer.description
      }</p>
    </div>
  );
}

OfferBox.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};