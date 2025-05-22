import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PreAlgebraPage from './pages/Pre-AlgebraPage'; // New
import AlgebraPage from './pages/AlgebraPage';     // New
import PreCalculusPage from './pages/PreCalculusPage'; // New
import CalculusPage from './pages/CalculusPage';   // New
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
// Remove music-specific imports like musicData, audio files

function App() {
  // Remove states like tracks, currentTrackIndex, cart, isLoading related to music
  // You might add new states relevant to user progress or settings later

  return (
    <Routes>
      <Route path="/" element={<Layout />}> {/* Layout doesn't need music player props anymore */}
        <Route index element={<HomePage />} />
        <Route path="pre-algebra" element={<PreAlgebraPage />} />
        <Route path="algebra" element={<AlgebraPage />} />
        <Route path="pre-calculus" element={<PreCalculusPage />} />
        <Route path="calculus" element={<CalculusPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        {/* Add a 404 Not Found route if desired */}
      </Route>
    </Routes>
  );
}

export default App;