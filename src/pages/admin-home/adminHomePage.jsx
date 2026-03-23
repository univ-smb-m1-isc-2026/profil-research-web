import React, { useEffect, useState } from 'react';
import AdminOffer from '../../components/admin/adminOffer';

export default function AdminHomePage() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        // TODO: replace with real API call
        const mockData = [
            { id: '1', title: 'Dev backend', location: 'Paris', description: 'Develop backend applications', visible: true },
            { id: '2', title: 'Dev frontend', location: 'Lyon', description: 'Develop frontend applications', visible: false },
            { id: '3', title: 'Data Engineer', location: 'Remote', description: 'Work on data pipelines', visible: true },
        ];
        setOffers(mockData);
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