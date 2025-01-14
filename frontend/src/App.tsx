import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';  // Import CircularProgress

// Use dynamic import for code splitting
const MainPage = React.lazy(() => import('./pages/index'));  // Dynamically import MainPage

function App() {
  return (
    <Router>
      <React.Suspense fallback={<CircularProgress />} >  {/* Fallback UI while loading */}
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* Define path and element */}
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
