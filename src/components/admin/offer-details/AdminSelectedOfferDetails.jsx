import React from 'react';
import PropTypes from 'prop-types';
import AdminDetailedOffer from './AdminDetailedOffer';

export default function AdminSelectedOfferDetails({ selectedOffer, setSelectedOffer }) {
    return (
        <div style={{ position: 'relative' }}>
            <button 
              className="close-btn"
              onClick={() => setSelectedOffer(null)}
              aria-label="Fermer les détails"
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: 'none',
                border: 'none',
                borderRadius: '5px',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748b',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2';
                e.currentTarget.style.color = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <AdminDetailedOffer offer={selectedOffer} />
        </div>
    );
}

AdminSelectedOfferDetails.propTypes = {
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
