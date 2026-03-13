import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('https://psjob-api.oups.net/hello')
      .then((response) => response.text())
      .then((text) => setMessage(text));
  }, []);

  return (
    <div>
      <h1>Message du backend :</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;

