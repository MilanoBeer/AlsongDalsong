import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useReducer, useRef } from 'react';

import Router from './routes/Router';

function App() {

  return (
    <div className="App">
        <Router />
    </div>
  );
}

export default App;
