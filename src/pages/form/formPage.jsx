import './formPage.css';
import QuestionBox from '../../components/questions/QuestionBox';
import { useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from 'react';
import { API_URL } from '../../config';

export default function FormPage() {
    const { id } = useParams();
    console.log('offer id from url', id);

    const offerInfoMock = { title: 'Dev backend' , location: 'Paris' }

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loadingQuestions, setLoadingQuestions] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoadingQuestions(true);
            try {
                const response = await fetch(`${API_URL}/api/joboffer/getAllQuestion/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data)

                const normalizedQuestions = (data || [])
                    .sort((a, b) => (a.question_number ?? 0) - (b.question_number ?? 0))
                    .map((item) => ({
                        id: String(item.id_question?.id ?? item.id),
                        title: item.id_question?.title ?? 'Question',
                        format: (item.id_question?.format || 'TEXT').toLowerCase(),
                        options: item.id_question?.choices || [],
                    }));

                setQuestions(normalizedQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setQuestions([]);
            } finally {
                setLoadingQuestions(false);
            }
        };

        if (id) {
            fetchQuestions();
        }
    }, [id]);

    const initialAnswers = useMemo(() => {
        const initial = {};
        questions.forEach((q) => {
            if (q.format === 'checkbox') initial[q.id] = [];
            else initial[q.id] = '';
        });
        return initial;
    }, [questions]);

    useEffect(() => {
        setAnswers(initialAnswers);
    }, [initialAnswers]);

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
        // TODO : envoyer au back les réponses pour les stocker
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
                                {loadingQuestions && <p>Chargement des questions...</p>}

                                {!loadingQuestions && questions.length === 0 && (
                                        <p>Aucune question n'est associée à cette offre pour le moment.</p>
                                )}

                                {!loadingQuestions && questions.map(question => (
                    <QuestionBox
                        key={question.id}
                        question={question}
                        answers={answers}
                        handleChangeText={handleChangeText}
                        handleChangeCheckbox={handleChangeCheckbox}
                        handleChangeRadio={handleChangeRadio}
                    />
                ))}

                <button type="submit">Soumettre</button>
              </form>
            </div>
        </main>
    );
}