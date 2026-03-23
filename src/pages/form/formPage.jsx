import './formPage.css';
import { useParams, useLocation } from "react-router-dom";
import React, { useState } from 'react';

export default function FormPage() {
    const { id } = useParams();

    const offerInfoMock = { title: 'Dev backend' , location: 'Paris' }
    const location = useLocation();
    // TODO: remplacer par fetch réel avec l'id
    const mockData = [
        { id: '1', title: 'Pourquoi souhaitez-vous postuler à cette offre ?', format: 'text' },
        { id: '2', title: 'Avez-vous de l\'expérience avec les technologies suivantes ? (React, Node.js, etc.)', format: 'checkbox', options: ['React', 'Node.js', 'Angular', 'Vue.js'] },
        { id: '3', title: 'Quel est votre niveau de maîtrise de JavaScript ?', format: 'radio', options: ['Débutant', 'Intermédiaire', 'Avancé'] }
    ];

    // initial answers
    const initial = {};
    mockData.forEach(q => {
        if (q.format === 'checkbox') initial[q.id] = [];
        else initial[q.id] = '';
    });

    const [answers, setAnswers] = useState(initial);

    const handleChangeText = (qid, value) => {    
        // Sécurité pour limiter les caractères autorisés et donc éviter les injections    
        if (!/^[a-zA-Z0-9À-ÿ\s.,'-]*$/.test(value)) return;

        // NOTE : ... permet de copier les valeurs précédentes
        setAnswers(prev => ({ ...prev, [qid]: value }));
    };

    const handleChangeCheckbox = (qId, option) => {
        setAnswers(prev => {
            const current = prev[qId] || [];
            const has = current.includes(option);
            const next = has ? current.filter(x => x !== option) : [...current, option];
            return { ...prev, [qId]: next };
        });
    };

    const handleChangeRadio = (qId, option) => {
        setAnswers(prev => ({ ...prev, [qId]: option }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('form answers', answers);
    };

    const headerTitle = offerInfoMock.title;
    const headerLocation = offerInfoMock.location;

    return (
        <main className="form-root">
            <div className="form-box">
              <div className="offer-header">
                  <h2>{headerTitle}</h2>
                  {headerLocation && <p className="offer-location">{headerLocation}</p>}
              </div>
              <form onSubmit={handleSubmit}>
                {mockData.map(q => (
                    <div key={q.id} style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6 }}>{q.title}</label>

                        {
                        // ---------------- TEXT INPUT ----------------
                        }
                        {q.format === 'text' && (
                            <input
                                type="text"
                                value={answers[q.id]}
                                onChange={e => handleChangeText(q.id, e.target.value)}
                                required
                            />
                        )}

                        {
                        // ---------------- CHECKBOX INPUT ----------------
                        }
                        {q.format === 'checkbox' && q.options?.map(opt => (
                                <label key={opt} style={{ display: 'block' }}>
                                    <input
                                        type="checkbox"
                                        checked={(answers[q.id] || []).includes(opt)}
                                        onChange={() => handleChangeCheckbox(q.id, opt)}
                                    />{' '}{opt}
                                </label>
                            ))}

                        {
                        // ---------------- RADIO INPUT ----------------
                        }
                        {q.format === 'radio' && q.options?.map(opt => (
                                <label key={opt} style={{ display: 'block' }}>
                                    <input
                                        type="radio"
                                        name={`q_${q.id}`}
                                        checked={answers[q.id] === opt}
                                        onChange={() => handleChangeRadio(q.id, opt)}
                                        required
                                    />{' '}{opt}
                                </label>
                            ))}
                    </div>
                ))}

                <button type="submit">Soumettre</button>
              </form>
            </div>
        </main>
    );
}