import DetailedOffer from './DetailedOffer';
import PropTypes from 'prop-types';

export default function SelectedOfferDetails({selectedOffer, setSelectedOffer}) {
    return(
        <div style={{ position: 'relative' }}>
            <button 
              className="close-btn"
              onClick={() => setSelectedOffer(null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <DetailedOffer offer={selectedOffer} />
        </div>
    );
}

SelectedOfferDetails.propTypes = {
  selectedOffer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    location: PropTypes.string,
    contractType: PropTypes.string,
    postedDate: PropTypes.string,
    description: PropTypes.string,
  }),
  setSelectedOffer: PropTypes.func.isRequired,
};