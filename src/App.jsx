import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './layouts/Navbar';
import { PageTransition } from './components/PageTransition';

import { Landing } from './pages/Landing';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Events } from './pages/Events';
import { CreateEvent } from './pages/CreateEvent';
import { Clubs } from './pages/Clubs';
import { KaiChat } from './pages/KaiChat';
import { Referral } from './pages/Referral';
import { Onboarding } from './pages/Onboarding';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/events/create" element={<PageTransition><CreateEvent /></PageTransition>} />
        <Route path="/clubs" element={<PageTransition><Clubs /></PageTransition>} />
        <Route path="/kai" element={<PageTransition><KaiChat /></PageTransition>} />
        <Route path="/referral" element={<PageTransition><Referral /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <main style={{ flex: 1, position: 'relative' }}>
        <AnimatedRoutes />
      </main>
      <footer style={{ borderTop: '2px solid var(--color-border)', padding: '2rem', textAlign: 'center', marginTop: 'auto', backgroundColor: '#fff' }}>
        <p style={{ fontWeight: 600 }}>© {new Date().getFullYear()} KPRIET Campus. Handcrafted with doodle vibes.</p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
