import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import ResearchWriter from './pages/ResearchWriter';
import EditorAnimator from './pages/EditorAnimator';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSettings from './pages/AdminSettings';
import AdminContent from './pages/AdminContent';
import AdminSections from './pages/AdminSections';
import AdminPortfolio from './pages/AdminPortfolio';
import AdminFAQs from './pages/AdminFAQs';
import AdminNavigation from './pages/AdminNavigation';
import AdminSocial from './pages/AdminSocial';
import AdminSubmissions from './pages/AdminSubmissions';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/research-writer" element={<ResearchWriter />} />
      <Route path="/editor-animator" element={<EditorAnimator />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/content" element={<AdminContent />} />
      <Route path="/admin/sections" element={<AdminSections />} />
      <Route path="/admin/portfolio" element={<AdminPortfolio />} />
      <Route path="/admin/faqs" element={<AdminFAQs />} />
      <Route path="/admin/navigation" element={<AdminNavigation />} />
      <Route path="/admin/social" element={<AdminSocial />} />
      <Route path="/admin/submissions" element={<AdminSubmissions />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}