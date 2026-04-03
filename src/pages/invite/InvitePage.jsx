import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API_URL } from '../../config';

export default function InvitePage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) {
            document.cookie = `invite_token=${token}; path=/;`;
        } else {
            setError("Lien d'invitation invalide ou manquant.");
        }
    }, [token]);

    const handleLogin = () => {
        window.location.href = `${API_URL}/oauth2/authorization/google`;
    };

    if (error) return (
        <main className="app-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>{error}</div>
        </main>
    );

    return (
        <main className="app-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', maxWidth: '500px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <h2 style={{ color: '#0f172a', marginBottom: '16px' }}>Vous avez été invité(e)</h2>
                <p style={{ color: '#64748b', marginBottom: '24px' }}>Connectez-vous pour accepter l'invitation et créer votre compte collaborateur.</p>
                <button 
                    onClick={handleLogin} 
                    className="login-btn"
                    style={{ padding: '12px 24px', fontSize: '1rem' }}
                >
                    Accepter l'invitation (Google)
                </button>
            </div>
        </main>
    );
}
