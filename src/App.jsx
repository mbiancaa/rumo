import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
// ... existing imports ...

function App() {
  // ... existing code ...

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* ... existing routes ... */}
            </Routes>
            {hasMouse && <Cursor />}
            <BackToTop />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App; 