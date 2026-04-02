import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/homePage';
import FormPage from './pages/form/formPage';
import HeaderHome from './components/mainComponents/HeaderHome';
import AdminHomePage from './pages/admin-home/adminHomePage';
import AdminCreateOfferPage from './pages/admin-create-offer/AdminCreateOfferPage';
import AdminCandidatesPage from './pages/admin-candidates/AdminCandidatesPage';
import ProtectedRoute from './components/mainComponents/ProtectedRoute';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (
    <div className="app-root">
      <title>PSJOB</title>
      <HeaderHome />

      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form/:id" element={<FormPage />} />
        <Route
          path="/admin"
          element={<ProtectedRoute><AdminHomePage /></ProtectedRoute>}
        />
        <Route 
          path="/create-offer" 
          element={<ProtectedRoute><AdminCreateOfferPage /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/offer/:offerId/candidates" 
          element={<ProtectedRoute><AdminCandidatesPage /></ProtectedRoute>} 
        />
      </Routes>
    </div>
  );
}

export default App;



