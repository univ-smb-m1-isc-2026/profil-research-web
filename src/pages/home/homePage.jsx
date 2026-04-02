import './homePage.css';
import React, { useEffect, useState } from 'react';
import OfferBox from '../../components/candidateOffer/offer-item/Offer';
import SelectedOfferDetails from '../../components/candidateOffer/offer-details/SelectedOfferDetails';
import SearchBar from '../../components/mainComponents/SearchBar';
import { API_URL } from '../../config';

export default function HomePage() {

    const [offer, setOffer] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = React.useRef(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Placer le curseur à la fin après le rendu
        setTimeout(() => {
            if (searchInputRef.current) {
                const len = searchInputRef.current.value.length;
                searchInputRef.current.setSelectionRange(len, len);
                searchInputRef.current.focus();
            }
        }, 0);
    };

    // -------------- FETCH API --------------
    useEffect(() => {
        fetch(`${API_URL}/api/joboffer/getAllPublic`)
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

    const filteredOffers = (offer || []).filter(off => 
        off.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        off.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="app-content" style={{ flexDirection: 'column', width: '100%' }}>
            <SearchBar 
                searchTerm={searchTerm}
                onChange={handleSearchChange}
                inputRef={searchInputRef}
                styleContainer={{ 
                    padding: '1.5rem',
                    width: '100%',
                    maxWidth: '900px',
                    margin: '0 auto',
                    boxSizing: 'border-box'
                }}
                styleInput={{
                    padding: '0.8rem 1.2rem',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    width: '100%',
                    boxSizing: 'border-box',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                }}
            />

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <div className={`offers-container ${selectedOffer ? 'split-view' : 'full-view'}`}>
                    {filteredOffers.length > 0 ? (

                    filteredOffers.map((off) => (
                    <OfferBox key={off.id} offer={off} onClick={() => {
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
                            {searchTerm ? 'Aucun résultat pour votre recherche' : 'Aucune offre disponible'}
                        </h3>
                        <p style={{ fontSize: '1rem', opacity: 0.8 }}>
                            {searchTerm ? 'Essayez avec d\'autres mots-clés' : 'Revenez plus tard pour de nouvelles opportunités'}
                        </p>
                        </div>
                    )}
                </div>
        
                {selectedOffer && (
                    <div className="details-container">
                    <SelectedOfferDetails selectedOffer={selectedOffer} setSelectedOffer={setSelectedOffer} />
                    </div>
                )}
            </div>
        </main>
    )
}