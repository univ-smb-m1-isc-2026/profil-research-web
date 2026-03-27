import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/homePage';
import FormPage from './pages/form/formPage';
import HeaderHome from './components/mainComponents/headerHome';
import AdminHomePage from './pages/admin-home/adminHomePage';
import AdminCreateOfferPage from './pages/admin-create-offer/AdminCreateOfferPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="app-root">
      <title>PSJOB</title>
      <HeaderHome />

      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/form/:id" element={<FormPage />} />
        <Route
          path="/admin"
          element={<ProtectedRoute><AdminHomePage /></ProtectedRoute>}
        />
        <Route 
          path="/create-offer" 
          element={<ProtectedRoute><AdminCreateOfferPage /></ProtectedRoute>} 
        />
      </Routes>
    </div>
  );
}

export default App;



