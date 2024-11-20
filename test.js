import React from 'react';
import Header from './components/Header';  // Import the Header component

const App = () => {
  const appStyle = {
    fontFamily: 'Arial, sans-serif',
    margin: '0',
    padding: '0',
  };

  const mainStyle = {
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <Header />
      <main style={mainStyle}>
        <h1>Welcome to the Main Page!</h1>
      </main>
    </div>
  );
};

export default App;
