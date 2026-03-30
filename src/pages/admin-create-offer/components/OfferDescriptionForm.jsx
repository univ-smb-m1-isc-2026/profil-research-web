import React from 'react';

const OfferDescriptionForm = ({ formData, handleChange }) => {
    return (
        <div className="offer-form">
            <div className="form-group">
                <label htmlFor="title">Titre du poste</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex: Développeur Fullstack React/Java"
                    required
                />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                    <label htmlFor="location">Lieu</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Ex: Annecy, France"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contractType">Type de contrat</label>
                    <select
                        id="contractType"
                        name="contractType"
                        value={formData.contractType}
                        onChange={handleChange}
                    >
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Stage">Stage</option>
                        <option value="Alternance">Alternance</option>
                        <option value="Freelance">Freelance</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description de l'offre</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Détaillez les missions, le profil recherché..."
                    required
                />
            </div>

            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
                <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    style={{ width: 'auto' }}
                />
                <label htmlFor="isPublic">Publier immédiatement l'offre</label>
            </div>
        </div>
    );
};

export default OfferDescriptionForm;
