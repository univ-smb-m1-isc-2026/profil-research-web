import './App.css';
import React, { useEffect, useState } from 'react';
import OfferBox from './components/candidateOffer/offer';
import SelectedOfferDetails from './components/candidateOffer/selectedOfferDetails';

function App() {
  const [offer, setOffer] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  useEffect(() => {
    // fetch('http://localhost:8080/hello')
    //   .then((response) => response.text())
    //   .then((text) => setMessage(text));
    const mockData = '[{ "title": "Dev backend","location": "Paris", "description": "Develop backend applications" }, { "title": "Dev frontend", "location": "Paris", "description": "Develop frontend applications" }, { "title": "Hello from the backend!", "location": "Paris", "description": "Hello from the backend!" }, { "title": "Hello from the backend!", "location": "Paris", "description": "Hello from the backend!" }, { "title": "Hello from the backend!", "location": "Paris", "description": "Hello from the backend!" }]';

    setOffer(JSON.parse(mockData));
  }, []);



  return ( 
    <div className="app-layout">
      <div className={`offers-container ${selectedOffer ? 'split-view' : 'full-view'}`}>
        {offer?.map((off, idx) => (
          <OfferBox key={idx} offer={off} onClick={() => {
            console.log('Clic sur offer:', off);
            setSelectedOffer(off);
          }} />
        ))}
      </div>

      {selectedOffer && (
        <div className="details-container">
          <SelectedOfferDetails selectedOffer={selectedOffer} setSelectedOffer={setSelectedOffer} />
        </div>
      )}
    </div> 
  );
}

export default App;

