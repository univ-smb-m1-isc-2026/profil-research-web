import './styles/offer.css';

export default function OfferBox({offer, onClick}) {
  return (
    <div className="offer-card" onClick={onClick}>
      <div className="offer-header">
        <h3 className="offer-title">{offer.title}</h3>
        <span className="location-tag">{offer.location}</span>
      </div>
      <p className="offer-excerpt">{offer.description}</p>
    </div>
  );
}