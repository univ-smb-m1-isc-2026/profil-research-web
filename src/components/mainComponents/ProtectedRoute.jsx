import { Navigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

export default function ProtectedRoute({ children }) {
    const { admin } = useAdmin();

    // Si pas admin connecté -> redirige vers la page d’accueil
    if (!admin) {
        return <Navigate to="/" replace />;
    }

    // Sinon -> affiche le composant enfant
    return children;
}