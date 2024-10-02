// frontend/src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Images from './components/Images';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

// Optional: Use lazy loading for your components for better performance
const LazyUsers = lazy(() => import('./components/Users'));
const LazyAbout = lazy(() => import('./components/About'));
const LazyImages = lazy(() => import('./components/Images'));

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen bg-gray-100 p-5">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LazyUsers />} />
            <Route path="/about" element={<LazyAbout />} />
            <Route path="/images" element={<LazyImages />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
