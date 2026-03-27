import PropTypes from 'prop-types';

export default function AdminDetailedOffer({offer}) {

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

      </div>
     );
}

AdminDetailedOffer.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    location: PropTypes.string,
    contractType: PropTypes.string,
    postedDate: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};