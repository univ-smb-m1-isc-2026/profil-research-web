import React, { useEffect, useState } from 'react';
import AdminOffer from '../../components/admin/adminOffer';
import AdminSelectedOfferDetails from '../../components/admin/adminSelectedOfferDetails';
import mockOffers from '../../data/mockOffers';

export default function AdminHomePage() {
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);

    // -------------- FETCH API --------------
    useEffect(() => {
        fetch('http://localhost:8080/api/joboffer/getAll')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setOffers(data);
            console.log('Fetched job offers:', data);
        })
        .catch((error) => {
            console.error('Error fetching job offers:', error);
            setOffers(mockOffers);
        });
    }, []);
    // ---------------------------------------

    const handleVisibilityChange = (id, visible) => {
        setOffers(prev => prev.map(o => o.id === id ? { ...o, visible } : o));
    };

    const handleDeleteOffer = (id) => {
        fetch(`http://localhost:8080/api/joboffer/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Supprime l'offre de l'état local pour faire réagir l'interface
            setOffers(prev => prev.filter(o => o.id !== id));
            
            // Si l'offre supprimée était celle affichée à droite, on ferme le détail
            if (selectedOffer && selectedOffer.id === id) {
                setSelectedOffer(null);
            }
            return response.text();
        })
        .then(message => {
            console.log('Backend response:', message);
        })
        .catch(error => {
            console.error('Error deleting job offer:', error);
        });
    };

    return (
        <main className="app-content">
            <div className={`offers-container ${selectedOffer ? 'split-view' : 'full-view'}`}>
                {offers && offers.length > 0 ? (
                
                offers.map(off => (
                    <AdminOffer 
                        key={off.id} 
                        offer={off} 
                        onVisibilityChange={handleVisibilityChange}
                        onViewMore={setSelectedOffer}
                        onDelete={handleDeleteOffer}
                    />
                )))
            : 
            (
                <div className="empty-state" style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: '#6b7280'
                    }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                        Aucune offre disponible
                    </h3> 
                </div>
            )}
            </div>

            {selectedOffer && (
                <div className="details-container">
                    <AdminSelectedOfferDetails 
                        selectedOffer={selectedOffer} 
                        setSelectedOffer={setSelectedOffer} 
                    />
                </div>
            )}
        </main>
    );
}