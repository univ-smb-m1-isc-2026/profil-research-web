import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CandidateItem from '../../components/admin/candidate-item/CandidateItem';
import CandidateDetails from '../../components/admin/candidate-details/CandidateDetails';
import './AdminCandidatesPage.css';

const AdminCandidatesPage = () => {
    const { offerId } = useParams();
    const navigate = useNavigate();

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [candidateResponses, setCandidateResponses] = useState([]);
    const [loadingResponses, setLoadingResponses] = useState(false);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/application/getApplicationByJobOffer/${offerId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCandidates(data);
                } else {
                    console.error('Erreur lors du chargement des candidats');
                }
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, [offerId]);

    const handleCandidateClick = async (candidate) => {
        setSelectedCandidate(candidate);
        setLoadingResponses(true);
        try {
            const response = await fetch(`http://localhost:8080/api/application/getAllResponses/${candidate.id}`);
            if (response.ok) {
                const data = await response.json();
                setCandidateResponses(data);
            } else {
                console.error('Erreur lors du chargement des réponses du candidat');
            }
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoadingResponses(false);
        }
    };

    const handleCloseDetails = () => {
        setSelectedCandidate(null);
        setCandidateResponses([]);
    };

    const renderCandidatesList = () => {
        if (loading) {
            return <p>Chargement des candidats...</p>;
        }
        if (candidates.length === 0) {
            return <p>Aucun candidat pour cette offre.</p>;
        }
        return (
            <div className="candidates-list">
                {candidates.map(candidate => (
                    <CandidateItem 
                        key={candidate.id} 
                        candidate={candidate}
                        isSelected={selectedCandidate?.id === candidate.id}
                        onClick={handleCandidateClick}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="admin-candidates-page-wrapper">
            <header className="candidates-header">
                <button className="back-btn" onClick={() => navigate('/admin')} type="button">
                    Retour
                </button>
                <h1>Candidats pour l'offre #{offerId}</h1>
            </header>

            <div className={`admin-candidates-content ${selectedCandidate ? 'split-view' : ''}`}>
                <div className="candidates-list-container">
                    {renderCandidatesList()}
                </div>

                {selectedCandidate && (
                    <CandidateDetails 
                        candidate={selectedCandidate}
                        candidateResponses={candidateResponses}
                        loadingResponses={loadingResponses}
                        onClose={handleCloseDetails}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminCandidatesPage;
