import React from 'react';
import './App.css';
import Home from './components/home/home';

function App() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
