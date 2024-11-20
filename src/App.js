import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const appStyle = {
    fontFamily: 'Arial, sans-serif',
    margin: '0',
    padding: '0',
  };

  const mainStyle = {
    padding: '20px',
  };

  return (
    <Router>
      <Routes>
        <Route path="/"  />
        <Route path="/"  />
      </Routes>
    </Router>  
  );
}

export default App;

