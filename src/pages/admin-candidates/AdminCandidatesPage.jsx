import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CandidateItem from '../../components/admin/candidate-item/CandidateItem';
import CandidateDetails from '../../components/admin/candidate-details/CandidateDetails';
import { API_URL } from '../../config';
import './AdminCandidatesPage.css';

const AdminCandidatesPage = () => {
    const { offerId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [candidateResponses, setCandidateResponses] = useState([]);
    const [loadingResponses, setLoadingResponses] = useState(false);
    const [offerTitle, setOfferTitle] = useState(location.state?.offerTitle || '');

    const handleDeleteCandidate = async (e, candidateId) => {
        e.stopPropagation();
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce candidat ?")) return;

        try {
            const response = await fetch(`${API_URL}/api/application/delete/${candidateId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setCandidates(prev => prev.filter(c => c.id !== candidateId));
                if (selectedCandidate?.id === candidateId) {
                    setSelectedCandidate(null);
                    setCandidateResponses([]);
                }
            } else {
                alert("Erreur lors de la suppression du candidat.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur réseau lors de la suppression.");
        }
    };

    useEffect(() => {
        const fetchOfferDetails = async () => {
            if (offerTitle) return; // Skip if we already have it from location state

            try {
                const response = await fetch(`${API_URL}/api/joboffer/getJobOfferById/${offerId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOfferTitle(data.title);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des détails de l\'offre:', error);
            }
        };

        const fetchCandidates = async () => {
            try {
                const response = await fetch(`${API_URL}/api/application/getApplicationByJobOffer/${offerId}`);
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

        fetchOfferDetails();
        fetchCandidates();
    }, [offerId]);

    const handleCandidateClick = async (candidate) => {
        setSelectedCandidate(candidate);
        setLoadingResponses(true);
        try {
            const response = await fetch(`${API_URL}/api/application/getAllResponses/${candidate.id}`);
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
                        onDelete={(e) => handleDeleteCandidate(e, candidate.id)}
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
                <h1>Candidats pour l'offre : {offerTitle}</h1>
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
