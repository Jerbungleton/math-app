import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PreAlgebraPage from './pages/Pre-AlgebraPage';
import AlgebraPage from './pages/AlgebraPage';
import PreCalculusPage from './pages/PreCalculusPage';
import CalculusPage from './pages/CalculusPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

// Import Pre-Algebra sub-pages
import BasicOperationsPage from './pages/pre-algebra/BasicOperationsPage';
import FractionsDecimalsPage from './pages/pre-algebra/FractionsDecimalsPage';
import RatiosPage from './pages/pre-algebra/RatiosPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        
        {/* Pre-Algebra Routes */}
        <Route path="pre-algebra">
          <Route index element={<PreAlgebraPage />} />
          <Route path="operations" element={<BasicOperationsPage />} />
          <Route path="fractions-decimals" element={<FractionsDecimalsPage />} />
          <Route path="ratios" element={<RatiosPage />} />
        </Route>

        {/* Other Subject Routes */}
        <Route path="algebra" element={<AlgebraPage />} />
        <Route path="pre-calculus" element={<PreCalculusPage />} />
        <Route path="calculus" element={<CalculusPage />} />
        
        {/* General Routes */}
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;