import React from 'react';

const QuestionsManager = ({ questions, isAddingQuestion, setIsAddingQuestion, newQuestion, setNewQuestion, handleAddQuestion }) => {
    return (
        <div className="questions-section">
            <p className="section-info">Définissez les questions auxquelles les candidats devront répondre.</p>
            
            <div className="questions-list">
                {questions.map(q => (
                    <div key={q.id} className="question-item">
                        <div className="question-header">
                            <span className="question-title">{q.text}</span>
                            <span className="question-type-badge">{q.type}</span>
                        </div>
                        {q.options.length > 0 && (
                            <ul className="question-options-list">
                                {q.options.map((opt, i) => <li key={i}>{opt}</li>)}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            {isAddingQuestion ? (
                <div className="add-question-box">
                    <div className="form-group">
                        <label htmlFor="questionTitle">Intitulé de la question</label>
                        <input 
                            type="text" 
                            id="questionTitle"
                            value={newQuestion.text} 
                            onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                            placeholder="Ex: Avez-vous une expérience en Java ?"
                        />
                    </div>
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label htmlFor="questionType">Type de réponse</label>
                        <select 
                            id="questionType"
                            value={newQuestion.type} 
                            onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value})}
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
                            />
                        </div>
                    )}

                    <div className="form-actions" style={{ marginTop: '1.5rem' }}>
                        <button type="button" className="btn-cancel" onClick={() => setIsAddingQuestion(false)}>
                            Annuler
                        </button>
                        <button type="button" className="btn-submit" onClick={handleAddQuestion} disabled={!newQuestion.text}>
                            Ajouter la question
                        </button>
                    </div>
                </div>
            ) : (
                <button className="add-question-btn" onClick={() => setIsAddingQuestion(true)}>
                    <span style={{ fontSize: '1.5rem' }}>+</span> Ajouter une question personnalisée
                </button>
            )}
        </div>
    );
};

export default QuestionsManager;
