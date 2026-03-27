import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCreateOfferPage.css';

const AdminCreateOfferPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        contractType: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Sending to backend:', formData);
        
        try {
            const response = await fetch('http://localhost:8080/api/joboffer/addJobOffer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    isPublic: false // Par défaut, on crée l'offre en invisible
                })
            });

            if (response.ok) {
                const result = await response.text();
                console.log('Success:', result);
                navigate('/admin');
            } else {
                console.error('Failed to create offer');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="admin-create-offer-container">
            <header className="create-offer-header">
                <h1>Créer une offre d'emploi</h1>
            </header>

            <form className="offer-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titre de l'offre</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                        placeholder="ex: Développeur Fullstack Java/React"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="location">Localisation</label>
                        <input 
                            type="text" 
                            id="location" 
                            name="location" 
                            value={formData.location} 
                            onChange={handleChange} 
                            required 
                            placeholder="ex: Annecy (74)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contractType">Type de contrat</label>
                        <select 
                            id="contractType" 
                            name="contractType" 
                            value={formData.contractType} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">-- Choisir --</option>
                            <option value="CDI">CDI</option>
                            <option value="CDD">CDD</option>
                            <option value="Apprentissage">Apprentissage</option>
                            <option value="Stage">Stage</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description du poste</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        rows="8" 
                        value={formData.description} 
                        onChange={handleChange} 
                        required
                        placeholder="Missions, profil recherché, avantages..."
                    ></textarea>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin')}>
                        Annuler
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Créer l'offre
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminCreateOfferPage;
