import './styles/detailedOffer.css';

export default function DetailedOffer({offer}) {
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