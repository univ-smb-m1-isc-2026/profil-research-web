import './homePage.css';
import React, { useEffect, useState } from 'react';
import OfferBox from '../../components/candidateOffer/offer-item/Offer';
import SelectedOfferDetails from '../../components/candidateOffer/offer-details/SelectedOfferDetails';

export default function HomePage() {

    const [offer, setOffer] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(null);
    // -------------- FETCH API --------------
    useEffect(() => {
        fetch('https://psjob-api.oups.net/api/joboffer/getAllPublic')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }   
            return response.json();
        })
        .then((data) => {
            setOffer(data)
            console.log('Fetched job offers:', data);})
        .catch((error) => {
            console.error('Error fetching job offers:', error);
            // Fallback to mock data in case of error
            const mockData = '[{ "id":"1", "title": "Dev backend","location": "Paris", "description": "Develop backend applications" }, { "id":"2", "title": "Dev frontend", "location": "Paris", "description": "Develop frontend applications" }, { "id":"3", "title": "Hello from the backend!", "location": "Paris", "description": "Hello from the backend!" }, { "id":"4", "title": "Hello from the backend!", "location": "Paris", "description": "Hello from the backend!" }, { "id":"5", "title": "Hello from the backend!", "location": "Paris", "description": "Hello from the backend!" }]';
        
            setOffer(JSON.parse(mockData));
        });
    }, []);
    // ---------------------------------------

    return (
        <main className="app-content">
            <div className={`offers-container ${selectedOffer ? 'split-view' : 'full-view'}`}>
                {offer && offer.length > 0 ? (

                offer?.map((off, idx) => (
                <OfferBox key={idx} offer={off} onClick={() => {
                    setSelectedOffer(off);
                }} />
                ))) 
                : 
                (
                    // Si tableau vide ou null -> message
                    <div className="empty-state" style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: '#6b7280'
                    }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                        Aucune offre disponible
                    </h3>
                    <p style={{ fontSize: '1rem', opacity: 0.8 }}>
                        Revenez plus tard pour de nouvelles opportunités
                    </p>
                    </div>
                )}
            </div>
    
            {selectedOffer && (
                <div className="details-container">
                <SelectedOfferDetails selectedOffer={selectedOffer} setSelectedOffer={setSelectedOffer} />
                </div>
            )}
        </main>
    )
}