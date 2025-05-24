// Add polyfill for react-mathquill
window.global = window;

// Add jQuery for react-mathquill
import $ from 'jquery';
window.jQuery = $;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/layout/ErrorBoundary';
import './index.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

try {
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
} catch (error) {
  console.error('Error in main render:', error);
  root.render(
    <div className="p-4 m-4 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-xl font-bold text-red-700 mb-2">Application Error</h2>
      <pre className="whitespace-pre-wrap text-red-600 mb-4">
        {error.toString()}
      </pre>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Reload Page
      </button>
    </div>
  );
}