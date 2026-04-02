import React, { useEffect, useState } from 'react';
import AdminOffer from '../../components/admin/offer-item/AdminOffer';
import AdminSelectedOfferDetails from '../../components/admin/offer-details/AdminSelectedOfferDetails';
import SearchBar from '../../components/mainComponents/SearchBar';
import { API_URL } from '../../config';

export default function AdminHomePage() {
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = React.useRef(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Maintien du focus et curseur pour le live search
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
        fetch(`${API_URL}/api/joboffer/getAll`)
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
            //setOffers(mockOffers);
        });
    }, []);
    // ---------------------------------------

    const handleVisibilityChange = (id, visible) => {
        setOffers(prev => prev.map(o => o.id === id ? { ...o, visible } : o));
    };

    const handleDeleteOffer = (id) => {
        fetch(`${API_URL}/api/joboffer/delete/${id}`, {
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

    const filteredOffers = (offers || []).filter(off => 
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

            <div className="offers-content-wrapper" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <div className={`offers-container ${selectedOffer ? 'split-view' : 'full-view'}`}>
                    {filteredOffers.length > 0 ? (
                        filteredOffers.map(off => (
                            <React.Fragment key={off.id}>
                                <AdminOffer 
                                    offer={off} 
                                    onVisibilityChange={handleVisibilityChange}
                                    onViewMore={(targetOffer) => {
                                        setSelectedOffer(selectedOffer?.id === targetOffer.id ? null : targetOffer);
                                    }}
                                    onDelete={handleDeleteOffer}
                                />
                                {/* Affichage conditionnel en dessous de l'élément (Mobile uniquement) */}
                                {selectedOffer?.id === off.id && (
                                    <div className="mobile-details-wrapper">
                                        <AdminSelectedOfferDetails 
                                            selectedOffer={selectedOffer} 
                                            setSelectedOffer={setSelectedOffer} 
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <div className="empty-state" style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: '#6b7280'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                {searchTerm ? 'Aucun résultat pour votre recherche' : 'Aucune offre disponible'}
                            </h3> 
                        </div>
                    )}
                </div>

                {selectedOffer && (
                    <div className="details-container desktop-only">
                        <AdminSelectedOfferDetails 
                            selectedOffer={selectedOffer} 
                            setSelectedOffer={setSelectedOffer} 
                        />
                    </div>
                )}
            </div>
        </main>
    );
}