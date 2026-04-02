import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../config';

const QuestionsManager = ({ questions, isAddingQuestion, setIsAddingQuestion, newQuestion, setNewQuestion, handleAddQuestion, onSelectExisting }) => {
    const [existingQuestions, setExistingQuestions] = useState([]);
    const [loadingExisting, setLoadingExisting] = useState(false);

    useEffect(() => {
        const fetchExisting = async () => {
            setLoadingExisting(true);
            try {
                const response = await fetch(`${API_URL}/api/question/getAll`);
                if (response.ok) {
                    const data = await response.json();
                    setExistingQuestions(data);
                }
            } catch (error) {
                console.error('Error fetching existing questions:', error);
            } finally {
                setLoadingExisting(false);
            }
        };
        fetchExisting();
    }, []);

    return (
        <div className="questions-section">
            <div className="questions-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <div className="left-column">
                    <p className="section-info">Définissez les questions auxquelles les candidats devront répondre.</p>
                    
                    <div className="questions-list">
                        {questions.map(q => (
                            <div key={q.id} className="question-item">
                                <div className="question-header">
                                    <span className="question-title">{q.text}</span>
                                    <span className="question-type-badge">{q.type}</span>
                                </div>
                                {q.options && q.options.length > 0 && (
                                    <ul className="question-options-list">
                                        {q.options.map((opt, i) => <li key={i}>{opt}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    {isAddingQuestion ? (
                        <div className="add-question-box" style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                            <div className="form-group">
                                <label htmlFor="questionTitle">Intitulé de la question</label>
                                <input 
                                    type="text" 
                                    id="questionTitle"
                                    value={newQuestion.text} 
                                    onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                                    placeholder="Ex: Avez-vous une expérience en Java ?"
                                    style={{ width: '100%', padding: '0.6rem', marginTop: '0.4rem' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <label htmlFor="questionType">Type de réponse</label>
                                <select 
                                    id="questionType"
                                    value={newQuestion.type} 
                                    onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value})}
                                    style={{ width: '100%', padding: '0.6rem', marginTop: '0.4rem' }}
                                >
                                    <option value="text">Texte libre</option>
                                    <option value="checkbox">Cases à cocher (Plusieurs choix)</option>
                                    <option value="radio">Boutons radio (Choix unique)</option>
                                </select>
                            </div>

                            {(newQuestion.type === 'checkbox' || newQuestion.type === 'radio') && (
                                <div className="form-group" style={{ marginTop: '1rem' }}>
                                    <label htmlFor="questionOptions">Choix possibles (séparés par des virgules)</label>
                                    <input 
                                        type="text" 
                                        id="questionOptions"
                                        value={newQuestion.options} 
                                        onChange={(e) => setNewQuestion({...newQuestion, options: e.target.value})}
                                        placeholder="Option 1, Option 2, Option 3"
                                        style={{ width: '100%', padding: '0.6rem', marginTop: '0.4rem' }}
                                    />
                                </div>
                            )}

                            <div className="form-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                <button type="button" className="btn-cancel" onClick={() => setIsAddingQuestion(false)} style={{ flex: 1 }}>
                                    Annuler
                                </button>
                                <button type="button" className="btn-submit" onClick={handleAddQuestion} disabled={!newQuestion.text} style={{ flex: 2 }}>
                                    Ajouter la question
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className="add-question-btn" onClick={() => setIsAddingQuestion(true)} style={{ marginTop: '1rem' }}>
                            <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>+</span> Créer une nouvelle question
                        </button>
                    )}
                </div>

                <div className="right-column existing-questions-selector" style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '1.5rem' }}>
                    <h3>Bibliothèque de questions</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                        Réutilisez des questions déjà créées précédemment.
                    </p>
                    
                    <div className="scrollable-questions-list" style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem' }}>
                        {loadingExisting && <p>Chargement...</p>}
                        {!loadingExisting && existingQuestions.length === 0 && <p>Aucune question en bibliothèque.</p>}
                        {!loadingExisting && existingQuestions.map(eq => {
                            const isAlreadyAdded = questions.some(q => q.id === eq.id);
                            return (
                                <div key={eq.id} className="existing-question-card" style={{ 
                                    padding: '0.75rem', 
                                    borderBottom: '1px solid #f1f5f9',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: isAlreadyAdded ? '#f8fafc' : 'white',
                                    opacity: isAlreadyAdded ? 0.6 : 1
                                }}>
                                    <div style={{ flex: 1, paddingRight: '0.5rem' }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{eq.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{eq.format}</div>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => onSelectExisting(eq)}
                                        disabled={isAlreadyAdded}
                                        style={{ 
                                            padding: '4px 8px', 
                                            borderRadius: '4px',
                                            backgroundColor: isAlreadyAdded ? '#cbd5e1' : '#2ecc71',
                                            color: 'white',
                                            border: 'none',
                                            cursor: isAlreadyAdded ? 'default' : 'pointer'
                                        }}
                                        title={isAlreadyAdded ? "Déjà ajoutée" : "Ajouter à l'offre"}
                                    >
                                        +
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsManager;
