import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';  // Add Box for better alignment

// Use dynamic import for code splitting
const MainPage = React.lazy(() => import('./pages/index'));  // Dynamically import MainPage

function App() {
  return (
    <Router>
      <React.Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />  {/* Centered CircularProgress while loading */}
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
