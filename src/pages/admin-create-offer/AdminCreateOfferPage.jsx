import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferDescriptionForm from '../../components/admin/creation/OfferDescriptionForm';
import QuestionsManager from '../../components/admin/creation/QuestionsManager';
import './AdminCreateOfferPage.css';

const AdminCreateOfferPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1 = Description, 2 = Questions
    
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        contractType: 'CDI',
        description: '',
        date: new Date().toISOString().split('T')[0],
        isPublic: false
    });

    const [questions, setQuestions] = useState([
        { id: 1, text: 'Nom du candidat', type: 'text', required: true, options: [] },
        { id: 2, text: 'Prénom du candidat', type: 'text', required: true, options: [] }
    ]);

    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        text: '',
        type: 'text',
        options: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddQuestion = () => {
        const optionsArray = newQuestion.options 
            ? newQuestion.options.split(',').map(o => o.trim()).filter(o => o !== '') 
            : [];
            
        const q = {
            id: Date.now(),
            text: newQuestion.text,
            type: newQuestion.type,
            required: false,
            options: optionsArray
        };
        
        setQuestions([...questions, q]);
        setNewQuestion({ text: '', type: 'text', options: '' });
        setIsAddingQuestion(false);
    };

    const handleSubmit = async () => {
        const payload = {
            title: formData.title,
            description: formData.description,
            isPublic: formData.isPublic,
            contractType: formData.contractType,
            location: formData.location,
            // Le backend attend toujours une liste (sinon NPE côté service)
            // Les questions custom ne sont pas encore persistées en base ici,
            // on envoie donc une liste vide pour garantir la création de l'offre.
            id_question: [],
        };

        try {
            const response = await fetch('http://localhost:8080/api/joboffer/addJobOffer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            console.log('Response status:', response.status);
            if (response.ok) {
                alert('Offre créée avec succès !');
                navigate('/admin');
            } else {
                const errorText = await response.text();
                alert('Erreur lors de la création : ' + errorText);
            }
        } catch (error) {
            console.error('Error creating offer:', error);
            alert('Erreur réseau lors de la création de l\'offre.');
        }
    };

    return (
        <div className="admin-create-offer-container">
            <header className="create-offer-header">
                <h1>Créer une nouvelle offre</h1>
                <div className="create-offer-steps">
                    <div className={`step-item ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                        1. Description du poste
                    </div>
                    <div className={`step-item ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}>
                        2. Questions candidats
                    </div>
                </div>
            </header>

            {step === 1 ? (
                <div>
                    <OfferDescriptionForm formData={formData} handleChange={handleChange} />
                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={() => navigate('/admin')}>
                            Annuler
                        </button>
                        <button type="button" className="btn-submit" onClick={() => setStep(2)}>
                            Suivant : Configurer les questions
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <QuestionsManager 
                        questions={questions}
                        isAddingQuestion={isAddingQuestion}
                        setIsAddingQuestion={setIsAddingQuestion}
                        newQuestion={newQuestion}
                        setNewQuestion={setNewQuestion}
                        handleAddQuestion={handleAddQuestion}
                    />
                    <div className="form-actions" style={{ marginTop: '3rem' }}>
                        <button type="button" className="btn-cancel" onClick={() => setStep(1)}>
                            Retour
                        </button>
                        <button type="button" className="btn-submit" onClick={handleSubmit}>
                            Enregistrer et Publier l'offre
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCreateOfferPage;
