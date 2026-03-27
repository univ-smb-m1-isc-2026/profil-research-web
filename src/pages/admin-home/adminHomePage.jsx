import React, { useEffect, useState } from 'react';
import AdminOffer from '../../components/admin/adminOffer';
import mockOffers from '../../data/mockOffers';

export default function AdminHomePage() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        // TODO : à mettre avec un fetch réel vers le back pour récupérer les offres
        // Load mock data for admin listing
        setOffers(mockOffers);
    }, []);

    const handleVisibilityChange = (id, visible) => {
        setOffers(prev => prev.map(o => o.id === id ? { ...o, visible } : o));
    };

    return (
        <main className="app-content" style={{ padding: '1.5rem' }}>
            <div className="offers-container full-view">
                {offers.map(off => (
                    <AdminOffer key={off.id} offer={off} onVisibilityChange={handleVisibilityChange} />
                ))}
            </div>
        </main>
    );
}