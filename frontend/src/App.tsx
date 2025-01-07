import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, Route

import MainPage from './pages/index'; // Assuming MainPage is in './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* Define path and element */}
      </Routes>
    </Router>
  );
}

export default App;
