import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/homePage';
import FormPage from './pages/form/formPage';
import HeaderHome from './components/mainComponents/headerHome';

function App() {


  return (
    <div className="app-root">
      <title>PSJOB</title>
      <HeaderHome />

      <Routes>
        <Route path="/" element={<HomePage />} /> 
         <Route path="/form/:id" element={<FormPage />} />
      </Routes>
    </div>
  );
}

export default App;



