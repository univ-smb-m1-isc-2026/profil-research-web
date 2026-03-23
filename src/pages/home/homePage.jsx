import './homePage.css';
import React, { useEffect, useState } from 'react';
import OfferBox from '../../components/candidateOffer/offer';
import SelectedOfferDetails from '../../components/candidateOffer/selectedOfferDetails';

export default function HomePage() {

    const [offer, setOffer] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(null);
    useEffect(() => {
        // fetch('http://localhost:8080/hello')
        //   .then((response) => response.text())
        //   .then((text) => setMessage(text));
        const mockData = '[{ "id":"1", "title": "Dev backend","location": "Paris", "description": "Develop backend applications" }, { "id":"2", "title": "Dev frontend", "location": "Paris", "description": "Develop frontend applications" }, { "id":"3", "title": "Hello from the backend!", "location": "Paris", "description": "Hello from the backend!" }, { "id":"4", "title": "Hello from the backend!", "location": "Paris", "description": "Hello from the backend!" }, { "id":"5", "title": "Hello from the backend!", "location": "Paris", "description": "Hello from the backend!" }]';
    
        setOffer(JSON.parse(mockData));
    }, []);

    return (
        <main className="app-content">
            <div className={`offers-container ${selectedOffer ? 'split-view' : 'full-view'}`}>
                {offer?.map((off, idx) => (
                <OfferBox key={idx} offer={off} onClick={() => {
                    setSelectedOffer(off);
                }} />
                ))}
            </div>
    
            {selectedOffer && (
                <div className="details-container">
                <SelectedOfferDetails selectedOffer={selectedOffer} setSelectedOffer={setSelectedOffer} />
                </div>
            )}
        </main>
    )
}