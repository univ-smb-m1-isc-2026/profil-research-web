import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export default function OAuth2RedirectHandler() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setAdmin } = useAdmin();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (token) {
            localStorage.setItem('jwt_token', token);
            setAdmin({ connected: true });
            navigate('/admin', { replace: true });
        } else if (error) {
            alert("Erreur d'authentification : " + error);
            navigate('/login');
        }
    }, [searchParams, navigate, setAdmin]);

    return <div>Connexion en cours...</div>;
}
